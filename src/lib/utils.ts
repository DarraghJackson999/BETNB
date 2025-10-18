import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number) {
  return `${Math.round(value * 100)}¢`
}

export function formatUsd(value: number) {
  const hasWholeNumberPrecision = value >= 1000
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: hasWholeNumberPrecision ? 0 : 2,
    maximumFractionDigits: hasWholeNumberPrecision ? 0 : 2,
  })}`
}

export function formatDateLabel(timestamp: string) {
  return format(new Date(timestamp), 'MMM d')
}
