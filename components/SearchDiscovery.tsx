'use client';

import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowRight, RotateCcw } from 'lucide-react';

interface SearchDiscoveryProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  onSearchSubmit: () => void;
}

export default function SearchDiscovery({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedStyle,
  setSelectedStyle,
  onSearchSubmit,
}: SearchDiscoveryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedRegion('Semua Wilayah');
    setSelectedStyle('Semua Gaya');
  };

  const hasFilters =
    searchQuery.trim() !== '' ||
    selectedRegion !== 'Semua Wilayah' ||
    selectedStyle !== 'Semua Gaya';

  return (
    <section className="relative z-20 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 -mt-10 mb-16">
      <div className="bg-[#fff8f4] border border-[#d3c3bc]/60 rounded-2xl p-4 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#7a5649] uppercase">
            <MapPin className="w-4 h-4 text-[#7a5649]" />
            <span>Mau ke mana kamu M&apos;laku?</span>
          </div>

          {hasFilters && (
            <button
              onClick={handleReset}
              className="text-xs text-[#81746e] hover:text-[#231006] flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 items-center">
          {/* Keyword Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#81746e] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
              placeholder="Cari Bromo, Labuan Bajo, Sumba, pura, tenun..."
              className="w-full bg-[#faf2ed] hover:bg-[#f4ece7] focus:bg-[#ffffff] text-sm text-[#1e1b18] placeholder-[#81746e] pl-11 pr-4 py-3.5 rounded-xl border border-[#d3c3bc]/40 focus:border-[#7a5649] focus:outline-none transition-colors"
            />
          </div>

          {/* Region Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#faf2ed] hover:bg-[#f4ece7] text-sm text-[#1e1b18] px-4 py-3.5 rounded-xl border border-[#d3c3bc]/40 focus:border-[#7a5649] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Semua Wilayah">Semua Wilayah Nusantara</option>
              <option value="Jawa Timur">Jawa Timur (Bromo &amp; Ijen)</option>
              <option value="Nusa Tenggara Timur">Nusa Tenggara Timur (Labuan Bajo &amp; Sumba)</option>
              <option value="Bali">Bali (Sidemen &amp; Karangasem)</option>
              <option value="Papua Barat">Papua Barat (Raja Ampat)</option>
            </select>
          </div>

          {/* Travel Style Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-[#faf2ed] hover:bg-[#f4ece7] text-sm text-[#1e1b18] px-4 py-3.5 rounded-xl border border-[#d3c3bc]/40 focus:border-[#7a5649] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="Semua Gaya">Semua Gaya Perjalanan</option>
              <option value="Budaya & Etnografi">Budaya &amp; Etnografi</option>
              <option value="Petualangan Alam">Petualangan Alam Bebas</option>
              <option value="Slow Living & Hening">Slow Living &amp; Hening</option>
              <option value="Ekspedisi Bahari">Ekspedisi Bahari &amp; Phinisi</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              onClick={onSearchSubmit}
              className="w-full bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] py-3.5 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Cari Rute</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#81746e]">
          <span className="font-medium text-[#7a5649]">Rekomendasi Cepat:</span>
          {['Bromo Fajar', 'Liveaboard Bajo', 'Desa Wae Rebo', 'Tenun Sumba', 'Sidemen Bali'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  onSearchSubmit();
                }}
                className="bg-[#faf2ed] hover:bg-[#f4ece7] text-[#4f443f] hover:text-[#231006] px-3 py-1 rounded-full border border-[#d3c3bc]/30 transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
