'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, ADMIN_EMAIL, handleFirestoreError, OperationType } from './firebase';
import { UserProfile, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  role: UserRole | null;
  isAdmin: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  role: null,
  isAdmin: false,
  isLoading: true,
  loginWithGoogle: async () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  logout: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrCreateProfile = async (firebaseUser: User) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userEmail = (firebaseUser.email || '').toLowerCase().trim();
    const isAppAdmin = userEmail === ADMIN_EMAIL.toLowerCase();
    const assignedRole: UserRole = isAppAdmin ? 'admin' : 'user';

    // 1. Immediately provide authenticated state locally
    const localProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: userEmail,
      displayName: firebaseUser.displayName || userEmail.split('@')[0],
      photoURL: firebaseUser.photoURL || '',
      role: assignedRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUserProfile(localProfile);
    setRole(assignedRole);

    // 2. Synchronize with Firestore
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        // If user is admin email but document had user role, elevate to admin
        if (isAppAdmin && data.role !== 'admin') {
          const updated = {
            ...data,
            role: 'admin' as UserRole,
            updatedAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, updated, { merge: true });
          setUserProfile(updated);
          setRole('admin');
        } else {
          setUserProfile(data);
          setRole(data.role);
        }
      } else {
        await setDoc(userDocRef, localProfile, { merge: true });
      }

      // If admin, also ensure marker document in /admins/{uid}
      if (isAppAdmin) {
        try {
          const adminDocRef = doc(db, 'admins', firebaseUser.uid);
          await setDoc(
            adminDocRef,
            {
              uid: firebaseUser.uid,
              email: userEmail,
              assignedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (_) {}
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.includes('offline') ||
        msg.includes('unavailable') ||
        msg.includes('Failed to get document')
      ) {
        // Safe offline or connecting state: local profile is already active
        console.warn('Firestore offline or connecting; continuing with local profile');
      } else {
        console.warn('Could not sync user profile to cloud:', err);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchOrCreateProfile(currentUser);
      } else {
        setUserProfile(null);
        setRole(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        await fetchOrCreateProfile(cred.user);
      }
    } catch (err: unknown) {
      // Gracefully handle user closing or cancelling the popup window
      const errCode =
        err && typeof err === 'object' && 'code' in err ? String((err as { code: unknown }).code) : '';
      if (
        errCode === 'auth/popup-blocked' ||
        errCode === 'auth/operation-not-supported-in-this-environment'
      ) {
        // Some browsers block Firebase's popup window. Redirect still works there.
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          console.error('Redirect sign-in failed:', redirectErr);
        }
      }
      if (
        errCode === 'auth/popup-closed-by-user' ||
        errCode === 'auth/cancelled-popup-request'
      ) {
        // The user closed or cancelled the popup.
        return;
      }
      console.error(
        'Google Sign-in failed. Check Firebase Authentication > Authorized domains (include localhost for local development):',
        err
      );
      if (typeof window !== 'undefined') {
        window.alert(
          `Login Google gagal (${errCode || 'unknown'}).\n` +
            (errCode === 'auth/unauthorized-domain'
              ? 'Domain "' + window.location.hostname + '" belum ditambahkan di Firebase Console > Authentication > Settings > Authorized domains.'
              : errCode === 'auth/operation-not-allowed'
              ? 'Provider Google belum diaktifkan di Firebase Console > Authentication > Sign-in method.'
              : 'Buka console browser (F12) untuk detail.')
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (name.trim()) {
      await updateProfile(cred.user, { displayName: name.trim() });
    }
    await fetchOrCreateProfile(auth.currentUser || cred.user);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setRole(null);
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchOrCreateProfile(auth.currentUser);
    }
  };

  const isAdmin = role === 'admin' || (user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        role,
        isAdmin,
        isLoading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
