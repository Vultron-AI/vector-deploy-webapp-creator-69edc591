/**
 * VariantSelector Component
 *
 * Shows product variants when multiple versions exist.
 */

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui'
import type { ProductVariant } from '@/types/product'

export interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariantId?: string
  onVariantSelect: (variantId: string) => void
  className?: string
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onVariantSelect,
  className,
}: VariantSelectorProps) {
  if (!variants || variants.length <= 1) {
    return null
  }

  return (
    <div className={cn('w-full', className)} data-testid="variant-selector">
      <p className="text-sm font-medium text-[var(--color-fg)] mb-3">
        Did you mean a different version?
      </p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId
          return (
            <Card
              key={variant.id}
              className={cn(
                'p-3 cursor-pointer transition-all duration-[var(--motion-fast)]',
                'hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-md)]',
                isSelected && 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
              )}
              onClick={() => onVariantSelect(variant.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onVariantSelect(variant.id)
                }
              }}
              aria-pressed={isSelected}
              data-testid={`variant-${variant.id}`}
            >
              <div className="flex items-start gap-3">
                {/* Variant image placeholder */}
                {variant.imageUrl ? (
                  <img
                    src={variant.imageUrl}
                    alt={variant.name}
                    className="w-12 h-12 rounded-[var(--radius-sm)] object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-[var(--color-border)] flex items-center justify-center">
                    <span className="text-xs text-[var(--color-muted)]">
                      {variant.name.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--color-fg)]">
                      {variant.name}
                    </span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-[var(--color-accent)]" />
                    )}
                  </div>
                  {/* Differentiators */}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {Object.entries(variant.differentiators).map(([key, value]) => (
                      <span
                        key={key}
                        className={cn(
                          'inline-block px-2 py-0.5 text-xs rounded-full',
                          'bg-[var(--color-surface)] text-[var(--color-muted)]',
                          'border border-[var(--color-border)]'
                        )}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
