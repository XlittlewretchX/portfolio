import { QueryClient, QueryFunction } from "@tanstack/react-query";

const rawBase = import.meta.env.BASE_URL ?? "/";
const normalizedBase =
  rawBase === "/" ? "" : rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
const useStaticData = normalizedBase.length > 0; // GitHub Pages => "/portfolio"

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

function buildRequestUrl(path: string) {
  if (!useStaticData) {
    return path;
  }
  const pathWithJson = path.endsWith(".json") ? path : `${path}.json`;
  return `${normalizedBase}${pathWithJson}`;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const rawPath = queryKey[0] as string;
    const url = buildRequestUrl(rawPath);
    const res = await fetch(url, {
      credentials: useStaticData ? "omit" : "include",
    });

    if (!useStaticData && unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1, // Retry once on failure
    },
    mutations: {
      retry: false,
    },
  },
});
