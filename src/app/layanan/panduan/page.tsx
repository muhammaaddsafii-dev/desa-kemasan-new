import { FileStack, ArrowUpRight, LogIn } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Berapa lama proses pembuatan surat?", a: "Umumnya 1-3 hari kerja tergantung jenis surat. Surat pengantar biasa selesai dalam 1 hari kerja, sedangkan surat yang memerlukan verifikasi lapangan membutuhkan 2-3 hari kerja." },
  { q: "Apakah layanan online ini gratis?", a: "Ya, seluruh layanan administrasi desa tidak dipungut biaya (gratis). Jika ada pihak yang meminta bayaran, silakan laporkan melalui menu Pengaduan." },
  { q: "Bagaimana jika permohonan ditolak?", a: "Anda akan menerima notifikasi beserta alasan penolakan. Perbaiki data yang kurang dan ajukan kembali, atau datang langsung ke kantor desa untuk konsultasi." },
  { q: "Jam berapa kantor desa buka?", a: "Kantor desa buka Senin–Jumat pukul 08:00–16:00 WIB. Untuk layanan online, Anda dapat mengajukan kapan saja selama 24 jam." },
];

export default function PanduanPage() {
  const adminUrl = process.env.ADMIN_URL ?? "http://localhost:3000/";

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
          {/* Dashboard callout */}
          <div className="card-village p-6 mb-16 flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FileStack className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Dokumen Panduan Lengkap di Portal Warga</h3>
              <p className="text-sm text-muted-foreground">
                Seluruh panduan resmi tiap jenis layanan (syarat, alur, dan formulir) tersedia di dashboard Portal
                Warga. Silakan login terlebih dahulu untuk mengaksesnya.
              </p>
            </div>
            <a
              href={adminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
            >
              <LogIn className="w-4 h-4" />
              Login ke Portal Warga
              <ArrowUpRight className="w-4 h-4" />
            </a>
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
