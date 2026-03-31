import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { client } from "@/src/sanity/client";
import { urlFor } from "@/src/sanity/image";
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from "@/src/sanity/queries";

import '@/styles/post.sass'

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch(POST_SLUGS_QUERY);
  return slugs.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) notFound();

  return (
    <main>
      <article>
        <h1>{post.title}</h1>

        <div>
          {post.image && (
            <Image
              src={urlFor(post.image).width(800).url()}
              alt={post.title}
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
              <Link href={`/${post.author.slug}`}>{post.author.name}</Link>
            </span>
          )}
        </div>

        <div>
          <PortableText value={post.body} />
        </div>

        <footer>
          <Link href="/">← Til baka</Link>
        </footer>
      </article>
    </main>
  );
}
