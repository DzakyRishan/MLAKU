'use client';

import React, { useEffect, useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export type AuthMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
  /** Pesan singkat di atas form, mis. "Masuk dulu untuk konsultasi rute". */
  notice?: string;
}

function firebaseErrorMessage(err: unknown): string {
  const code =
    err && typeof err === 'object' && 'code' in err ? String((err as { code: unknown }).code) : '';
  switch (code) {
    case 'auth/invalid-email':
      return 'Format email tidak valid.';
    case 'auth/email-already-in-use':
      return 'Email sudah terdaftar. Silakan masuk.';
    case 'auth/weak-password':
      return 'Kata sandi terlalu lemah (minimal 6 karakter).';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email atau kata sandi salah.';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan. Coba lagi beberapa saat.';
    case 'auth/operation-not-allowed':
      return 'Login email/kata sandi belum diaktifkan di Firebase Console > Authentication > Sign-in method.';
    case 'auth/network-request-failed':
      return 'Koneksi bermasalah. Periksa internet Anda.';
    default:
      return 'Terjadi kesalahan. Silakan coba lagi.';
  }
}

export default function AuthModal({ isOpen, mode, onModeChange, onClose, notice }: AuthModalProps) {
  const { user, loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Tutup otomatis begitu pengguna berhasil masuk
  useEffect(() => {
    if (isOpen && user) onClose();
  }, [isOpen, user, onClose]);

  // Reset form setiap modal dibuka atau mode berganti
  useEffect(() => {
    if (isOpen) {
      setError('');
      setPassword('');
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isRegister = mode === 'register';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isRegister && name.trim().length < 2) {
      setError('Nama minimal 2 karakter.');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }
    setSubmitting(true);
    try {
      if (isRegister) {
        await registerWithEmail(name, email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      setError(firebaseErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const inputWrap =
    'flex items-center gap-2 bg-[#faf2ed] border border-[#d3c3bc]/70 rounded-xl px-3 py-2.5 focus-within:border-[#3a2418] transition-colors';
  const inputCls =
    'flex-1 bg-transparent outline-none text-sm text-[#231006] placeholder:text-[#81746e]';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#231006]/50 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative w-full max-w-md bg-[#fff8f4] rounded-3xl shadow-2xl border border-[#d3c3bc]/60 p-6 sm:p-8 animate-fadeIn"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 p-2 rounded-full text-[#4f443f] hover:bg-[#f4ece7] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          id="auth-modal-title"
          className="font-['Playfair_Display',serif] text-3xl font-semibold text-[#231006]"
        >
          {isRegister ? 'Buat Akun' : 'Selamat Datang'}
        </h2>
        <p className="mt-1 text-sm text-[#7a5649]">
          {notice ||
            (isRegister
              ? 'Daftar untuk menyimpan dan merencanakan perjalananmu.'
              : 'Masuk untuk melanjutkan petualanganmu di Nusantara.')}
        </p>

        {/* Tab */}
        <div className="mt-5 grid grid-cols-2 gap-1 p-1 bg-[#f4ece7] rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onModeChange('login')}
            className={`py-2 rounded-lg transition-colors ${
              !isRegister ? 'bg-[#3a2418] text-[#fff8f4]' : 'text-[#4f443f] hover:text-[#231006]'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => onModeChange('register')}
            className={`py-2 rounded-lg transition-colors ${
              isRegister ? 'bg-[#3a2418] text-[#fff8f4]' : 'text-[#4f443f] hover:text-[#231006]'
            }`}
          >
            Daftar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {isRegister && (
            <label className={inputWrap}>
              <UserIcon className="w-4 h-4 text-[#7a5649]" />
              <input
                type="text"
                autoComplete="name"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
                required
              />
            </label>
          )}
          <label className={inputWrap}>
            <Mail className="w-4 h-4 text-[#7a5649]" />
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              required
            />
          </label>
          <label className={inputWrap}>
            <Lock className="w-4 h-4 text-[#7a5649]" />
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              placeholder="Kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              className="text-[#7a5649] hover:text-[#231006]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </label>

          {error && (
            <p role="alert" className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#3a2418] text-[#fff8f4] hover:bg-[#231006] disabled:opacity-60 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors"
          >
            {submitting ? 'Memproses...' : isRegister ? 'Daftar' : 'Masuk'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-[11px] text-[#81746e]">
          <span className="flex-1 h-px bg-[#d3c3bc]/60" />
          atau
          <span className="flex-1 h-px bg-[#d3c3bc]/60" />
        </div>

        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="w-full flex items-center justify-center gap-2 bg-[#faf2ed] hover:bg-[#f4ece7] border border-[#d3c3bc]/70 text-[#231006] py-3 rounded-xl text-sm font-semibold transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
          Lanjutkan dengan Google
        </button>
      </div>
    </div>
  );
}
