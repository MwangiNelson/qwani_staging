import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
});

export const builder = imageUrlBuilder(client);
export function imageUrl(source: any) {
  return builder.image(source).url();
}
