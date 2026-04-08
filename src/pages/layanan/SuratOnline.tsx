import Layout from "@/components/layout/Layout";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const suratTypes = [
  { title: "Surat Keterangan Domisili", desc: "Untuk keperluan administrasi tempat tinggal", time: "1-2 hari kerja" },
  { title: "Surat Keterangan Tidak Mampu", desc: "Untuk bantuan sosial dan keringanan biaya", time: "1-2 hari kerja" },
  { title: "Surat Pengantar KTP/KK", desc: "Pengantar pembuatan atau perubahan KTP/KK", time: "1 hari kerja" },
  { title: "Surat Keterangan Usaha", desc: "Untuk keperluan perizinan usaha dan UMKM", time: "2-3 hari kerja" },
  { title: "Surat Keterangan Pindah", desc: "Untuk keperluan pindah domisili", time: "2-3 hari kerja" },
  { title: "Surat Pengantar Nikah (N1/N2/N4)", desc: "Pengantar untuk pencatatan pernikahan", time: "1-2 hari kerja" },
];

const statusPlaceholder = [
  { no: "SM-2026-0412", jenis: "Surat Keterangan Domisili", tgl: "5 Apr 2026", status: "Selesai", statusColor: "text-primary bg-primary/10" },
  { no: "SM-2026-0411", jenis: "Surat Pengantar KTP", tgl: "4 Apr 2026", status: "Diproses", statusColor: "text-accent bg-accent/10" },
  { no: "SM-2026-0410", jenis: "Surat Keterangan Usaha", tgl: "3 Apr 2026", status: "Menunggu", statusColor: "text-muted-foreground bg-muted" },
];

const SuratOnline = () => (
  <Layout>
    <section className="gradient-primary text-primary-foreground py-16 md:py-20">
      <div className="container-village">
        <span className="text-sm font-medium opacity-80">Layanan &gt; Surat Online</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Surat Online</h1>
        <p className="mt-3 opacity-90 max-w-2xl">Ajukan pembuatan surat secara online tanpa perlu datang ke kantor desa.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-village">
        {/* Card pilihan surat */}
        <h2 className="text-xl font-bold text-foreground mb-6">Pilih Jenis Surat</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {suratTypes.map((s) => (
            <div key={s.title} className="card-village p-5 cursor-pointer group hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary mt-2"><Clock className="w-3 h-3" />{s.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Placeholder */}
        <div className="card-village p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Form Pengajuan Surat</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama lengkap" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">NIK</label>
              <input type="text" placeholder="Masukkan NIK" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Jenis Surat</label>
              <select className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none">
                <option>Pilih jenis surat</option>
                {suratTypes.map((s) => <option key={s.title}>{s.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">No. Telepon</label>
              <input type="tel" placeholder="08xxxxxxxxxx" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">Keperluan / Keterangan</label>
              <textarea rows={3} placeholder="Jelaskan keperluan surat..." className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none" />
            </div>
          </div>
          <button className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">Ajukan Surat</button>
        </div>

        {/* Status Placeholder */}
        <h2 className="text-xl font-bold text-foreground mb-4">Status Pengajuan</h2>
        <div className="card-village overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium text-muted-foreground">No. Pengajuan</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Jenis Surat</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Tanggal</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {statusPlaceholder.map((s) => (
                  <tr key={s.no} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-3 font-medium text-foreground">{s.no}</td>
                    <td className="p-3 text-muted-foreground">{s.jenis}</td>
                    <td className="p-3 text-muted-foreground">{s.tgl}</td>
                    <td className="p-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.statusColor}`}>
                        {s.status === "Selesai" && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                        {s.status === "Diproses" && <Clock className="w-3 h-3 inline mr-1" />}
                        {s.status === "Menunggu" && <AlertCircle className="w-3 h-3 inline mr-1" />}
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

export default SuratOnline;
