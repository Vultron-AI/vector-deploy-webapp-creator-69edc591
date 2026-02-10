/**
 * RecommendationCard Component
 *
 * Displays a single recommendation with all details: retailer, pricing,
 * delivery, reviews, scores, and purchase link.
 */

import * as React from 'react'
import {
  ExternalLink,
  Star,
  Truck,
  Shield,
  Clock,
  ChevronDown,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, Badge, Button } from '@/components/ui'
import { ScoreBreakdown } from './ScoreBreakdown'
import type { Recommendation } from '@/types/product'

export interface RecommendationCardProps {
  recommendation: Recommendation | null
  type: 'best_value' | 'fastest_delivery' | 'best_quality'
  className?: string
}

const typeConfig = {
  best_value: {
    label: 'Best Value',
    variant: 'success' as const,
    icon: Star,
  },
  fastest_delivery: {
    label: 'Fastest Delivery',
    variant: 'info' as const,
    icon: Truck,
  },
  best_quality: {
    label: 'Best Quality',
    variant: 'accent' as const,
    icon: Shield,
  },
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function RecommendationCard({
  recommendation,
  type,
  className,
}: RecommendationCardProps) {
  const [showScores, setShowScores] = React.useState(false)
  const config = typeConfig[type]
  const TypeIcon = config.icon

  // Empty state when no recommendation for this slot
  if (!recommendation) {
    return (
      <Card
        className={cn(
          'flex flex-col items-center justify-center min-h-[300px]',
          'border-dashed',
          className
        )}
        data-testid={`recommendation-card-${type}-empty`}
      >
        <AlertCircle className="h-10 w-10 text-[var(--color-muted)] mb-3" />
        <p className="text-sm font-medium text-[var(--color-muted)]">
          No better alternative found
        </p>
        <p className="text-xs text-[var(--color-muted)] mt-1">
          for {config.label.toLowerCase()}
        </p>
      </Card>
    )
  }

  const { retailer, priceBreakdown, delivery, reviews, scores, tradeoffs, purchaseUrl } =
    recommendation

  return (
    <Card className={cn('overflow-hidden', className)} data-testid={`recommendation-card-${type}`}>
      {/* Header with badge */}
      <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center justify-between">
          <Badge variant={config.variant} className="flex items-center gap-1">
            <TypeIcon className="h-3 w-3" />
            {config.label}
          </Badge>
          {retailer.logo && (
            <img
              src={retailer.logo}
              alt={retailer.name}
              className="h-6 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-[var(--color-fg)]">
          {recommendation.product.name}
        </h3>
        <p className="text-sm text-[var(--color-muted)]">{retailer.name}</p>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Price breakdown */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-2xl font-bold text-[var(--color-fg)]">
              {formatCurrency(priceBreakdown.totalCost, priceBreakdown.currency)}
            </span>
            {priceBreakdown.isEstimated && (
              <span className="text-xs text-[var(--color-muted)]">*estimated</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-[var(--color-muted)]">
              <span>Item price</span>
              <span>{formatCurrency(priceBreakdown.itemPrice)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-muted)]">
              <span>Shipping</span>
              <span>
                {priceBreakdown.shippingCost === 0
                  ? 'FREE'
                  : formatCurrency(priceBreakdown.shippingCost)}
              </span>
            </div>
            {priceBreakdown.installationCost && priceBreakdown.installationCost > 0 && (
              <div className="flex justify-between text-[var(--color-muted)]">
                <span>Installation</span>
                <span>{formatCurrency(priceBreakdown.installationCost)}</span>
              </div>
            )}
            {priceBreakdown.tax && (
              <div className="flex justify-between text-[var(--color-muted)]">
                <span>Tax</span>
                <span>{formatCurrency(priceBreakdown.tax)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery info */}
        <div className="flex items-center gap-2 py-2 px-3 rounded-[var(--radius-sm)] bg-[var(--color-bg)]">
          <Clock className="h-4 w-4 text-[var(--color-accent)]" />
          <div>
            <p className="text-sm font-medium text-[var(--color-fg)]">
              Arrives {delivery.estimatedDeliveryDate}
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              {delivery.deliveryWindow} via {delivery.shippingMethod}
            </p>
          </div>
        </div>

        {/* Return & Warranty */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-[var(--radius-sm)] bg-[var(--color-bg)]">
            <p className="font-medium text-[var(--color-fg)]">Returns</p>
            <p className="text-[var(--color-muted)]">{retailer.returnPolicy}</p>
          </div>
          {retailer.warrantyInfo && (
            <div className="p-2 rounded-[var(--radius-sm)] bg-[var(--color-bg)]">
              <p className="font-medium text-[var(--color-fg)]">Warranty</p>
              <p className="text-[var(--color-muted)]">{retailer.warrantyInfo}</p>
            </div>
          )}
        </div>

        {/* Reviews summary */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-[var(--color-warning)] fill-current" />
            <span className="font-medium text-[var(--color-fg)]">
              {reviews.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-[var(--color-muted)]">
            ({reviews.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Sentiment themes */}
        <div className="flex flex-wrap gap-1">
          {reviews.sentimentThemes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              className={cn(
                'inline-block px-2 py-0.5 text-xs rounded-full',
                'bg-[var(--color-surface)] text-[var(--color-muted)]',
                'border border-[var(--color-border)]'
              )}
            >
              {theme}
            </span>
          ))}
        </div>

        {/* Why selected */}
        <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20">
          <p className="text-xs font-medium text-[var(--color-accent)] mb-1">
            Why this was selected
          </p>
          <p className="text-sm text-[var(--color-fg)]">{recommendation.whySelected}</p>
        </div>

        {/* Tradeoffs */}
        {tradeoffs.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--color-muted)] mb-2">
              Trade-offs to consider
            </p>
            <ul className="space-y-1">
              {tradeoffs.map((tradeoff, i) => (
                <li
                  key={i}
                  className={cn(
                    'text-xs flex items-start gap-2',
                    tradeoff.impact === 'positive'
                      ? 'text-[var(--color-success)]'
                      : tradeoff.impact === 'negative'
                        ? 'text-[var(--color-error)]'
                        : 'text-[var(--color-muted)]'
                  )}
                >
                  <span>{tradeoff.impact === 'positive' ? '+' : '-'}</span>
                  {tradeoff.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Score breakdown toggle */}
        <button
          onClick={() => setShowScores(!showScores)}
          className={cn(
            'w-full flex items-center justify-between py-2 text-sm',
            'text-[var(--color-muted)] hover:text-[var(--color-fg)]',
            'transition-colors'
          )}
          data-testid="score-breakdown-toggle"
        >
          <span>Show how we scored this</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              showScores && 'rotate-180'
            )}
          />
        </button>

        {showScores && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <ScoreBreakdown scores={scores} />
          </div>
        )}

        {/* Purchase button */}
        <Button
          className="w-full mt-2"
          onClick={() => window.open(purchaseUrl, '_blank', 'noopener,noreferrer')}
          data-testid="purchase-button"
        >
          <span className="flex items-center gap-2">
            Buy from {retailer.name}
            <ExternalLink className="h-4 w-4" />
          </span>
        </Button>
      </CardContent>
    </Card>
  )
}
