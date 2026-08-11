import { getAssetsCurrent } from "@/lib/data/profil";
import { getStatistikPenduduk } from "@/lib/data/penduduk";
import { StatistikKependudukanContent } from "./statistik-kependudukan-content";

export default async function StatistikKependudukan() {
  const [assets, statistik] = await Promise.all([getAssetsCurrent(), getStatistikPenduduk()]);
  return <StatistikKependudukanContent nama={assets?.nama ?? "Desa Sukamakmur"} statistik={statistik} />;
}
