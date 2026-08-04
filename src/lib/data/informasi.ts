import { apiFetch, apiFetchAllPages, ApiError } from "@/lib/api/client";
import type { PaginatedResponse } from "@/lib/types/common";
import type { Berita, Kegiatan, Pengumuman } from "@/lib/types/informasi";

interface ListParams {
  page?: number;
  search?: string;
  ordering?: string;
}

const EMPTY_PAGE = { count: 0, next: null, previous: null, results: [] };

export async function getBeritaList(params: ListParams = {}): Promise<PaginatedResponse<Berita>> {
  try {
    return await apiFetch<PaginatedResponse<Berita>>("berita/", {
      query: { page: params.page, search: params.search, ordering: params.ordering ?? "-published_at" },
    });
  } catch (error) {
    console.error("Gagal memuat data berita:", error);
    return EMPTY_PAGE;
  }
}

export async function getKegiatanList(params: ListParams = {}): Promise<PaginatedResponse<Kegiatan>> {
  try {
    return await apiFetch<PaginatedResponse<Kegiatan>>("kegiatan/", {
      query: { page: params.page, search: params.search, ordering: params.ordering ?? "-date" },
    });
  } catch (error) {
    console.error("Gagal memuat data kegiatan:", error);
    return EMPTY_PAGE;
  }
}

export async function getPengumumanList(params: ListParams = {}): Promise<PaginatedResponse<Pengumuman>> {
  try {
    return await apiFetch<PaginatedResponse<Pengumuman>>("pengumuman/", {
      query: { page: params.page, search: params.search, ordering: params.ordering ?? "-date" },
    });
  } catch (error) {
    console.error("Gagal memuat data pengumuman:", error);
    return EMPTY_PAGE;
  }
}

/** Mengambil seluruh halaman - dipakai di halaman daftar penuh (bukan preview beranda). */
export async function getAllBerita(): Promise<Berita[]> {
  try {
    return await apiFetchAllPages<Berita>("berita/", { query: { ordering: "-published_at" } });
  } catch (error) {
    console.error("Gagal memuat data berita:", error);
    return [];
  }
}

export async function getAllKegiatan(): Promise<Kegiatan[]> {
  try {
    return await apiFetchAllPages<Kegiatan>("kegiatan/", { query: { ordering: "-date" } });
  } catch (error) {
    console.error("Gagal memuat data kegiatan:", error);
    return [];
  }
}

export async function getAllPengumuman(): Promise<Pengumuman[]> {
  try {
    return await apiFetchAllPages<Pengumuman>("pengumuman/", { query: { ordering: "-date" } });
  } catch (error) {
    console.error("Gagal memuat data pengumuman:", error);
    return [];
  }
}

export async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  try {
    return await apiFetch<Berita>(`berita/${slug}/`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    console.error("Gagal memuat detail berita:", error);
    return null;
  }
}

export async function getPengumumanById(id: string): Promise<Pengumuman | null> {
  try {
    return await apiFetch<Pengumuman>(`pengumuman/${id}/`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    console.error("Gagal memuat detail pengumuman:", error);
    return null;
  }
}
