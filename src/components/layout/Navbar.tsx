import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Landmark } from "lucide-react";

interface SubItem {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to?: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  { label: "Beranda", to: "/" },
  {
    label: "Profil",
    children: [
      { label: "Tentang Desa", to: "/profil/tentang" },
      { label: "Visi dan Misi", to: "/profil/visi-misi" },
      { label: "Struktur Organisasi", to: "/profil/struktur" },
    ],
  },
  {
    label: "Info Desa",
    children: [
      { label: "Pengumuman", to: "/info/pengumuman" },
      { label: "Berita", to: "/info/berita" },
      { label: "Kegiatan", to: "/info/kegiatan" },
    ],
  },
  {
    label: "Data Desa",
    children: [
      { label: "Statistik Kependudukan", to: "/data/statistik-kependudukan" },
      { label: "Statistik Keuangan", to: "/data/statistik-keuangan" },
      { label: "Geospasial", to: "/data/geospasial" },
    ],
  },
  {
    label: "Layanan",
    children: [
      { label: "Surat Online", to: "/layanan/surat-online" },
      { label: "Pengaduan", to: "/layanan/pengaduan" },
      { label: "Panduan Layanan", to: "/layanan/panduan" },
    ],
  },
  { label: "Kontak", to: "/kontak" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
      <div className="container-village">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <Landmark className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-base text-foreground">Desa Sukamakmur</span>
              <span className="block text-xs text-muted-foreground">Kab. Bandung Barat</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-village-green-light transition-colors">
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl border shadow-lg py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-village-green-light transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? "text-primary bg-village-green-light"
                      : "text-foreground/80 hover:text-primary hover:bg-village-green-light"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t pb-4 animate-fade-in">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-foreground/80"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="pl-6 pb-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  className="block px-3 py-3 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
