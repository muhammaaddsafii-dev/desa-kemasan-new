export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface FotoFasum {
  id: string;
  fasum: string;
  file: string;
}

export interface Fasum {
  id: string;
  submitted_by: string | null;
  jenis: string;
  objek: string;
  toponim: string | null;
  sumber: string | null;
  keterangan: string | null;
  latitude: number | null;
  longitude: number | null;
  status: ApprovalStatus;
  foto_fasum: FotoFasum[];
  created_at: string;
  updated_at: string;
}

export type PerkerasanJalan = "aspal" | "cor";
export type KondisiJalanTingkat = "baik" | "kurang baik" | "tidak baik";

export interface FotoKondisiJalan {
  id: string;
  kondisi_jalan: string;
  file: string;
}

export interface KondisiJalan {
  id: string;
  submitted_by: string | null;
  nama: string;
  perkerasan: PerkerasanJalan;
  kondisi: KondisiJalanTingkat;
  sumber: string | null;
  latitude: number | null;
  longitude: number | null;
  status: ApprovalStatus;
  foto_kondisi_jalan: FotoKondisiJalan[];
  created_at: string;
  updated_at: string;
}

/**
 * Data penduduk versi publik - hanya titik lokasi, tanpa NIK/data pribadi
 * (lihat PendudukPublicSerializer di backend).
 */
export interface PendudukPublic {
  id: string;
  nama: string;
  jenis_kelamin: string;
  rt: string | null;
  rw: string | null;
  latitude: number | null;
  longitude: number | null;
}
