import { apiFetchAllPages } from "@/lib/api/client";
import type { GeoMapPoint } from "@/lib/constants/map";
import type { Fasum, KondisiJalan, PendudukPublic } from "@/lib/types/geo";

// Catatan: fungsi-fungsi di bawah ini SENGAJA tidak menangkap error fetch-nya sendiri (tidak ada
// try/catch di sini) - kegagalan asli (backend down/cold-start habis retry) dibiarkan menjalar ke
// atas supaya ditangkap oleh error.tsx terdekat (yang menampilkan "Gagal memuat, coba lagi"),
// bukan didiamkan jadi array kosong yang terlihat sama persis dengan "memang belum ada data".

export async function getFasumList(): Promise<Fasum[]> {
  return apiFetchAllPages<Fasum>("fasum/");
}

export async function getKondisiJalanList(): Promise<KondisiJalan[]> {
  return apiFetchAllPages<KondisiJalan>("kondisi-jalan/");
}

export async function getPendudukList(): Promise<PendudukPublic[]> {
  return apiFetchAllPages<PendudukPublic>("penduduk/");
}

/** Gabungan titik peta penduduk + fasilitas umum + kondisi jalan, dipakai di halaman '/' dan '/data/geospasial'. */
export async function getCombinedGeoPoints(): Promise<GeoMapPoint[]> {
  const [pendudukList, fasumList, jalanList] = await Promise.all([
    getPendudukList(),
    getFasumList(),
    getKondisiJalanList(),
  ]);

  return [
    ...pendudukList
      .filter((p): p is typeof p & { geom: NonNullable<typeof p.geom> } => p.geom !== null)
      .map((p) => ({
        id: `penduduk-${p.id}`,
        lat: p.geom.coordinates[1],
        lng: p.geom.coordinates[0],
        category: "penduduk" as const,
        title: p.nama,
        rt: p.rt,
        rw: p.rw,
        foto: p.foto_penduduk,
      })),
    // Peta publik cuma menampilkan data yang sudah di-approve - data pending/rejected belum
    // terverifikasi dan tidak seharusnya tampil di halaman publik.
    ...fasumList
      .filter((f): f is typeof f & { latitude: number; longitude: number } => f.latitude !== null && f.longitude !== null && f.status === "approved")
      .map((f) => ({
        id: `fasum-${f.id}`,
        lat: f.latitude,
        lng: f.longitude,
        category: "fasum" as const,
        title: f.objek,
        jenis: f.jenis,
        toponim: f.toponim,
        status: f.status,
        foto: f.foto_fasum,
      })),
    ...jalanList
      .filter((j): j is typeof j & { latitude: number; longitude: number } => j.latitude !== null && j.longitude !== null && j.status === "approved")
      .map((j) => ({
        id: `jalan-${j.id}`,
        lat: j.latitude,
        lng: j.longitude,
        category: "jalan" as const,
        title: j.nama,
        perkerasan: j.perkerasan,
        kondisi: j.kondisi,
        status: j.status,
        foto: j.foto_kondisi_jalan,
      })),
  ];
}
