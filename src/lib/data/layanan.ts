import { apiFetch } from "@/lib/api/client";
import type { AduanMasyarakatPublik, PermohonanSuratPublik } from "@/lib/types/layanan";

export async function getPermohonanSuratPublik(): Promise<PermohonanSuratPublik[]> {
  try {
    return await apiFetch<PermohonanSuratPublik[]>("permohonan-surat/publik/");
  } catch (error) {
    console.error("Gagal memuat status permohonan surat:", error);
    return [];
  }
}

export async function getAduanMasyarakatPublik(): Promise<AduanMasyarakatPublik[]> {
  try {
    return await apiFetch<AduanMasyarakatPublik[]>("aduan-masyarakat/publik/");
  } catch (error) {
    console.error("Gagal memuat status pengaduan:", error);
    return [];
  }
}
