import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { client } from "@/src/sanity/client";
import { urlFor } from "@/src/sanity/image";
import { BIRD_BY_SLUG_QUERY } from "@/src/sanity/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bird = await client.fetch(BIRD_BY_SLUG_QUERY, { slug });

  if (!bird) notFound();

  return (
    <main className="bird">
      <article>
        <div>
          {bird.image && (
            <Image
              src={urlFor(bird.image).width(200).height(200).url()}
              alt={bird.name!}
              width={100}
              height={100}
            />
          )}
          <div>
            <h1>{bird.name}</h1>
            <h4>{bird.species}</h4>
          </div>
        </div>

        {bird.description && <p>{bird.description}</p>}

        <h2>Fréttir eftir {bird.name}</h2>
        <ul>
          {bird.posts?.map((post) => (
            <li key={post._id}>
              <article>
                <Link href={`/post/${post.slug!.current}`}>
                  <h3>{post.title}</h3>
                </Link>
                <time>{new Date(post.publishedAt!).toLocaleDateString()}</time>
              </article>
            </li>
          ))}
        </ul>

        <footer>
          <Link href="/">← Til baka</Link>
        </footer>
      </article>
    </main>
  );
}
