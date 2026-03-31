import { createImageUrlBuilder } from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url";
import { client } from "@/src/sanity/client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
