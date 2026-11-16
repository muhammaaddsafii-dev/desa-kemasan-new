import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { getAssetsCurrent } from "@/lib/data/profil";
import { toWhatsAppLink } from "@/lib/format";

// Jangan di-prerender statis saat build (API_URL belum ke backend produksi saat itu) - lihat
// catatan di src/app/data/geospasial/page.tsx.
export const dynamic = "force-dynamic";

/** Koordinat kantor desa untuk peta dan petunjuk arah. */
const KANTOR_LAT = -7.5738333;
const KANTOR_LNG = 110.6809575;

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"] as const;
type Hari = (typeof HARI)[number];

/** Jam layanan kantor desa (WIB). `null` = tutup. */
const JAM_LAYANAN: Record<Hari, { buka: string; tutup: string } | null> = {
  Senin: { buka: "08:00", tutup: "16:00" },
  Selasa: { buka: "08:00", tutup: "16:00" },
  Rabu: { buka: "08:00", tutup: "16:00" },
  Kamis: { buka: "08:00", tutup: "16:00" },
  Jumat: { buka: "08:00", tutup: "16:00" },
  Sabtu: null,
  Minggu: null,
};

const WEEKDAY_EN_KE_ID: Record<string, Hari> = {
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jumat",
  Saturday: "Sabtu",
  Sunday: "Minggu",
};

/** Hari dan menit-sejak-tengah-malam saat ini di zona waktu WIB (server bisa berjalan di zona waktu lain). */
function sekarangWib(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hari = WEEKDAY_EN_KE_ID[get("weekday")] ?? "Senin";
  const menit = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return { hari, menit };
}

function keMenit(jam: string) {
  const [h, m] = jam.split(":").map(Number);
  return h * 60 + m;
}

function statusLayanan() {
  const { hari, menit } = sekarangWib();
  const jam = JAM_LAYANAN[hari];
  if (jam && menit >= keMenit(jam.buka) && menit < keMenit(jam.tutup)) {
    return { hari, buka: true, keterangan: `Buka sekarang · tutup pukul ${jam.tutup} WIB` };
  }
  // cari hari buka berikutnya
  const mulai = HARI.indexOf(hari);
  for (let i = 0; i < 7; i++) {
    const kandidat = HARI[(mulai + i) % 7];
    const j = JAM_LAYANAN[kandidat];
    if (!j) continue;
    if (i === 0 && menit < keMenit(j.buka)) return { hari, buka: false, keterangan: `Tutup · buka hari ini pukul ${j.buka} WIB` };
    if (i > 0) return { hari, buka: false, keterangan: `Tutup · buka ${i === 1 ? "besok" : kandidat} pukul ${j.buka} WIB` };
  }
  return { hari, buka: false, keterangan: "Tutup" };
}

export default async function Kontak() {
  const assets = await getAssetsCurrent();
  const nama = assets?.nama ?? "Desa Sukamakmur";
  const lokasi = assets?.lokasi ?? "Jl. Raya Sukamakmur No. 01, Desa Sukamakmur, Kec. Cisarua, Kab. Bandung Barat, Jawa Barat 40551";
  const kontak = assets?.kontak ?? "(022) 123-4567";
  const email = assets?.email ?? "desa@sukamakmur.desa.id";
  const waLink = toWhatsAppLink(assets?.kontak) ?? "https://wa.me/62221234567";
  const telDigits = kontak.replace(/[^0-9+]/g, "");

  const status = statusLayanan();
  const petaUrl = `https://www.google.com/maps?q=${KANTOR_LAT},${KANTOR_LNG}`;
  const arahUrl = `https://www.google.com/maps/dir/?api=1&destination=${KANTOR_LAT},${KANTOR_LNG}`;

  const kartuKontak = [
    {
      icon: MapPin,
      label: "Alamat",
      value: lokasi,
      aksi: { href: petaUrl, label: "Lihat di peta", external: true },
      tone: "bg-red-100 text-red-700",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: kontak,
      aksi: { href: `tel:${telDigits}`, label: "Telepon sekarang", external: false },
      tone: "bg-blue-100 text-blue-700",
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      aksi: { href: `mailto:${email}`, label: "Kirim email", external: false },
      tone: "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Beranda &gt; Kontak</span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Hubungi Kami</h1>
          <p className="mt-3 max-w-2xl opacity-90">Silakan hubungi Kantor {nama} untuk informasi dan layanan lebih lanjut.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              Chat via WhatsApp
            </a>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur ${
                status.buka ? "bg-green-500/25" : "bg-white/15"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${status.buka ? "animate-pulse bg-green-400" : "bg-white/60"}`} />
              {status.keterangan}
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village space-y-10">
          {/* Kartu kontak */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kartuKontak.map((c) => (
              <a
                key={c.label}
                href={c.aksi.href}
                target={c.aksi.external ? "_blank" : undefined}
                rel={c.aksi.external ? "noopener noreferrer" : undefined}
                className="card-village group flex flex-col p-5"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.tone}`}>
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                <span className="mt-1 break-words text-sm font-medium leading-relaxed text-foreground">{c.value}</span>
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
                  {c.aksi.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>

          {/* Peta + jam operasional */}
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="card-village flex flex-col overflow-hidden">
              <iframe
                title={`Lokasi Kantor ${nama}`}
                src={`https://www.google.com/maps?q=${KANTOR_LAT},${KANTOR_LNG}&z=16&output=embed`}
                className="min-h-96 w-full flex-1 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t p-4">
                <div className="flex min-w-0 items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">Kantor {nama}</p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{lokasi}</p>
                  </div>
                </div>
                <a
                  href={arahUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Navigation className="h-4 w-4" />
                  Petunjuk Arah
                </a>
              </div>
            </div>

            <div className="card-village p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  Jam Operasional
                </h2>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    status.buka ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {status.buka ? "Buka" : "Tutup"}
                </span>
              </div>
              <ul className="divide-y">
                {HARI.map((hari) => {
                  const jam = JAM_LAYANAN[hari];
                  const hariIni = hari === status.hari;
                  return (
                    <li
                      key={hari}
                      className={`flex items-center justify-between py-2.5 text-sm ${hariIni ? "-mx-3 rounded-lg bg-primary/5 px-3 font-semibold" : ""}`}
                    >
                      <span className="flex items-center gap-2 text-foreground">
                        {hari}
                        {hariIni && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">Hari ini</span>}
                      </span>
                      <span className={jam ? "text-foreground" : "text-muted-foreground"}>
                        {jam ? `${jam.buka} – ${jam.tutup} WIB` : "Tutup"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
