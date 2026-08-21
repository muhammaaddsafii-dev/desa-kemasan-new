const API_URL = (process.env.API_URL ?? "http://localhost:8000/api").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`API request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

type QueryValue = string | number | boolean | undefined;

interface ApiFetchOptions {
  query?: Record<string, QueryValue>;
  /** Next.js ISR revalidate window in seconds. Defaults to 60s. */
  revalidate?: number;
}

const REQUEST_TIMEOUT_MS = 6000;
/** 1 percobaan awal + 2 retry - backend (Cloud Run/dev server) kadang butuh beberapa detik untuk
 * "bangun" dari cold start/restart, jadi kegagalan pertama sering hilang sendiri sebentar lagi. */
const MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchOnce(url: string, revalidate: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const url = new URL(`${API_URL}/${path.replace(/^\//, "")}`);
  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  const revalidate = options.revalidate ?? 60;
  const urlString = url.toString();

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const isLastAttempt = attempt === MAX_ATTEMPTS;

    let res: Response;
    try {
      res = await fetchOnce(urlString, revalidate);
    } catch (error) {
      // Network error atau timeout (AbortError) - backend mungkin baru cold-start, layak dicoba lagi.
      if (isLastAttempt) throw error;
      await sleep(RETRY_BASE_DELAY_MS * attempt);
      continue;
    }

    if (res.ok) return res.json() as Promise<T>;

    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    const error = new ApiError(res.status, body);
    // 4xx (not found, bad request, dsb) tidak akan berubah kalau dicoba lagi - hanya 5xx yang
    // layak di-retry (backend lagi restart/belum siap).
    if (res.status < 500 || isLastAttempt) throw error;
    await sleep(RETRY_BASE_DELAY_MS * attempt);
  }

  // Tidak akan pernah sampai sini (loop di atas selalu return atau throw pada attempt terakhir).
  throw new ApiError(0, undefined);
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Fetches every page of a paginated DRF list endpoint in parallel and returns the combined results. */
export async function apiFetchAllPages<T>(
  path: string,
  options: Omit<ApiFetchOptions, "query"> & { query?: Record<string, QueryValue> } = {},
  maxPages = 20,
): Promise<T[]> {
  const first = await apiFetch<PaginatedResponse<T>>(path, {
    ...options,
    query: { ...options.query, page: 1 },
  });
  if (!first.next) return first.results;

  const totalPages = Math.min(Math.ceil(first.count / first.results.length), maxPages);
  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      apiFetch<PaginatedResponse<T>>(path, { ...options, query: { ...options.query, page: i + 2 } }),
    ),
  );
  return [...first.results, ...rest.flatMap((res) => res.results)];
}
