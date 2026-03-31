import Link from "next/link";
import { defineQuery } from "next-sanity";
import { client } from "@/src/sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

import Hero from "@/components/hero";
import Image from "next/image";

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug,
  image,
  publishedAt, 
  author->{name, slug}
}`);

const HERO_QUERY = defineQuery(`*[
  _type == "hero"
]|order(publishedAt desc)[0]{
  _id, 
  title, 
  image,
}`);

const options = { next: { revalidate: 30 } };

const builder = createImageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default async function IndexPage() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);
  const hero = await client.fetch(HERO_QUERY, {}, options);

  return (
    <main>
      {hero && <Hero title={hero.title!} image={urlFor(hero.image!).url()} />}
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/${post.slug!.current}`}>
              <h2>{post.title}</h2>
            </Link>

            {post.image && (
              <Image
                loading="eager"
                src={urlFor(post.image).url()}
                alt="yupyup"
                width={500}
                height={300}
              />
            )}

            <p>{new Date(post.publishedAt!).toLocaleDateString()}</p>

            {post.author?.slug?.current && (
              <Link href={`/${post.author.slug.current}`}>
                <p>{post.author.name}</p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
