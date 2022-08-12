import React from 'react'

import type { NextPage } from 'next'
import { GetStaticProps } from 'next'

import dayjs from 'dayjs'

import type { Post, PostProps } from '../src/d'

import { getAllArticlesProp } from '../src/utils/getProps'

import { HeadElem } from 'components/head'
import { PostListing } from 'components/postListing'
import { SideBar } from 'components/sidebar'

const Home: NextPage<PostProps> = (props) => {

  const archiveMonths = new Map<string, string>()

  props.posts.map((post: Post) => {
    archiveMonths.set(dayjs(post.publishedAt).format('YYYYMM'), dayjs(post.publishedAt).format('MMMM YYYY'))
  })

  return <React.Fragment>
    <HeadElem />
    <div className="grid grid-cols-8  px-5 py-10">
      <main className="col-span-6">
        {props.posts.map((post: Post) => {
          return (
            <PostListing key={post.slug} post={post} />
          )
        })}
      </main>
      <div className="col-span-2">
        <SideBar posts={props.posts} />
      </div>
    </div>
  </React.Fragment>
}

export default Home

export const getStaticProps: GetStaticProps = async () => getAllArticlesProp()
