import { apiFetch, ApiError, apiFetchAllPages } from "@/lib/api/client";
import type { Assets, PerangkatDesa } from "@/lib/types/profil";

// Sengaja tetap menangkap SEMUA error (tidak dilempar ke atas seperti fungsi lain di file data/*):
// dipakai di root layout untuk nama desa/logo, jadi tidak boleh sampai bikin seluruh situs down
// hanya karena satu request ini gagal - fallback tampilan default di layout.tsx lebih aman.
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
  return apiFetchAllPages<PerangkatDesa>("perangkat-desa/", { query: { ordering: "urutan" } });
}
