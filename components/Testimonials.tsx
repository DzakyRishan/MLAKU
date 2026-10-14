'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Aditya & Melati Danuarta',
      location: 'Jakarta Selatan',
      trip: 'Sumba Hidden & Wae Rebo (4D3N)',
      text: 'Malam di Mbaru Niang di atas awan mengubah cara pandang kami terhadap Indonesia. MLAKU mengatur segalanya dengan amat halus, tanpa kesan wisata komersial yang bising.',
      rating: 5,
    },
    {
      name: 'Dr. Sarah Jenkins & Marc',
      location: 'Melbourne, Australia',
      trip: 'Labuan Bajo Phinisi Liveaboard (4D3N)',
      text: 'The crew respected the marine sanctuary like their own home. Swimming with mantas at dawn and the private dining on deck under billions of stars was truly life-affirming.',
      rating: 5,
    },
    {
      name: 'Baskara Pratama',
      location: 'Surabaya',
      trip: 'Bromo Sunrise Escape (3D2N)',
      text: 'Jeep membawa kami ke bukit sepi yang sama sekali tidak ada turis lain. Minum kopi jahe sembari menatap kawah berasap tipis saat matahari terbit adalah momen yang magis.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#7a5649] uppercase">
          JEJAK REFLEKSI
        </span>
        <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl text-[#231006] tracking-tight">
          Suara Para Penjelajah
        </h2>
        <p className="text-sm text-[#4f443f]">
          Kisah nyata dari mereka yang telah melangkah menyusuri relung terindah tanah air.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-[#fff8f4] border border-[#d3c3bc]/50 rounded-2xl p-7 space-y-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#7a5649] text-[#7a5649]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#d3c3bc]/60" />
              </div>

              <p className="font-['Playfair_Display',serif] text-base sm:text-lg text-[#231006] italic leading-relaxed">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#d3c3bc]/30 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#231006]">{rev.name}</p>
                <p className="text-[11px] text-[#81746e]">{rev.trip}</p>
              </div>
              <div className="flex items-center space-x-1 text-[#7a5649] text-[10px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terverifikasi</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
