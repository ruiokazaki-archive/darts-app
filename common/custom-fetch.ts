import { headers } from "next/headers";

export async function customFetch<T>(
  path: `/${string}`,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: BodyInit;
  }
): Promise<{
  status: number;
  statusText: string;
  data: T;
}> {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(`${protocol}://${host}${path}`, options);
  const result = {
    status: response.status,
    statusText: response.statusText,
    data: (await response.json()) as T,
  };
  return result;
}
