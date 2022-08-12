import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths } from 'next'

import * as Constants from '../../src/constants'

import { getAllArticlesProp } from '../../src/utils/getProps'

import { HeadElem } from 'components/head'
import { PostListing } from 'components/postListing'
import { SideBar } from 'components/sidebar'
import { Text } from 'components/text'

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
        <div className="my-6">
          <Text appearance='body' as='p'>
            Posts rated: {rating} - {Constants.rating.get(rating)}
          </Text>
        </div>

        {postMatchingCategories.length > 0 && postMatchingCategories.map((post: Post) => {
          return (
            <PostListing key={post.slug} post={post} />
          )
        })}
        {
          postMatchingCategories.length === 0 &&
          <Text appearance='body' as='p'>
            Sorry no posts with this rage level found
          </Text>
        
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

  return {
    paths,
    fallback: false,
  }
}
