import React from 'react'

import type {NextPage} from 'next'
import { GetStaticProps } from 'next'

import Head from 'next/head'
import Link from 'next/link'

import dayjs from 'dayjs'

import type {Post, PostProps} from '../src/d'
import * as Constants from '../src/constants'

import { getAllArticlesProp } from '../src/utils/getProps'

import SideBar from '../src/components/sidebar'
import PostListing from '../src/components/postListing'

const Home: NextPage<PostProps> = (props) => {
  
  const archiveMonths = new Map<string, string>()
  
  props.posts.map((post: Post) => {
    archiveMonths.set(dayjs(post.publishedAt).format('YYYYMM'), dayjs(post.publishedAt).format('MMMM YYYY'))
  })

  return <React.Fragment>
    <Head>
      <title>It&apos;s Still Raining</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
    <div className="grid grid-cols-8">
      <main className="col-span-6">
        {props.posts.map((post: Post) => {
          return (
            <>
              <PostListing props={post} />
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
            </>
          )
        })}
      </main>
      <div className="col-span-2">
        <SideBar props={props}/>
      </div>
    </div>
  </React.Fragment>
}

export default Home

export const getStaticProps: GetStaticProps = async () => getAllArticlesProp()
