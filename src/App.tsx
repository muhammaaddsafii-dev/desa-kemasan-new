import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Beranda from "./pages/Beranda";
import TentangDesa from "./pages/profil/TentangDesa";
import VisiMisi from "./pages/profil/VisiMisi";
import Struktur from "./pages/profil/Struktur";
import Pengumuman from "./pages/info/Pengumuman";
import Berita from "./pages/info/Berita";
import Kegiatan from "./pages/info/Kegiatan";
import StatistikKependudukan from "./pages/data/StatistikKependudukan";
import StatistikKeuangan from "./pages/data/StatistikKeuangan";
import Geospasial from "./pages/data/Geospasial";
import SuratOnline from "./pages/layanan/SuratOnline";
import PengaduanPage from "./pages/layanan/PengaduanPage";
import PanduanPage from "./pages/layanan/PanduanPage";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/profil/tentang" element={<TentangDesa />} />
          <Route path="/profil/visi-misi" element={<VisiMisi />} />
          <Route path="/profil/struktur" element={<Struktur />} />
          <Route path="/info/pengumuman" element={<Pengumuman />} />
          <Route path="/info/berita" element={<Berita />} />
          <Route path="/info/kegiatan" element={<Kegiatan />} />
          <Route path="/data/statistik-kependudukan" element={<StatistikKependudukan />} />
          <Route path="/data/statistik-keuangan" element={<StatistikKeuangan />} />
          <Route path="/data/geospasial" element={<Geospasial />} />
          <Route path="/layanan/surat-online" element={<SuratOnline />} />
          <Route path="/layanan/pengaduan" element={<PengaduanPage />} />
          <Route path="/layanan/panduan" element={<PanduanPage />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
