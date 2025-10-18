'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-[#ffda64] to-[#f8c931] text-[#1a1407] shadow-[0_12px_30px_rgba(248,201,49,0.35)] hover:from-[#ffe17e] hover:to-[#fbd24d] focus-visible:outline-[#fbd24d]',
        secondary:
          'bg-[#1d1a12]/80 text-[#f5f1e6] border border-[#f0c859]/30 hover:border-[#f0c859]/60 focus-visible:outline-[#f0c859]/70',
        ghost: 'text-[#f5f1e6] hover:bg-[#2a271d]/60 focus-visible:outline-[#f0c859]/50',
        link: 'text-[#fbd24d] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
