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
          'flex h-11 w-full rounded-full border border-[#2d2617] bg-[#141007] px-5 text-sm text-[#f5f1e6]',
          'placeholder:text-[#6f6550] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c859]/70',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
