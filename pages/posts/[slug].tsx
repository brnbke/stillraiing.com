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


import { getSlug, getArticleFromSlug } from '../../src/utils/mdx'

import type { IParams, Post } from '../../src/d'

interface blogPost {
  post: {
    source: MDXRemoteSerializeResult
    frontmatter: Post
  }
}

export default function Blog({ post: { source, frontmatter } }: blogPost) {
  return (
    <React.Fragment>
      <Head>
        <title>{frontmatter.title} | My blog</title>
      </Head>
      <div className="article-container">
        <h1 className="article-title">{frontmatter.title}</h1>
        <p className="publish-date">
          {dayjs(frontmatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
          {frontmatter.readingTime}
        </p>
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