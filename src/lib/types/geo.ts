export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface GeoPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface FotoFasum {
  id: string;
  fasum: string;
  file: string;
}

export interface Fasum {
  id: string;
  submitted_by: string | null;
  jenis_fasum: string;
  jenis_fasum_nama: string;
  objek: string;
  toponim: string | null;
  sumber: string | null;
  keterangan: string | null;
  geom: GeoPoint | null;
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
  geom: GeoPoint | null;
  status: ApprovalStatus;
  foto_kondisi_jalan: FotoKondisiJalan[];
  created_at: string;
  updated_at: string;
}

export interface FotoPenduduk {
  id: string;
  penduduk: string;
  file: string;
}

/**
 * Data penduduk versi publik - hanya titik lokasi + foto, tanpa NIK/data pribadi lain
 * (lihat PendudukPublicSerializer di backend).
 */
export interface PendudukPublic {
  id: string;
  nama: string;
  jenis_kelamin: string;
  rt: string | null;
  rw: string | null;
  geom: GeoPoint | null;
  foto_penduduk: FotoPenduduk[];
}
