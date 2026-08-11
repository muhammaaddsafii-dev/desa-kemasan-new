"use client";

import { Users, Home, UserCheck, HeartPulse, Baby } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import type { StatistikPenduduk } from "@/lib/types/penduduk";

const COLORS = ["hsl(152,60%,32%)", "hsl(200,50%,40%)", "hsl(38,85%,52%)", "hsl(280,50%,55%)", "hsl(0,0%,70%)", "hsl(20,70%,55%)"];

function formatAngka(n: number) {
  return n.toLocaleString("id-ID");
}

function formatPersen(n: number, total: number) {
  if (!total) return "0%";
  return `${((n / total) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`;
}

export function StatistikKependudukanContent({ nama, statistik }: { nama: string; statistik: StatistikPenduduk | null }) {
  const total = statistik?.total_penduduk ?? 0;

  const summaryCards = statistik
    ? [
        { icon: Users, label: "Total Penduduk", value: formatAngka(statistik.total_penduduk) },
        { icon: Home, label: "Jumlah KK", value: formatAngka(statistik.total_kk) },
        { icon: UserCheck, label: "Usia Produktif", value: `${formatAngka(statistik.usia_produktif)} (${formatPersen(statistik.usia_produktif, total)})` },
        { icon: HeartPulse, label: "Lansia (>60th)", value: `${formatAngka(statistik.lansia)} (${formatPersen(statistik.lansia, total)})` },
        { icon: Baby, label: "Anak-anak (0-14th)", value: `${formatAngka(statistik.anak)} (${formatPersen(statistik.anak, total)})` },
      ]
    : [];

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Data Desa &gt; Statistik Kependudukan</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Statistik Kependudukan</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Data demografi dan kependudukan {nama}.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          {!statistik ? (
            <div className="card-village p-8 text-center text-muted-foreground">
              Data statistik penduduk belum tersedia saat ini. Silakan coba lagi nanti.
            </div>
          ) : (
            <>
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                {summaryCards.map((s) => (
                  <div key={s.label} className="card-village p-5 text-center">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className="block text-2xl font-bold text-foreground">{s.value}</span>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Age Chart */}
                <div className="card-village p-6">
                  <h3 className="font-semibold text-foreground mb-4">Piramida Penduduk Berdasarkan Usia</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statistik.piramida_usia}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(150,15%,88%)" />
                        <XAxis dataKey="range" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="pria" fill="hsl(200,50%,40%)" name="Pria" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="wanita" fill="hsl(340,60%,55%)" name="Wanita" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Education Pie */}
                <div className="card-village p-6">
                  <h3 className="font-semibold text-foreground mb-4">Tingkat Pendidikan</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statistik.pendidikan}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                          fontSize={12}
                        >
                          {statistik.pendidikan.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="card-village mt-8 overflow-hidden">
                <div className="p-5 border-b">
                  <h3 className="font-semibold text-foreground">Data Penduduk per RW</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-medium text-muted-foreground">RW</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">KK</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">Pria</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">Wanita</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statistik.per_wilayah.map((w) => (
                        <tr key={w.rw} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="p-3 font-medium text-foreground">RW {w.rw}</td>
                          <td className="p-3 text-right text-muted-foreground">{formatAngka(w.kk)}</td>
                          <td className="p-3 text-right text-muted-foreground">{formatAngka(w.pria)}</td>
                          <td className="p-3 text-right text-muted-foreground">{formatAngka(w.wanita)}</td>
                          <td className="p-3 text-right font-semibold text-foreground">{formatAngka(w.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
