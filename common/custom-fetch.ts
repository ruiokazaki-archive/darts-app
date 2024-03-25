import { headers } from "next/headers";

export async function customFetch<T>(path: `/${string}`): Promise<T> {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(`${protocol}://${host}${path}`);
  return response.json() as Promise<T>;
}
