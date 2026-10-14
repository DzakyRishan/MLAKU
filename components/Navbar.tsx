'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Bookmark,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Compass,
  LogOut,
  ChevronDown,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface NavbarProps {
  onOpenPlanner: () => void;
  onOpenBookmarks: () => void;
  onOpenUserTrips: () => void;
  onOpenInquiry: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  savedCount: number;
}

export default function Navbar({
  onOpenPlanner,
  onOpenBookmarks,
  onOpenUserTrips,
  onOpenInquiry,
  onOpenAuth,
  savedCount,
}: NavbarProps) {
  const { user, userProfile, role, isAdmin, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="top-0 sticky z-40 bg-[#fff8f4]/95 backdrop-blur-md border-b border-[#d3c3bc]/40 shadow-xs transition-all duration-300">
      <div className="flex justify-between items-center w-full px-5 md:px-10 lg:px-16 max-w-[1440px] mx-auto h-20">
        {/* Brand Logo Lockup */}
        <a href="#" className="flex items-baseline space-x-2 group">
          <span className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-semibold tracking-tight text-[#231006]">
            MLAKU
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#7a5649] hidden sm:inline-block">
            JELAJAHI NUSANTARA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider text-[#4f443f]">
          <a
            href="#destinasi"
            className="text-[#231006] font-bold border-b-2 border-[#231006] pb-1 transition-colors"
          >
            Destinasi
          </a>
          <a
            href="#paket"
            className="hover:text-[#231006] transition-colors pb-1"
          >
            Paket Wisata
          </a>
          <a
            href="#minat"
            className="hover:text-[#231006] transition-colors pb-1"
          >
            Minat Perjalanan
          </a>
          <a
            href="#cerita"
            className="hover:text-[#231006] transition-colors pb-1"
          >
            Cerita Nusantara
          </a>
          <a
            href="#kenapa-mlaku"
            className="hover:text-[#231006] transition-colors pb-1"
          >
            Tentang Kami
          </a>
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Saved Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            aria-label="Lihat Perjalanan Tersimpan"
            className="relative text-[#4f443f] hover:text-[#231006] transition-colors p-2 rounded-full hover:bg-[#f4ece7]"
            title="Koleksi Tersimpan"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#7a5649] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* AI Trip Planner */}
          <button
            onClick={onOpenPlanner}
            aria-label="Eksplorasi AI Trip Planner"
            className="text-[#4f443f] hover:text-[#231006] transition-colors p-2 rounded-full hover:bg-[#f4ece7]"
            title="AI Trip Planner"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          {/* Google Auth Status / User Dropdown */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-[#e8ddd6] animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 bg-[#faf2ed] hover:bg-[#f4ece7] border border-[#d3c3bc]/60 px-2.5 py-1.5 rounded-full transition-colors"
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover border border-[#3a2418]/20"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#3a2418] text-[#fff8f4] flex items-center justify-center text-[10px] font-bold">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden md:inline-block text-xs font-semibold text-[#231006] max-w-[100px] truncate">
                  {user.displayName?.split(' ')[0] || 'Penjelajah'}
                </span>
                {isAdmin ? (
                  <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-amber-300">
                    ADMIN
                  </span>
                ) : (
                  <span className="bg-[#e8ddd6] text-[#4f443f] text-[9px] font-bold px-1.5 py-0.5 rounded">
                    USER
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-[#81746e]" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#fff8f4] rounded-2xl shadow-xl border border-[#d3c3bc] p-2 z-50 animate-fadeIn space-y-1">
                  <div className="p-3 border-b border-[#d3c3bc]/40 bg-[#faf2ed] rounded-xl">
                    <p className="text-xs font-bold text-[#231006] truncate">
                      {user.displayName || 'Penjelajah Nusantara'}
                    </p>
                    <p className="text-[11px] text-[#7a5649] truncate">{user.email}</p>
                    <div className="mt-2 flex items-center space-x-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#81746e]">Role:</span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isAdmin
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-[#e8ddd6] text-[#4f443f]'
                        }`}
                      >
                        {isAdmin ? 'ADMINISTRATOR' : 'PENJELAJAH'}
                      </span>
                    </div>
                  </div>

                  {/* Traveler Inquiries */}
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenUserTrips();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-[#231006] hover:bg-[#faf2ed] rounded-xl flex items-center space-x-2 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#7a5649]" />
                    <span>Perjalanan &amp; Reservasi Saya</span>
                  </button>

                  {/* Sign Out */}
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar (Sign Out)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-[#231006] hover:bg-[#f4ece7] px-3 sm:px-3.5 py-2 rounded-full text-xs font-semibold transition-colors"
              >
                Masuk
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="bg-[#faf2ed] hover:bg-[#f4ece7] border border-[#d3c3bc]/70 text-[#231006] px-3 sm:px-3.5 py-2 rounded-full text-xs font-semibold transition-all hover:shadow-xs"
              >
                Daftar
              </button>
            </div>
          )}

          {/* Rencanakan CTA */}
          <button
            onClick={onOpenInquiry}
            className="hidden sm:flex bg-[#3a2418] text-[#fff8f4] hover:bg-[#231006] px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors duration-200 shadow-sm items-center space-x-2"
          >
            <span>Konsultasi Rute</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#231006] hover:bg-[#f4ece7] rounded-lg"
            aria-label="Buka Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f4] border-b border-[#d3c3bc]/50 px-6 py-4 space-y-3">
          <a
            href="#destinasi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#231006] py-1.5"
          >
            Destinasi Pilihan
          </a>
          <a
            href="#paket"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#4f443f] py-1.5"
          >
            Paket Wisata
          </a>
          <a
            href="#minat"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#4f443f] py-1.5"
          >
            Minat Perjalanan
          </a>
          <a
            href="#cerita"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#4f443f] py-1.5"
          >
            Cerita Nusantara
          </a>
          <a
            href="#kenapa-mlaku"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#4f443f] py-1.5"
          >
            Tentang Kami
          </a>

          {user && (
            <div className="pt-3 border-t border-[#d3c3bc]/50 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7a5649]">
                <span>Masuk sebagai: <strong>{user.email}</strong></span>
                <span className="font-bold text-amber-800 uppercase">{role}</span>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenUserTrips();
                }}
                className="w-full text-left py-2 text-xs font-semibold text-[#231006] bg-[#faf2ed] px-3 rounded-lg"
              >
                Lihat Reservasi Saya
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
