import { ComponentProps, ReactNode } from 'react'

export interface LiProps extends ComponentProps<'li'> {
    children?: ReactNode
}

export interface UlProps extends ComponentProps<'ul'> {
    children?: ReactNode
}

export function Li({ children }: LiProps) {
    return (
        <li className='list-disc list-inside'>
            {children}
        </li>
    )
}

export function Ul({ children }: UlProps) {
    return (
        <ul className='pb-5'>
            {children}
        </ul>
    )
}

