'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Bookmark, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { DESTINATIONS } from '@/lib/data';
import { DestinationItem } from '@/types';

interface CuratedDestinationsProps {
  onSelectDestination: (destination: DestinationItem) => void;
  savedIds: string[];
  onToggleBookmark: (id: string) => void;
  activeFilterRegion?: string;
}

export default function CuratedDestinations({
  onSelectDestination,
  savedIds,
  onToggleBookmark,
  activeFilterRegion,
}: CuratedDestinationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    { label: 'Semua', key: 'Semua' },
    { label: 'Jawa', key: 'jawa' },
    { label: 'Nusa Tenggara', key: 'ntt' },
    { label: 'Bali', key: 'bali' },
    { label: 'Papua', key: 'papua' },
  ];

  const filteredDestinations = DESTINATIONS.filter((item) => {
    // If external activeFilterRegion is passed
    if (activeFilterRegion && activeFilterRegion !== 'Semua Wilayah') {
      const matchRegion =
        item.region.toLowerCase().includes(activeFilterRegion.toLowerCase()) ||
        item.title.toLowerCase().includes(activeFilterRegion.toLowerCase());
      if (!matchRegion) return false;
    }

    if (selectedCategory === 'Semua') return true;
    return item.tags.includes(selectedCategory);
  });

  return (
    <section id="destinasi" className="py-20 md:py-28 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#7a5649] uppercase">
            <Compass className="w-4 h-4 text-[#7a5649]" />
            <span>Katalog Kurasi Eksklusif</span>
          </div>
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl text-[#231006] tracking-tight">
            Destinasi Pilihan
          </h2>
          <p className="text-sm sm:text-base text-[#4f443f] max-w-xl">
            Lanskap, budaya, dan ritme alam Indonesia yang kami pilihkan untuk kamu resapi. Setiap penjuru menyimpan narasi dan filosofi mendalam.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCategory === cat.key
                  ? 'bg-[#3a2418] text-[#fff8f4] border-[#3a2418] shadow-xs'
                  : 'bg-[#faf2ed] text-[#4f443f] border-[#d3c3bc]/50 hover:bg-[#f4ece7] hover:text-[#231006]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento-style Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {filteredDestinations.map((dest) => {
          const isSaved = savedIds.includes(dest.id);

          return (
            <div
              key={dest.id}
              className={`${dest.colSpan} group relative bg-[#fff8f4] rounded-2xl overflow-hidden border border-[#d3c3bc]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col`}
            >
              {/* Image Box */}
              <div className="relative aspect-16/10 sm:aspect-16/9 md:aspect-auto md:h-80 w-full overflow-hidden bg-[#faf2ed]">
                <Image
                  src={dest.image}
                  alt={dest.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231006]/80 via-[#231006]/20 to-transparent" />

                {/* Top Badge & Bookmark */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-[#fff8f4]/90 backdrop-blur-md text-[#231006] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
                    {dest.region}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(dest.id);
                    }}
                    aria-label={isSaved ? 'Hapus dari Tersimpan' : 'Simpan Destinasi'}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-[#7a5649] text-white'
                        : 'bg-[#fff8f4]/80 text-[#231006] hover:bg-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Floating Bottom Info on Image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <p className="text-[10px] font-bold tracking-widest text-[#ffdbcf] uppercase">
                    {dest.subtitle}
                  </p>
                  <h3 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-medium tracking-tight mt-0.5">
                    {dest.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#fff8f4]">
                <p className="text-xs sm:text-sm text-[#4f443f] line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                <div className="pt-3 border-t border-[#d3c3bc]/30 flex items-center justify-between">
                  <div className="text-xs text-[#81746e]">
                    <span className="font-semibold text-[#231006]">Durasi Ideal:</span>{' '}
                    {dest.recommendation}
                  </div>

                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#3a2418] hover:text-[#7a5649] transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Detail Rute</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-16 bg-[#faf2ed] rounded-2xl border border-dashed border-[#d3c3bc] p-8">
          <p className="font-['Playfair_Display',serif] text-xl text-[#231006]">
            Tidak ada destinasi yang cocok dengan pencarian.
          </p>
          <p className="text-xs text-[#81746e] mt-2">
            Coba gunakan kata kunci lain atau bersihkan filter di bagian atas.
          </p>
        </div>
      )}
    </section>
  );
}
