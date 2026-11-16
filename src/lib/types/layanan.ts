export type StatusPermohonan = "diajukan" | "diproses" | "selesai";

export interface PermohonanSuratPublik {
  kode_lacak: string;
  nama_pemohon: string;
  type: string;
  status: StatusPermohonan;
  created_at: string;
}

export interface AduanMasyarakatPublik {
  kode_lacak: string;
  subject: string;
  status: StatusPermohonan;
  created_at: string;
}

export interface Panduan {
  id: string;
  title: string;
  slug: string;
  /** URL file PDF (presigned, kedaluwarsa singkat - gunakan rute /layanan/panduan/[slug]/pdf untuk tautan yang selalu segar). */
  file: string;
  created_at: string;
  updated_at: string;
}
