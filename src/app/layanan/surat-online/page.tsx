import { FileText, Clock3, ShieldCheck, ArrowUpRight } from "lucide-react";
import { getPermohonanSuratPublik } from "@/lib/data/layanan";
import { formatTanggalDariTimestamp } from "@/lib/format";
import { StatusBadge } from "@/components/layanan/status-badge";

function toJudulSurat(type: string): string {
  return type.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

export default async function SuratOnline() {
  const adminUrl = process.env.ADMIN_URL ?? "http://localhost:3000/";
  const permohonan = await getPermohonanSuratPublik();

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Layanan &gt; Surat Online</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Pengajuan Surat Online</h1>
          <p className="mt-3 opacity-90 max-w-2xl">
            Sekarang permohonan surat keterangan dapat diajukan secara online tanpa perlu datang ke kantor desa.
            Ajukan permohonan, pantau prosesnya, dan unduh dokumen setelah selesai melalui Portal Warga.
          </p>
          <a
            href={adminUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity"
          >
            Ajukan Surat Sekarang
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-village p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Ajukan Kapan Saja</h3>
              <p className="text-sm text-muted-foreground">
                Isi formulir permohonan surat keterangan secara online, 24 jam melalui Portal Warga.
              </p>
            </div>
            <div className="card-village p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Clock3 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Pantau Statusnya</h3>
              <p className="text-sm text-muted-foreground">
                Cek perkembangan permohonan—dari diajukan, diproses, hingga selesai—langsung dari akun Anda.
              </p>
            </div>
            <div className="card-village p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Data Anda Aman</h3>
              <p className="text-sm text-muted-foreground">
                Data pribadi pemohon hanya dapat dilihat oleh Anda dan petugas desa yang berwenang.
              </p>
            </div>
          </div>

          <div className="card-village overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-semibold text-foreground">Status Permohonan Surat Terbaru</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Papan status publik — gunakan kode lacak untuk memeriksa permohonan Anda di Portal Warga.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">Kode Lacak</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Nama Pemohon</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Jenis Surat</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Tanggal Pengajuan</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {permohonan.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-muted-foreground">
                        Belum ada permohonan surat yang tercatat.
                      </td>
                    </tr>
                  ) : (
                    permohonan.map((p) => (
                      <tr key={p.kode_lacak} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-mono text-xs font-medium text-foreground">{p.kode_lacak}</td>
                        <td className="p-3 text-foreground">{p.nama_pemohon}</td>
                        <td className="p-3 text-foreground">{toJudulSurat(p.type)}</td>
                        <td className="p-3 text-muted-foreground">{formatTanggalDariTimestamp(p.created_at)}</td>
                        <td className="p-3">
                          <StatusBadge status={p.status} />
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
