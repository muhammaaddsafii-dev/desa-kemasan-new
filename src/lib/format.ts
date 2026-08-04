import { format, isValid, parseISO } from "date-fns";
import { id } from "date-fns/locale";

/** "2026-04-05" -> "5 April 2026" */
export function formatTanggalPanjang(dateStr: string | null | undefined): string {
  if (!dateStr) return "-";
  const date = parseISO(dateStr);
  if (!isValid(date)) return dateStr;
  return format(date, "d MMMM yyyy", { locale: id });
}

/** "2026-04-05" -> "5 Apr" (dipakai untuk kartu tanggal ringkas) */
export function formatTanggalSingkat(dateStr: string | null | undefined): string {
  if (!dateStr) return "-";
  const date = parseISO(dateStr);
  if (!isValid(date)) return dateStr;
  return format(date, "d MMM", { locale: id });
}

/** "2026-04-05" -> "5" (nomor hari saja, dipakai di badge kalender) */
export function formatTanggalHari(dateStr: string | null | undefined): string {
  if (!dateStr) return "-";
  const date = parseISO(dateStr);
  if (!isValid(date)) return "-";
  return format(date, "d", { locale: id });
}

/** Membuang tag HTML dari konten rich-text untuk ditampilkan sebagai cuplikan teks polos. */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
