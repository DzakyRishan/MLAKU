'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  Inbox,
  LogOut,
  MessageSquare,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { InquiryItem } from '@/types';
import { fetchAllInquiries, updateInquiryStatus } from '@/lib/db';
import { useAuth } from '@/lib/auth-context';
import AuthModal, { AuthMode } from '@/components/AuthModal';

type Status = InquiryItem['status'];

const STATUS_META: Record<Status, { label: string; badge: string }> = {
  pending: { label: 'Menunggu', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  reviewed: { label: 'Ditinjau', badge: 'bg-sky-100 text-sky-800 border-sky-300' },
  confirmed: { label: 'Dikonfirmasi', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  cancelled: { label: 'Dibatalkan', badge: 'bg-rose-100 text-rose-800 border-rose-300' },
};

export default function AdminPage() {
  const { user, isAdmin, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | Status>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [curatorNotes, setCuratorNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchAllInquiries();
      setInquiries(data);
      const notes: Record<string, string> = {};
      data.forEach((i) => {
        if (i.adminNotes) notes[i.id] = i.adminNotes;
      });
      setCuratorNotes(notes);
    } catch (err) {
      console.error('Failed to load inquiries for admin:', err);
      setError(
        'Gagal memuat data. Pastikan aturan Firestore sudah dipublikasikan dan Anda login dengan akun Google admin.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    fetchAllInquiries()
      .then((data) => {
        if (cancelled) return;
        setInquiries(data);
        const notes: Record<string, string> = {};
        data.forEach((i) => {
          if (i.adminNotes) notes[i.id] = i.adminNotes;
        });
        setCuratorNotes(notes);
        setIsLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load inquiries for admin:', err);
        setError(
          'Gagal memuat data. Pastikan aturan Firestore sudah dipublikasikan dan Anda login dengan akun Google admin.'
        );
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  const handleStatusChange = async (id: string, status: Status) => {
    setUpdatingId(id);
    try {
      await updateInquiryStatus(id, status, curatorNotes[id]);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (err) {
      console.error('Error updating inquiry status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setUpdatingId(id);
    try {
      const current = inquiries.find((i) => i.id === id);
      if (current) await updateInquiryStatus(id, current.status, curatorNotes[id] || '');
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = useMemo(
    () => ({
      total: inquiries.length,
      pending: inquiries.filter((i) => i.status === 'pending').length,
      reviewed: inquiries.filter((i) => i.status === 'reviewed').length,
      confirmed: inquiries.filter((i) => i.status === 'confirmed').length,
    }),
    [inquiries]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return inquiries.filter((i) => {
      const okStatus = filterStatus === 'all' || i.status === filterStatus;
      const okSearch =
        i.userName.toLowerCase().includes(q) ||
        i.userEmail.toLowerCase().includes(q) ||
        i.destinationTitle.toLowerCase().includes(q);
      return okStatus && okSearch;
    });
  }, [inquiries, filterStatus, searchQuery]);

  const shell = 'min-h-screen bg-[#fff8f4] text-[#1e1b18]';

  // ---- Gerbang akses ----
  if (authLoading) {
    return (
      <div className={`${shell} flex items-center justify-center`}>
        <RefreshCw className="w-6 h-6 animate-spin text-[#7a5649]" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    const notLoggedIn = !user;
    return (
      <div className={`${shell} flex items-center justify-center p-4`}>
        <div className="w-full max-w-md bg-[#faf2ed] border border-[#d3c3bc]/60 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-full bg-[#2e150b] text-amber-400 mx-auto flex items-center justify-center">
            {notLoggedIn ? <Sparkles className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          <h1 className="font-['Playfair_Display',serif] text-2xl font-semibold text-[#231006]">
            {notLoggedIn ? 'Masuk sebagai Admin' : 'Akses Khusus Administrator'}
          </h1>
          <p className="text-sm text-[#7a5649] leading-relaxed">
            {notLoggedIn
              ? 'Silakan masuk dengan akun Google administrator untuk membuka panel kurator.'
              : `Akun ${user?.email} tidak memiliki akses admin.`}
          </p>
          {notLoggedIn ? (
            <button
              onClick={() => {
                setAuthMode('login');
                setAuthOpen(true);
              }}
              className="w-full bg-[#3a2418] text-[#fff8f4] hover:bg-[#231006] py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Masuk
            </button>
          ) : (
            <button
              onClick={() => logout()}
              className="w-full bg-[#3a2418] text-[#fff8f4] hover:bg-[#231006] py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Ganti Akun
            </button>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7a5649] hover:text-[#231006]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
          </Link>
        </div>
        <AuthModal
          isOpen={authOpen}
          mode={authMode}
          onModeChange={setAuthMode}
          onClose={() => setAuthOpen(false)}
          notice="Gunakan akun Google admin untuk mengakses panel."
        />
      </div>
    );
  }

  // ---- Dashboard ----
  const statCards = [
    { label: 'Total Konsultasi', value: counts.total, hint: 'Seluruh rekaman tersimpan', icon: Inbox, tone: 'bg-[#faf2ed] border-[#d3c3bc]/50 text-[#231006]', sub: 'text-[#81746e]' },
    { label: 'Menunggu Respons', value: counts.pending, hint: 'Perlu tindak lanjut kurator', icon: Clock, tone: 'bg-amber-50/70 border-amber-200 text-amber-900', sub: 'text-amber-700' },
    { label: 'Ditinjau', value: counts.reviewed, hint: 'Sedang diproses', icon: Eye, tone: 'bg-sky-50/70 border-sky-200 text-sky-900', sub: 'text-sky-700' },
    { label: 'Terkonfirmasi', value: counts.confirmed, hint: 'Jadwal resmi terbit', icon: CheckCircle2, tone: 'bg-emerald-50/70 border-emerald-200 text-emerald-900', sub: 'text-emerald-700' },
  ];

  return (
    <div className={shell}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#fff8f4]/95 backdrop-blur-md border-b border-[#d3c3bc]/40 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
          <Link href="/admin" className="flex items-baseline space-x-2">
            <span className="font-['Playfair_Display',serif] text-3xl font-semibold tracking-tight text-[#231006]">
              MLAKU
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#7a5649] hidden sm:inline-block">
              PANEL KURATOR
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline text-xs text-[#7a5649] truncate max-w-[200px]">
              {user.email}
            </span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
              ADMIN
            </span>
            <button
              onClick={async () => {
                await logout();
                router.push('/');
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-full transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-5 md:px-10 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-semibold text-[#231006]">
              Panel Kurator &amp; Administrator
            </h1>
            <p className="mt-1 text-sm text-[#7a5649]">
              Kelola konsultasi perjalanan, status reservasi, dan catatan kurator.
            </p>
          </div>
          <button
            onClick={loadData}
            className="flex items-center gap-2 bg-[#3a2418] text-[#fff8f4] hover:bg-[#231006] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors shadow-sm shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Segarkan
          </button>
        </div>

        {/* Stats */}
        <section aria-label="Ringkasan" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map(({ label, value, hint, icon: Icon, tone, sub }) => (
            <div
              key={label}
              className={`p-4 sm:p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md ${tone}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
                <Icon className="w-4 h-4 opacity-70" />
              </div>
              <div className="text-3xl font-bold mt-2">{value}</div>
              <span className={`text-[11px] ${sub}`}>{hint}</span>
            </div>
          ))}
        </section>

        {/* Filters */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'pending', 'reviewed', 'confirmed', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-xs px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  filterStatus === st
                    ? 'bg-[#3a2418] text-[#fff8f4]'
                    : 'bg-[#faf2ed] text-[#4f443f] hover:bg-[#f4ece7] border border-[#d3c3bc]/40'
                }`}
              >
                {st === 'all' ? 'Semua' : STATUS_META[st].label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#81746e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, email, destinasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#faf2ed] border border-[#d3c3bc]/50 rounded-xl focus:outline-none focus:border-[#7a5649]"
            />
          </div>
        </section>

        {error && (
          <p role="alert" className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {/* List */}
        <section className="space-y-4">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#7a5649] mx-auto" />
              <p className="text-xs text-[#7a5649]">Memuat data reservasi dari Firestore...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center space-y-2 bg-[#faf2ed] rounded-3xl border border-[#d3c3bc]/40">
              <MessageSquare className="w-8 h-8 text-[#d3c3bc] mx-auto" />
              <p className="text-sm font-semibold text-[#231006]">Tidak ada data konsultasi</p>
              <p className="text-xs text-[#7a5649]">
                Permintaan perjalanan baru dari tamu akan muncul di sini.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <article
                key={item.id}
                className="bg-[#faf2ed] p-5 rounded-2xl border border-[#d3c3bc]/50 space-y-4 hover:border-[#7a5649]/60 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-[#231006]">
                        {item.destinationTitle}
                      </h3>
                      {item.packageTitle && (
                        <span className="text-[10px] font-semibold bg-[#3a2418] text-[#fff8f4] px-2 py-0.5 rounded">
                          {item.packageTitle}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#7a5649] mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span><strong>Tamu:</strong> {item.userName}</span>
                      <span><strong>Email:</strong> {item.userEmail}</span>
                      {item.userPhone && <span><strong>WA:</strong> {item.userPhone}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#7a5649]">Status:</span>
                    <select
                      value={item.status}
                      disabled={updatingId === item.id}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as Status)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${STATUS_META[item.status].badge}`}
                    >
                      {(Object.keys(STATUS_META) as Status[]).map((s) => (
                        <option key={s} value={s}>
                          {STATUS_META[s].label}
                        </option>
                      ))}
                    </select>
                    {item.userPhone && (
                      <a
                        href={`https://wa.me/${item.userPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Halo ${item.userName}, salam hangat dari MLAKU. Mengenai konsultasi perjalanan ke ${item.destinationTitle}...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors"
                        title="Hubungi via WhatsApp"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs bg-[#fff8f4] p-3 rounded-xl border border-[#d3c3bc]/30">
                  <div>
                    <span className="font-bold text-[#231006]">Tanggal Rencana:</span>{' '}
                    <span className="text-[#4f443f]">{item.travelDates || 'Fleksibel'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#231006]">Jumlah Tamu:</span>{' '}
                    <span className="text-[#4f443f]">{item.travelerCount || 2} Orang</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#231006]">Dibuat:</span>{' '}
                    <span className="text-[#4f443f]">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {item.notes && (
                  <div className="text-xs bg-[#fff8f4] p-3 rounded-xl border border-[#d3c3bc]/30">
                    <span className="font-bold text-[#231006]">Catatan Tamu:</span>
                    <p className="text-[#4f443f] mt-1 italic">&ldquo;{item.notes}&rdquo;</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Catatan internal kurator (mis. penawaran sudah dikirim via WA)..."
                    value={curatorNotes[item.id] ?? ''}
                    onChange={(e) => setCuratorNotes({ ...curatorNotes, [item.id]: e.target.value })}
                    className="flex-1 text-xs bg-[#fff8f4] border border-[#d3c3bc]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#7a5649]"
                  />
                  <button
                    onClick={() => handleSaveNotes(item.id)}
                    disabled={updatingId === item.id}
                    className="text-xs bg-[#3a2418] hover:bg-[#231006] text-[#fff8f4] px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    Simpan Catatan
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
