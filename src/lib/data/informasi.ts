import { apiFetch, apiFetchAllPages, ApiError } from "@/lib/api/client";
import type { PaginatedResponse } from "@/lib/types/common";
import type { Berita, Kegiatan, Pengumuman } from "@/lib/types/informasi";

interface ListParams {
  page?: number;
  search?: string;
  ordering?: string;
}

// Catatan: fungsi list/all di bawah SENGAJA tidak menangkap error fetch-nya sendiri - kegagalan
// asli dibiarkan menjalar ke error.tsx terdekat alih-alih didiamkan jadi halaman kosong. Fungsi
// detail (by slug/id) tetap menangkap 404 secara eksplisit (itu memang "tidak ditemukan", bukan
// kegagalan) tapi tetap melempar error lain.

export async function getBeritaList(params: ListParams = {}): Promise<PaginatedResponse<Berita>> {
  return apiFetch<PaginatedResponse<Berita>>("berita/", {
    query: { page: params.page, search: params.search, ordering: params.ordering ?? "-published_at" },
  });
}

export async function getKegiatanList(params: ListParams = {}): Promise<PaginatedResponse<Kegiatan>> {
  return apiFetch<PaginatedResponse<Kegiatan>>("kegiatan/", {
    query: { page: params.page, search: params.search, ordering: params.ordering ?? "-date" },
  });
}

export async function getPengumumanList(params: ListParams = {}): Promise<PaginatedResponse<Pengumuman>> {
  return apiFetch<PaginatedResponse<Pengumuman>>("pengumuman/", {
    query: { page: params.page, search: params.search, ordering: params.ordering ?? "-date" },
  });
}

/** Mengambil seluruh halaman - dipakai di halaman daftar penuh (bukan preview beranda). */
export async function getAllBerita(): Promise<Berita[]> {
  return apiFetchAllPages<Berita>("berita/", { query: { ordering: "-published_at" } });
}

export async function getAllKegiatan(): Promise<Kegiatan[]> {
  return apiFetchAllPages<Kegiatan>("kegiatan/", { query: { ordering: "-date" } });
}

export async function getAllPengumuman(): Promise<Pengumuman[]> {
  return apiFetchAllPages<Pengumuman>("pengumuman/", { query: { ordering: "-date" } });
}

export async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  try {
    return await apiFetch<Berita>(`berita/${slug}/`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function getPengumumanById(id: string): Promise<Pengumuman | null> {
  try {
    return await apiFetch<Pengumuman>(`pengumuman/${id}/`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function getKegiatanBySlug(slug: string): Promise<Kegiatan | null> {
  try {
    return await apiFetch<Kegiatan>(`kegiatan/${slug}/`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
