import { MessageSquareWarning, Clock3, ShieldCheck, ArrowUpRight } from "lucide-react";
import { getAduanMasyarakatPublik } from "@/lib/data/layanan";
import { formatTanggalDariTimestamp } from "@/lib/format";
import { StatusBadge } from "@/components/layanan/status-badge";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

export default async function Pengaduan() {
  const adminUrl = process.env.ADMIN_URL ?? "http://localhost:3000/";
  const aduan = await getAduanMasyarakatPublik();

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Layanan &gt; Pengaduan</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Pengaduan Masyarakat</h1>
          <p className="mt-3 opacity-90 max-w-2xl">
            Sekarang laporan atau pengaduan warga dapat disampaikan secara online tanpa perlu datang ke kantor desa.
            Sampaikan aduan Anda, pantau tindak lanjutnya, melalui Portal Warga.
          </p>
          <a
            href={adminUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity"
          >
            Ajukan Pengaduan Sekarang
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-village p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <MessageSquareWarning className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Sampaikan Kapan Saja</h3>
              <p className="text-sm text-muted-foreground">
                Laporkan keluhan, masalah, atau usulan Anda secara online, 24 jam melalui Portal Warga.
              </p>
            </div>
            <div className="card-village p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Clock3 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Pantau Tindak Lanjut</h3>
              <p className="text-sm text-muted-foreground">
                Cek perkembangan aduan—dari diajukan, diproses, hingga selesai—langsung dari akun Anda.
              </p>
            </div>
            <div className="card-village p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Identitas Terlindungi</h3>
              <p className="text-sm text-muted-foreground">
                Identitas pelapor hanya dapat dilihat oleh Anda dan petugas desa yang berwenang.
              </p>
            </div>
          </div>

          <div className="card-village overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-semibold text-foreground">Status Pengaduan Terbaru</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Papan status publik — gunakan kode lacak untuk memeriksa pengaduan Anda di Portal Warga.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">Kode Lacak</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Perihal</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Tanggal Pengaduan</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {aduan.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-muted-foreground">
                        Belum ada pengaduan yang tercatat.
                      </td>
                    </tr>
                  ) : (
                    aduan.map((a) => (
                      <tr key={a.kode_lacak} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-mono text-xs font-medium text-foreground">{a.kode_lacak}</td>
                        <td className="p-3 text-foreground">{a.subject}</td>
                        <td className="p-3 text-muted-foreground">{formatTanggalDariTimestamp(a.created_at)}</td>
                        <td className="p-3">
                          <StatusBadge status={a.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
