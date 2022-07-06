import React, { FC } from 'react';

export interface LayoutProps { 
    children: React.ReactNode
 }

import Navbar from './navbar'
import Footer from './footer'

export default function Layout ( { children }: LayoutProps ) {
  return (
    <div className="p-5">
        <div className="container w-[980px] p-5 bg-white m-auto">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    </div>
  )
}