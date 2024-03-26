import { headers } from "next/headers";

export async function customFetch<T>(
  path: `/${string}`,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: BodyInit;
  }
): Promise<T> {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(`${protocol}://${host}${path}`, options);
  return response.json() as Promise<T>;
}
