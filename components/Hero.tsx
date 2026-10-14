'use client';

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenPlanner: () => void;
}

export default function Hero({ onOpenPlanner }: HeroProps) {
  return (
    <section className="relative min-h-[860px] lg:min-h-[920px] flex items-center justify-center bg-[#faf2ed] overflow-hidden border-b border-[#d3c3bc]/30">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-85 mix-blend-multiply pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7Op2fl355btL5Fz-TikdErysTJd-Uqw3dsdQ6WVw9xWITLjXq2Os3Xq8XQk2Tcv4i3PPMcCkrvjmx_79zRl2WKbTxGKDDjUkmaKuseb6M_i73tBX8KcLckn-gY9g6ULo4wtxcrCD9QZKeEvs_5F5aZKQU2EUOv0ik29yOLTVObaAU_K8JnbniJxhWNsdrKRLV-9BXxfhUEc1a3wwRCYCzpzCSMa3_fjXlw4owC2XL7CEB05wRr6hI')`,
          }}
        />
        {/* Soft atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f4] via-[#faf2ed]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f4]/85 via-transparent to-[#fff8f4]/65" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-24 text-center md:text-left grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          {/* Tag Pill */}
          <div className="inline-flex items-center space-x-2 bg-[#f4ece7]/90 backdrop-blur-xs border border-[#d3c3bc]/60 px-3.5 py-1.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7a5649]" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-[#795548] uppercase">
              KURASI PERJALANAN EKSKLUSIF NUSANTARA
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.15] text-[#231006] tracking-tight">
            M&apos;laku, Jelajahi Nusantara.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-[18px] text-[#4f443f] max-w-2xl leading-relaxed">
            Temukan perjalanan yang membawa kamu lebih dekat dengan alam, budaya, dan cerita Indonesia. Lambat, mendalam, dan tak terlupakan.
          </p>

          {/* Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href="#destinasi"
              className="inline-flex items-center justify-center bg-[#3a2418] text-[#fff8f4] hover:bg-[#231006] px-7 py-3.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 shadow-md"
            >
              Jelajahi Indonesia
            </a>
            <button
              onClick={onOpenPlanner}
              className="inline-flex items-center justify-center border border-[#231006] text-[#231006] hover:bg-[#f4ece7] px-6 py-3.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#7a5649]" />
              <span>Rencanakan Perjalanan (AI)</span>
            </button>
          </div>
        </div>

        {/* Atmospheric Stamp / Curated Credential Lockup */}
        <div className="hidden lg:flex lg:col-span-4 justify-end">
          <div className="bg-[#fff8f4]/90 backdrop-blur-md p-7 rounded-xl border border-[#d3c3bc]/60 max-w-xs shadow-md space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#d3c3bc]/40 pb-3">
              <span className="text-[10px] font-bold tracking-[0.15em] text-[#7a5649] uppercase">
                CATATAN PENJELAJAH
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#7a5649]" />
            </div>
            <p className="font-['Playfair_Display',serif] text-xl text-[#231006] italic leading-snug">
              &ldquo;Bukan sekadar berpindah tempat, melainkan meresapi detak jantung tanah air.&rdquo;
            </p>
            <div className="pt-2 border-t border-[#d3c3bc]/30">
              <p className="text-sm text-[#231006] font-bold">Ekspedisi Terkurasi 2026</p>
              <p className="text-xs text-[#81746e]">38 Sanctuary Budaya &amp; Alam Bahari</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
