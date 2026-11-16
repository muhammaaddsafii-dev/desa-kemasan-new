import Link from "next/link";
import { ArrowUp, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { getAssetsCurrent } from "@/lib/data/profil";
import { toWhatsAppLink } from "@/lib/format";

const navigasi = [
  { href: "/", label: "Beranda" },
  { href: "/profil/tentang", label: "Profil Desa" },
  { href: "/info/pengumuman", label: "Pengumuman" },
  { href: "/info/kegiatan", label: "Kegiatan" },
  { href: "/data/statistik-kependudukan", label: "Data Desa" },
];

const layanan = [
  { href: "/layanan/surat-online", label: "Surat Online" },
  { href: "/layanan/pengaduan", label: "Pengaduan Masyarakat" },
  { href: "/layanan/panduan", label: "Panduan Layanan" },
  { href: "/kontak", label: "Hubungi Kami" },
];

function FooterLinks({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider">
        {title}
        <span className="mt-2 block h-0.5 w-8 rounded-full bg-primary-foreground/50" />
      </h4>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-1 opacity-80 transition-all hover:translate-x-0.5 hover:opacity-100"
            >
              <ChevronRight className="h-3.5 w-3.5 -ml-1 opacity-0 transition-opacity group-hover:opacity-100" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = async () => {
  const assets = await getAssetsCurrent();
  const nama = assets?.nama ?? "Desa Sukamakmur";
  const lokasi = assets?.lokasi ?? "Kab. Bandung Barat";
  const email = assets?.email ?? "desa@sukamakmur.desa.id";
  const kontak = assets?.kontak ?? "(022) 123-4567";
  const waLink = toWhatsAppLink(assets?.kontak) ?? "https://wa.me/62221234567";

  const kontakItems = [
    { icon: MapPin, text: lokasi },
    { icon: Phone, text: kontak, href: `tel:${kontak.replace(/[^0-9+]/g, "")}` },
    { icon: Mail, text: email, href: `mailto:${email}` },
    { icon: Clock, text: "Senin – Jumat, 08:00 – 16:00 WIB" },
  ];

  return (
    <footer className="relative overflow-hidden gradient-primary text-primary-foreground">
      {/* Dekorasi latar: tekstur foto desa + lambang besar samar */}
      {/* eslint-disable-next-line @next/next/no-img-element -- gambar dekoratif statis di /public */}
      <img src="/hero-desa.jpg" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07] mix-blend-luminosity" />
      {/* eslint-disable-next-line @next/next/no-img-element -- logo statis di /public */}
      <img
        src="/logo.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-6 hidden h-80 w-auto rotate-6 rounded-3xl opacity-[0.06] mix-blend-luminosity lg:block"
      />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-white/70 to-amber-400 opacity-70" />

      <div className="container-village relative py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="flex h-20 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-xl shadow-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo statis di /public, tidak perlu optimasi next/image */}
                <img src="/logo.jpg" alt={`Lambang ${nama}`} className="h-full w-full object-contain" />
              </span>
              <div>
                <span className="block text-xl font-bold leading-tight">{nama}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs opacity-80">
                  <MapPin className="h-3 w-3" />
                  {lokasi}
                </span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed opacity-80">
              Portal resmi {nama} — pusat informasi, layanan publik, dan data desa untuk masyarakat.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi lewat WhatsApp"
                title="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-green-500"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Kirim email"
                title="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={`tel:${kontak.replace(/[^0-9+]/g, "")}`}
                aria-label="Telepon"
                title="Telepon"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterLinks title="Navigasi" items={navigasi} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinks title="Layanan" items={layanan} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider">
              Kontak
              <span className="mt-2 block h-0.5 w-8 rounded-full bg-primary-foreground/50" />
            </h4>
            <ul className="space-y-3 text-sm">
              {kontakItems.map((item) => {
                const isi = (
                  <>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 break-words pt-1 opacity-90">{item.text}</span>
                  </>
                );
                return (
                  <li key={item.text}>
                    {item.href ? (
                      <a href={item.href} className="flex items-start gap-3 transition-opacity hover:opacity-100">
                        {isi}
                      </a>
                    ) : (
                      <div className="flex items-start gap-3">{isi}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-7 text-sm md:flex-row">
          <p className="opacity-70">© 2026 {nama}. Hak cipta dilindungi.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="flex items-center gap-2 opacity-70">
              <span className="flex h-6 w-5 items-center justify-center rounded bg-white p-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo statis di /public */}
                <img src="/logo.jpg" alt="" aria-hidden className="h-full w-full object-contain" />
              </span>
              Didukung oleh Pemerintah Kabupaten Boyolali
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-white/25"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Kembali ke atas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
