"use client";

import type { ReactNode } from "react";
import {
  Baby,
  Briefcase,
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  Home,
  Info,
  Luggage,
  Scale,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatTanggalPanjang } from "@/lib/format";
import type { JumlahBucket, StatistikPenduduk } from "@/lib/types/penduduk";

const PRIA = "#2563eb";
const WANITA = "#db2777";
const HIJAU = "#16a34a";
const MERAH = "#dc2626";

function formatAngka(n: number) {
  return n.toLocaleString("id-ID");
}

function persen(n: number, total: number, digits = 1) {
  if (!total) return "0%";
  return `${((n / total) * 100).toLocaleString("id-ID", { maximumFractionDigits: digits })}%`;
}

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid hsl(var(--border))",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  fontSize: 12,
};

/** Kartu panel dengan judul + keterangan singkat. */
function Panel({
  title,
  description,
  icon: Icon,
  className = "",
  children,
}: {
  title: string;
  description?: string;
  icon?: typeof Users;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`card-village p-6 ${className}`}>
      <div className="mb-5 flex items-start gap-3">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

/** Daftar batang horizontal berperingkat: nama, jumlah, persentase. Lebih mudah dibaca daripada pie chart untuk banyak kategori. */
function RankBars({ data, color, total, emptyText }: { data: JumlahBucket[]; color: string; total: number; emptyText?: string }) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground">{emptyText ?? "Belum ada data."}</p>;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.name}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-medium text-foreground">{d.name}</span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              <span className="font-semibold text-foreground">{formatAngka(d.value)}</span> · {persen(d.value, total)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full transition-all" style={{ width: `${(d.value / max) * 100}%`, background: color }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function KpiCard({
  icon: Icon,
  tone,
  label,
  value,
  caption,
}: {
  icon: typeof Users;
  tone: string;
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="card-village flex items-center gap-4 p-5">
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${tone}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="block text-3xl font-bold leading-tight text-foreground">{value}</span>
        <span className="block truncate text-xs text-muted-foreground">{caption}</span>
      </div>
    </div>
  );
}

function KelompokUsia({
  icon: Icon,
  label,
  rentang,
  value,
  total,
  color,
}: {
  icon: typeof Users;
  label: string;
  rentang: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = total ? (value / total) * 100 : 0;
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ background: color }}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">{rentang}</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold tabular-nums text-foreground">{formatAngka(value)}</div>
          <div className="text-xs font-semibold tabular-nums" style={{ color }}>
            {persen(value, total)}
          </div>
        </div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function MiniBarChart({
  data,
  dataKey,
  color,
  label,
}: {
  data: StatistikPenduduk["tren_kelahiran_kematian"];
  dataKey: "kelahiran" | "kematian";
  color: string;
  label: string;
}) {
  const total = data.reduce((n, d) => n + d[dataKey], 0);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="h-3 w-3 rounded-sm" style={{ background: color }} />
          {label}
        </span>
        <span className="text-sm text-muted-foreground">
          Total <span className="font-bold tabular-nums text-foreground">{formatAngka(total)}</span>
        </span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="tahun" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              contentStyle={tooltipStyle}
              formatter={(v: number) => [formatAngka(v), label]}
            />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StatistikKependudukanContent({ nama, statistik }: { nama: string; statistik: StatistikPenduduk | null }) {
  return (
    <>
      <section className="gradient-primary py-16 pb-28 text-primary-foreground md:py-20 md:pb-32">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Data Desa &gt; Statistik Kependudukan</span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Statistik Kependudukan</h1>
          <p className="mt-3 max-w-2xl opacity-90">
            Gambaran demografi dan kependudukan {nama}: jumlah, usia, pendidikan, pekerjaan, hingga sebaran per RW.
          </p>
          {statistik?.diperbarui && (
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <CalendarDays className="h-4 w-4" />
              Data per {formatTanggalPanjang(statistik.diperbarui)}
            </span>
          )}
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-village">
          {!statistik ? (
            <div className="card-village mt-10 p-8 text-center text-muted-foreground">
              Data statistik penduduk belum tersedia saat ini. Silakan coba lagi nanti.
            </div>
          ) : (
            <Isi statistik={statistik} />
          )}
        </div>
      </section>
    </>
  );
}

function Isi({ statistik }: { statistik: StatistikPenduduk }) {
  const total = statistik.total_penduduk;
  const laki = statistik.jenis_kelamin["Laki-laki"];
  const perempuan = statistik.jenis_kelamin.Perempuan;
  const rasio = perempuan ? Math.round((laki / perempuan) * 100) : 0;
  const rataKk = statistik.total_kk
    ? (total / statistik.total_kk).toLocaleString("id-ID", { maximumFractionDigits: 1 })
    : "-";

  const agama = (statistik.agama ?? []).filter((a) => a.name !== "Tidak Diketahui");
  const agamaTersedia = agama.length > 0;
  const perkawinan = statistik.status_perkawinan ?? [];
  const pekerjaan = statistik.pekerjaan ?? [];
  const tren = statistik.tren_kelahiran_kematian ?? [];
  const adaTren = tren.some((t) => t.kelahiran > 0 || t.kematian > 0);
  const pendatang = statistik.pendatang;
  const rataUmur = statistik.rata_rata_umur;

  // Piramida: laki-laki ke kiri (nilai negatif), perempuan ke kanan; kelompok tertua di atas.
  const piramida = [...statistik.piramida_usia]
    .reverse()
    .map((b) => ({ range: b.range === "60+" ? "60+" : `${b.range} th`, pria: -b.pria, wanita: b.wanita }));
  const maksPiramida = Math.max(...statistik.piramida_usia.flatMap((b) => [b.pria, b.wanita]), 1);

  const donut = [
    { name: "Laki-laki", value: laki, color: PRIA },
    { name: "Perempuan", value: perempuan, color: WANITA },
  ];

  const wilayah = statistik.per_wilayah;
  const totalKk = wilayah.reduce((n, w) => n + w.kk, 0);
  const maksWilayah = Math.max(...wilayah.map((w) => w.total), 1);

  return (
    <div className="space-y-8">
      {/* Ringkasan utama - menimpa bagian bawah header */}
      <div className="-mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          icon={Users}
          tone="bg-blue-100 text-blue-700"
          label="Total Penduduk"
          value={formatAngka(total)}
          caption={`${formatAngka(laki)} laki-laki · ${formatAngka(perempuan)} perempuan`}
        />
        <KpiCard
          icon={Home}
          tone="bg-teal-100 text-teal-700"
          label="Kepala Keluarga"
          value={formatAngka(statistik.total_kk)}
          caption={`Rata-rata ${rataKk} jiwa per KK`}
        />
        <KpiCard
          icon={CalendarDays}
          tone="bg-violet-100 text-violet-700"
          label="Rata-rata Usia"
          value={rataUmur !== null && rataUmur !== undefined ? `${rataUmur.toLocaleString("id-ID")} th` : "-"}
          caption="Dari seluruh penduduk yang tercatat"
        />
        <KpiCard
          icon={Scale}
          tone="bg-pink-100 text-pink-700"
          label="Rasio Jenis Kelamin"
          value={rasio ? `${rasio}` : "-"}
          caption="Laki-laki per 100 perempuan"
        />
        <KpiCard
          icon={UserCheck}
          tone="bg-green-100 text-green-700"
          label="Usia Produktif"
          value={persen(statistik.usia_produktif, total, 0)}
          caption={`${formatAngka(statistik.usia_produktif)} orang berusia 15–64 tahun`}
        />
        <KpiCard
          icon={Luggage}
          tone="bg-amber-100 text-amber-700"
          label="Pendatang Aktif"
          value={pendatang ? formatAngka(pendatang.aktif) : "-"}
          caption={
            pendatang
              ? `${formatAngka(pendatang.menetap)} menetap · ${formatAngka(pendatang.sementara)} sementara`
              : "Belum ada data"
          }
        />
      </div>

      {/* Jenis kelamin + kelompok usia */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Panel title="Komposisi Jenis Kelamin" description="Perbandingan laki-laki dan perempuan" icon={Users} className="lg:col-span-2">
          <div className="relative h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donut} dataKey="value" innerRadius={62} outerRadius={90} paddingAngle={3} stroke="none">
                  {donut.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number, n: string) => [`${formatAngka(v)} (${persen(v, total)})`, n]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{formatAngka(total)}</span>
              <span className="text-xs text-muted-foreground">jiwa</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {donut.map((d) => (
              <div key={d.name} className="rounded-lg border p-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </span>
                <div className="text-lg font-bold tabular-nums text-foreground">{formatAngka(d.value)}</div>
                <div className="text-xs font-semibold tabular-nums" style={{ color: d.color }}>
                  {persen(d.value, total)}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Kelompok Usia" description="Sebaran penduduk menurut tahapan usia" icon={Baby} className="lg:col-span-3">
          <div className="space-y-3">
            <KelompokUsia icon={Baby} label="Anak-anak" rentang="0 – 14 tahun" value={statistik.anak} total={total} color="#f59e0b" />
            <KelompokUsia icon={UserCheck} label="Usia Produktif" rentang="15 – 64 tahun" value={statistik.usia_produktif} total={total} color={HIJAU} />
            <KelompokUsia icon={HeartHandshake} label="Lansia" rentang="di atas 60 tahun" value={statistik.lansia} total={total} color="#7c3aed" />
          </div>
        </Panel>
      </div>

      {/* Piramida + pendidikan */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Panel title="Piramida Penduduk" description="Jumlah penduduk per kelompok usia dan jenis kelamin" icon={TrendingUp} className="lg:col-span-3">
          <div className="mb-2 flex items-center justify-center gap-5 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm" style={{ background: PRIA }} /> Laki-laki
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm" style={{ background: WANITA }} /> Perempuan
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={piramida}
                layout="vertical"
                stackOffset="sign"
                margin={{ top: 4, right: 12, left: 4, bottom: 0 }}
                barCategoryGap={6}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  domain={[-maksPiramida, maksPiramida]}
                  tickFormatter={(v: number) => formatAngka(Math.abs(v))}
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis type="category" dataKey="range" fontSize={12} width={58} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted))" }}
                  contentStyle={tooltipStyle}
                  formatter={(v: number, n: string) => [formatAngka(Math.abs(v)), n === "pria" ? "Laki-laki" : "Perempuan"]}
                />
                <ReferenceLine x={0} stroke="hsl(var(--border))" />
                <Bar dataKey="pria" stackId="usia" fill={PRIA} radius={[4, 0, 0, 4]} />
                <Bar dataKey="wanita" stackId="usia" fill={WANITA} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Tingkat Pendidikan" description="Pendidikan terakhir yang ditamatkan" icon={GraduationCap} className="lg:col-span-2">
          <RankBars data={statistik.pendidikan} color="#0891b2" total={total} />
        </Panel>
      </div>

      {/* Pekerjaan, perkawinan, agama */}
      <div className={`grid gap-6 ${agamaTersedia ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
        <Panel title="Pekerjaan Terbanyak" description="8 jenis pekerjaan dengan jumlah terbanyak" icon={Briefcase}>
          <RankBars data={pekerjaan} color="#ea580c" total={total} />
        </Panel>
        <Panel title="Status Perkawinan" description="Sebaran status perkawinan penduduk" icon={HeartHandshake}>
          <RankBars data={perkawinan} color="#db2777" total={total} />
        </Panel>
        {agamaTersedia && (
          <Panel title="Agama" description="Sebaran pemeluk agama" icon={Users}>
            <RankBars data={agama} color="#16a34a" total={total} />
          </Panel>
        )}
      </div>

      {/* Tren kelahiran & kematian */}
      {adaTren && (
        <Panel title="Kelahiran dan Kematian" description="Jumlah kelahiran dan kematian per tahun (10 tahun terakhir)" icon={TrendingUp}>
          <div className="grid gap-8 md:grid-cols-2">
            <MiniBarChart data={tren} dataKey="kelahiran" color={HIJAU} label="Kelahiran" />
            <MiniBarChart data={tren} dataKey="kematian" color={MERAH} label="Kematian" />
          </div>
        </Panel>
      )}

      {/* Per RW */}
      <div className="card-village overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b p-5">
          <div>
            <h3 className="font-semibold text-foreground">Sebaran Penduduk per RW</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Jumlah kepala keluarga, penduduk, dan porsinya terhadap total desa</p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{wilayah.length} wilayah</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-3 pl-5 text-left font-semibold">Wilayah</th>
                <th className="p-3 text-right font-semibold">KK</th>
                <th className="p-3 text-right font-semibold">Laki-laki</th>
                <th className="p-3 text-right font-semibold">Perempuan</th>
                <th className="p-3 text-right font-semibold">Total</th>
                <th className="min-w-44 p-3 pr-5 text-left font-semibold">Porsi</th>
              </tr>
            </thead>
            <tbody>
              {wilayah.map((w) => (
                <tr key={w.rw} className="border-b transition-colors hover:bg-muted/40">
                  <td className="p-3 pl-5 font-semibold text-foreground">{w.rw === "-" ? "RW belum diisi" : `RW ${w.rw}`}</td>
                  <td className="p-3 text-right tabular-nums text-muted-foreground">{formatAngka(w.kk)}</td>
                  <td className="p-3 text-right tabular-nums text-muted-foreground">{formatAngka(w.pria)}</td>
                  <td className="p-3 text-right tabular-nums text-muted-foreground">{formatAngka(w.wanita)}</td>
                  <td className="p-3 text-right font-semibold tabular-nums text-foreground">{formatAngka(w.total)}</td>
                  <td className="p-3 pr-5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${(w.total / maksWilayah) * 100}%` }} />
                      </div>
                      <span className="w-12 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                        {persen(w.total, total)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted/60 font-semibold text-foreground">
                <td className="p-3 pl-5">Total Desa</td>
                <td className="p-3 text-right tabular-nums">{formatAngka(totalKk)}</td>
                <td className="p-3 text-right tabular-nums">{formatAngka(laki)}</td>
                <td className="p-3 text-right tabular-nums">{formatAngka(perempuan)}</td>
                <td className="p-3 text-right tabular-nums">{formatAngka(total)}</td>
                <td className="p-3 pr-5 text-xs text-muted-foreground">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Catatan */}
      <div className="flex items-start gap-3 rounded-xl border bg-muted/40 p-4 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          Seluruh angka dihitung dari penduduk berstatus hidup dan hanya berupa rekap (tidak memuat data pribadi). Anak-anak berusia 0–14 tahun, usia
          produktif 15–64 tahun, dan lansia di atas 60 tahun, sehingga kelompok lansia dan usia produktif sedikit beririsan pada usia 61–64 tahun.
          Kelahiran dan kematian dihitung dari tanggal lahir dan tanggal meninggal yang tercatat.
        </p>
      </div>
    </div>
  );
}
