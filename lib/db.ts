import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { InquiryItem, BookmarkItem } from '@/types';

// ==================== INQUIRIES ====================

export async function createInquiry(
  data: Omit<InquiryItem, 'id' | 'createdAt' | 'status'> & { status?: InquiryItem['status'] }
): Promise<string> {
  const colPath = 'inquiries';
  try {
    const payload = {
      ...data,
      status: data.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, colPath), payload);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, colPath);
  }
}

export async function fetchUserInquiries(userId: string): Promise<InquiryItem[]> {
  const colPath = 'inquiries';
  try {
    const q = query(
      collection(db, colPath),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    const items: InquiryItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<InquiryItem, 'id'>) });
    });
    // Sort descending in memory
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
  }
}

export async function fetchAllInquiries(): Promise<InquiryItem[]> {
  const colPath = 'inquiries';
  try {
    const snap = await getDocs(collection(db, colPath));
    const items: InquiryItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<InquiryItem, 'id'>) });
    });
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
  }
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryItem['status'],
  adminNotes?: string
): Promise<void> {
  const docPath = `inquiries/${inquiryId}`;
  try {
    const docRef = doc(db, 'inquiries', inquiryId);
    const updateData: Record<string, unknown> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }
    await updateDoc(docRef, updateData);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

// ==================== BOOKMARKS ====================

export async function fetchUserBookmarks(userId: string): Promise<BookmarkItem[]> {
  const colPath = `users/${userId}/bookmarks`;
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'bookmarks'));
    const items: BookmarkItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as Omit<BookmarkItem, 'id'>) });
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
  }
}

export async function syncUserBookmark(
  userId: string,
  bookmark: Omit<BookmarkItem, 'id' | 'createdAt'>
): Promise<string> {
  const colPath = `users/${userId}/bookmarks`;
  try {
    const payload = {
      ...bookmark,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'users', userId, 'bookmarks'), payload);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, colPath);
  }
}

export async function deleteUserBookmark(userId: string, bookmarkId: string): Promise<void> {
  const docPath = `users/${userId}/bookmarks/${bookmarkId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'bookmarks', bookmarkId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
