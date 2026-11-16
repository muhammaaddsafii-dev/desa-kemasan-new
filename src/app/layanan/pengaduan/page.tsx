import { CheckCircle2, Clock3, LogIn, PenLine, ShieldCheck, Lightbulb } from "lucide-react";

import {
  CtaLayanan,
  LangkahLayanan,
  LayananHero,
  PertanyaanUmum,
  RingkasanStatus,
  type Langkah,
} from "@/components/layanan/layanan-sections";
import { PapanStatus, type PapanRow } from "@/components/layanan/papan-status";
import { getAduanMasyarakatPublik } from "@/lib/data/layanan";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

const langkah: Langkah[] = [
  { icon: LogIn, title: "Masuk Portal Warga", desc: "Login dengan akun warga Anda di Portal Warga." },
  { icon: PenLine, title: "Tulis Pengaduan", desc: "Ceritakan keluhan, masalah, atau usulan Anda dengan jelas." },
  { icon: Clock3, title: "Ditindaklanjuti", desc: "Petugas desa memeriksa dan menindaklanjuti laporan Anda." },
  { icon: CheckCircle2, title: "Pantau Hingga Selesai", desc: "Lihat perkembangannya langsung dari akun Anda." },
];

const tips = [
  "Tulis perihal yang singkat dan jelas, mis. \"Lampu jalan RT 03 mati\".",
  "Sebutkan lokasi sedetail mungkin (dusun, RT/RW, atau patokan).",
  "Ceritakan kapan kejadiannya dan dampak yang dirasakan.",
  "Lampirkan foto bila ada agar petugas lebih mudah memahami.",
];

export default async function Pengaduan() {
  const adminUrl = process.env.ADMIN_URL ?? "http://localhost:3000/";
  const aduan = await getAduanMasyarakatPublik();

  const rows: PapanRow[] = aduan.map((a) => ({
    kode: a.kode_lacak,
    judul: a.subject,
    tanggal: a.created_at,
    status: a.status,
  }));

  return (
    <>
      <LayananHero
        breadcrumb="Layanan > Pengaduan"
        title="Pengaduan Masyarakat"
        description="Sampaikan laporan atau pengaduan Anda secara online tanpa perlu datang ke kantor desa, lalu pantau tindak lanjutnya melalui Portal Warga."
        ctaLabel="Ajukan Pengaduan Sekarang"
        ctaHref={adminUrl}
        poin={["Bisa disampaikan 24 jam", "Tindak lanjut dapat dipantau", "Identitas pelapor terlindungi"]}
      />

      <section className="section-padding">
        <div className="container-village space-y-14">
          <LangkahLayanan
            judul="Cara Menyampaikan Pengaduan"
            deskripsi="Empat langkah sederhana untuk menyuarakan keluhan atau usulan Anda."
            langkah={langkah}
          />

          <div>
            <h2 className="mb-5 text-2xl font-bold text-foreground">Tindak Lanjut Pengaduan</h2>
            <RingkasanStatus judul="Total Pengaduan" status={rows.map((r) => r.status)} />
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="card-village p-6 lg:col-span-3">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Tips agar pengaduan cepat ditangani
              </h3>
              <ul className="mt-4 space-y-3">
                {tips.map((t, i) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-village flex flex-col justify-center bg-green-50/60 p-6 lg:col-span-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">Identitas Terlindungi</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Identitas pelapor hanya dapat dilihat oleh Anda dan petugas desa yang berwenang. Papan status publik hanya menampilkan kode lacak dan perihal.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-foreground">Papan Status Pengaduan</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Papan status publik. Gunakan kode lacak untuk memeriksa pengaduan Anda di Portal Warga.
              </p>
            </div>
            <PapanStatus rows={rows} judulKolom="Perihal" kosong="Belum ada pengaduan yang tercatat." />
          </div>

          <PertanyaanUmum
            judul="Pertanyaan Umum"
            items={[
              {
                q: "Hal apa saja yang bisa saya adukan?",
                a: "Keluhan, masalah, atau usulan terkait layanan dan lingkungan desa, misalnya fasilitas umum, kondisi jalan, atau pelayanan perangkat desa.",
              },
              {
                q: "Bagaimana saya tahu pengaduan saya ditindaklanjuti?",
                a: "Setiap pengaduan punya status (diajukan, diproses, selesai) yang dapat dipantau dari akun Anda. Kode lacaknya juga muncul di papan status halaman ini.",
              },
              {
                q: "Apakah laporan saya bisa dilihat orang lain?",
                a: "Papan status publik hanya menampilkan kode lacak, perihal, tanggal, dan status. Isi laporan dan identitas Anda hanya bisa dilihat oleh Anda dan petugas yang berwenang.",
              },
            ]}
          />

          <CtaLayanan
            judul="Punya keluhan atau usulan?"
            deskripsi="Sampaikan sekarang lewat Portal Warga. Suara Anda membantu desa menjadi lebih baik."
            label="Buka Portal Warga"
            href={adminUrl}
          />
        </div>
      </section>
    </>
  );
}
