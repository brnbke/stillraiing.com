import React from 'react';
import Head from 'next/head'

export function HeadElem(props: { headStr?: string }) {
  return (
    <>
      <Head>
        <title>{props.headStr && `${props.headStr} - `}It&apos;s Still Raining</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
    </>
  )
}