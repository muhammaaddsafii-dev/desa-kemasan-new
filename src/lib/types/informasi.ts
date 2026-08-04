export interface FotoBerita {
  id: string;
  berita: string;
  file: string;
}

export interface Berita {
  id: string;
  title: string;
  slug: string;
  image_cover: string | null;
  content: string;
  published_at: string | null;
  foto_berita: FotoBerita[];
  created_at: string;
  updated_at: string;
}

export interface FotoKegiatan {
  id: string;
  kegiatan: string;
  file: string;
}

export type KegiatanCategory = "internal" | "eksternal";

export interface Kegiatan {
  id: string;
  title: string;
  slug: string;
  category: KegiatanCategory;
  image_cover: string | null;
  date: string;
  foto_kegiatan: FotoKegiatan[];
  created_at: string;
  updated_at: string;
}

export interface FotoPengumuman {
  id: string;
  pengumuman: string;
  file: string;
}

export interface Pengumuman {
  id: string;
  judul: string;
  date: string;
  isi_pengumuman: string;
  foto_pengumuman: FotoPengumuman[];
  created_at: string;
  updated_at: string;
}
