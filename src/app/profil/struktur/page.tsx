import { User } from "lucide-react";

const kepala = { nama: "H. Ahmad Suryadi, S.Sos.", jabatan: "Kepala Desa", periode: "2024–2030" };

const perangkat = [
  { nama: "Drs. Bambang Hermawan", jabatan: "Sekretaris Desa" },
  { nama: "Siti Nurhaliza, S.E.", jabatan: "Kaur Keuangan" },
  { nama: "Rina Wati, A.Md.", jabatan: "Kaur Perencanaan" },
  { nama: "Dedi Kusnadi", jabatan: "Kasi Pemerintahan" },
  { nama: "Hendra Gunawan", jabatan: "Kasi Pelayanan" },
  { nama: "Yuli Astuti, S.Pd.", jabatan: "Kasi Kesejahteraan" },
];

const kadusDusun = [
  { nama: "Asep Hidayat", jabatan: "Kadus I - Dusun Ciburial" },
  { nama: "Nana Suryana", jabatan: "Kadus II - Dusun Cimanggu" },
  { nama: "Iwan Setiawan", jabatan: "Kadus III - Dusun Pasirjaya" },
  { nama: "Tati Sumiati", jabatan: "Kadus IV - Dusun Sukasenang" },
];

const bpd = [
  { nama: "H. Cecep Firmansyah", jabatan: "Ketua BPD" },
  { nama: "Euis Komariah, S.H.", jabatan: "Wakil Ketua BPD" },
  { nama: "Ujang Darisman", jabatan: "Sekretaris BPD" },
];

const PersonCard = ({ nama, jabatan, highlight }: { nama: string; jabatan: string; highlight?: boolean }) => (
  <div className={`card-village p-5 text-center ${highlight ? "border-2 border-primary/30" : ""}`}>
    <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${highlight ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
      <User className="w-7 h-7" />
    </div>
    <h3 className="font-semibold text-foreground text-sm">{nama}</h3>
    <p className="text-xs text-muted-foreground mt-1">{jabatan}</p>
  </div>
);

export default function Struktur() {
  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Profil &gt; Struktur Organisasi</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Struktur Organisasi</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Aparatur pemerintah Desa Sukamakmur yang melayani masyarakat.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-5xl">
          {/* Kepala Desa */}
          <div className="text-center mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Kepala Desa</h2>
            <div className="max-w-xs mx-auto">
              <PersonCard nama={kepala.nama} jabatan={`${kepala.jabatan} (${kepala.periode})`} highlight />
            </div>
          </div>

          {/* Perangkat */}
          <h2 className="text-xl font-bold text-foreground mb-6">Perangkat Desa</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {perangkat.map((p) => <PersonCard key={p.nama} nama={p.nama} jabatan={p.jabatan} />)}
          </div>

          {/* Kadus */}
          <h2 className="text-xl font-bold text-foreground mb-6">Kepala Dusun</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {kadusDusun.map((p) => <PersonCard key={p.nama} nama={p.nama} jabatan={p.jabatan} />)}
          </div>

          {/* BPD */}
          <h2 className="text-xl font-bold text-foreground mb-6">Badan Permusyawaratan Desa (BPD)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bpd.map((p) => <PersonCard key={p.nama} nama={p.nama} jabatan={p.jabatan} />)}
          </div>
        </div>
      </section>
    </>
  );
}
