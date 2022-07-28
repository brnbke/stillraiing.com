import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths } from 'next'

import * as Constants from '../../src/constants'

import dayjs from 'dayjs'

import { getAllArticlesProp } from '../../src/utils/getProps'

import HeadElem from '../../src/components/head'
import PostListing from '../../src/components/postListing'
import SideBar from '../../src/components/sidebar'

import type { Post } from '../../src/d'

export default function Categories(props: any) {
  const router = useRouter()
  const rating = router.asPath.split('/')[2]

  const postMatchingCategories = props.posts.filter((post: any) => {
    return post.rating.toString() === rating
  })

  return <React.Fragment>
    <HeadElem headStr={Constants.rating.get(rating)} />
    <div className="grid grid-cols-8">
      <main className="col-span-6">
        <h1>Posts rated: {rating} - {Constants.rating.get(rating)}</h1>
        {postMatchingCategories.length > 0 && postMatchingCategories.map((post: Post) => {
          return (
            <PostListing key={post.slug} post={post} />
          )
        })}
        {
          postMatchingCategories.length === 0 && <p>Sorry no posts with this rage level found</p>
        }
      </main>
      <div className="col-span-2">
        <SideBar posts={props.posts} />
      </div>
    </div>
  </React.Fragment>

}

export const getStaticProps: GetStaticProps = async () => getAllArticlesProp()

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Array.from(Constants.rating.keys()).map((slug) => ({ params: { slug } }))
  console.log(paths)


  return {
    paths,
    fallback: false,
  }
}
