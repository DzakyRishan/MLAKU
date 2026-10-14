'use client';

import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#231006] text-[#fff8f4] border-t border-[#3a2418]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-24 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="inline-flex items-baseline space-x-2">
              <span className="font-['Playfair_Display',serif] text-3xl font-bold tracking-tight text-[#fff8f4]">
                MLAKU
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#fdcdbc]">
                JELAJAHI NUSANTARA
              </span>
            </a>

            <p className="text-xs sm:text-sm text-[#aa8979] leading-relaxed max-w-sm">
              Platform kurasi perjalanan eksklusif dan slow luxury di Nusantara. Merayakan keberagaman hayati, kearifan adat leluhur, dan kelestarian tanah air.
            </p>

            <div className="text-xs text-[#81746e]">
              Jakarta &middot; Denpasar &middot; Labuan Bajo
            </div>
          </div>

          {/* Col 2: Destinasi */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#fdcdbc]">
              Destinasi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#aa8979]">
              <li>
                <a href="#destinasi" className="hover:text-white transition-colors">
                  Bromo &amp; Jawa Timur
                </a>
              </li>
              <li>
                <a href="#destinasi" className="hover:text-white transition-colors">
                  Labuan Bajo &amp; Komodo
                </a>
              </li>
              <li>
                <a href="#destinasi" className="hover:text-white transition-colors">
                  Sumba &amp; Lembah Warinding
                </a>
              </li>
              <li>
                <a href="#destinasi" className="hover:text-white transition-colors">
                  Raja Ampat &amp; Misool
                </a>
              </li>
              <li>
                <a href="#destinasi" className="hover:text-white transition-colors">
                  Sidemen &amp; Karangasem Bali
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Pengalaman */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#fdcdbc]">
              Pengalaman
            </h4>
            <ul className="space-y-2.5 text-xs text-[#aa8979]">
              <li>
                <a href="#paket" className="hover:text-white transition-colors">
                  Liveaboard Phinisi
                </a>
              </li>
              <li>
                <a href="#minat" className="hover:text-white transition-colors">
                  Warisan Kain &amp; Tenun
                </a>
              </li>
              <li>
                <a href="#minat" className="hover:text-white transition-colors">
                  Ritual Suci &amp; Melukat
                </a>
              </li>
              <li>
                <a href="#cerita" className="hover:text-white transition-colors">
                  Jurnal Penjelajah
                </a>
              </li>
              <li>
                <a href="#kenapa-mlaku" className="hover:text-white transition-colors">
                  Slow Travel Manifesto
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#fdcdbc]">
              Warta &amp; Surat Nusantara
            </h4>
            <p className="text-xs text-[#aa8979] leading-relaxed">
              Dapatkan esai terpilih, kalender upacara adat sakral, dan undangan ekspedisi terbatas langsung di surel kamu.
            </p>

            {subscribed ? (
              <div className="bg-[#3a2418] p-3.5 rounded-xl border border-[#7a5649] flex items-center space-x-2 text-xs text-[#fdcdbc]">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Terima kasih telah bergabung dalam lingkaran MLAKU.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center bg-[#3a2418] rounded-xl p-1 border border-[#7a5649]/60 focus-within:border-[#fdcdbc]">
                  <Mail className="w-4 h-4 text-[#aa8979] ml-3 shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Alamat surel kamu..."
                    className="w-full bg-transparent text-xs text-white placeholder-[#aa8979] px-3 py-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#fdcdbc] hover:bg-[#ffdbcf] text-[#231006] text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Langganan
                  </button>
                </div>
                <p className="text-[10px] text-[#aa8979]">
                  Kami menjunjung privasi tanpa surel sampah komersial.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3a2418] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#aa8979] gap-4">
          <p>© 2026 MLAKU — PT Jelajah Sukma Nusantara. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Etika &amp; Konservasi
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Syarat &amp; Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
