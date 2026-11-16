import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api/client";
import { getPanduanSegar } from "@/lib/data/layanan";

// URL file dari API berupa presigned URL yang cepat kedaluwarsa. Rute ini mengambil URL baru setiap
// dibuka lalu mengalihkan ke sana, sehingga tautan "Lihat"/"Unduh" di halaman tidak pernah basi.
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const panduan = await getPanduanSegar(params.slug);
    if (!panduan.file) return new NextResponse("File panduan belum tersedia.", { status: 404 });
    return NextResponse.redirect(panduan.file, 302);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return new NextResponse("Panduan tidak ditemukan.", { status: 404 });
    }
    return new NextResponse("Gagal memuat panduan. Silakan coba lagi.", { status: 502 });
  }
}
