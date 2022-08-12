import { ParsedUrlQuery } from 'querystring'

interface Post {
  slug: string;
  title: string;
  readingTime: string;
  excerpt: string;
  publishedAt: string;
  rating: string;
}

interface PostProps {
  posts: Post[];
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export type {
  Post,
  PostProps,
  IParams
}