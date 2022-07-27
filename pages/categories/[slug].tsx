import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import * as Constants from '../../src/constants'

import dayjs from 'dayjs'

import { getAllArticlesProp } from '../../src/utils/getProps'

import { getSlug } from '../../src/utils/mdx'

import type {IParams, Post} from '../../src/d'
import { createModuleResolutionCache } from 'typescript'

export default function Categories( props:any ) {
  const router = useRouter()
  const rating = router.asPath.split('/')[2]

  const postMatchingCategories = props.posts.filter((post:any) =>{

    return post.rating.toString() === rating 
  
  })
  
  console.log(rating)
  console.log(postMatchingCategories)
  console.log(props.posts)
  

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

        {postMatchingCategories.length > 0 && postMatchingCategories.map((post: Post) => {
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

        {
          postMatchingCategories.length  === 0 && <p>Sorry no posts with this rage level found</p>
        }
      </main>
      <div className="col-span-2">

      </div>
    </div>
  </React.Fragment>

}

export const getStaticProps: GetStaticProps = async () => getAllArticlesProp()

// dynamically generate the slugs for each article(s)
export const getStaticPaths: GetStaticPaths = () => {
  // get all category keys
  const paths = Array.from(Constants.rating.keys()).map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}