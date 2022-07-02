import dayjs from 'dayjs'
import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import type {NextPage} from 'next'

import { getAllArticles } from '../src/utils/mdx'

const Home: NextPage = (posts: {posts: []}, {}) => {
  return <React.Fragment>
    <Head>
      <title>My Blog</title>
    </Head>
    <div>
      {posts.posts.map((frontMatter: any) => {
        return (
          <Link key="{frontMatter.slug}"  href={`/posts/${frontMatter.slug}`} passHref>
            <div>
              <h1 className="title">{frontMatter.title}</h1>
              <p className="summary">{frontMatter.excerpt}</p>
              <p className="date">
                {dayjs(frontMatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
                {frontMatter.readingTime}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  </React.Fragment>
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = await getAllArticles()

  console.log(typeof articles)

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

