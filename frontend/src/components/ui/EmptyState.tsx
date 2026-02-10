/**
 * EmptyState Component
 *
 * A placeholder component for empty states with icon, title, description, and CTA.
 *
 * Usage:
 *   <EmptyState
 *     icon={<SearchIcon />}
 *     title="No results found"
 *     description="Try adjusting your search terms"
 *     action={<Button>Search again</Button>}
 *   />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Inbox } from 'lucide-react'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-full',
          'bg-[var(--color-surface)] text-[var(--color-muted)]',
          'mb-4'
        )}
      >
        {icon || <Inbox className="h-8 w-8" />}
      </div>
      <h3 className="text-lg font-medium text-[var(--color-fg)]">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export { EmptyState }
