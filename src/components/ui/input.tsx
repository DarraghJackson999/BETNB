import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-full border border-[rgba(127,91,255,0.34)] bg-[rgba(13,9,34,0.88)] px-5 text-sm text-white',
          'placeholder:text-[#9b8ccc]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8a3ff]/70',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
