import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { client } from "@/src/sanity/client";
import { urlFor } from "@/src/sanity/image";
import { POST_BY_SLUG_QUERY } from "@/src/sanity/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) notFound();

  return (
    <main className="post">
      <article>
        <h1>{post.title}</h1>

        <div>
          {post.image && (
            <Image
              src={urlFor(post.image).width(800).url()}
              alt={post.title!}
              fill
              priority
            />
          )}
        </div>

        <div>
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          {post.author?.name && (
            <span>
              {" • "}
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  width={32}
                  height={32}
                />
              )}
              <Link href={`/birds/${post.author.slug.current}`}>{post.author.name}</Link>
            </span>
          )}
        </div>

        {post.body && (
          <div>
            <PortableText value={post.body} />
          </div>
        )}

        <footer>
          <Link href="/">← Til baka</Link>
        </footer>
      </article>
    </main>
  );
}
