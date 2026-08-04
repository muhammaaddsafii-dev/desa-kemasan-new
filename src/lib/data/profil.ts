import { apiFetch, ApiError, apiFetchAllPages } from "@/lib/api/client";
import type { Assets, PerangkatDesa } from "@/lib/types/profil";

export async function getAssetsCurrent(): Promise<Assets | null> {
  try {
    return await apiFetch<Assets>("assets/current/");
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    console.error("Gagal memuat data profil desa:", error);
    return null;
  }
}

export async function getPerangkatDesaList(): Promise<PerangkatDesa[]> {
  try {
    return await apiFetchAllPages<PerangkatDesa>("perangkat-desa/", { query: { ordering: "urutan" } });
  } catch (error) {
    console.error("Gagal memuat data perangkat desa:", error);
    return [];
  }
}
