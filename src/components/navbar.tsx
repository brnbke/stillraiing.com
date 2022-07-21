import React from 'react';
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar () {
  return (
    <>
        <header>
            <div className="mb-5 text-3xl font-bold">
                <Link href={`/`}><a>WMBAT</a></Link>
            </div>
            <div className=' leading-[0]'>
                <Image src="./header.jpg" alt="Rage" width="940" height="464" />
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