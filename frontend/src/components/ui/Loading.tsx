/**
 * Loading Component
 *
 * Loading indicators including spinner and skeleton loaders.
 *
 * Usage:
 *   <Loading />
 *   <Loading size="lg" />
 *   <Skeleton className="h-4 w-[250px]" />
 *   <SkeletonText lines={3} />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from './Spinner'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

function Loading({ size = 'md', className, text }: LoadingProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Spinner className={sizeClasses[size]} />
      {text && (
        <span className="text-sm text-[var(--color-muted)]">{text}</span>
      )}
    </div>
  )
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--radius-md)]',
        'bg-[var(--color-border)]',
        className
      )}
      {...props}
    />
  )
}

interface SkeletonTextProps {
  lines?: number
  className?: string
}

function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  )
}

interface SkeletonCardProps {
  className?: string
  showImage?: boolean
  lines?: number
}

function SkeletonCard({ className, showImage = true, lines = 3 }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)]',
        'bg-[var(--color-surface)] p-5',
        className
      )}
    >
      {showImage && <Skeleton className="h-32 w-full mb-4" />}
      <Skeleton className="h-6 w-3/4 mb-3" />
      <SkeletonText lines={lines} />
    </div>
  )
}

export { Loading, Skeleton, SkeletonText, SkeletonCard }
