import { cacheLife, cacheTag } from "next/cache";
import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

export function getSanityClient(): SanityClient | null {
  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token: process.env.SANITY_API_READ_TOKEN,
  });
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("sanity");

  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("[sanity] fetch failed:", error);
    return null;
  }
}
