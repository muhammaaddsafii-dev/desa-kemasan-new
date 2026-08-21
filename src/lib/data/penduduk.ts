import { apiFetch } from "@/lib/api/client";
import type { StatistikPenduduk } from "@/lib/types/penduduk";

export async function getStatistikPenduduk(): Promise<StatistikPenduduk> {
  return apiFetch<StatistikPenduduk>("penduduk/statistik/");
}
