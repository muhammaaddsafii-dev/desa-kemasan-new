"use client";

import { useMemo } from "react";

import { Icon } from "@/components/icon";
import {
  GEO_CATEGORY_CONFIG,
  KONDISI_JALAN_CLASSES,
  KONDISI_JALAN_CLASS_KEYS,
  kondisiJalanClass,
  type GeoMapCategory,
  type GeoMapPoint,
  type KondisiJalanClassKey,
} from "@/lib/constants/map";

/** Penanda simbol di legenda - bentuk & warna sama dengan marker di peta. */
export function MarkerSwatch({ color, square, icon }: { color: string; square?: boolean; icon: string }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center border border-white shadow ${square ? "rounded-md" : "rounded-full"}`}
      style={{ background: color }}
    >
      <Icon name={icon} className="!text-[12px] text-white" />
    </span>
  );
}

export interface LegendItem {
  key: string;
  label: string;
  color: string;
  icon: string;
  square: boolean;
  /** Jumlah titik (hanya untuk kelas kondisi jalan). */
  count?: number;
}

/** Item legenda untuk sebuah tab: satu simbol untuk penduduk/fasum, atau kelas kondisi (beserta jumlahnya) untuk jalan. */
export function useLegendItems(tab: GeoMapCategory, points: GeoMapPoint[]): LegendItem[] {
  return useMemo(() => {
    if (tab !== "jalan") {
      return [
        {
          key: tab,
          label: tab === "penduduk" ? "Lokasi tempat tinggal" : "Fasilitas umum (disetujui)",
          color: GEO_CATEGORY_CONFIG[tab].color,
          icon: tab === "penduduk" ? "home" : "domain",
          square: false,
        },
      ];
    }
    const counts = Object.fromEntries(KONDISI_JALAN_CLASS_KEYS.map((k) => [k, 0])) as Record<KondisiJalanClassKey, number>;
    points.forEach((p) => {
      if (p.category === "jalan") counts[kondisiJalanClass(p.kondisi)] += 1;
    });
    return KONDISI_JALAN_CLASS_KEYS.filter((k) => counts[k] > 0).map((k) => ({
      key: k,
      label: KONDISI_JALAN_CLASSES[k].label,
      color: KONDISI_JALAN_CLASSES[k].color,
      icon: "edit_road",
      square: true,
      count: counts[k],
    }));
  }, [tab, points]);
}

/** Legenda satu baris (di bawah peta) - dipakai saat tidak ada sidebar legenda, mis. peta di beranda. */
export function GeoLegendStrip({ tab, points }: { tab: GeoMapCategory; points: GeoMapPoint[] }) {
  const items = useLegendItems(tab, points);
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        Legenda {GEO_CATEGORY_CONFIG[tab].label}
      </span>
      {items.map((item) => (
        <span key={item.key} className="inline-flex items-center gap-2 text-foreground">
          <MarkerSwatch color={item.color} icon={item.icon} square={item.square} />
          {item.label}
          {item.count !== undefined && <span className="font-semibold tabular-nums text-muted-foreground">{item.count}</span>}
        </span>
      ))}
    </div>
  );
}
