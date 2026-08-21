import { apiFetch } from "@/lib/api/client";
import type { AduanMasyarakatPublik, PermohonanSuratPublik } from "@/lib/types/layanan";

export async function getPermohonanSuratPublik(): Promise<PermohonanSuratPublik[]> {
  return apiFetch<PermohonanSuratPublik[]>("permohonan-surat/publik/");
}

export async function getAduanMasyarakatPublik(): Promise<AduanMasyarakatPublik[]> {
  return apiFetch<AduanMasyarakatPublik[]>("aduan-masyarakat/publik/");
}
