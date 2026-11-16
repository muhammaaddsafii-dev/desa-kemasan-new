/**
 * Daftar video panduan (YouTube) yang tampil di halaman /layanan/panduan.
 * Cukup tambahkan satu objek per video - `url` boleh tautan YouTube biasa (watch, youtu.be, shorts) atau ID videonya.
 *
 * Contoh:
 *   { url: "https://www.youtube.com/watch?v=XXXXXXXXXXX", title: "Cara mengajukan surat online", desc: "Panduan langkah demi langkah." },
 */
export interface VideoPanduanItem {
  url: string;
  title: string;
  desc?: string;
}

export const VIDEO_PANDUAN: VideoPanduanItem[] = [
  {
    url: "https://www.youtube.com/watch?v=zspRgfsg3mI",
    title: "Desa Pintar: Aplikasi Desa Digital Terlengkap",
    desc: "Pengenalan solusi digitalisasi desa modern yang terintegrasi.",
  },
];
