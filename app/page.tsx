'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchDiscovery from '@/components/SearchDiscovery';
import CuratedDestinations from '@/components/CuratedDestinations';
import PopularPackages from '@/components/PopularPackages';
import TravelByInterest from '@/components/TravelByInterest';
import NusantaraStories from '@/components/NusantaraStories';
import WhyMlaku from '@/components/WhyMlaku';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import TripPlannerModal from '@/components/TripPlannerModal';
import PackageDrawer from '@/components/PackageDrawer';
import StoryModal from '@/components/StoryModal';
import SavedBookmarksDrawer from '@/components/SavedBookmarksDrawer';
import UserTripsModal from '@/components/UserTripsModal';
import InquiryModal from '@/components/InquiryModal';
import AuthModal, { AuthMode } from '@/components/AuthModal';
import { PACKAGES } from '@/lib/data';
import { DestinationItem, PackageItem, StoryItem } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { fetchUserBookmarks, syncUserBookmark, deleteUserBookmark } from '@/lib/db';

export default function Home() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Akun admin langsung diarahkan ke halaman admin
  useEffect(() => {
    if (!authLoading && isAdmin) router.replace('/admin');
  }, [authLoading, isAdmin, router]);

  // Modal & Drawer states
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [plannerInitialRegion, setPlannerInitialRegion] = useState('');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isUserTripsOpen, setIsUserTripsOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState<{
    destinationTitle?: string;
    packageTitle?: string;
  }>({});

  // Auth modal & aksi yang menunggu login (mis. Konsultasi Rute)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [pendingInquiry, setPendingInquiry] = useState<{
    destinationTitle: string;
    packageTitle?: string;
  } | null>(null);

  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  // Bookmarked destinations
  const [savedIds, setSavedIds] = useState<string[]>(['bromo', 'labuan-bajo']);

  // Fetch Firestore bookmarks when logged in
  useEffect(() => {
    if (user) {
      fetchUserBookmarks(user.uid)
        .then((items) => {
          if (items && items.length > 0) {
            setSavedIds(items.map((i) => i.destinationId));
          }
        })
        .catch((err) => {
          console.warn('Could not load user bookmarks from cloud:', err);
        });
    }
  }, [user]);

  // Setelah login berhasil, lanjutkan ke Konsultasi Rute yang tertunda
  useEffect(() => {
    if (user && pendingInquiry) {
      setInquiryContext({
        destinationTitle: pendingInquiry.destinationTitle,
        packageTitle: pendingInquiry.packageTitle,
      });
      setIsInquiryOpen(true);
      setPendingInquiry(null);
    }
  }, [user, pendingInquiry]);

  // Batalkan aksi tertunda jika modal login ditutup tanpa login
  useEffect(() => {
    if (!isAuthOpen && !user) setPendingInquiry(null);
  }, [isAuthOpen, user]);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Semua Wilayah');
  const [selectedStyle, setSelectedStyle] = useState('Semua Gaya');

  const toggleBookmark = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      // Sync with Firestore if logged in
      if (user) {
        if (!exists) {
          syncUserBookmark(user.uid, {
            destinationId: id,
            title: id.replace('-', ' ').toUpperCase(),
          }).catch((e) => console.warn('Bookmark sync note:', e));
        }
      }
      return updated;
    });
  };

  const handleSelectDestination = (dest: DestinationItem) => {
    if (dest.packageKey && PACKAGES[dest.packageKey]) {
      setSelectedPackage(PACKAGES[dest.packageKey]);
    } else {
      setPlannerInitialRegion(dest.title);
      setIsPlannerOpen(true);
    }
  };

  const handleSelectInterest = (interestName: string) => {
    setSearchQuery(interestName.split(' ')[0]);
    const el = document.getElementById('destinasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = () => {
    const el = document.getElementById('destinasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openInquiryFor = (destTitle: string, pkgTitle?: string) => {
    if (!user) {
      setPendingInquiry({ destinationTitle: destTitle, packageTitle: pkgTitle });
      openAuth('login');
      return;
    }
    setInquiryContext({ destinationTitle: destTitle, packageTitle: pkgTitle });
    setIsInquiryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f4] text-[#1e1b18]">
      {/* Navigation */}
      <Navbar
        onOpenPlanner={() => {
          setPlannerInitialRegion('');
          setIsPlannerOpen(true);
        }}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenUserTrips={() => setIsUserTripsOpen(true)}
        onOpenInquiry={() => openInquiryFor('Labuan Bajo & Flores', 'Eksplorasi Pribadi')}
        onOpenAuth={openAuth}
        savedCount={savedIds.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPlanner={() => {
            setPlannerInitialRegion('');
            setIsPlannerOpen(true);
          }}
        />

        {/* Discovery & Search Filter Bar */}
        <SearchDiscovery
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Curated Destinations Bento Grid */}
        <CuratedDestinations
          onSelectDestination={handleSelectDestination}
          savedIds={savedIds}
          onToggleBookmark={toggleBookmark}
          activeFilterRegion={selectedRegion}
        />

        {/* Popular Packages Section */}
        <PopularPackages
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
        />

        {/* Travel By Interest */}
        <TravelByInterest onSelectInterest={handleSelectInterest} />

        {/* Nusantara Stories */}
        <NusantaraStories onSelectStory={(story) => setSelectedStory(story)} />

        {/* Why Mlaku & Philosophy */}
        <WhyMlaku />

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <TripPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        initialRegion={plannerInitialRegion}
      />

      <PackageDrawer
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />

      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      <SavedBookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedIds={savedIds}
        onRemoveBookmark={(id) => toggleBookmark(id)}
        onSelectDestination={handleSelectDestination}
      />

      {/* User Trips Modal */}
      <UserTripsModal
        isOpen={isUserTripsOpen}
        onClose={() => setIsUserTripsOpen(false)}
        onOpenNewInquiry={() => openInquiryFor('Nusantara', 'Rute Baru')}
      />

      {/* Bespoke Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        destinationTitle={inquiryContext.destinationTitle}
        packageTitle={inquiryContext.packageTitle}
      />

      {/* Login / Register Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={() => setIsAuthOpen(false)}
        notice={pendingInquiry ? 'Masuk dulu untuk melanjutkan konsultasi rute.' : undefined}
      />
    </div>
  );
}
