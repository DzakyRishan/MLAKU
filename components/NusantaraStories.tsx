'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { STORIES } from '@/lib/data';
import { StoryItem } from '@/types';

interface NusantaraStoriesProps {
  onSelectStory: (story: StoryItem) => void;
}

export default function NusantaraStories({ onSelectStory }: NusantaraStoriesProps) {
  return (
    <section id="cerita" className="py-20 md:py-28 bg-[#faf2ed] border-t border-[#d3c3bc]/30 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#7a5649] uppercase">
              <BookOpen className="w-4 h-4 text-[#7a5649]" />
              <span>Jurnal Penjelajah</span>
            </div>
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl text-[#231006] tracking-tight">
              Cerita Nusantara
            </h2>
            <p className="text-sm sm:text-base text-[#4f443f] max-w-xl">
              Kumpulan catatan lapangan, refleksi budaya, dan narasi dari para penjelajah serta penjaga kearifan lokal di pelosok negeri.
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="group bg-[#fff8f4] rounded-2xl overflow-hidden border border-[#d3c3bc]/50 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#faf2ed]">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#fff8f4]/90 backdrop-blur-md text-[#231006] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-2xs">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] text-[#81746e]">
                    <Clock className="w-3 h-3 text-[#7a5649]" />
                    <span>{story.readTime}</span>
                    <span>·</span>
                    <span className="font-medium text-[#4f443f]">{story.author}</span>
                  </div>

                  <h3 className="font-['Playfair_Display',serif] text-lg font-medium text-[#231006] group-hover:text-[#7a5649] transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-[#4f443f] line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-5 pt-2 border-t border-[#d3c3bc]/30 flex items-center justify-between text-xs font-bold text-[#3a2418] group-hover:text-[#7a5649]">
                <span>Baca Narasi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
