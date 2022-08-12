import React from 'react'
import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths } from 'next'
import type { ParsedUrlQuery } from 'querystring'

import dayjs from 'dayjs'

import { getAllArticlesProp } from '../../src/utils/getProps'
import { getAllArticles } from '../../src/utils/mdx'

import type { Post } from '../../src/d'

import { HeadElem } from 'components/head'
import { PostListing } from 'components/postListing'
import { SideBar } from 'components/sidebar'
import { Text } from 'components/text'

export interface QParams extends ParsedUrlQuery {
  slug?: string
}

export default function Categories(props: any) {
  const router = useRouter()
  const archiveMonth = router.asPath.split('/')[2]

  const postMatchingCategories = props.posts.filter((post: any) => {
    return dayjs(post.publishedAt).format('YYYYMM') === archiveMonth
  })

  return <React.Fragment>
    <HeadElem headStr={dayjs(archiveMonth).format('MMMM, YYYY')} />
    <div className="grid grid-cols-8">
      <main className="col-span-6">

        <div className="my-6">
          <Text appearance='body' as='p'>
            Posts from: {dayjs(archiveMonth).format('MMMM, YYYY')}
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
            Sorry no posts for this date
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

// dynamically generate the slugs for each article(s)
export const getStaticPaths: GetStaticPaths<QParams> = async () => {
  const articles = await getAllArticles()
  const articleDates = new Set<string>()
  articles.map((article: any) => articleDates.add(dayjs(article.publishedAt).format('YYYYMM')))
  const paths = Array.from(articleDates.values()).map((slug) => ({ params: { slug } }))
  
  return {
    paths: paths,
    fallback: false,
  }
}
