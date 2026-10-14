import { DestinationItem, PackageItem, StoryItem } from '@/types';

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'bromo',
    title: 'Gunung Bromo & Lautan Pasir',
    subtitle: 'LANSKAP VULKANIK',
    region: 'JAWA TIMUR',
    recommendation: '3 Hari 2 Malam',
    bestSeason: 'Mei – Oktober',
    colSpan: 'md:col-span-7',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCB3-EVnRH4J_XreHElowTk31p7c1q2Zz0--XB0DXwMvnECQETBbmz31_ZtBKMzbfqse7Xf1WaWMBsx-4p2N_UJTXvG8iAtuoK1YrXsJckE84QO6GumjZbJLc-_F2ECRfjfuz_YB4I21WtoOmDmBMngEMAqgVI5kPJB7PCKKSn6SXYVMYTyeofz8pSh488UMnGHYhJ7UE46305OZ6KpdI0CDhmEBNtWTJGsbDtKxcB5_hze76w8CupG',
    imageAlt: 'Breathtaking golden morning view of Mount Bromo caldera in East Java',
    description:
      'Saksikan kepulan asap suci kawah Bromo saat fajar menjemput Tengger, ditemani teh hangat rempah di punggung bukit sunyi.',
    tags: ['jawa', 'petualangan', 'bromo', 'santai'],
    packageKey: 'bromo',
  },
  {
    id: 'labuan-bajo',
    title: 'Labuan Bajo & Komodo',
    subtitle: 'KEPULAUAN PURBA',
    region: 'NUSA TENGGARA TIMUR',
    recommendation: '4 Hari 3 Malam',
    bestSeason: 'Liveaboard Luxury',
    colSpan: 'md:col-span-5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCG9EoqXqqmpEVkwk-8F0cVJKO3fikSuhhA6EdQuQMILaPBlyWZz5vtQHGwj2m-NcUIiNE2fmriLpsTli2FrTh-c0Gk6H4H4Yr54_l-tNBCZXssGC5AJ748QKoEX3qfc4UQ-iPkDRdaNv-nlw0mCWHRTfxmlAgk0LoOQ3_-B4QOLbhrPpsIM2oi-JCXUEEpMpyyye2Yty_nZhfvgR1xgZvbEzQMf2o8RTphOsERuIXupfUiRzdunXhC',
    imageAlt: 'Editorial elevated seascape of Padar Island in Labuan Bajo Komodo National Park',
    description:
      'Berlayar menembus gugusan pulau naga dengan Phinisi kayu tradisional sembari menikmati perairan kristal terumbu karang purba.',
    tags: ['ntt', 'bahari', 'labuan bajo', 'komodo', 'petualangan'],
    packageKey: 'labuan-bajo',
  },
  {
    id: 'sumba',
    title: 'Padang Sabana & Desa Adat',
    subtitle: 'WARISAN MEGALITIKUM',
    region: 'SUMBA',
    recommendation: '4 Hari 3 Malam',
    bestSeason: 'Sepanjang Tahun',
    colSpan: 'md:col-span-4',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJULSyNmm-6EOjAx24qxHNzDaRX90Yug_qYWvoAuNlD3QjpbDzmAB6SuTlHHvKTONtCJOSTTQ5XDDSO4YhV1x0QWllFXnt1BWLl4xVKlqFj9xg2-g1cybrXIvHsCUesbWKkyk9awri6_dt1ATr3xoB-yq2DQ0-oAGfpsrNq5I75Oy9WjWP9yawtg0TmF9eYl1U38bqXANAP9E8b6FwnEFmRdFC_9BfqBQCCYz41xtS_DTs-yIHPNk-',
    imageAlt: 'Traditional Sumba thatched roof village houses against rolling savanna hills',
    description:
      'Pertemuan antara kain tenun ikat warisan leluhur dan padang rumput tak berujung di Bukit Warinding.',
    tags: ['ntt', 'budaya', 'santai', 'sumba'],
    packageKey: 'sumba',
  },
  {
    id: 'raja-ampat',
    title: 'Kepulauan Karst Raja Ampat',
    subtitle: 'SUAKA BIODIVERSITAS',
    region: 'PAPUA BARAT',
    recommendation: '5 Hari 4 Malam',
    bestSeason: 'Oktober – April',
    colSpan: 'md:col-span-4',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBW_ykT5ivLQWLTXeU-x_YjyFDylFfFApZHjeo8U1bwUVUtV4C05hK_KuMfrTuBKx7l0b4N0m_5pn9yl9TrgYLml71gqfo1UKbzu7T2Gsmgpsyh29eEproyO0FzCe-0vr6j4ndWj0kew9awwS4Fp74CXpR-d204nN9TMGlvXslktRTawncAuMwGM_JEGv1SkGShWKFsPCLgfpw8UkiTR4oTUc3Hkf-QmkcyxNgHya88XuUPIf3xuxAb',
    imageAlt: 'Overhead aerial perspective of Raja Ampat turquoise lagoons and limestone karst',
    description:
      'Surga bawah laut terkaya di planet bumi dengan labirin laguna zamrud yang menghadirkan keheningan mutlak.',
    tags: ['papua', 'bahari', 'petualangan', 'raja ampat'],
    packageKey: 'labuan-bajo',
  },
  {
    id: 'bali',
    title: 'Sidemen & Lembah Tenang',
    subtitle: 'RETREAT SPIRITUAL',
    region: 'BALI TIMUR',
    recommendation: '5 Hari 4 Malam',
    bestSeason: 'Sepanjang Tahun',
    colSpan: 'md:col-span-4',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOys0yyEe_kxyFXsOUWJr_abRZA2s3LeknSDjb-LSeKR5608T-wEyZfZKU4Z96Zq3QEKLveFS-8oJbkngF4sMIhSVNkn4MpJuRP5HWrye7YOqf4x_qVqmASGBTUXm7_YP4wF0Cd7-d9eRO0XfGmuwL7OkPTwArJ4EDGRWBFDha4aZQwAycf5BnqN4t5wThdJU0RH3FIWkvID1D-L_HbzanqfJVofd8eXw9_xun9uQOb0-59XfMOsif',
    imageAlt: 'Serene morning mist rising over emerald green terraced rice fields in Sidemen Bali',
    description:
      'Menemukan kembali ritme nafas yang melambat di balik terasering padi kuno dan suaka spiritual Bali autentik.',
    tags: ['bali', 'santai', 'budaya', 'wellness', 'sidemen'],
    packageKey: 'bali',
  },
];

export const PACKAGES: Record<string, PackageItem> = {
  bromo: {
    id: 'bromo',
    title: 'Bromo Sunrise Escape',
    region: 'JAWA TIMUR · 3 HARI 2 MALAM',
    duration: '3 Hari 2 Malam',
    price: 'Rp1.499.000',
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Kurasi Eksklusif',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAES2e8kAluAa43OY0GfrwsiHohPzhvaj3rvDoX3p8i5vNhcUMpkHeCkzN3AmvY4dm6vhMEevXJLcNQgynHfZEuAYmdSmXpqRz4pe8Eoj9eCn_h-5SHX9w3iRKV4AdJV1j0Zf6smuNAM3TxOxLTJtyFYMFRL1Ntm8SjFISMjulYLuR-o0u0wtD7u4MujzMmpkMBvCQvvUevKem6Z0C8SR7peZZv9OvmkGMPuDCGboY13hIxow-KdTAs',
    imageAlt: 'Mount Bromo sunrise escape experience with travelers in warm light',
    features: [
      'Jeep Hardtop 4x4 Private',
      'Pemandu Ahli Budaya Tengger',
      'Boutique Lodge di Sukapura',
    ],
    description:
      'Menyusuri kaldera tengger di pagi buta, menyaksikan siluet Bromo dan Semeru saat matahari pertama merekah. Dilengkapi dengan sesi teh hangat rempah, piknik eksklusif di padang savana Teletubbies, dan kunjungan ramah tamah ke sesepuh Tengger.',
    itinerary: [
      {
        day: 'Hari 01',
        title: 'Penjemputan Malang / Surabaya & Perjalanan ke Lereng Sukapura',
        desc: 'Check-in boutique mountain lodge, jamuan makan malam kuliner khas rawon nguling dan teh serai hangat.',
      },
      {
        day: 'Hari 02',
        title: 'Fajar King Kong Hill & Kawah Vulkanik Berbisik',
        desc: 'Pemberangkatan Jeep 4x4 pukul 03.15 WIB, kopi hangat di bukit rahasia bebas keramaian, menunggang kuda Tengger.',
      },
      {
        day: 'Hari 03',
        title: 'Savana Lembah Jemplang & Pelepasan Kenangan',
        desc: 'Piknik artisanal pagi di savana rumput hijau sebelum diantar kembali menuju bandara.',
      },
    ],
    includes: [
      'Jeep Hardtop 4x4 Private selama di Bromo',
      'Tiket Masuk TNBTS & Donasi Konservasi Budaya',
      'Akomodasi Boutique Mountain Lodge 2 Malam',
      'Pemandu Ahli Budaya Lokal Tengger',
      'Dokumentasi Foto Profesional & Sesi Teh Hangat',
    ],
    excludes: [
      'Penerbangan ke Surabaya / Malang',
      'Pengeluaran Pribadi & Tipping Sukarela Pemandu',
    ],
  },
  'labuan-bajo': {
    id: 'labuan-bajo',
    title: 'Labuan Bajo & Komodo Expedition',
    region: 'NTT · 4 HARI 3 MALAM',
    duration: '4 Hari 3 Malam',
    price: 'Rp3.999.000',
    rating: 4.9,
    reviewsCount: 214,
    badge: 'Kurasi Eksklusif',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmVmuZEEO8jtL6tUmTCecbq2EIUUxw3TOzn_dhqW-RWqfs2gCrWENM8W8xXqsjqMTaOk4135PjhUu6b4KjYSrVa5t-Hs_35O-Es_vuPRmL2ZzV_WqzktHmAzqLg7qmKou5cyRe_6SpOZw15Vv-HnX7LhnVEHenfzxQRhS4ljiTyZEhFvln1MRNhwOl4042ZvIv20OYy2ErYnCBvhbvGfi8ybuPvfmPV6OsbYBxfZuFThRV0xqVW_QR',
    imageAlt: 'Luxury wooden Phinisi boat sailing through Komodo islands',
    features: [
      'Phinisi Cabin Ber-AC Private',
      'Snorkeling Manta Point & Padar',
      'Chef Kapal & Makanan Segar',
    ],
    description:
      'Menjelajahi keajaiban purba Kepulauan Komodo menggunakan kapal Phinisi kayu berstandar luxury. Berenang bersama pari manta raksasa di perairan toska jernih, mendaki puncak legendaris Pulau Padar saat fajar, dan menikmati hidangan laut segar setiap senja.',
    itinerary: [
      {
        day: 'Hari 01',
        title: 'Embarcasi Phinisi & Senja di Pulau Kelor',
        desc: 'Penyambutan minuman kelapa muda, briefing kelautan, trekking santai di bukit Kelor.',
      },
      {
        day: 'Hari 02',
        title: 'Padar Sunrise, Pink Beach & Penelusuran Komodo',
        desc: 'Trekking 800 anak tangga Padar, santap siang olahan laut di kapal, bertemu Varanus komodoensis dengan ranger ahli.',
      },
      {
        day: 'Hari 03',
        title: 'Manta Point, Taka Makassar & Pulau Siaba',
        desc: 'Snorkeling mengapung di perairan toska dan melihat penyu hijau berenang di karang lestari.',
      },
      {
        day: 'Hari 04',
        title: 'Gua Rangko Kristal & Pelepasan Bahari',
        desc: 'Berenang di danau air asin dalam gua sebelum transfer kembali ke Bandara Komodo.',
      },
    ],
    includes: [
      'Kamar Kabin Phinisi AC Private Ensuite Bathroom',
      'Fullboard Meals 4 Hari oleh Private Chef Kapal',
      'Peralatan Snorkeling & Life Jacket Premium',
      'Ranger Komodo & Pemandu Bahari Berlisensi',
      'Air Mineral & Kopi Flores Sepuasnya',
    ],
    excludes: [
      'Tiket Taman Nasional Komodo & Restribusi Daerah',
      'Tiket Pesawat ke Labuan Bajo',
    ],
  },
  sumba: {
    id: 'sumba',
    title: 'Sumba Hidden & Wae Rebo',
    region: 'NTT · 4 HARI 3 MALAM',
    duration: '4 Hari 3 Malam',
    price: 'Rp4.499.000',
    rating: 4.8,
    reviewsCount: 86,
    badge: 'Kurasi Eksklusif',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTXDs8_C4XRNJ29APuPqrHqTU2p4Jj58nvRzp34VDldL_JJM_IvLaKh-ZYhZ60J2yLRfBlk0Y_dKlOZfEniZogbV2j2ndVzFLoTaX64b2knzik24GD22DDGWzgajYY3_wwKUxQGZ2ZKCwGF06MPzj0O28uWL2u2HNH2CDuGX5TOHgj8QXD7d5kg0RkO7m-kJFy8bbGGbmBCbrl6I5dOEeigl_t2oO9scpnKtl3lzyl9nSacDqeXWFl',
    imageAlt: 'Conical houses of Wae Rebo village in the clouds',
    features: [
      'Bermalam di Mbaru Niang',
      'Ritual Adat Sambutan Kopi',
      'Savana Purukambera Sumba',
    ],
    description:
      'Perjalanan spiritual dan budaya melintasi padang sabana luas Pulau Sumba, desa megalitikum Prai Ijing, dan pendakian kabut menuju desa adat di atas awan Wae Rebo.',
    itinerary: [
      {
        day: 'Hari 01',
        title: 'Tiba di Tambolaka & Danau Weekuri',
        desc: 'Meresapi laguna zamrud air asin dan matahari tenggelam di tebing karang Mandorak.',
      },
      {
        day: 'Hari 02',
        title: 'Desa Adat Ratenggaro & Savana Warinding',
        desc: 'Menyaksikan rumah adat atap menara tinggi dan siluet kuda liar di padang rumput senja.',
      },
      {
        day: 'Hari 03',
        title: 'Perjalanan Menembus Flores & Trekking Wae Rebo',
        desc: 'Bermalam di rumah kerucut Mbaru Niang bersama tetua adat Manggarai dengan upacara Waelu.',
      },
      {
        day: 'Hari 04',
        title: 'Upacara Kopi Pagi & Kembali ke Labuan Bajo',
        desc: 'Meresapi kehidupan komunal sebelum kembali turun melalui lembah hutan hujan lebat.',
      },
    ],
    includes: [
      'Transportasi Darat 4x4 Private',
      'Inap di Rumah Adat Mbaru Niang Wae Rebo & Eco Resort',
      'Upacara Adat Waelu Penghormatan Leluhur',
      'Pemandu Etnografi Khusus & Porter Trekking',
      'Seluruh Santap Makanan Lokal Tradisional',
    ],
    excludes: [
      'Penerbangan Domestik',
      'Donasi Adat Sukarela & Belanja Tenun Pribadi',
    ],
  },
  bali: {
    id: 'bali',
    title: 'Bali Slow Living & Heritage',
    region: 'BALI · 5 HARI 4 MALAM',
    duration: '5 Hari 4 Malam',
    price: 'Rp3.499.000',
    rating: 4.9,
    reviewsCount: 152,
    badge: 'Kurasi Eksklusif',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBjMSrJC2149V8YerMyqIDpG4QeJZ6DeZpnT6RLLxHuUELbHQ2HkFM95kkCFg6LfHLZ1ZCThka41OkDtIcnYTt6flDcewbUPqq8FzAMif5AN0bcsuHrXZ2PVunFAl6L18DHJr2VwDZ-pkrN4i8ssCK7MNLnzHZEN5MQlP-E8ft56CiPtrsYjZspLHz8VoWJwQsfPwymI2_oyts6Jilzcuv6voYKwYVPVm6wu8wXGvrMdVoa-GJX9-1',
    imageAlt: 'Slow travel retreat sanctuary pavilion in Bali Sidemen',
    features: [
      'Sanctuary Villa di Sidemen',
      'Kelas Tenun Endek Bersama Maestro',
      'Ritual Melukat Suci di Tirta Empul',
    ],
    description:
      'Meninggalkan hiruk-pikuk untuk meresapi keanggunan Bali tempo dulu di lembah Sidemen. Mengikuti tradisi pembuatan kain endek, yoga fajar berlatar Gunung Agung, serta pembersihan jiwa di sumber air suci Tirta Empul.',
    itinerary: [
      {
        day: 'Hari 01',
        title: 'Tiba di Bali & Menuju Lembah Sunyi Sidemen',
        desc: 'Penyambutan canang sari dan teh jahe di villa bambu rancangan arsitektur ramah alam.',
      },
      {
        day: 'Hari 02',
        title: 'Kelas Tenun Bersama Maestro & Trekking Terasering',
        desc: 'Mempelajari filosofi warna alami tenun ikat langsung dari para ibu pengrajin desa.',
      },
      {
        day: 'Hari 03',
        title: 'Pura Lempuyang & Istana Air Tirta Gangga',
        desc: 'Kunjungan pagi sebelum keramaian datang, disusul makan siang tradisi megibung autentik.',
      },
      {
        day: 'Hari 04',
        title: 'Ritual Melukat Suci & Jamu Wellness Workshop',
        desc: 'Upacara pembersihan diri dipandu oleh pemangku adat di mata air alami Tirta Empul.',
      },
      {
        day: 'Hari 05',
        title: 'Meditasi Pagi & Perjalanan Kepulangan',
        desc: 'Santap pagi dengan panorama lembah sebelum kembali ke Bandara I Gusti Ngurah Rai.',
      },
    ],
    includes: [
      'Private Eco-Luxury Sanctuary Villa 4 Malam',
      'Pemandu Budaya Bali Berlisensi Resmi',
      'Seluruh Sesi Melukat & Perlengkapan Adat Lengkap',
      'Mobil Pribadi Ber-AC & Chauffeur Sopan',
      'Sarapan Organik Harian & 2x Makan Tradisi',
    ],
    excludes: [
      'Tiket Pesawat ke Denpasar',
      'Konsumsi Tambahan di Luar Program',
    ],
  },
};

export const STORIES: StoryItem[] = [
  {
    id: 'bromo-dawn',
    category: 'ESAI BUDAYA',
    readTime: '5 Menit Membaca',
    author: 'Raka Wirasena',
    title: 'Saat Bromo Terjaga Sebelum Fajar',
    excerpt:
      'Merekam doa-doa hening masyarakat suku Tengger di bibir kawah sebelum deru roda jip memecah ketenangan lautan pasir berbisik.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzI3WDV_VDP1wm6Z9-fm289LhgH4GddsuCl-nIaSQUvITxkJKy8V1yWXIfmJMS7yEI0LxpPENRe-ghfr1MKvsw2Nj00rGmYjXTeDmWQm5J6tfWF80ILCt8qqFHnQJiLDZqdlU5PdamlezxLTr_zFH7pWjxdGDZXRFodZ2EBrxFt7yCTZwjHEgfsgMBXWRTY7FKe9JXkJWpTIiG2V-fY_ucxF5dGf6a2L-DGzcC3FoHB4yknekAiNmi',
    imageAlt: 'Traveler wrapped in Tengger sarong at dawn looking into Bromo caldera',
    fullContent:
      'Kabut tipis melayang rendah di atas kaldera Tengger. Pukul tiga pagi, saat angin dingin menusuk hingga ke tulang, para sesepuh suku melangkah tenang tanpa alas kaki. Di tangan mereka, segenggam bunga edelweiss dan dupa wangi mengepul pelan. Keheningan ini bukan sekadar ketiadaan suara, melainkan bentuk dialog suci antara manusia dan Hyang Widhi yang bertahta di puncak Brahma.',
  },
  {
    id: 'bali-silence',
    category: 'REFLEKSI',
    readTime: '7 Menit Membaca',
    author: 'Ni Luh Anindita',
    title: 'Menemukan Sisi Hening Pulau Dewata',
    excerpt:
      'Menjauh dari keramaian pesisir selatan menuju desa-desa kuno di kaki Gunung Agung yang masih menjaga filsafat Tri Hita Karana secara murni.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPfUR96JH_mM935l3vxzD-kwYoaVXq_RqMA5sC0LApemVZnTTYXr8f6qnq7irVra4cN7yWH39Qt6aLp_nOR0yJBHz4nkuZGF77RoxviQn3IWWCbUQEkmqfkukhwG0uTXjj--timIaWAO2OYbWWmu7-8s27llgREf4HhiWEHS231EdTAR5K41vFFgFJnwD0R6AcGMfSUcQ7GwIEQwdpoWt2ocCaA6kOHA1CW-R9j_7GM8mFGdbU2ZF7',
    imageAlt: 'Balinese ancient stone gate covered in mountain morning mist',
    fullContent:
      'Bagi mereka yang rela menempuh perjalanan dua jam ke arah timur, Bali memperlihatkan wajah aslinya. Di Sidemen, suara air mengalir melalui sistem subak kuno menjadi pengantar tidur. Tidak ada lampu neon atau bising kendaraan; yang ada hanyalah bayang-bayang pohon kelapa dan aroma melati malam hari.',
  },
  {
    id: 'sumba-marapu',
    category: 'ETNOGRAFI',
    readTime: '6 Menit Membaca',
    author: 'Marapu Scholar',
    title: 'Hidup Selaras Alam di Tanah Sumba',
    excerpt:
      'Bagaimana kepercayaan megalitikum Marapu mengajarkan keseimbangan absolut antara manusia, batu kubur leluhur, dan kuda sandelwood.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAab7EbOvTKiK8cB-kx7T6BQJPAyhmf1r9B5mTA0BygS5JSmPGdfZgecVa9NMu5L2fo-qC6xKdW2s4utTLXj44fSTf70QWF77GcRUirNUvVceegT0qH5vWfl6lNpxN_79gFGnkucSY973yXRGGRMYT7PVSA7SrdHeXvIGy9LQsEihCOHvy1yn1Ph-U7ZME-xH1V8mZGeUdHiiNX8iwylKt3ka8XKcOJC36MsyJWNcUfjuCjBtnaHPwV',
    imageAlt: 'Artisan weaving natural dyed indigo ikat textile in Sumba',
    fullContent:
      'Setiap helai kain tenun ikat Sumba adalah lembaran buku sejarah. Diperlukan waktu hingga satu tahun untuk meramu pewarna alam dari lumpur, kulit akar, dan dedaunan sebelum benang pertama ditenun. Marapu menuntut kesabaran mutlak: tidak ada jalan pintas menuju keindahan yang sejati.',
  },
  {
    id: 'raja-ampat-world',
    category: 'KONSERVASI',
    readTime: '8 Menit Membaca',
    author: 'Dr. Hendrik Papare',
    title: 'Mengapa Raja Ampat Terasa Seperti Dunia Lain',
    excerpt:
      'Catatan ekspedisi perlindungan suaka laut Misool dan dedikasi penjaga adat Sasi laut dalam merawat kekayaan terumbu karang dunia.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4PKS1nLB2kunAqar_wnbBj906JKtSRqbS_Bhrz-x08LOltIJoo82lSuCKHyANu_6hUnGbI-0XqYKtAl1ftWxX5EfUKshuRdlD68eemK5ZTj2hp_nlLQw968V14e4w1Db9fzLVeRIKZVi92WleyfJQkLSVc_88rkPeFEthukcksU6qkV3nTPMxi2Npeoh3F99JBh1n6WM6rgRdqIiUGnA6YpRgHJ8p8fOaXaZ7ztFTlgevKNBA0Vq',
    imageAlt: 'Misool Raja Ampat coral reefs and turquoise waters',
    fullContent:
      'Ketika menundukkan kepala ke bawah permukaan air di Misool, waktu seolah berhenti. Ratusan spesies karang lunak dalam warna ungu elektrik dan jingga berdenyut pelan. Tradisi kearifan lokal Sasi—larangan mengambil hasil laut selama masa pemulihan—menjadi benteng pertahanan terbaik dunia bahari.',
  },
];
