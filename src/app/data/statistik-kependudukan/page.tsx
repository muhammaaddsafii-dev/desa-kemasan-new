import { getAssetsCurrent } from "@/lib/data/profil";
import { getStatistikPenduduk } from "@/lib/data/penduduk";
import { StatistikKependudukanContent } from "./statistik-kependudukan-content";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

export default async function StatistikKependudukan() {
  const [assets, statistik] = await Promise.all([getAssetsCurrent(), getStatistikPenduduk()]);
  return <StatistikKependudukanContent nama={assets?.nama ?? "Desa Sukamakmur"} statistik={statistik} />;
}
