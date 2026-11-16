/** Mengambil ID video dari tautan YouTube (watch, youtu.be, embed, shorts) atau dari ID polos. */
export function youtubeId(input: string): string | null {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return url.pathname.slice(1).split("/")[0] || null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/);
      if (match) return match[1];
    }
  } catch {
    // bukan URL yang valid
  }
  return null;
}

export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Embed tanpa cookie pelacak; autoplay hanya dipakai setelah pengunjung menekan tombol putar. */
export const youtubeEmbedUrl = (id: string, autoplay = false) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;
