import { ReactNode } from 'react'
import { NavBar } from 'components/navbar'
import { Footer } from 'components/footer'

export interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {

  return (
    <div className="p-5">
      <div className="container w-[980px] p-5 bg-white m-auto">
        <NavBar />
        <>{children}</>
        <Footer />
      </div>
    </div>
  )
}
