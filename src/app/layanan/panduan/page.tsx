import { BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const steps = [
  { step: "1", title: "Buka Menu Layanan", desc: "Akses halaman layanan yang diinginkan melalui menu navigasi." },
  { step: "2", title: "Isi Formulir Online", desc: "Lengkapi formulir dengan data yang benar dan lengkap." },
  { step: "3", title: "Upload Dokumen", desc: "Unggah dokumen pendukung yang diperlukan (KTP, KK, dll)." },
  { step: "4", title: "Kirim Permohonan", desc: "Klik tombol kirim dan catat nomor pengajuan Anda." },
  { step: "5", title: "Pantau Status", desc: "Cek status pengajuan secara berkala melalui halaman status." },
  { step: "6", title: "Ambil Dokumen", desc: "Setelah selesai, ambil dokumen di kantor desa atau unduh secara digital." },
];

const faqs = [
  { q: "Berapa lama proses pembuatan surat?", a: "Umumnya 1-3 hari kerja tergantung jenis surat. Surat pengantar biasa selesai dalam 1 hari kerja, sedangkan surat yang memerlukan verifikasi lapangan membutuhkan 2-3 hari kerja." },
  { q: "Dokumen apa saja yang perlu disiapkan?", a: "Secara umum: KTP, KK, dan dokumen pendukung sesuai jenis layanan. Untuk surat keterangan usaha tambahkan foto lokasi usaha. Untuk surat pindah tambahkan surat pengantar RT/RW." },
  { q: "Apakah layanan online ini gratis?", a: "Ya, seluruh layanan administrasi desa tidak dipungut biaya (gratis). Jika ada pihak yang meminta bayaran, silakan laporkan melalui menu Pengaduan." },
  { q: "Bagaimana jika permohonan ditolak?", a: "Anda akan menerima notifikasi beserta alasan penolakan. Perbaiki data yang kurang dan ajukan kembali, atau datang langsung ke kantor desa untuk konsultasi." },
  { q: "Apakah bisa mengajukan surat untuk orang lain?", a: "Bisa, dengan syarat melampirkan surat kuasa bermaterai dan fotokopi KTP pemberi kuasa serta penerima kuasa." },
  { q: "Jam berapa kantor desa buka?", a: "Kantor desa buka Senin–Jumat pukul 08:00–16:00 WIB. Untuk layanan online, Anda dapat mengajukan kapan saja selama 24 jam." },
];

export default function PanduanPage() {
  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Layanan &gt; Panduan</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Panduan Layanan</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Langkah-langkah menggunakan layanan desa secara online dan informasi yang sering ditanyakan.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-4xl">
          {/* Steps */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Langkah-Langkah Pengajuan Online</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {steps.map((s) => (
              <div key={s.step} className="card-village p-5 relative">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm mb-3">{s.step}</div>
                <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="text-xl font-bold text-foreground mb-6">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="card-village px-5 border">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary py-4 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
