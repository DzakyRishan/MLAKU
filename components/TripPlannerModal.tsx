'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Compass,
  Calendar,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRegion?: string;
}

interface GeneratedPlan {
  title: string;
  tagline: string;
  recommendedSeason: string;
  sanctuaryLodge: string;
  highlights: string[];
  dailyItinerary: {
    day: string;
    title: string;
    description: string;
  }[];
  culturalEthics: string;
  culinaryNote: string;
}

export default function TripPlannerModal({
  isOpen,
  onClose,
  initialRegion,
}: TripPlannerModalProps) {
  const [region, setRegion] = useState(initialRegion || 'Labuan Bajo & Flores');
  const [duration, setDuration] = useState('4 Hari 3 Malam');
  const [pace, setPace] = useState('Seimbang & Kaya Cerita');
  const [travelerCount, setTravelerCount] = useState(2);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    'Budaya & Adat',
    'Lanskap Fajar & Senja',
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const focusOptions = [
    'Budaya & Adat',
    'Lanskap Fajar & Senja',
    'Kain Tenun & Kerajinan',
    'Gastronomi Lokal',
    'Bahari & Snorkeling',
    'Retreat & Hening',
  ];

  const toggleFocus = (item: string) => {
    if (selectedFocus.includes(item)) {
      setSelectedFocus(selectedFocus.filter((f) => f !== item));
    } else {
      setSelectedFocus([...selectedFocus, item]);
    }
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setPlan(null);

    try {
      const res = await fetch('/api/gemini/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region,
          duration,
          pace,
          travelerCount,
          focus: selectedFocus,
        }),
      });

      const data = await res.json();
      if (data.plan) {
        setPlan(data.plan);
      }
    } catch (err) {
      console.error('Failed to generate plan', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!plan) return;
    const text = `MLAKU — Rencana Perjalanan: ${plan.title}\n${plan.tagline}\n\nMusim: ${plan.recommendedSeason}\nPenginapan: ${plan.sanctuaryLodge}\n\nItinerary:\n${plan.dailyItinerary.map((d) => `${d.day} - ${d.title}\n${d.description}`).join('\n\n')}\n\nEtika: ${plan.culturalEthics}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#231006]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fff8f4] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-[#d3c3bc] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#d3c3bc]/40 flex items-center justify-between bg-[#faf2ed]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3a2418] text-[#fff8f4] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-['Playfair_Display',serif] text-xl font-semibold text-[#231006]">
                MLAKU AI Trip Planner
              </h2>
              <p className="text-xs text-[#7a5649]">
                Rancang rute slow travel &amp; narasi budaya Nusantara khusus untukmu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#81746e] hover:text-[#231006] hover:bg-[#f4ece7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!plan ? (
            /* Input Form */
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Region */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Destinasi Pilihan
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-[#faf2ed] text-xs sm:text-sm text-[#1e1b18] p-3 rounded-xl border border-[#d3c3bc]/50 focus:border-[#7a5649] focus:outline-none"
                  >
                    <option value="Labuan Bajo & Flores">Labuan Bajo &amp; Flores (NTT)</option>
                    <option value="Gunung Bromo & Semeru">Gunung Bromo &amp; Semeru (Jawa Timur)</option>
                    <option value="Sumba Tanah Humba">Sumba — Bukit Warinding &amp; Adat (NTT)</option>
                    <option value="Raja Ampat Misool">Raja Ampat &amp; Misool (Papua Barat)</option>
                    <option value="Bali Lembah Sidemen">Sidemen &amp; Karangasem (Bali Timur)</option>
                    <option value="Tana Toraja Kuno">Tana Toraja — Rumah Tongkonan (Sulawesi)</option>
                  </select>
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Durasi Hari
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#faf2ed] text-xs sm:text-sm text-[#1e1b18] p-3 rounded-xl border border-[#d3c3bc]/50 focus:border-[#7a5649] focus:outline-none"
                  >
                    <option value="3 Hari 2 Malam">3 Hari 2 Malam (Akhir Pekan Singkat)</option>
                    <option value="4 Hari 3 Malam">4 Hari 3 Malam (Ideal Terlengkap)</option>
                    <option value="5 Hari 4 Malam">5 Hari 4 Malam (Mendalam &amp; Hening)</option>
                    <option value="7 Hari 6 Malam">7 Hari 6 Malam (Grand Expedition)</option>
                  </select>
                </div>
              </div>

              {/* Pace & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Ritme Perjalanan (Pace)
                  </label>
                  <select
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                    className="w-full bg-[#faf2ed] text-xs sm:text-sm text-[#1e1b18] p-3 rounded-xl border border-[#d3c3bc]/50 focus:border-[#7a5649] focus:outline-none"
                  >
                    <option value="Santai & Meditatif">Slow &amp; Meditatif (Banyak Ruang Sunyi)</option>
                    <option value="Seimbang & Kaya Cerita">Seimbang &amp; Kaya Cerita (Rekomendasi)</option>
                    <option value="Petualangan Aktif & Fajar">Petualangan Aktif &amp; Trekking Fajar</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                    Jumlah Penjelajah
                  </label>
                  <div className="flex items-center space-x-3 bg-[#faf2ed] p-2 rounded-xl border border-[#d3c3bc]/50">
                    {[1, 2, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTravelerCount(num)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          travelerCount === num
                            ? 'bg-[#3a2418] text-[#fff8f4]'
                            : 'text-[#4f443f] hover:bg-[#f4ece7]'
                        }`}
                      >
                        {num === 1 ? 'Solo' : `${num} Org`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Focus Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#231006] uppercase tracking-wider">
                  Fokus Pengalaman (Bisa Pilih Lebih Dari Satu)
                </label>
                <div className="flex flex-wrap gap-2">
                  {focusOptions.map((opt) => {
                    const isSelected = selectedFocus.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleFocus(opt)}
                        className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#3a2418] text-[#fff8f4] border-[#3a2418] font-semibold'
                            : 'bg-[#faf2ed] text-[#4f443f] border-[#d3c3bc]/50 hover:bg-[#f4ece7]'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleGeneratePlan}
                disabled={isLoading}
                className="w-full bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] py-4 rounded-xl font-semibold text-xs tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menenun Rencana Bersama AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Rancang Rute Eksklusif Ini</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Generated Itinerary Result */
            <div className="space-y-6">
              <div className="bg-[#faf2ed] p-6 rounded-2xl border border-[#d3c3bc]/50 space-y-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#7a5649] uppercase">
                  HASIL KURASI ITINERARY
                </span>
                <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl text-[#231006]">
                  {plan.title}
                </h3>
                <p className="text-sm italic text-[#7a5649]">{plan.tagline}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-[#4f443f] border-t border-[#d3c3bc]/30">
                  <div>
                    <span className="font-bold text-[#231006]">Musim Dianjurkan:</span>{' '}
                    {plan.recommendedSeason}
                  </div>
                  <div>
                    <span className="font-bold text-[#231006]">Karakter Suaka:</span>{' '}
                    {plan.sanctuaryLodge}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#231006]">
                  Sorotan Perjalanan
                </h4>
                <ul className="space-y-1.5">
                  {plan.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-[#4f443f] flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7a5649] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day by Day */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#231006]">
                  Runtutan Narasi Harian
                </h4>
                <div className="space-y-3">
                  {plan.dailyItinerary.map((d, i) => (
                    <div
                      key={i}
                      className="bg-[#fff8f4] p-4 rounded-xl border border-[#d3c3bc]/40 space-y-1.5"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold bg-[#faf2ed] text-[#7a5649] px-2 py-0.5 rounded border border-[#d3c3bc]/40">
                          {d.day}
                        </span>
                        <h5 className="font-['Playfair_Display',serif] text-sm font-semibold text-[#231006]">
                          {d.title}
                        </h5>
                      </div>
                      <p className="text-xs text-[#4f443f] leading-relaxed pl-1">
                        {d.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural & Culinary Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#faf2ed] border border-[#d3c3bc]/30 space-y-1">
                  <span className="font-bold text-[#231006]">Etika &amp; Tabu Adat:</span>
                  <p className="text-[#4f443f]">{plan.culturalEthics}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#faf2ed] border border-[#d3c3bc]/30 space-y-1">
                  <span className="font-bold text-[#231006]">Rekomendasi Kuliner:</span>
                  <p className="text-[#4f443f]">{plan.culinaryNote}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-[#faf2ed] hover:bg-[#f4ece7] text-[#231006] py-3 rounded-xl text-xs font-semibold tracking-wider border border-[#d3c3bc]/60 transition-colors flex items-center justify-center space-x-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Tersalin ke Clipboard' : 'Salin Detail Rencana'}</span>
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Halo tim kurator MLAKU, saya ingin mendiskusikan itinerary kurasi AI untuk ${region}: "${plan.title}". Mohon informasi ketersediaan slot private trip.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] py-3 rounded-xl text-xs font-semibold tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasikan via WhatsApp</span>
                </a>

                <button
                  onClick={() => setPlan(null)}
                  className="sm:w-auto px-4 py-3 text-xs text-[#81746e] hover:text-[#231006] transition-colors"
                >
                  Ubah Parameter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
