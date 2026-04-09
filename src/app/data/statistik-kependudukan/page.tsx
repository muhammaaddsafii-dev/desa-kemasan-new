"use client";

import { Users, Baby, UserCheck, HeartPulse, GraduationCap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const summaryCards = [
  { icon: Users, label: "Total Penduduk", value: "4.827", change: "+1,2%" },
  { icon: Baby, label: "Kelahiran (2025)", value: "67", change: "+5" },
  { icon: UserCheck, label: "Usia Produktif", value: "3.102", change: "64,3%" },
  { icon: HeartPulse, label: "Lansia (>60th)", value: "412", change: "8,5%" },
  { icon: GraduationCap, label: "Tingkat Melek Huruf", value: "97,2%", change: "+0,3%" },
];

const ageData = [
  { range: "0-14", pria: 380, wanita: 365 },
  { range: "15-24", pria: 420, wanita: 410 },
  { range: "25-44", pria: 680, wanita: 690 },
  { range: "45-59", pria: 450, wanita: 420 },
  { range: "60+", pria: 210, wanita: 202 },
];

const eduData = [
  { name: "SD", value: 25 },
  { name: "SMP", value: 22 },
  { name: "SMA", value: 35 },
  { name: "D3/S1", value: 15 },
  { name: "Lainnya", value: 3 },
];

const COLORS = ["hsl(152,60%,32%)", "hsl(200,50%,40%)", "hsl(38,85%,52%)", "hsl(280,50%,55%)", "hsl(0,0%,70%)"];

export default function StatistikKependudukan() {
  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Data Desa &gt; Statistik Kependudukan</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Statistik Kependudukan</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Data demografi dan kependudukan Desa Sukamakmur tahun 2025.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {summaryCards.map((s) => (
              <div key={s.label} className="card-village p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="block text-2xl font-bold text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <span className="block text-xs text-primary font-medium mt-1">{s.change}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Age Chart */}
            <div className="card-village p-6">
              <h3 className="font-semibold text-foreground mb-4">Piramida Penduduk Berdasarkan Usia</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData}>
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
                    <Pie data={eduData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={12}>
                      {eduData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
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
              <h3 className="font-semibold text-foreground">Data Penduduk per Dusun</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">Dusun</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">KK</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Pria</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Wanita</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Ciburial", "385", "612", "598", "1.210"],
                    ["Cimanggu", "342", "568", "555", "1.123"],
                    ["Pasirjaya", "328", "540", "530", "1.070"],
                    ["Sukasenang", "301", "520", "504", "1.024"],
                  ].map(([d, kk, p, w, t]) => (
                    <tr key={d} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium text-foreground">{d}</td>
                      <td className="p-3 text-right text-muted-foreground">{kk}</td>
                      <td className="p-3 text-right text-muted-foreground">{p}</td>
                      <td className="p-3 text-right text-muted-foreground">{w}</td>
                      <td className="p-3 text-right font-semibold text-foreground">{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
