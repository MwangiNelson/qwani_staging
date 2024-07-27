import { createClient } from "next-sanity";
import {
  type ClientConfig,
  type QueryParams,
} from "@sanity/client";
import { apiVersion, dataset, projectId, useCdn } from "../env";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
 useCdn: process.env.NODE_ENV === "development" ? true : false,
  perspective: "published",
});

export const builder = imageUrlBuilder(client);
export function imageUrl(source: any) {
  return builder.image(source).url();
}

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}