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
      .filter((p): p is typeof p & { latitude: number; longitude: number } => p.latitude !== null && p.longitude !== null)
      .map((p) => ({
        id: `penduduk-${p.id}`,
        lat: p.latitude,
        lng: p.longitude,
        category: "penduduk" as const,
        title: p.nama,
        subtitle: [p.rt && `RT ${p.rt}`, p.rw && `RW ${p.rw}`].filter(Boolean).join(" / ") || undefined,
      })),
    ...fasumList
      .filter((f): f is typeof f & { latitude: number; longitude: number } => f.latitude !== null && f.longitude !== null)
      .map((f) => ({
        id: `fasum-${f.id}`,
        lat: f.latitude,
        lng: f.longitude,
        category: "fasum" as const,
        title: f.objek,
        subtitle: f.jenis,
      })),
    ...jalanList
      .filter((j): j is typeof j & { latitude: number; longitude: number } => j.latitude !== null && j.longitude !== null)
      .map((j) => ({
        id: `jalan-${j.id}`,
        lat: j.latitude,
        lng: j.longitude,
        category: "jalan" as const,
        title: j.nama,
        subtitle: `Kondisi: ${j.kondisi}`,
      })),
  ];
}
