import { apiFetch } from "@/lib/api/client";
import type { StatistikPenduduk } from "@/lib/types/penduduk";

export async function getStatistikPenduduk(): Promise<StatistikPenduduk | null> {
  try {
    return await apiFetch<StatistikPenduduk>("penduduk/statistik/");
  } catch (error) {
    console.error("Gagal memuat statistik penduduk:", error);
    return null;
  }
}
