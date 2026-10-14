import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { region, duration, pace, focus, travelerCount } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return high quality curated default if API key is not yet set
      return NextResponse.json({
        success: true,
        source: 'curated_catalog',
        plan: generateCuratedFallback(region, duration, pace, focus),
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `Anda adalah kepala kurator perjalanan mewah, budaya, dan regeneratif dari "MLAKU — Jelajahi Nusantara".
Buatkan rencana perjalanan (itinerary) eksklusif dan puitis-otentik dalam Bahasa Indonesia untuk:
- Wilayah / Destinasi: ${region || 'Labuan Bajo & Flores'}
- Durasi: ${duration || '4 Hari 3 Malam'}
- Ritme Perjalanan (Pace): ${pace || 'Seimbang & Kaya Cerita'}
- Fokus Minat: ${(focus && focus.length > 0) ? focus.join(', ') : 'Budaya & Alam'}
- Jumlah Penjelajah: ${travelerCount || 2} orang

Gaya bahasa: Elegan, sastrawi, menghormati etika adat lokal (regenerative tourism), tidak terburu-buru (slow travel), penuh detail sensorik (aroma kopi, suara angin, tekstur tenun, cahaya fajar).

Berikan output dalam format JSON valid dengan struktur:
{
  "title": "Judul puitis perjalanan (contoh: Mengarungi Nafas Purba Komodo)",
  "tagline": "Kalimat filosofis singkat",
  "recommendedSeason": "Bulan/musim terbaik",
  "sanctuaryLodge": "Nama/tipe akomodasi ramah arsitektur lokal",
  "highlights": [
    "3-4 poin sorotan pengalaman utama"
  ],
  "dailyItinerary": [
    {
      "day": "Hari 01",
      "title": "Judul hari",
      "description": "Uraian naratif aktivitas pagi, siang, dan senja dengan kurator lokal"
    }
  ],
  "culturalEthics": "Satu nasehat etika adat / penghormatan alam",
  "culinaryNote": "Catatan kuliner khas yang patut dinikmati"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      // In case formatting has surrounding code blocks
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    return NextResponse.json({
      success: true,
      source: 'gemini_ai',
      plan: parsedData,
    });
  } catch (error) {
    console.error('Error generating itinerary with Gemini:', error);
    // Graceful fallback to rich curated data
    const fallback = generateCuratedFallback('Labuan Bajo & Flores', '4 Hari 3 Malam', 'Seimbang & Kaya Cerita', ['Alam & Budaya']);
    return NextResponse.json({
      success: true,
      source: 'curated_fallback',
      plan: fallback,
    });
  }
}

function generateCuratedFallback(region: string, duration: string, pace: string, focus: string[] = []) {
  const focusList = focus.length > 0 ? focus.join(', ') : 'Budaya & Lanskap Alam';
  return {
    title: `${region || 'Nusantara'} — Harmoni Sukma & Lanskap Purba`,
    tagline: 'Perjalanan melambat yang meresapi detak jantung tanah air.',
    recommendedSeason: 'April – Oktober (Musim Kering & Langit Jernih)',
    sanctuaryLodge: 'Boutique Eco-Lodge Bernapas Kayu Jati & Tenun Lokal',
    highlights: [
      `Penjelajahan intim berfokus pada ${focusList}`,
      'Didampingi pramuwisata indigenous yang memahami folklor dan pantangan adat',
      'Santapan gastronomi warisan menggunakan bahan organik dari kebun warga sekitar',
      'Ritual penyambutan adat dan akses menuju suaka yang hening dan terlindungi'
    ],
    dailyItinerary: [
      {
        day: 'Hari 01',
        title: 'Ketibaan & Sambutan Hangat Bumi Nusantara',
        description: 'Penjemputan pribadi berpendingin udara menuju suaka tempat bermalam. Disambut teh rempah sereh hangat dan jamuan makan malam pembuka dengan pemandangan lembah.'
      },
      {
        day: 'Hari 02',
        title: 'Menembus Kabut Fajar & Narasi Leluhur',
        description: 'Menyaksikan cahaya pertama menyinari bukit dan kawah sunyi. Menelusuri desa tua untuk berdialog dengan sesepuh adat mengenai filosofi harmoni manusia dan alam semesta.'
      },
      {
        day: 'Hari 03',
        title: 'Meresapi Ritme Hening & Pengrajin Tenun',
        description: 'Sesi privat melihat pencelupan benang alami dari akar mengkudu dan daun nila, disusul piknik santai di tepi aliran air jernih dengan cita rasa lokal autentik.'
      },
      {
        day: 'Hari 04',
        title: 'Rasa Syukur & Pelepasan Kenangan Abadi',
        description: 'Meditasi pagi ditemani kicau burung endemik sebelum prosesi pelepasan ramah tamah dan pengantaran kembali menuju gerbang keberangkatan.'
      }
    ],
    culturalEthics: 'Meminta izin sebelum memotret upacara sakral dan selalu berpakaian santun menutup bahu saat memasuki area adat suci.',
    culinaryNote: 'Kopi sangrai wajan tanah liat tradisional ditemani ubi rebus rempah dan sambal khas racikan ibu desa.'
  };
}
