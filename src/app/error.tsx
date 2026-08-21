"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-padding flex min-h-[60vh] items-center">
      <div className="container-village max-w-lg text-center">
        <TriangleAlert className="mx-auto mb-4 h-12 w-12 text-destructive" />
        <h1 className="mb-2 text-2xl font-bold text-foreground">Gagal Memuat Data</h1>
        <p className="mb-6 text-muted-foreground">
          Terjadi kendala saat mengambil data dari server. Ini biasanya sementara - coba muat ulang halaman ini.
        </p>
        <Button onClick={() => reset()}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
      </div>
    </section>
  );
}
