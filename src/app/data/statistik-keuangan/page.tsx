import { getAssetsCurrent } from "@/lib/data/profil";
import { StatistikKeuanganContent } from "./statistik-keuangan-content";

export default async function StatistikKeuangan() {
  const assets = await getAssetsCurrent();
  return <StatistikKeuanganContent nama={assets?.nama ?? "Desa Sukamakmur"} />;
}
