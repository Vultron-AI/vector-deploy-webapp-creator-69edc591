/**
 * ScoreBreakdown Component
 *
 * Displays transparent score breakdown with visual indicators.
 */

import { cn } from '@/lib/utils'
import type { Score } from '@/types/product'

export interface ScoreBreakdownProps {
  scores: Score
  className?: string
}

interface ScoreItem {
  key: keyof Score
  label: string
  description: string
  color: string
}

const scoreItems: ScoreItem[] = [
  {
    key: 'value',
    label: 'Value',
    description: 'Price competitiveness',
    color: 'bg-[var(--color-success)]',
  },
  {
    key: 'speed',
    label: 'Speed',
    description: 'Delivery speed',
    color: 'bg-[var(--color-info)]',
  },
  {
    key: 'trust',
    label: 'Trust',
    description: 'Retailer reliability',
    color: 'bg-[var(--color-chart-3)]',
  },
  {
    key: 'quality',
    label: 'Quality',
    description: 'Product quality (from reviews)',
    color: 'bg-[var(--color-warning)]',
  },
  {
    key: 'fit',
    label: 'Fit',
    description: 'Match to your preferences',
    color: 'bg-[var(--color-accent)]',
  },
]

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex-1 h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
      <div
        className={cn('h-full rounded-full transition-all duration-500', color)}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export function ScoreBreakdown({ scores, className }: ScoreBreakdownProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-[var(--radius-md)]',
        'bg-[var(--color-bg)] border border-[var(--color-border)]',
        className
      )}
      data-testid="score-breakdown"
    >
      <div className="space-y-3">
        {scoreItems.map((item) => (
          <div key={item.key} className="space-y-1">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-[var(--color-fg)]">
                  {item.label}
                </span>
                <span className="ml-2 text-xs text-[var(--color-muted)]">
                  {item.description}
                </span>
              </div>
              <span className="text-sm font-medium text-[var(--color-fg)]">
                {scores[item.key]}
              </span>
            </div>
            <ScoreBar value={scores[item.key]} color={item.color} />
          </div>
        ))}

        {/* Overall score */}
        <div className="pt-3 mt-3 border-t border-[var(--color-border)]">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-semibold text-[var(--color-fg)]">
                Overall Score
              </span>
              <span className="ml-2 text-xs text-[var(--color-muted)]">
                Weighted combination
              </span>
            </div>
            <span className="text-lg font-bold text-[var(--color-accent)]">
              {scores.overall}
            </span>
          </div>
          <div className="mt-2">
            <ScoreBar value={scores.overall} color="bg-[var(--color-accent)]" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-[var(--color-muted)]">
        Scores are calculated based on price comparison, retailer data, and aggregated
        review analysis. Higher is better.
      </p>
    </div>
  )
}
