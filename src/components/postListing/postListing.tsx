import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'

import type { Post } from '../../d'
import * as Constants from '../../constants'

export function PostListing(props: { post: Post }) {
  return (
    <Link href={`/posts/${props.post.slug}`} passHref>
      <a>
        <h1 className="title">{props.post.title}</h1>
        <p className="summary">{props.post.excerpt}</p>
        <p className="date">
          {dayjs(props.post.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
          {props.post.readingTime}
        </p>
        <p>{Constants.rating.get(props.post.rating)}</p>
      </a>
    </Link>
  )
}
