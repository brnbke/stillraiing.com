import React from 'react'

import type {NextPage} from 'next'
import { GetStaticProps } from 'next'

import Head from 'next/head'
import Link from 'next/link'

import dayjs from 'dayjs'

import type {Post, PostProps} from '../src/d'
import { getAllArticles } from '../src/utils/mdx'
import * as Constants from '../src/constants'

const Home: NextPage<PostProps> = (props) => {
  return <React.Fragment>
    <Head>
      <title>It&apos;s Still Raining</title>
    </Head>
    <div>
      {props.posts.map((post: Post) => {
        return (
          <Link key={post.slug}  href={`/posts/${post.slug}`} passHref>
            <a>
              <h1 className="title">{post.title}</h1>
              <p className="summary">{post.excerpt}</p>
              <p className="date">
                {dayjs(post.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
                {post.readingTime}
              </p>
              <p>{Constants.rating.get(post.rating)}</p>
            </a>
          </Link>
        )
      })}
    </div>
  </React.Fragment>
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles()

  articles
    .map((article: any) => article.data)
    .sort((a: any, b: any) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1
      if (a.data.publishedAt < b.data.publishedAt) return -1

      return 0
    })

  return {
    props: {
      posts: articles.reverse(),
    },
  }
}

