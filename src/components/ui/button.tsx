'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden button-mouse-glow',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-[#7f5bff] via-[#9d7dff] to-[#d7c6ff] text-[#120d2d] shadow-[0_16px_40px_rgba(86,58,164,0.38)] hover:from-[#8d69ff] hover:to-[#e2d6ff] focus-visible:outline-[#b8a3ff]',
        secondary:
          'border border-[rgba(127,91,255,0.35)] bg-[rgba(127,91,255,0.12)] text-white hover:border-[rgba(127,91,255,0.55)] hover:bg-[rgba(127,91,255,0.2)] focus-visible:outline-[#b8a3ff]/70',
        ghost:
          'text-white hover:bg-[rgba(127,91,255,0.12)] focus-visible:outline-[#b8a3ff]/50',
        link: 'text-[#b8a3ff] underline-offset-4 hover:underline',
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
  (
    {
      className,
      variant,
      size,
      asChild = false,
      onMouseMove: userOnMouseMove,
      onMouseLeave: userOnMouseLeave,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      userOnMouseMove?.(event)
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      target.style.setProperty('--mouse-x', `${x}%`)
      target.style.setProperty('--mouse-y', `${y}%`)
    }

    const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      userOnMouseLeave?.(event)
      const target = event.currentTarget as HTMLElement
      target.style.removeProperty('--mouse-x')
      target.style.removeProperty('--mouse-y')
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
