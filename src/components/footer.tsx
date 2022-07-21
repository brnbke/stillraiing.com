import Link from 'next/link';
import React from 'react';

export default function Footer () {
  return (
    <>
        <footer className="border-t-4 border-black mt-5 pt-5">
            <div>
                <Link href={`/`}><a>WMBAT</a></Link>
			</div>
        </footer>
    </>
  )
}