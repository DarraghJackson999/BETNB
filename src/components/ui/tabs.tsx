'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export const TabsList = TabsPrimitive.List

export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
      'text-[#bfb59f] data-[state=active]:text-[#141007]',
      'data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ffda64] data-[state=active]:to-[#f8c931]',
      'data-[state=active]:shadow-[0_12px_30px_rgba(248,201,49,0.35)]',
      'hover:bg-[#1f1a12]/60',
      className
    )}
    {...props}
  />
)

export const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content
    className={cn('mt-6 focus-visible:outline-none', className)}
    {...props}
  />
)
