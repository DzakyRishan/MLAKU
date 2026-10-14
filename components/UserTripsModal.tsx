'use client';

import React, { useEffect, useState } from 'react';
import {
  Compass,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calendar,
  Users,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { InquiryItem } from '@/types';
import { fetchUserInquiries } from '@/lib/db';

interface UserTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewInquiry: () => void;
}

export default function UserTripsModal({
  isOpen,
  onClose,
  onOpenNewInquiry,
}: UserTripsModalProps) {
  const { user, userProfile, role, logout } = useAuth();
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reloadUserTrips = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await fetchUserInquiries(user.uid);
      setInquiries(data);
    } catch (err) {
      console.error('Error fetching user inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !user) return;
    let isCancelled = false;

    fetchUserInquiries(user.uid)
      .then((data) => {
        if (!isCancelled) {
          setInquiries(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('Error fetching user inquiries:', err);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#231006]/65 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fff8f4] w-full max-w-2xl max-h-[88vh] rounded-3xl border border-[#d3c3bc] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#d3c3bc]/40 bg-[#faf2ed] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#3a2418] text-[#fff8f4] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-['Playfair_Display',serif] text-xl font-bold text-[#231006]">
                  Perjalanan Saya
                </h2>
                <span className="bg-[#e8ddd6] text-[#4f443f] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {role === 'admin' ? 'ADMIN' : 'PENJELAJAH'}
                </span>
              </div>
              <p className="text-xs text-[#7a5649]">
                Riwayat reservasi dan konsultasi kurasi {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={reloadUserTrips}
              className="p-2 rounded-full text-[#4f443f] hover:bg-[#f4ece7] transition-colors"
              title="Segarkan Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#4f443f] hover:text-[#231006] hover:bg-[#f4ece7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#7a5649] mx-auto" />
              <p className="text-xs text-[#7a5649]">Mengambil data reservasi dari database...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Compass className="w-10 h-10 text-[#d3c3bc] mx-auto" />
              <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-[#231006]">
                Belum Ada Riwayat Reservasi
              </h3>
              <p className="text-xs text-[#7a5649] max-w-sm mx-auto leading-relaxed">
                Anda belum mengajukan konsultasi rute. Rencanakan perjalanan impian Anda atau pilih
                paket terkurasi Nusantara sekarang.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewInquiry();
                }}
                className="bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                Konsultasikan Perjalanan Baru
              </button>
            </div>
          ) : (
            inquiries.map((inq) => {
              const statusBadge =
                inq.status === 'confirmed'
                  ? { label: 'Terkonfirmasi', icon: CheckCircle2, cls: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
                  : inq.status === 'reviewed'
                  ? { label: 'Sedang Ditinjau', icon: AlertCircle, cls: 'bg-blue-100 text-blue-800 border-blue-300' }
                  : inq.status === 'cancelled'
                  ? { label: 'Dibatalkan', icon: XCircle, cls: 'bg-rose-100 text-rose-800 border-rose-300' }
                  : { label: 'Menunggu Kurator', icon: Clock, cls: 'bg-amber-100 text-amber-800 border-amber-300' };

              const Icon = statusBadge.icon;

              return (
                <div
                  key={inq.id}
                  className="bg-[#faf2ed] p-5 rounded-2xl border border-[#d3c3bc]/50 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-['Playfair_Display',serif] text-base font-bold text-[#231006]">
                        {inq.destinationTitle}
                      </h4>
                      {inq.packageTitle && (
                        <p className="text-xs text-[#7a5649]">{inq.packageTitle}</p>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusBadge.cls}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-[#fff8f4] p-3 rounded-xl border border-[#d3c3bc]/30 text-[#4f443f]">
                    <div>
                      <span className="font-bold text-[#231006]">Waktu:</span>{' '}
                      {inq.travelDates || 'Fleksibel'}
                    </div>
                    <div>
                      <span className="font-bold text-[#231006]">Tamu:</span>{' '}
                      {inq.travelerCount || 2} Orang
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="font-bold text-[#231006]">Terkirim:</span>{' '}
                      {new Date(inq.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  {inq.adminNotes && (
                    <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900">
                      <span className="font-bold">Pesan dari Kurator MLAKU:</span>
                      <p className="mt-0.5">{inq.adminNotes}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#d3c3bc]/40 bg-[#faf2ed] flex items-center justify-between">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenNewInquiry();
            }}
            className="bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            + Buat Konsultasi Baru
          </button>
        </div>
      </div>
    </div>
  );
}
