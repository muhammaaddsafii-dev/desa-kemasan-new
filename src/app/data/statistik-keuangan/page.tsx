"use client";

import { Wallet, TrendingUp, PiggyBank, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const summary = [
  { icon: Wallet, label: "Total Pendapatan", value: "Rp 2,8 M", sub: "TA 2025" },
  { icon: TrendingUp, label: "Total Belanja", value: "Rp 2,65 M", sub: "95% terealisasi" },
  { icon: PiggyBank, label: "Silpa", value: "Rp 150 Jt", sub: "Sisa anggaran" },
  { icon: Building2, label: "Dana Desa", value: "Rp 1,2 M", sub: "dari APBN" },
];

const incomeData = [
  { name: "Dana Desa", value: 1200 },
  { name: "ADD", value: 680 },
  { name: "Bagi Hasil", value: 420 },
  { name: "PADes", value: 350 },
  { name: "Lainnya", value: 150 },
];

const expenseData = [
  { name: "Infrastruktur", value: 35 },
  { name: "Pemberdayaan", value: 25 },
  { name: "Pemerintahan", value: 20 },
  { name: "Sosial", value: 12 },
  { name: "Lainnya", value: 8 },
];

const COLORS = ["hsl(152,60%,32%)", "hsl(200,50%,40%)", "hsl(38,85%,52%)", "hsl(280,50%,55%)", "hsl(0,0%,70%)"];

export default function StatistikKeuangan() {
  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Data Desa &gt; Statistik Keuangan</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Statistik Keuangan Desa</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Transparansi anggaran dan realisasi keuangan Desa Sukamakmur.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {summary.map((s) => (
              <div key={s.label} className="card-village p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="block text-xl font-bold text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <span className="block text-xs text-primary font-medium mt-1">{s.sub}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card-village p-6">
              <h3 className="font-semibold text-foreground mb-4">Sumber Pendapatan (Juta Rp)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(150,15%,88%)" />
                    <XAxis type="number" fontSize={12} />
                    <YAxis dataKey="name" type="category" fontSize={12} width={90} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(152,60%,32%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card-village p-6">
              <h3 className="font-semibold text-foreground mb-4">Komposisi Belanja (%)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={12}>
                      {expenseData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Realisasi Table */}
          <div className="card-village mt-8 overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-semibold text-foreground">Realisasi Anggaran 2025</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">Uraian</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Anggaran</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Realisasi</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">%</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pembangunan Infrastruktur", "Rp 928 Jt", "Rp 910 Jt", "98%"],
                    ["Pemberdayaan Masyarakat", "Rp 663 Jt", "Rp 620 Jt", "94%"],
                    ["Penyelenggaraan Pemerintahan", "Rp 530 Jt", "Rp 525 Jt", "99%"],
                    ["Pembinaan Kemasyarakatan", "Rp 318 Jt", "Rp 300 Jt", "94%"],
                    ["Penanggulangan Bencana", "Rp 212 Jt", "Rp 195 Jt", "92%"],
                  ].map(([u, a, r, p]) => (
                    <tr key={u} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium text-foreground">{u}</td>
                      <td className="p-3 text-right text-muted-foreground">{a}</td>
                      <td className="p-3 text-right text-muted-foreground">{r}</td>
                      <td className="p-3 text-right font-semibold text-primary">{p}</td>
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
