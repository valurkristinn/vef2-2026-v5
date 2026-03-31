import Link from "next/link";

import { client } from "@/src/sanity/client";
import { urlFor } from "@/src/sanity/image";
import { POSTS_QUERY, HERO_QUERY } from "@/src/sanity/queries";

import Hero from "@/components/hero";

import "@/styles/index.sass";

const options = { next: { revalidate: 30 } };

export default async function Page() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);
  const hero = await client.fetch(HERO_QUERY, {}, options);

  return (
    <main>
      {hero && (
        <Hero
          title={hero.title!}
          image={urlFor(hero.image!).auto("format").url()}
        />
      )}

      <h1>Fréttir</h1>

      <ul>
        {posts.map((post) => (
          <li key={post._id}>
          <article>
            <Link href={`/post/${post.slug!.current}`}>
              <h2>{post.title}</h2>
            </Link>

            <p>{new Date(post.publishedAt!).toLocaleDateString()}</p>

            {post.author?.slug && (
              <p>
                <Link href={`/${post.author.slug}`}>{post.author.name}</Link>
              </p>
            )}
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
