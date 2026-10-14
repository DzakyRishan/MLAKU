'use client';

import React from 'react';
import Image from 'next/image';
import { X, Clock, Share2, Bookmark } from 'lucide-react';
import { StoryItem } from '@/types';

interface StoryModalProps {
  story: StoryItem | null;
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: StoryModalProps) {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#231006]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#fff8f4] w-full max-w-2xl max-h-[90vh] rounded-3xl border border-[#d3c3bc] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d3c3bc]/40 flex items-center justify-between bg-[#faf2ed]">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold tracking-wider text-[#7a5649] uppercase bg-[#fff8f4] px-2.5 py-1 rounded-full border border-[#d3c3bc]/40">
              {story.category}
            </span>
            <span className="text-xs text-[#81746e]">· {story.readTime}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#81746e] hover:text-[#231006] hover:bg-[#f4ece7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-[#faf2ed]">
            <Image
              src={story.image}
              alt={story.imageAlt}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs text-[#7a5649] font-medium tracking-wide">
              Oleh {story.author}
            </p>
            <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl text-[#231006] leading-tight">
              {story.title}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#4f443f] leading-relaxed font-serif">
            <p className="font-bold text-[#231006] text-base italic leading-relaxed border-l-2 border-[#7a5649] pl-4">
              &ldquo;{story.excerpt}&rdquo;
            </p>

            <p>{story.fullContent}</p>

            <p>
              Di MLAKU, kami meyakini bahwa narasi-narasi seperti inilah yang memberi jiwa pada setiap perjalanan. Bukan sekadar mengejar foto pemandangan, namun membuka ruang untuk percakapan jujur dengan tanah dan manusianya.
            </p>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-[#d3c3bc]/40 flex items-center justify-between text-xs text-[#81746e]">
            <span>Bagikan cerita ini ke sesama penjelajah</span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: story.title,
                    text: story.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan cerita tersalin!');
                }
              }}
              className="flex items-center space-x-1.5 text-[#231006] hover:text-[#7a5649] font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span>Salin Tautan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
