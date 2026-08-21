import { apiFetchAllPages } from "@/lib/api/client";
import type { GeoMapPoint } from "@/lib/constants/map";
import type { Fasum, KondisiJalan, PendudukPublic } from "@/lib/types/geo";

export async function getFasumList(): Promise<Fasum[]> {
  try {
    return await apiFetchAllPages<Fasum>("fasum/");
  } catch (error) {
    console.error("Gagal memuat data fasilitas umum:", error);
    return [];
  }
}

export async function getKondisiJalanList(): Promise<KondisiJalan[]> {
  try {
    return await apiFetchAllPages<KondisiJalan>("kondisi-jalan/");
  } catch (error) {
    console.error("Gagal memuat data kondisi jalan:", error);
    return [];
  }
}

export async function getPendudukList(): Promise<PendudukPublic[]> {
  try {
    return await apiFetchAllPages<PendudukPublic>("penduduk/");
  } catch (error) {
    console.error("Gagal memuat data penduduk:", error);
    return [];
  }
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
