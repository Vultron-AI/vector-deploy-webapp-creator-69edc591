/**
 * ComparisonTable Component
 *
 * Side-by-side comparison table of all 3 recommendations.
 */

import * as React from 'react'
import { Star, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
} from '@/components/ui'
import { ScoreBreakdown } from './ScoreBreakdown'
import type { Recommendation } from '@/types/product'

export interface ComparisonTableProps {
  recommendations: Recommendation[]
  className?: string
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

const typeLabels = {
  best_value: { label: 'Best Value', variant: 'success' as const },
  fastest_delivery: { label: 'Fastest', variant: 'info' as const },
  best_quality: { label: 'Best Quality', variant: 'accent' as const },
}

export function ComparisonTable({ recommendations, className }: ComparisonTableProps) {
  const [expandedScores, setExpandedScores] = React.useState<string | null>(null)

  if (recommendations.length === 0) {
    return null
  }

  const toggleScores = (id: string) => {
    setExpandedScores(expandedScores === id ? null : id)
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)} data-testid="comparison-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Comparison</TableHead>
            {recommendations.map((rec) => (
              <TableHead key={rec.id} className="text-center min-w-[180px]">
                <div className="flex flex-col items-center gap-2">
                  <Badge variant={typeLabels[rec.type].variant}>
                    {typeLabels[rec.type].label}
                  </Badge>
                  {rec.retailer.logo && (
                    <img
                      src={rec.retailer.logo}
                      alt={rec.retailer.name}
                      className="h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <span className="font-normal text-[var(--color-muted)]">
                    {rec.retailer.name}
                  </span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Price row */}
          <TableRow>
            <TableCell className="font-medium">Item Price</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                {formatCurrency(rec.priceBreakdown.itemPrice)}
              </TableCell>
            ))}
          </TableRow>

          {/* Shipping row */}
          <TableRow>
            <TableCell className="font-medium">Shipping</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                {rec.priceBreakdown.shippingCost === 0 ? (
                  <span className="text-[var(--color-success)]">FREE</span>
                ) : (
                  formatCurrency(rec.priceBreakdown.shippingCost)
                )}
              </TableCell>
            ))}
          </TableRow>

          {/* Installation row (if any) */}
          {recommendations.some((r) => r.priceBreakdown.installationCost) && (
            <TableRow>
              <TableCell className="font-medium">Installation</TableCell>
              {recommendations.map((rec) => (
                <TableCell key={rec.id} className="text-center">
                  {rec.priceBreakdown.installationCost
                    ? formatCurrency(rec.priceBreakdown.installationCost)
                    : '-'}
                </TableCell>
              ))}
            </TableRow>
          )}

          {/* Tax row */}
          <TableRow>
            <TableCell className="font-medium">Tax</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                {rec.priceBreakdown.tax
                  ? formatCurrency(rec.priceBreakdown.tax)
                  : 'Varies'}
              </TableCell>
            ))}
          </TableRow>

          {/* Total row */}
          <TableRow className="bg-[var(--color-surface)]">
            <TableCell className="font-semibold">Total</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                <span className="text-lg font-bold text-[var(--color-fg)]">
                  {formatCurrency(rec.priceBreakdown.totalCost)}
                </span>
                {rec.priceBreakdown.isEstimated && (
                  <span className="block text-xs text-[var(--color-muted)]">
                    *estimated
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>

          {/* Delivery row */}
          <TableRow>
            <TableCell className="font-medium">Delivery</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                <div>
                  <p className="font-medium">{rec.delivery.estimatedDeliveryDate}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {rec.delivery.deliveryWindow}
                  </p>
                </div>
              </TableCell>
            ))}
          </TableRow>

          {/* Return Policy row */}
          <TableRow>
            <TableCell className="font-medium">Returns</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center text-sm">
                {rec.retailer.returnPolicy}
              </TableCell>
            ))}
          </TableRow>

          {/* Warranty row */}
          <TableRow>
            <TableCell className="font-medium">Warranty</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center text-sm">
                {rec.retailer.warrantyInfo || 'Standard'}
              </TableCell>
            ))}
          </TableRow>

          {/* Reviews row */}
          <TableRow>
            <TableCell className="font-medium">Reviews</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-[var(--color-warning)] fill-current" />
                  <span className="font-medium">{rec.reviews.rating.toFixed(1)}</span>
                  <span className="text-xs text-[var(--color-muted)]">
                    ({rec.reviews.reviewCount.toLocaleString()})
                  </span>
                </div>
              </TableCell>
            ))}
          </TableRow>

          {/* Overall Score row */}
          <TableRow className="bg-[var(--color-surface)]">
            <TableCell className="font-semibold">Overall Score</TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                <span className="text-xl font-bold text-[var(--color-accent)]">
                  {rec.scores.overall}
                </span>
              </TableCell>
            ))}
          </TableRow>

          {/* Score breakdown toggle row */}
          <TableRow>
            <TableCell className="font-medium">
              <button
                className={cn(
                  'flex items-center gap-1 text-sm',
                  'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                )}
                onClick={() => toggleScores(expandedScores ? '' : 'all')}
              >
                Score Details
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    expandedScores && 'rotate-180'
                  )}
                />
              </button>
            </TableCell>
            {recommendations.map((rec) => (
              <TableCell key={rec.id} className="text-center">
                <button
                  className="text-sm text-[var(--color-accent)] hover:underline"
                  onClick={() => toggleScores(rec.id)}
                >
                  {expandedScores === rec.id ? 'Hide' : 'View'}
                </button>
              </TableCell>
            ))}
          </TableRow>

          {/* Expanded score breakdown */}
          {expandedScores && (
            <TableRow>
              <TableCell colSpan={recommendations.length + 1} className="p-0">
                <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--color-bg)]">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={cn(
                        expandedScores !== 'all' &&
                          expandedScores !== rec.id &&
                          'opacity-30'
                      )}
                    >
                      <p className="text-sm font-medium text-center mb-2">
                        {rec.retailer.name}
                      </p>
                      <ScoreBreakdown scores={rec.scores} />
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
