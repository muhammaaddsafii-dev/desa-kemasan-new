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

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const url = new URL(`${API_URL}/${path.replace(/^\//, "")}`);
  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: options.revalidate ?? 60 },
  });

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    throw new ApiError(res.status, body);
  }

  return res.json() as Promise<T>;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Walks every page of a paginated DRF list endpoint and returns the combined results. */
export async function apiFetchAllPages<T>(
  path: string,
  options: Omit<ApiFetchOptions, "query"> & { query?: Record<string, QueryValue> } = {},
  maxPages = 20,
): Promise<T[]> {
  const results: T[] = [];
  let page = 1;
  while (page <= maxPages) {
    const res = await apiFetch<PaginatedResponse<T>>(path, {
      ...options,
      query: { ...options.query, page },
    });
    results.push(...res.results);
    if (!res.next) break;
    page += 1;
  }
  return results;
}
