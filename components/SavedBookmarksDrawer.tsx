'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, ArrowUpRight, Compass } from 'lucide-react';
import { DESTINATIONS } from '@/lib/data';
import { DestinationItem } from '@/types';

interface SavedBookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemoveBookmark: (id: string) => void;
  onSelectDestination: (dest: DestinationItem) => void;
}

export default function SavedBookmarksDrawer({
  isOpen,
  onClose,
  savedIds,
  onRemoveBookmark,
  onSelectDestination,
}: SavedBookmarksDrawerProps) {
  if (!isOpen) return null;

  const savedList = DESTINATIONS.filter((d) => savedIds.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#231006]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fff8f4] w-full max-w-md h-full shadow-2xl flex flex-col overflow-hidden border-l border-[#d3c3bc]">
        {/* Header */}
        <div className="p-5 border-b border-[#d3c3bc]/40 flex items-center justify-between bg-[#faf2ed]">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-[#7a5649]" />
            <h3 className="font-['Playfair_Display',serif] text-lg font-semibold text-[#231006]">
              Destinasi Tersimpan ({savedList.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#81746e] hover:text-[#231006] hover:bg-[#f4ece7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedList.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#faf2ed] text-[#81746e] mx-auto flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <p className="font-['Playfair_Display',serif] text-lg text-[#231006]">
                Belum ada rute yang tersimpan
              </p>
              <p className="text-xs text-[#81746e] max-w-xs mx-auto">
                Klik ikon bookmark pada kartu destinasi untuk menyimpan rute impianmu di sini.
              </p>
            </div>
          ) : (
            savedList.map((dest) => (
              <div
                key={dest.id}
                className="bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl p-3 flex gap-3 items-center justify-between group"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#f4ece7]">
                  <Image
                    src={dest.image}
                    alt={dest.imageAlt}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-[#7a5649] uppercase">
                    {dest.region}
                  </span>
                  <h4 className="font-['Playfair_Display',serif] text-sm font-semibold text-[#231006] truncate">
                    {dest.title}
                  </h4>
                  <p className="text-[11px] text-[#81746e]">{dest.recommendation}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      onSelectDestination(dest);
                      onClose();
                    }}
                    className="p-2 text-[#3a2418] hover:text-[#7a5649] hover:bg-[#fff8f4] rounded-lg transition-colors"
                    title="Buka Rincian"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(dest.id)}
                    className="p-2 text-[#81746e] hover:text-red-700 hover:bg-[#fff8f4] rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
