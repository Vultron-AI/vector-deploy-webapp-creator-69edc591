/**
 * RecommendationCardSkeleton Component
 *
 * Skeleton loader for recommendation cards during loading state.
 */

import { cn } from '@/lib/utils'
import { Card, Skeleton, SkeletonText } from '@/components/ui'

export interface RecommendationCardSkeletonProps {
  className?: string
}

export function RecommendationCardSkeleton({
  className,
}: RecommendationCardSkeletonProps) {
  return (
    <Card
      className={cn('overflow-hidden', className)}
      data-testid="recommendation-card-skeleton"
    >
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4 mt-3" />
        <Skeleton className="h-4 w-1/3 mt-2" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Price */}
        <div>
          <Skeleton className="h-8 w-28 mb-2" />
          <div className="space-y-1">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <Skeleton className="h-14 w-full rounded-[var(--radius-sm)]" />

        {/* Return & Warranty */}
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-16 rounded-[var(--radius-sm)]" />
          <Skeleton className="h-16 rounded-[var(--radius-sm)]" />
        </div>

        {/* Reviews */}
        <div className="flex items-center gap-3 py-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Tags */}
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>

        {/* Why selected */}
        <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--color-accent)]/5">
          <Skeleton className="h-3 w-32 mb-2" />
          <SkeletonText lines={2} />
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full mt-2" />
      </div>
    </Card>
  )
}
