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
}
