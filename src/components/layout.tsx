import React, { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode
}

import Navbar from './navbar'
import Footer from './footer'


export default function Layout({ children }: LayoutProps) {
  console.log(children)
  return (
    <div className="p-5">
      <div className="container w-[980px] p-5 bg-white m-auto">
        <Navbar />
        <>{children}</>
        <Footer />
      </div>
    </div>
  )
}