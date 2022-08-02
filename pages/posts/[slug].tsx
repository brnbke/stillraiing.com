import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import dayjs from 'dayjs'

import { HeadElem } from 'components/head'
import { Text } from 'components/text'

import { getSlug, getArticleFromSlug } from 'utils/mdx'

import type { IParams, Post } from 'd'

interface blogPost {
  post: {
    source: MDXRemoteSerializeResult
    frontmatter: Post
  }
}

export default function Blog({ post: { source, frontmatter } }: blogPost) {
  return (
    <React.Fragment>
      <HeadElem headStr={frontmatter.title} />
      <div className="article-container px-5 py-10">
      <Text appearance='h1' as='h1'>{frontmatter.title}</Text>
      <Text appearance='small' as='p'>
        Posted on {dayjs(frontmatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
          {frontmatter.readingTime}
      </Text>
        <div className="content">
          <MDXRemote {...source} components={{ Image }} />
        </div>
      </div>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  //fetch the particular file based on the slug
  const { slug } = context.params as IParams
  const { content, frontmatter } = await getArticleFromSlug(slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ['anchor'] },
          },
          { behaviour: 'wrap' },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  })

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  }
}

// dynamically generate the slugs for each article(s)
export const getStaticPaths: GetStaticPaths = async () => {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }))

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  }
}
