import { getAssetsCurrent } from "@/lib/data/profil";
import { StatistikKeuanganContent } from "./statistik-keuangan-content";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

export default async function StatistikKeuangan() {
  const assets = await getAssetsCurrent();
  return <StatistikKeuanganContent nama={assets?.nama ?? "Desa Sukamakmur"} />;
}
