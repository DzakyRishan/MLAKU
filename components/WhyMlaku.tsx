'use client';

import React from 'react';
import { Leaf, Users2, Shield, Sparkles } from 'lucide-react';

export default function WhyMlaku() {
  const pillars = [
    {
      title: 'Kurasi Etis & Regeneratif',
      desc: 'Setiap perjalanan menyumbang langsung pada konservasi alam dan kelestarian tenun serta desa adat setempat.',
      icon: Leaf,
    },
    {
      title: 'Budayawan & Pramuwisata Indigenous',
      desc: 'Dipandu oleh putra-putri daerah yang memahami tabu adat, mitologi leluhur, serta jalur rahasia tanpa hiruk pikuk massal.',
      icon: Users2,
    },
    {
      title: 'Slow Luxury & Suaka Hening',
      desc: 'Prioritas pada kelompok privat kecil, eco-lodge ramah lingkungan, dan waktu luang untuk bernafas tanpa jadwal tergesa-gesa.',
      icon: Shield,
    },
    {
      title: 'Kecerdasan Buatan Terintegrasi',
      desc: 'Ditenagai AI cerdas yang memadukan data cuaca musim, kearifan kalender adat, dan preferensi personalmu.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="kenapa-mlaku" className="py-20 md:py-28 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 scroll-mt-20">
      <div className="bg-[#f4ece7] border border-[#d3c3bc]/60 rounded-3xl p-8 md:p-14 lg:p-16">
        <div className="max-w-3xl mb-12 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#7a5649] uppercase">
            FILOSOFI PERJALANAN KAMI
          </span>
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl text-[#231006] tracking-tight">
            Mengapa Melangkah Bersama MLAKU?
          </h2>
          <p className="text-sm sm:text-base text-[#4f443f] leading-relaxed">
            Dalam bahasa Jawa, &ldquo;M&apos;laku&rdquo; berarti berjalan kaki. Kami percaya bahwa keindahan Nusantara paling hakiki hanya dapat dirasakan ketika langkah kaki diperlambat dan hati dibuka untuk mendengar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#fff8f4] p-6 sm:p-7 rounded-2xl border border-[#d3c3bc]/50 space-y-4 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#faf2ed] text-[#3a2418] flex items-center justify-center">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display',serif] text-lg font-semibold text-[#231006]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4f443f] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
