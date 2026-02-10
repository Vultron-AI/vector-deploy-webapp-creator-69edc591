/**
 * NeutralityBadge Component
 *
 * Displays the neutrality/trust statement about no sponsorships.
 */

import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NeutralityBadgeProps {
  className?: string
  variant?: 'banner' | 'badge'
}

export function NeutralityBadge({
  className,
  variant = 'banner',
}: NeutralityBadgeProps) {
  if (variant === 'badge') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5',
          'rounded-full text-xs font-medium',
          'bg-[var(--color-success)]/10 text-[var(--color-success)]',
          'border border-[var(--color-success)]/20',
          className
        )}
        data-testid="neutrality-badge"
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>No sponsorships</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4',
        'rounded-[var(--radius-md)]',
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
        className
      )}
      data-testid="neutrality-banner"
    >
      <div
        className={cn(
          'flex items-center justify-center',
          'h-10 w-10 rounded-full',
          'bg-[var(--color-success)]/10'
        )}
      >
        <ShieldCheck className="h-5 w-5 text-[var(--color-success)]" />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--color-fg)]">
          Unbiased Recommendations
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          This app does not take sponsorships. Results are ranked by your preferences
          and transparent scoring.
        </p>
      </div>
    </div>
  )
}
