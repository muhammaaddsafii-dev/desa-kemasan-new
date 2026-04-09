import Link from "next/link";
import { Landmark, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => (
  <footer className="gradient-primary text-primary-foreground">
    <div className="container-village py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base">Desa Sukamakmur</span>
              <span className="block text-xs opacity-80">Kab. Bandung Barat</span>
            </div>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            Portal resmi Desa Sukamakmur — pusat informasi, layanan publik, dan data desa untuk masyarakat.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Navigasi</h4>
          <ul className="space-y-2.5 text-sm opacity-80">
            <li><Link href="/" className="hover:opacity-100 transition-opacity">Beranda</Link></li>
            <li><Link href="/profil/tentang" className="hover:opacity-100 transition-opacity">Profil Desa</Link></li>
            <li><Link href="/info/berita" className="hover:opacity-100 transition-opacity">Berita & Info</Link></li>
            <li><Link href="/data/statistik-kependudukan" className="hover:opacity-100 transition-opacity">Data Desa</Link></li>
            <li><Link href="/layanan/surat-online" className="hover:opacity-100 transition-opacity">Layanan Publik</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Layanan</h4>
          <ul className="space-y-2.5 text-sm opacity-80">
            <li><Link href="/layanan/surat-online" className="hover:opacity-100 transition-opacity">Surat Online</Link></li>
            <li><Link href="/layanan/pengaduan" className="hover:opacity-100 transition-opacity">Pengaduan Masyarakat</Link></li>
            <li><Link href="/layanan/panduan" className="hover:opacity-100 transition-opacity">Panduan Layanan</Link></li>
            <li><Link href="/kontak" className="hover:opacity-100 transition-opacity">Hubungi Kami</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Kontak</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Jl. Raya Sukamakmur No. 01, Kec. Cisarua, Kab. Bandung Barat, Jawa Barat 40551</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <span>(022) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <span>desa@sukamakmur.desa.id</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Sen–Jum, 08:00–16:00 WIB</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
        <p>© 2026 Desa Sukamakmur. Hak cipta dilindungi.</p>
        <p>Didukung oleh Pemerintah Kabupaten Bandung Barat</p>
      </div>
    </div>
  </footer>
);

export default Footer;
