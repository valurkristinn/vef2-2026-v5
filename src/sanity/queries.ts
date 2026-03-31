import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug,
  publishedAt, 
  author->{name, slug}
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
  title,
  image,
  body,
  author->{name, slug, image}
}`);

export const BIRD_BY_SLUG_QUERY =
  defineQuery(`*[_type == "bird" && slug.current == $slug][0]{
  name,
  species,
  image,
  description,
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt
  }
}`);


