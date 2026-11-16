import { ClipboardList, Clock3, Download, FileText, LogIn } from "lucide-react";

import {
  CtaLayanan,
  LangkahLayanan,
  LayananHero,
  PertanyaanUmum,
  RingkasanStatus,
  type Langkah,
} from "@/components/layanan/layanan-sections";
import { PapanStatus, type PapanRow } from "@/components/layanan/papan-status";
import { getPermohonanSuratPublik } from "@/lib/data/layanan";

function toJudulSurat(type: string): string {
  return type.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Papan status bersifat publik, jadi nama pemohon disamarkan: "Agus Salim (Pemohon 5)" -> "Agus S." */
function samarkanNama(nama: string): string {
  const [depan, ...sisa] = nama.replace(/\(.*?\)/g, "").trim().split(/\s+/).filter(Boolean);
  if (!depan) return "Pemohon";
  return [depan, ...sisa.map((kata) => `${kata.charAt(0).toUpperCase()}.`)].join(" ");
}

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

const langkah: Langkah[] = [
  { icon: LogIn, title: "Masuk Portal Warga", desc: "Login dengan akun warga Anda di Portal Warga." },
  { icon: ClipboardList, title: "Isi Permohonan", desc: "Pilih jenis surat keterangan lalu lengkapi formulirnya." },
  { icon: Clock3, title: "Pantau Prosesnya", desc: "Lihat status: diajukan, diproses, hingga selesai." },
  { icon: Download, title: "Unduh Dokumen", desc: "Setelah selesai, dokumen dapat diunduh dari akun Anda." },
];

export default async function SuratOnline() {
  const adminUrl = process.env.ADMIN_URL ?? "http://localhost:3000/";
  const permohonan = await getPermohonanSuratPublik();

  const rows: PapanRow[] = permohonan.map((p) => ({
    kode: p.kode_lacak,
    judul: toJudulSurat(p.type),
    keterangan: `Pemohon: ${samarkanNama(p.nama_pemohon)}`,
    tanggal: p.created_at,
    status: p.status,
  }));

  // Jenis surat yang paling sering diajukan.
  const perJenis = new Map<string, number>();
  permohonan.forEach((p) => perJenis.set(toJudulSurat(p.type), (perJenis.get(toJudulSurat(p.type)) ?? 0) + 1));
  const jenisPopuler = [...perJenis.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <>
      <LayananHero
        breadcrumb="Layanan > Surat Online"
        title="Pengajuan Surat Online"
        description="Ajukan permohonan surat keterangan tanpa perlu datang ke kantor desa. Pantau prosesnya dan unduh dokumen setelah selesai melalui Portal Warga."
        ctaLabel="Ajukan Surat Sekarang"
        ctaHref={adminUrl}
        poin={["Bisa diajukan 24 jam", "Status dapat dipantau", "Data pribadi terlindungi"]}
      />

      <section className="section-padding">
        <div className="container-village space-y-14">
          <LangkahLayanan
            judul="Cara Mengajukan Surat"
            deskripsi="Empat langkah mudah dari rumah, tanpa antre di kantor desa."
            langkah={langkah}
          />

          <div>
            <h2 className="mb-5 text-2xl font-bold text-foreground">Status Permohonan Terkini</h2>
            <RingkasanStatus judul="Total Permohonan" status={rows.map((r) => r.status)} />
          </div>

          {jenisPopuler.length > 0 && (
            <div className="card-village p-6">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Jenis surat yang sering diajukan
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {jenisPopuler.map(([jenis, jumlah]) => (
                  <span key={jenis} className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-1.5 text-sm text-foreground">
                    {jenis}
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{jumlah}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-foreground">Papan Status Permohonan</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Papan status publik. Gunakan kode lacak untuk memeriksa permohonan Anda di Portal Warga.
              </p>
            </div>
            <PapanStatus rows={rows} judulKolom="Jenis Surat" kosong="Belum ada permohonan surat yang tercatat." />
          </div>

          <PertanyaanUmum
            judul="Pertanyaan Umum"
            items={[
              {
                q: "Apakah saya harus datang ke kantor desa?",
                a: "Pengajuan dilakukan sepenuhnya online lewat Portal Warga. Dokumen yang sudah selesai dapat diunduh dari akun Anda.",
              },
              {
                q: "Bagaimana cara mengetahui permohonan saya sudah diproses?",
                a: "Setiap permohonan punya status (diajukan, diproses, selesai) yang bisa dilihat di akun Anda, dan kode lacaknya juga tampil di papan status di halaman ini.",
              },
              {
                q: "Apakah data pribadi saya aman?",
                a: "Data pribadi pemohon hanya dapat dilihat oleh Anda dan petugas desa yang berwenang.",
              },
            ]}
          />

          <CtaLayanan
            judul="Siap mengajukan surat?"
            deskripsi="Masuk ke Portal Warga untuk memulai permohonan Anda sekarang."
            label="Buka Portal Warga"
            href={adminUrl}
          />
        </div>
      </section>
    </>
  );
}
