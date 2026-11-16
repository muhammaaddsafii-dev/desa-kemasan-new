import { apiFetch, apiFetchAllPages } from "@/lib/api/client";
import type { AduanMasyarakatPublik, Panduan, PermohonanSuratPublik } from "@/lib/types/layanan";

export async function getPermohonanSuratPublik(): Promise<PermohonanSuratPublik[]> {
  return apiFetch<PermohonanSuratPublik[]>("permohonan-surat/publik/");
}

export async function getAduanMasyarakatPublik(): Promise<AduanMasyarakatPublik[]> {
  return apiFetch<AduanMasyarakatPublik[]>("aduan-masyarakat/publik/");
}

/** Daftar dokumen panduan (PDF). Tautan `file` kedaluwarsa singkat, jadi di UI pakai rute /layanan/panduan/[slug]/pdf. */
export async function getPanduanList(): Promise<Panduan[]> {
  return apiFetchAllPages<Panduan>("panduan/", { query: { ordering: "-created_at" } });
}

/** Satu panduan, tanpa cache supaya URL file yang dikembalikan selalu masih berlaku. */
export async function getPanduanSegar(slug: string): Promise<Panduan> {
  return apiFetch<Panduan>(`panduan/${encodeURIComponent(slug)}/`, { revalidate: 0 });
}
