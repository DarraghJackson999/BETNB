'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export const TabsList = TabsPrimitive.List

export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex min-w-[120px] shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
      'text-white data-[state=active]:text-[#160d35]',
      'data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7f5bff] data-[state=active]:to-[#d7c6ff]',
      'data-[state=active]:shadow-[0_14px_32px_rgba(86,58,164,0.34)]',
      'hover:bg-[rgba(127,91,255,0.12)]',
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
