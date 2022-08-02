import React from 'react'

import Link from 'next/link'

import dayjs from 'dayjs'

import type { PostProps, Post } from '../../d'
import * as Constants from '../../constants'

export function SideBar(props: PostProps) {

  const archiveMonths = new Map<string, string>()
  {
    props.posts.map((post: Post) => {
      archiveMonths.set(dayjs(post.publishedAt).format('YYYYMM'), dayjs(post.publishedAt).format('MMMM YYYY'))
    })
  }

  return (
    <>
      <div className="col-span-2">
        <h2>Archives</h2>
        <ul>
          {
            Array.from(archiveMonths.keys()).map((month: string) => {
              return (
                <li key={`archive-${month}`} >
                  <Link href={`/archive/${month}`} passHref>
                    <a>
                      {archiveMonths.get(month)}
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <h2>Categories</h2>
        <ul>
          {
            Array.from(Constants.rating.keys()).map((ratingKey: string) => {
              return (
                <li key={`rating-${ratingKey}`}>
                  <Link href={`/categories/${ratingKey}`} passHref>
                    <a>
                      {Constants.rating.get(ratingKey)}
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}
