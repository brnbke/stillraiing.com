import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'

import { Text } from 'components/text'
import { Li, Ul } from 'components/list'

import type { PostProps, Post } from 'd'
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
      <div className="col-span-2 mt-6">
        <Text appearance='h2' as='h2'>
          Archives
        </Text>
        <Ul>
          {
            Array.from(archiveMonths.keys()).map((month: string) => {
              return (
                <Li key={`archive-${month}`} >
                  <Link href={`/archive/${month}`} passHref>
                    <a>
                      {archiveMonths.get(month)}
                    </a>
                  </Link>
                </Li>
              )
            })
          }
        </Ul>
        <Text appearance='h2' as='h2'>
          Categories
        </Text>
        <ul>
          {
            Array.from(Constants.rating.keys()).map((ratingKey: string) => {
              return (
                <Li key={`rating-${ratingKey}`}>
                  <Link href={`/categories/${ratingKey}`} passHref>
                    <a>
                      {Constants.rating.get(ratingKey)}
                    </a>
                  </Link>
                </Li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}
