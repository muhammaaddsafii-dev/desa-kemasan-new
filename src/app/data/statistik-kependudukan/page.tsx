import { getAssetsCurrent } from "@/lib/data/profil";
import { StatistikKependudukanContent } from "./statistik-kependudukan-content";

export default async function StatistikKependudukan() {
  const assets = await getAssetsCurrent();
  return <StatistikKependudukanContent nama={assets?.nama ?? "Desa Sukamakmur"} />;
}
