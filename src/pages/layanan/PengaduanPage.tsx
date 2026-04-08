import Layout from "@/components/layout/Layout";
import { MessageSquareWarning, Upload, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const statusPlaceholder = [
  { no: "PD-2026-0089", judul: "Jalan berlubang di Dusun II", tgl: "4 Apr 2026", status: "Ditindaklanjuti", color: "text-primary bg-primary/10" },
  { no: "PD-2026-0088", judul: "Lampu jalan mati RT 05", tgl: "2 Apr 2026", status: "Diproses", color: "text-accent bg-accent/10" },
  { no: "PD-2026-0087", judul: "Saluran air tersumbat", tgl: "28 Mar 2026", status: "Selesai", color: "text-primary bg-primary/10" },
];

const PengaduanPage = () => (
  <Layout>
    <section className="gradient-primary text-primary-foreground py-16 md:py-20">
      <div className="container-village">
        <span className="text-sm font-medium opacity-80">Layanan &gt; Pengaduan</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Pengaduan Masyarakat</h1>
        <p className="mt-3 opacity-90 max-w-2xl">Sampaikan keluhan, saran, atau laporan Anda kepada Pemerintah Desa.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-village max-w-4xl">
        {/* Form */}
        <div className="card-village p-6 md:p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Form Pengaduan</h2>
          </div>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nama Lengkap</label>
                <input type="text" placeholder="Masukkan nama" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">No. Telepon</label>
                <input type="tel" placeholder="08xxxxxxxxxx" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Kategori</label>
              <select className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none">
                <option>Pilih kategori</option>
                <option>Infrastruktur</option>
                <option>Pelayanan Publik</option>
                <option>Lingkungan</option>
                <option>Keamanan</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Judul Pengaduan</label>
              <input type="text" placeholder="Ringkasan masalah" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Isi Pengaduan</label>
              <textarea rows={4} placeholder="Jelaskan masalah secara detail..." className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Lampiran (opsional)</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Klik atau seret file ke sini</p>
                <p className="text-xs opacity-60 mt-1">JPG, PNG, PDF (maks 5MB)</p>
              </div>
            </div>
            <button className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">Kirim Pengaduan</button>
          </div>
        </div>

        {/* Status */}
        <h2 className="text-xl font-bold text-foreground mb-4">Status Laporan</h2>
        <div className="card-village overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">No. Laporan</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Judul</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Tanggal</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {statusPlaceholder.map((s) => (
                  <tr key={s.no} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-3 font-medium text-foreground">{s.no}</td>
                    <td className="p-3 text-muted-foreground">{s.judul}</td>
                    <td className="p-3 text-muted-foreground">{s.tgl}</td>
                    <td className="p-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}>
                        {s.status === "Selesai" && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                        {s.status === "Diproses" && <Clock className="w-3 h-3 inline mr-1" />}
                        {s.status === "Ditindaklanjuti" && <AlertCircle className="w-3 h-3 inline mr-1" />}
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default PengaduanPage;
