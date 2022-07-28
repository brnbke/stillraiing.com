import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import * as Constants from '../../src/constants'

import dayjs from 'dayjs'

import { getAllArticlesProp } from '../../src/utils/getProps'
import { getAllArticles } from '../../src/utils/mdx'

import type { Post } from '../../src/d'

import HeadElem from '../../src/components/head'
import PostListing from '../../src/components/postListing'
import SideBar from '../../src/components/sidebar'

export default function Categories(props: any) {
  const router = useRouter()
  const archiveMonth = router.asPath.split('/')[2]

  const postMatchingCategories = props.posts.filter((post: any) => {
    return dayjs(post.publishedAt).format('YYYYMM') === archiveMonth
  })

  return <React.Fragment>
    <HeadElem headStr="sdf" />
    <div className="grid grid-cols-8">
      <main className="col-span-6">

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

// dynamically generate the slugs for each article(s)
export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles()
  const articleDates = new Set()

  articles.map((article:any) => articleDates.add(dayjs(article.publishedAt).format('YYYYMM')))

  // get all category keys
  const paths = Array.from(articleDates).map((slug) => ({ params: { slug } }))

  console.log('paths')
  console.log(paths)


  return {
    paths,
    fallback: false,
  }
}
