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
