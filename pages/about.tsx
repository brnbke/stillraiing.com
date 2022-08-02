import React from 'react'

import type { NextPage } from 'next'
import { GetStaticProps } from 'next'

import dayjs from 'dayjs'

import type { Post, PostProps } from '../src/d'

import { getAllArticlesProp } from '../src/utils/getProps'

import { HeadElem } from 'components/head'
import { SideBar } from 'components/sidebar'

const Home: NextPage<PostProps> = (props) => {

  const archiveMonths = new Map<string, string>()

  props.posts.map((post: Post) => {
    archiveMonths.set(dayjs(post.publishedAt).format('YYYYMM'), dayjs(post.publishedAt).format('MMMM YYYY'))
  })

  return <React.Fragment>
    <HeadElem />
    <div className="grid grid-cols-8">
      <main className="col-span-6">
        <h1>About the rage.</h1>
        <p>“The point is, ladies and gentleman, that rage – for lack of a better word — is good.</p>
        <p>Rage is right.</p>
        <p>Rage works.</p>
        <p>Rage clarifies, cuts through, and captures the essence of the evolutionary spirit.</p>
        <p>Rage, in all of its forms — Rage for life, for money, for love, knowledge — has marked the upward surge of mankind.</p>
        <p>And Rage– you mark my words — will not only save Teldar Paper, but that other malfunctioning corporation called the USA.”</p>
        <p>Would have been a much better speech, Mr Gekko…</p>
      </main>
      <div className="col-span-2">
        <SideBar posts={props.posts} />
      </div>
    </div>
  </React.Fragment>
}

export default Home

export const getStaticProps: GetStaticProps = async () => getAllArticlesProp()
