/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link'

export function NavBar() {
  return (
    <>
      <header>
        <div className="mb-5 text-3xl font-bold">
          <Link href={`/`}><a>WMBAT</a></Link>
        </div>
        <div className=' leading-[0]'>
          <img src="/header.jpg" alt="Raging into the void" />
        </div>
        <div className="bg-black text-white text-sm py-2 px-5">
          <Link href={`/`}>
            <a className="inline-block pr-3">Home</a>
          </Link>
          <Link href={`/about`}>
            <a className="">About the rage</a>
          </Link>
        </div>
      </header>
    </>
  )
}
