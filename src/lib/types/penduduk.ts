export interface UsiaBucket {
  range: string;
  pria: number;
  wanita: number;
}

export interface PendidikanBucket {
  name: string;
  value: number;
}

export interface WilayahBucket {
  rw: string;
  kk: number;
  pria: number;
  wanita: number;
  total: number;
}

export interface JumlahBucket {
  name: string;
  value: number;
}

export interface TrenVital {
  tahun: number;
  kelahiran: number;
  kematian: number;
}

export interface RingkasanPendatang {
  aktif: number;
  menetap: number;
  sementara: number;
}

export interface StatistikPenduduk {
  total_penduduk: number;
  total_kk: number;
  usia_produktif: number;
  lansia: number;
  anak: number;
  jenis_kelamin: { "Laki-laki": number; Perempuan: number };
  piramida_usia: UsiaBucket[];
  pendidikan: PendidikanBucket[];
  per_wilayah: WilayahBucket[];
  agama: JumlahBucket[];
  status_perkawinan: JumlahBucket[];
  pekerjaan: JumlahBucket[];
  rata_rata_umur: number | null;
  tren_kelahiran_kematian: TrenVital[];
  pendatang: RingkasanPendatang;
  /** Tanggal data dihitung, "YYYY-MM-DD". */
  diperbarui: string;
}
