export interface Assets {
  id: string;
  nama: string;
  lokasi: string | null;
  email: string | null;
  kontak: string | null;
  visi: string | null;
  misi: string | null;
  file_hero_image: string | null;
  created_at: string;
  updated_at: string;
}

export type PerangkatDesaKelompok = "kepala_desa" | "perangkat" | "kadus" | "bpd";

export interface PerangkatDesa {
  id: string;
  nama: string;
  whatsapp: string | null;
  jabatan: string;
  kelompok: PerangkatDesaKelompok;
  urutan: number;
  periode: string | null;
  kutipan: string | null;
  file_foto: string | null;
  created_at: string;
  updated_at: string;
}
