import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug,
  publishedAt, 
  author->{name, "slug": slug.current}
}`);

export const HERO_QUERY =
  defineQuery(`*[_type == "hero"]|order(_createdAt desc)[0]{
  _id, 
  title, 
  image
}`);

export const POST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  publishedAt,
  image,
  body,
  author->{name, "slug": slug.current}
}`);

export const POST_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`);
