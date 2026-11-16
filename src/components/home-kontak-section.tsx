import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SafeImage } from "@/components/safe-image";

interface HomeKontakSectionProps {
  nama: string;
  lokasi: string;
  kontak: string;
  email: string;
  waLink: string;
  /** URL foto latar (hero desa). */
  gambar: string;
}

/** Bagian kontak singkat di akhir beranda: panel foto + logo di kiri, daftar kontak yang bisa diklik di kanan. */
export function HomeKontakSection({ nama, lokasi, kontak, email, waLink, gambar }: HomeKontakSectionProps) {
  const telDigits = kontak.replace(/[^0-9+]/g, "");
  const baris = [
    {
      icon: Phone,
      label: "Telepon",
      value: kontak,
      href: `tel:${telDigits}`,
      aksi: "Telepon",
      tone: "bg-blue-100 text-blue-700",
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      aksi: "Kirim email",
      tone: "bg-violet-100 text-violet-700",
    },
    {
      icon: MapPin,
      label: "Alamat",
      value: lokasi,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${nama} ${lokasi}`)}`,
      aksi: "Lihat peta",
      tone: "bg-red-100 text-red-700",
      external: true,
    },
  ];

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-village">
        <div className="grid overflow-hidden rounded-3xl border bg-card shadow-xl lg:grid-cols-5">
          {/* Panel kiri: foto desa + logo */}
          <div className="relative flex min-h-80 flex-col justify-between overflow-hidden p-8 text-primary-foreground lg:col-span-2 lg:p-10">
            <SafeImage
              src={gambar}
              fallbackSrc="/hero-desa.jpg"
              alt={`Pemandangan ${nama}`}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-black/70" />

            <div className="relative">
              <span className="inline-flex h-16 w-14 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo statis di /public, tidak perlu optimasi next/image */}
                <img src="/logo.jpg" alt={`Logo ${nama}`} className="h-full w-full object-contain" />
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight">Ada yang bisa kami bantu?</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-90">
                Hubungi Kantor {nama} untuk informasi, layanan administrasi, atau menyampaikan aspirasi Anda.
              </p>
            </div>

            <div className="relative mt-8 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
                <Clock className="h-3.5 w-3.5" />
                Senin – Jumat, 08:00 – 16:00 WIB
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp
                </a>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
                >
                  Halaman Kontak
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Panel kanan: daftar kontak */}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-3 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Kontak Resmi</span>
            <h3 className="mt-1 text-2xl font-bold text-foreground">Kenali cara menghubungi kami</h3>
            <ul className="mt-6 space-y-3">
              {baris.map((b) => (
                <li key={b.label}>
                  <a
                    href={b.href}
                    target={b.external ? "_blank" : undefined}
                    rel={b.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${b.tone}`}>
                      <b.icon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{b.label}</span>
                      <span className="block break-words font-medium text-foreground">{b.value}</span>
                    </span>
                    <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
                      {b.aksi}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
