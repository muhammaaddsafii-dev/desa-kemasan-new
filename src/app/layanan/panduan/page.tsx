import { ArrowUpRight, BookOpen, FileText, HelpCircle, LogIn, MessageCircle, PlayCircle, Youtube } from "lucide-react";
import Link from "next/link";

import { PanduanViewer } from "@/components/layanan/panduan-viewer";
import { VideoPanduan } from "@/components/layanan/video-panduan";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPanduanList } from "@/lib/data/layanan";
import { VIDEO_PANDUAN } from "@/lib/data/video-panduan";
import { youtubeId } from "@/lib/youtube";
import type { Panduan } from "@/lib/types/layanan";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

const faqs = [
  { q: "Berapa lama proses pembuatan surat?", a: "Umumnya 1-3 hari kerja tergantung jenis surat. Surat pengantar biasa selesai dalam 1 hari kerja, sedangkan surat yang memerlukan verifikasi lapangan membutuhkan 2-3 hari kerja." },
  { q: "Apakah layanan online ini gratis?", a: "Ya, seluruh layanan administrasi desa tidak dipungut biaya (gratis). Jika ada pihak yang meminta bayaran, silakan laporkan melalui menu Pengaduan." },
  { q: "Bagaimana jika permohonan ditolak?", a: "Anda akan menerima notifikasi beserta alasan penolakan. Perbaiki data yang kurang dan ajukan kembali, atau datang langsung ke kantor desa untuk konsultasi." },
  { q: "Jam berapa kantor desa buka?", a: "Kantor desa buka Senin–Jumat pukul 08:00–16:00 WIB. Untuk layanan online, Anda dapat mengajukan kapan saja selama 24 jam." },
];

function SectionTitle({ id, icon: Icon, tone, title, desc }: { id: string; icon: typeof FileText; tone: string; title: string; desc: string }) {
  return (
    <div id={id} className="mb-6 flex scroll-mt-24 items-start gap-4">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Kosong({ icon: Icon, judul, pesan }: { icon: typeof FileText; judul: string; pesan: string }) {
  return (
    <div className="card-village flex flex-col items-center gap-2 border-dashed py-12 text-center">
      <Icon className="h-10 w-10 text-muted-foreground/50" />
      <p className="font-semibold text-foreground">{judul}</p>
      <p className="max-w-md text-sm text-muted-foreground">{pesan}</p>
    </div>
  );
}

export default async function PanduanPage() {
  const adminUrl = process.env.ADMIN_URL ?? "http://localhost:3000/";

  let dokumen: Panduan[] = [];
  let gagalMemuat = false;
  try {
    dokumen = (await getPanduanList()).filter((p) => p.file);
  } catch {
    gagalMemuat = true;
  }

  const videoValid = VIDEO_PANDUAN.filter((v) => youtubeId(v.url) !== null);

  return (
    <>
      <section className="gradient-primary py-16 text-primary-foreground md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Layanan &gt; Panduan</span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Panduan Layanan</h1>
          <p className="mt-3 max-w-2xl opacity-90">
            Pelajari cara menggunakan layanan desa secara online lewat dokumen panduan dan video tutorial, lengkap dengan jawaban atas pertanyaan yang sering diajukan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "#dokumen", icon: FileText, label: "Dokumen PDF", jumlah: dokumen.length },
              { href: "#video", icon: PlayCircle, label: "Video Tutorial", jumlah: videoValid.length },
              { href: "#faq", icon: HelpCircle, label: "FAQ", jumlah: faqs.length },
            ].map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/25"
              >
                <a.icon className="h-4 w-4" />
                {a.label}
                <span className="rounded-full bg-white/25 px-2 py-0.5 text-xs font-bold">{a.jumlah}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village space-y-16">
          {/* Dokumen PDF */}
          <div>
            <SectionTitle
              id="dokumen"
              icon={FileText}
              tone="bg-red-100 text-red-700"
              title="Dokumen Panduan"
              desc="Panduan resmi tiap jenis layanan (syarat, alur, dan formulir) dalam format PDF. Pilih dokumen untuk melihat pratinjaunya."
            />
            {gagalMemuat ? (
              <Kosong icon={FileText} judul="Dokumen belum dapat dimuat" pesan="Terjadi gangguan saat mengambil daftar dokumen. Muat ulang halaman beberapa saat lagi." />
            ) : dokumen.length === 0 ? (
              <Kosong icon={FileText} judul="Belum ada dokumen panduan" pesan="Dokumen panduan akan ditampilkan di sini setelah diunggah oleh petugas desa." />
            ) : (
              <PanduanViewer items={dokumen} />
            )}
          </div>

          {/* Video YouTube */}
          <div>
            <SectionTitle
              id="video"
              icon={Youtube}
              tone="bg-red-100 text-red-600"
              title="Video Tutorial"
              desc="Tonton langkah demi langkah penggunaan layanan desa online."
            />
            {videoValid.length > 0 ? (
              <VideoPanduan videos={videoValid} />
            ) : (
              <Kosong icon={PlayCircle} judul="Video tutorial segera hadir" pesan="Video panduan dari kanal YouTube desa akan ditampilkan di sini." />
            )}
          </div>

          {/* FAQ (kiri) + ajakan aksi (kanan) - satu baris, lebar penuh mengikuti bagian lain */}
          <div className="grid items-start gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionTitle id="faq" icon={HelpCircle} tone="bg-blue-100 text-blue-700" title="Pertanyaan yang Sering Diajukan" desc="Jawaban singkat atas hal-hal yang paling sering ditanyakan warga." />
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`} className="card-village border px-5">
                    <AccordionTrigger className="py-4 text-left text-sm font-medium text-foreground hover:text-primary hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <aside className="space-y-5 lg:col-span-2 lg:sticky lg:top-24 lg:pt-1">
              <div className="gradient-primary rounded-2xl p-6 text-primary-foreground">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug">Sudah paham? Mulai layanan sekarang</h3>
                    <p className="mt-1.5 text-sm opacity-90">Masuk ke Portal Warga untuk mengajukan surat atau menyampaikan pengaduan.</p>
                  </div>
                </div>
                <a
                  href={adminUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
                >
                  <LogIn className="h-4 w-4" />
                  Login ke Portal Warga
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="card-village p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-foreground">Masih butuh bantuan?</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">Hubungi petugas desa lewat WhatsApp, telepon, atau datang langsung ke kantor desa.</p>
                  </div>
                </div>
                <Link
                  href="/kontak"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Hubungi Kami
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
