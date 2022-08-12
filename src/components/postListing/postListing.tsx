import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'

import type { Post } from 'd'
import { Text } from 'components/text'
import * as Constants from '../../constants'

export function PostListing(props: { post: Post }) {
  return (
    <Link href={`/posts/${props.post.slug}`} passHref>
      <a>
        <Text appearance='h1' as='h1'>
          {props.post.title}
        </Text>
        <Text appearance='small' as='p'>
          Posted on {dayjs(props.post.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
          {props.post.readingTime}
        </Text>
        <Text appearance='body' as='p'>
          {props.post.excerpt}
        </Text>
        <Text appearance='small' as='p'>
          {Constants.rating.get(props.post.rating.toString())}
        </Text>
      </a>
    </Link>
  )
}
