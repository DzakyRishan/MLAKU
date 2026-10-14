'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Mail,
  User as UserIcon,
  Phone,
  MessageSquare,
  Sparkles,
  X,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { createInquiry } from '@/lib/db';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationTitle?: string;
  packageTitle?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  destinationTitle = 'Labuan Bajo & Pulau Flores',
  packageTitle,
}: InquiryModalProps) {
  const { user, loginWithGoogle } = useAuth();
  const [userName, setUserName] = useState(user?.displayName || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userPhone, setUserPhone] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [travelerCount, setTravelerCount] = useState(2);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await createInquiry({
        userId: user?.uid || '',
        userName: userName.trim() || 'Penjelajah Nusantara',
        userEmail: (userEmail || user?.email || '').trim(),
        userPhone: userPhone.trim(),
        destinationTitle,
        packageTitle: packageTitle || 'Custom Bespoke Route',
        travelDates: travelDates.trim() || 'Fleksibel',
        travelerCount,
        notes: notes.trim(),
        status: 'pending',
      });
      setIsSuccess(true);
    } catch (err: unknown) {
      console.error('Failed to submit inquiry:', err);
      setErrorMessage(
        'Terjadi kendala saat menyimpan permintaan ke database Firestore. Silakan coba kembali.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231006]/65 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fff8f4] w-full max-w-lg rounded-3xl border border-[#d3c3bc] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#d3c3bc]/40 bg-[#faf2ed] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a2418] text-[#fff8f4] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-['Playfair_Display',serif] text-xl font-bold text-[#231006]">
                Konsultasi &amp; Reservasi Trip
              </h2>
              <p className="text-xs text-[#7a5649]">
                Tersimpan di Cloud Database MLAKU dengan kurasi personal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#81746e] hover:text-[#231006] hover:bg-[#f4ece7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#231006]">
                Permintaan Berhasil Dikirim!
              </h3>
              <p className="text-xs text-[#4f443f] max-w-sm mx-auto leading-relaxed">
                Permintaan perjalanan ke <strong>{destinationTitle}</strong> telah tercatat di
                database. Kurator utama kami akan meninjau dan menghubungi Anda melalui WhatsApp atau
                email dalam 1x24 jam.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="bg-[#3a2418] text-[#fff8f4] px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#231006]"
              >
                Selesai
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Destination badge */}
              <div className="bg-[#faf2ed] p-3 rounded-xl border border-[#d3c3bc]/40 text-xs text-[#4f443f]">
                <span className="font-bold text-[#231006]">Rencana Tujuan:</span>{' '}
                <span className="text-[#7a5649] font-medium">
                  {destinationTitle} {packageTitle ? `(${packageTitle})` : ''}
                </span>
              </div>

              {!user && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs text-amber-900">
                  <span>Ingin lacak status di akun Anda?</span>
                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="font-bold underline hover:text-amber-700"
                  >
                    Masuk dengan Google
                  </button>
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#81746e] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Amanda Kanisius"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl text-[#1e1b18] focus:outline-none focus:border-[#7a5649]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Email Kontak
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#81746e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl text-[#1e1b18] focus:outline-none focus:border-[#7a5649]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#81746e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="0812xxxxxxx"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl text-[#1e1b18] focus:outline-none focus:border-[#7a5649]"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Dates & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Perkiraan Waktu
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#81746e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Contoh: Akhir Mei 2026"
                      value={travelDates}
                      onChange={(e) => setTravelDates(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl text-[#1e1b18] focus:outline-none focus:border-[#7a5649]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Jumlah Tamu
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#81746e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={travelerCount}
                      onChange={(e) => setTravelerCount(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl text-[#1e1b18] focus:outline-none focus:border-[#7a5649]"
                    >
                      <option value={1}>1 Orang (Solo Traveler)</option>
                      <option value={2}>2 Orang (Pasangan / Sahabat)</option>
                      <option value={4}>4 Orang (Keluarga Kecil)</option>
                      <option value={6}>6 Orang (Grup Privat)</option>
                      <option value={10}>10+ Orang (Rombongan)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                  Catatan atau Preferensi Khusus
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan preferensi makanan, akomodasi bernuansa alam, atau upacara budaya yang ingin disaksikan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 text-xs bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl text-[#1e1b18] focus:outline-none focus:border-[#7a5649]"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] py-3.5 rounded-xl font-semibold text-xs tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mencatat Permintaan ke Database...</span>
                  </>
                ) : (
                  <span>Kirim Permintaan Konsultasi</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
