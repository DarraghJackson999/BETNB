import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'border-[#3a311f] bg-[#221d12] text-[#fbd24d]',
        positive: 'border-[#2d4220] bg-[#1e2b19] text-[#8be280]',
        negative: 'border-[#472124] bg-[#2d1316] text-[#f08080]',
        outline: 'border-[#403525] text-[#d6c8aa]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
