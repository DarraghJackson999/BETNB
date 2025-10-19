import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'border-[rgba(127,91,255,0.38)] bg-[rgba(127,91,255,0.16)] text-white',
        positive: 'border-[rgba(120,206,255,0.4)] bg-[rgba(32,63,92,0.6)] text-white',
        negative: 'border-[rgba(255,138,166,0.45)] bg-[rgba(66,25,44,0.7)] text-white',
        outline: 'border-[rgba(127,91,255,0.38)] text-white',
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
