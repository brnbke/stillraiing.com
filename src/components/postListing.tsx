import React from 'react'

import Link from 'next/link'

import dayjs from 'dayjs'

import type { Post } from '../d'
import * as Constants from '../constants'

export default function PostListing (props: Post) {
    console.log(props)
    console.log(props.title)
    
    return (
      <>
        <Link key={props.slug}  href={`/posts/${props.slug}`} passHref>
            <a>
                <h1 className="title">{props.title}</h1>
                <p className="summary">{props.excerpt}</p>
                <p className="date">
                    {dayjs(props.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
                    {props.readingTime}
                </p>
                <p>{Constants.rating.get(props.rating)}</p>
            </a>
        </Link>
      </>
    )
  }
