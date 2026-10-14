'use client';

import React from 'react';
import {
  Compass,
  Mountain,
  Landmark,
  Trees,
  Sailboat,
  Utensils,
  Flower2,
  ArrowRight,
} from 'lucide-react';

interface TravelByInterestProps {
  onSelectInterest: (interestName: string) => void;
}

export default function TravelByInterest({ onSelectInterest }: TravelByInterestProps) {
  const interests = [
    {
      title: 'Petualangan Alam Bebas',
      count: '14 Destinasi',
      desc: 'Trekking kaldera vulkanik aktif, lembah ngarai, dan sabana purba.',
      icon: Mountain,
    },
    {
      title: 'Warisan Seni & Budaya',
      count: '22 Destinasi',
      desc: 'Menenun ikat bersama maestro, ritual adat kuno, dan arsitektur megalitikum.',
      icon: Landmark,
    },
    {
      title: 'Hutan Hujan & Satwa Liar',
      count: '9 Destinasi',
      desc: 'Menjumpai satwa endemik komodo, orangutan, dan flora langka Indonesia.',
      icon: Trees,
    },
    {
      title: 'Bahari & Wisata Pulau',
      count: '18 Destinasi',
      desc: 'Liveaboard Phinisi berlayar mengitari pulau tak berpenghuni dan terumbu karang.',
      icon: Sailboat,
    },
    {
      title: 'Cita Rasa Gastronomi',
      count: '16 Destinasi',
      desc: 'Kuliner warisan rempah, kopi sangrai tradisional, dan jamuan warga lokal.',
      icon: Utensils,
    },
    {
      title: 'Kebugaran Jiwa & Retreat',
      count: '11 Destinasi',
      desc: 'Ritual pembersihan diri melukat, meditasi lembah sunyi, dan herbal jamu.',
      icon: Flower2,
    },
  ];

  return (
    <section id="minat" className="py-20 md:py-28 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#7a5649] uppercase">
            <Compass className="w-4 h-4 text-[#7a5649]" />
            <span>Kategori Pengalaman</span>
          </div>
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl text-[#231006] tracking-tight">
            Jelajahi Berdasarkan Minat
          </h2>
          <p className="text-sm sm:text-base text-[#4f443f] max-w-xl">
            Setiap jiwa memiliki cara tersendiri dalam meresapi Nusantara. Temukan perjalanan yang paling selaras dengan panggilan hatimu.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {interests.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectInterest(item.title)}
              className="group text-left p-6 sm:p-7 rounded-2xl bg-[#fff8f4] hover:bg-[#faf2ed] border border-[#d3c3bc]/50 hover:border-[#7a5649] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="flex items-start justify-between w-full">
                <div className="w-12 h-12 rounded-xl bg-[#f4ece7] group-hover:bg-[#3a2418] text-[#3a2418] group-hover:text-[#fff8f4] flex items-center justify-center transition-colors duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-[#7a5649] uppercase bg-[#faf2ed] group-hover:bg-[#fff8f4] px-3 py-1 rounded-full border border-[#d3c3bc]/40">
                  {item.count}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-['Playfair_Display',serif] text-xl font-medium text-[#231006] group-hover:text-[#7a5649] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#4f443f] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center space-x-1.5 text-xs font-bold text-[#3a2418] group-hover:text-[#7a5649]">
                <span>Eksplorasi Minat Ini</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
