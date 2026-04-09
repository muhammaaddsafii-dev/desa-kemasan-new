import { Eye, Target, CheckCircle2 } from "lucide-react";

const visi = "Terwujudnya Desa Sukamakmur yang maju, mandiri, sejahtera, dan berbudaya melalui tata kelola pemerintahan yang transparan dan pelayanan publik berbasis digital.";

const misi = [
  "Meningkatkan kualitas pelayanan publik melalui digitalisasi dan inovasi teknologi",
  "Mengembangkan potensi ekonomi lokal berbasis pertanian organik dan pariwisata alam",
  "Memperkuat infrastruktur desa untuk mendukung konektivitas dan mobilitas masyarakat",
  "Meningkatkan kualitas pendidikan, kesehatan, dan kesejahteraan sosial masyarakat",
  "Melestarikan budaya lokal dan menjaga kelestarian lingkungan hidup",
  "Mewujudkan tata kelola pemerintahan desa yang bersih, transparan, dan akuntabel",
];

export default function VisiMisi() {
  return (
    <>
      <section className="gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container-village">
          <span className="text-sm font-medium opacity-80">Profil &gt; Visi dan Misi</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Visi dan Misi</h1>
          <p className="mt-3 opacity-90 max-w-2xl">Arah dan tujuan pembangunan Desa Sukamakmur periode 2024–2030.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-village max-w-4xl">
          {/* Visi */}
          <div className="card-village p-8 md:p-12 mb-10 text-center border-2 border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Visi</h2>
            <p className="text-lg text-muted-foreground leading-relaxed italic">"{visi}"</p>
          </div>

          {/* Misi */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-4">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Misi</h2>
          </div>
          <div className="space-y-4">
            {misi.map((m, i) => (
              <div key={i} className="card-village p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary">Misi {i + 1}</span>
                  <p className="text-foreground leading-relaxed">{m}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
