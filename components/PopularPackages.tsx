'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { PACKAGES } from '@/lib/data';
import { PackageItem } from '@/types';

interface PopularPackagesProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

export default function PopularPackages({ onSelectPackage }: PopularPackagesProps) {
  const packageList = Object.values(PACKAGES);

  return (
    <section id="paket" className="py-20 md:py-28 bg-[#faf2ed] border-y border-[#d3c3bc]/30 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#7a5649] uppercase">
              <ShieldCheck className="w-4 h-4 text-[#7a5649]" />
              <span>Pengalaman Terkurasi Penuh</span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl text-[#231006] tracking-tight">
              Paket Wisata Populer
            </h2>
            <p className="text-sm sm:text-base text-[#4f443f] max-w-xl">
              Rute perjalanan terencana dengan kurasi etis, fasilitas premium berkeberlanjutan, dan bimbingan pramuwisata lokal berlisensi.
            </p>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs text-[#81746e]">
            <Clock className="w-4 h-4 text-[#7a5649]" />
            <span>Garansi Pembatalan Fleksibel &amp; Private Small Group</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packageList.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#fff8f4] rounded-2xl overflow-hidden border border-[#d3c3bc]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Header */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#faf2ed]">
                  <Image
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#3a2418]/90 backdrop-blur-md text-[#fff8f4] text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-xs">
                      {pkg.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#7a5649] tracking-wider uppercase text-[10px]">
                      {pkg.region}
                    </span>
                    <div className="flex items-center space-x-1 text-[#231006]">
                      <Star className="w-3.5 h-3.5 fill-[#7a5649] text-[#7a5649]" />
                      <span className="font-bold">{pkg.rating}</span>
                      <span className="text-[#81746e]">({pkg.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-['Playfair_Display',serif] text-xl font-medium text-[#231006] group-hover:text-[#7a5649] transition-colors leading-snug">
                    {pkg.title}
                  </h3>

                  {/* Highlights List */}
                  <ul className="space-y-2 pt-1">
                    {pkg.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[#4f443f] flex items-center space-x-2"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#7a5649] shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="p-5 pt-3 border-t border-[#d3c3bc]/30 bg-[#faf2ed]/50 mt-2 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-[#81746e]">Mulai Dari</span>
                  <div className="text-right">
                    <span className="text-base font-bold text-[#231006]">{pkg.price}</span>
                    <span className="text-[10px] text-[#81746e]"> /orang</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="w-full bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider transition-colors duration-200 flex items-center justify-center space-x-2 shadow-2xs"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
