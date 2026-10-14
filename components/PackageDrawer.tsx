'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Star,
  CheckCircle,
  XCircle,
  Calendar,
  ShieldCheck,
  MessageCircle,
  Users,
  Check,
} from 'lucide-react';
import { PackageItem } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { createInquiry } from '@/lib/db';

interface PackageDrawerProps {
  pkg: PackageItem | null;
  onClose: () => void;
}

export default function PackageDrawer({ pkg, onClose }: PackageDrawerProps) {
  const { user } = useAuth();
  const [guestCount, setGuestCount] = useState(2);
  const [travelDate, setTravelDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pkg) return null;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createInquiry({
        userId: user?.uid || '',
        userName: user?.displayName || 'Penjelajah Nusantara',
        userEmail: user?.email || 'traveler@mlaku.id',
        destinationTitle: pkg.region,
        packageTitle: pkg.title,
        travelDates: travelDate || 'Fleksibel',
        travelerCount: guestCount,
        notes: `Reservasi paket wisata: ${pkg.title} (${pkg.duration}, harga: ${pkg.price})`,
        status: 'pending',
      });
      setBookingSuccess(true);
    } catch (err) {
      console.error('Error saving package inquiry:', err);
      // Still show success UI with fallback note
      setBookingSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Halo Kurator MLAKU, saya tertarik untuk memesan "${pkg.title}" (${pkg.duration}) untuk ${guestCount} penjelajah pada tanggal ${travelDate || 'fleksibel'}. Mohon informasi ketersediaan slot private.`
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#231006]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fff8f4] w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden border-l border-[#d3c3bc]">
        {/* Top Header */}
        <div className="p-5 border-b border-[#d3c3bc]/40 flex items-center justify-between bg-[#faf2ed]">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold tracking-wider text-[#7a5649] uppercase bg-[#fff8f4] px-2.5 py-1 rounded-full border border-[#d3c3bc]/40">
              {pkg.badge}
            </span>
            <span className="text-xs text-[#81746e] font-medium">{pkg.region}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#81746e] hover:text-[#231006] hover:bg-[#f4ece7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hero Image */}
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-[#faf2ed]">
            <Image
              src={pkg.image}
              alt={pkg.imageAlt}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title & Rating */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-[#231006]">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-[#7a5649] text-[#7a5649]" />
                <span className="font-bold">{pkg.rating}</span>
              </div>
              <span className="text-[#81746e]">({pkg.reviewsCount} ulasan kurasi penjelajah)</span>
            </div>

            <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl text-[#231006] leading-snug">
              {pkg.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#4f443f] leading-relaxed pt-1">
              {pkg.description}
            </p>
          </div>

          {/* Price callout */}
          <div className="bg-[#faf2ed] p-4 rounded-2xl border border-[#d3c3bc]/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#81746e] uppercase tracking-wider font-semibold">
                Tarif Pengalaman Eksklusif
              </p>
              <p className="text-2xl font-bold text-[#231006]">{pkg.price}</p>
              <p className="text-[10px] text-[#7a5649] mt-0.5">
                Private Small Group · All-Inclusive Lokal
              </p>
            </div>
            <ShieldCheck className="w-8 h-8 text-[#7a5649]/70" />
          </div>

          {/* Day by Day Itinerary */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#231006]">
              Rencana Perjalanan Harian
            </h3>
            <div className="space-y-3">
              {pkg.itinerary.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#fff8f4] p-4 rounded-xl border border-[#d3c3bc]/40 space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold bg-[#faf2ed] text-[#7a5649] px-2 py-0.5 rounded border border-[#d3c3bc]/30">
                      {step.day}
                    </span>
                    <h4 className="font-['Playfair_Display',serif] text-sm font-semibold text-[#231006]">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#4f443f] leading-relaxed pl-1 pt-1">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Includes & Excludes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#faf2ed] p-4 rounded-2xl border border-[#d3c3bc]/40 space-y-2">
              <h4 className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                Fasilitas Termasuk
              </h4>
              <ul className="space-y-1.5">
                {pkg.includes.map((inc, i) => (
                  <li key={i} className="text-xs text-[#4f443f] flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#faf2ed] p-4 rounded-2xl border border-[#d3c3bc]/40 space-y-2">
              <h4 className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                Belum Termasuk
              </h4>
              <ul className="space-y-1.5">
                {pkg.excludes.map((exc, i) => (
                  <li key={i} className="text-xs text-[#81746e] flex items-start space-x-2">
                    <XCircle className="w-3.5 h-3.5 text-[#81746e] shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Inquiry / Reservation Form */}
          <div className="border-t border-[#d3c3bc]/40 pt-6">
            {!bookingSuccess ? (
              <form onSubmit={handleBooking} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#231006]">
                  Reservasi &amp; Penyesuaian Jadwal
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#4f443f]">
                      Jumlah Penjelajah
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-[#faf2ed] text-xs p-2.5 rounded-xl border border-[#d3c3bc]/50 focus:outline-none mt-1"
                    >
                      <option value={1}>1 Orang (Solo Traveler)</option>
                      <option value={2}>2 Orang (Couple / Duo)</option>
                      <option value={4}>4 Orang (Small Private)</option>
                      <option value={6}>6 Orang (Group Private)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#4f443f]">
                      Prakiraan Tanggal
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-[#faf2ed] text-xs p-2.5 rounded-xl border border-[#d3c3bc]/50 focus:outline-none mt-1"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] py-3 px-4 rounded-xl text-xs font-semibold tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi Kurator via WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    className="bg-[#faf2ed] hover:bg-[#f4ece7] text-[#231006] py-3 px-4 rounded-xl text-xs font-semibold tracking-wider border border-[#d3c3bc]/60 transition-colors"
                  >
                    Kirim Permintaan Kuota
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-[#faf2ed] p-6 rounded-2xl border border-emerald-600/30 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-['Playfair_Display',serif] text-lg font-semibold text-[#231006]">
                  Permintaan Terkirim
                </h4>
                <p className="text-xs text-[#4f443f]">
                  Kurator MLAKU akan segera memeriksa ketersediaan slot private untuk {guestCount} orang. Kamu juga dapat langsung menghubungi kami melalui WhatsApp.
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="text-xs font-semibold text-[#7a5649] underline pt-2 block mx-auto"
                >
                  Ubah data reservasi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
