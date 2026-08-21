import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

import { getAssetsCurrent } from "@/lib/data/profil";
import { toWhatsAppLink } from "@/lib/format";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

export default async function Kontak() {
  const assets = await getAssetsCurrent();
  const nama = assets?.nama ?? "Desa Sukamakmur";
  const lokasi = assets?.lokasi ?? "Jl. Raya Sukamakmur No. 01, Desa Sukamakmur, Kec. Cisarua, Kab. Bandung Barat, Jawa Barat 40551";
  const kontak = assets?.kontak ?? "(022) 123-4567";
  const email = assets?.email ?? "desa@sukamakmur.desa.id";
  const waLink = toWhatsAppLink(assets?.kontak) ?? "https://wa.me/62221234567";

  const contacts = [
    { icon: MapPin, label: "Alamat", value: lokasi },
    { icon: Phone, label: "Telepon", value: kontak },
    { icon: Mail, label: "Email", value: email },
    { icon: Clock, label: "Jam Operasional", value: "Senin – Jumat, 08:00 – 16:00 WIB\nSabtu – Minggu: Tutup" },
  ];

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <h1 className="text-3xl md:text-4xl font-bold">Hubungi Kami</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Silakan hubungi Kantor {nama} untuk informasi dan layanan lebih lanjut.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Info */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">Informasi Kontak</h2>
              <div className="space-y-5 mb-8">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{c.label}</span>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-primary-foreground font-semibold hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat via WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="card-village p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Kirim Pesan</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input type="email" placeholder="email@contoh.com" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Subjek</label>
                  <input type="text" placeholder="Subjek pesan" className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Pesan</label>
                  <textarea rows={4} placeholder="Tulis pesan Anda..." className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none" />
                </div>
                <button className="w-full gradient-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">Kirim Pesan</button>
              </div>
            </div>
          </div>

          {/* Peta Lokasi */}
          <div className="mt-12 card-village overflow-hidden">
            <iframe
              title={`Lokasi Kantor ${nama}`}
              src="https://www.google.com/maps?q=-7.5738333,110.6809575&z=16&output=embed"
              className="w-full h-72 md:h-96 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
