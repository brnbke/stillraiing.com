import { ReactNode } from 'react'
import clsx from 'clsx'

export interface TextProps {
    children?: ReactNode
    appearance?: 'h1' | 'body' | 'small'
    as?: 'div' | 'p' | 'h1'
}

export function Text({ children, appearance = 'body', as: As = 'p'}: TextProps) {
    return (
        <As
            className={clsx({
                ['text-2xl font-bold']: appearance === 'h1',
                ['text-sm text-slate-600 mb-6']: appearance === 'small',
            })}
        >
            {children}
        </As>
    )
}