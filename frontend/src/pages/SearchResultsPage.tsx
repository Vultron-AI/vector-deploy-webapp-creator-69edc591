/**
 * SearchResultsPage Component
 *
 * Main page orchestrating the full search and recommendation flow.
 */

import * as React from 'react'
import { LayoutGrid, Table as TableIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, EmptyState } from '@/components/ui'
import { SearchBar } from '@/components/search/SearchBar'
import { PreferenceSelector } from '@/components/search/PreferenceSelector'
import { VariantSelector } from '@/components/search/VariantSelector'
import { RecommendationCard } from '@/components/recommendations/RecommendationCard'
import { ComparisonTable } from '@/components/recommendations/ComparisonTable'
import { NeutralityBadge } from '@/components/common/NeutralityBadge'
import { RecommendationCardSkeleton } from '@/components/recommendations/RecommendationCardSkeleton'
import type {
  Product,
  Recommendation,
  PresetType,
  PreferenceWeights,
  ProductVariant,
} from '@/types/product'
import {
  searchProducts,
  getRecommendations,
  getPresetWeights,
} from '@/services/mockData'

type ViewMode = 'cards' | 'table'
type PageState = 'idle' | 'searching' | 'results' | 'error' | 'no_results'

export function SearchResultsPage() {
  // Search state
  const [query, setQuery] = React.useState('')
  const [zipCode, setZipCode] = React.useState<string>()
  const [pageState, setPageState] = React.useState<PageState>('idle')
  const [error, setError] = React.useState<string | null>(null)

  // Product state
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
  const [variants, setVariants] = React.useState<ProductVariant[]>([])
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>()

  // Preference state
  const [selectedPreset, setSelectedPreset] = React.useState<PresetType>('best_value')
  const [customWeights, setCustomWeights] = React.useState<PreferenceWeights>()

  // Results state
  const [recommendations, setRecommendations] = React.useState<Recommendation[]>([])
  const [viewMode, setViewMode] = React.useState<ViewMode>('cards')

  // Handle search
  const handleSearch = async (searchQuery: string, searchZipCode?: string) => {
    setQuery(searchQuery)
    setZipCode(searchZipCode)
    setPageState('searching')
    setError(null)
    setRecommendations([])

    try {
      const results = await searchProducts(searchQuery)

      if (results.products.length === 0) {
        setSelectedProduct(null)
        setPageState('no_results')
        return
      }

      // Select first product
      const product = results.products[0]
      setSelectedProduct(product)
      setVariants(product.variants || [])
      setSelectedVariantId(product.id)

      // Fetch recommendations
      await fetchRecommendations(product.id, searchZipCode)
    } catch (err) {
      setError('Failed to search products. Please try again.')
      setPageState('error')
    }
  }

  // Fetch recommendations
  const fetchRecommendations = async (productId: string, zip?: string) => {
    setPageState('searching')
    try {
      const weights = customWeights || getPresetWeights(selectedPreset)
      const result = await getRecommendations(productId, weights, zip)
      setRecommendations(result.recommendations)
      setPageState('results')
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.')
      setPageState('error')
    }
  }

  // Handle preference change
  const handlePreferenceChange = async (
    preset: PresetType,
    weights: PreferenceWeights
  ) => {
    setSelectedPreset(preset)
    setCustomWeights(preset === 'custom' ? weights : undefined)

    // Re-fetch recommendations if we have a product selected
    if (selectedProduct) {
      await fetchRecommendations(
        selectedVariantId || selectedProduct.id,
        zipCode
      )
    }
  }

  // Handle variant selection
  const handleVariantSelect = async (variantId: string) => {
    setSelectedVariantId(variantId)
    await fetchRecommendations(variantId, zipCode)
  }

  // Retry on error
  const handleRetry = () => {
    if (query) {
      handleSearch(query, zipCode)
    }
  }

  // Get recommendations for each type
  const getRecommendationByType = (
    type: 'best_value' | 'fastest_delivery' | 'best_quality'
  ) => {
    return recommendations.find((r) => r.type === type) || null
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]" data-testid="search-results-page">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-fg)] mb-2">
            ShopAssist
          </h1>
          <p className="text-[var(--color-muted)]">
            Find the best deal across retailers
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <SearchBar
            onSearch={handleSearch}
            isLoading={pageState === 'searching'}
            initialQuery={query}
            initialZipCode={zipCode}
          />
        </div>

        {/* Neutrality badge (always visible) */}
        <div className="max-w-2xl mx-auto mb-8">
          <NeutralityBadge />
        </div>

        {/* Idle state */}
        {pageState === 'idle' && !recommendations.length && (
          <div className="mt-12">
            <EmptyState
              title="Search for a product"
              description="Enter a product name above to compare prices across Amazon, Walmart, Best Buy, and Home Depot."
            />
          </div>
        )}

        {/* No results state */}
        {pageState === 'no_results' && (
          <div className="mt-12">
            <EmptyState
              title="No products found"
              description={`We couldn't find any products matching "${query}". Try a different search term.`}
            />
          </div>
        )}

        {/* Error state */}
        {pageState === 'error' && (
          <div className="mt-12">
            <EmptyState
              title="Something went wrong"
              description={error || 'An unexpected error occurred.'}
              action={
                <Button onClick={handleRetry}>Try Again</Button>
              }
            />
          </div>
        )}

        {/* Results section */}
        {(pageState === 'results' || pageState === 'searching') &&
          selectedProduct && (
            <div className="space-y-6">
              {/* Product info */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-[var(--color-fg)]">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm text-[var(--color-muted)]">
                  {selectedProduct.brand} &middot; {selectedProduct.category}
                </p>
              </div>

              {/* Variant selector */}
              {variants.length > 1 && (
                <VariantSelector
                  variants={variants}
                  selectedVariantId={selectedVariantId}
                  onVariantSelect={handleVariantSelect}
                />
              )}

              {/* Preference selector */}
              <PreferenceSelector
                selectedPreset={selectedPreset}
                customWeights={customWeights}
                onPreferenceChange={handlePreferenceChange}
              />

              {/* View toggle */}
              <div className="flex justify-end gap-2">
                <Button
                  variant={viewMode === 'cards' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  data-testid="view-cards"
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Cards
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  data-testid="view-table"
                >
                  <TableIcon className="h-4 w-4 mr-1" />
                  Compare
                </Button>
              </div>

              {/* Loading state */}
              {pageState === 'searching' && (
                <div
                  className={cn(
                    viewMode === 'cards' &&
                      'grid grid-cols-1 md:grid-cols-3 gap-6'
                  )}
                >
                  {viewMode === 'cards' ? (
                    <>
                      <RecommendationCardSkeleton />
                      <RecommendationCardSkeleton />
                      <RecommendationCardSkeleton />
                    </>
                  ) : (
                    <div className="animate-pulse space-y-4">
                      <div className="h-8 bg-[var(--color-border)] rounded w-full" />
                      <div className="h-64 bg-[var(--color-border)] rounded w-full" />
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {pageState === 'results' && (
                <>
                  {viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <RecommendationCard
                        recommendation={getRecommendationByType('best_value')}
                        type="best_value"
                      />
                      <RecommendationCard
                        recommendation={getRecommendationByType('fastest_delivery')}
                        type="fastest_delivery"
                      />
                      <RecommendationCard
                        recommendation={getRecommendationByType('best_quality')}
                        type="best_quality"
                      />
                    </div>
                  ) : (
                    <ComparisonTable recommendations={recommendations} />
                  )}
                </>
              )}

              {/* No results */}
              {pageState === 'results' && recommendations.length === 0 && (
                <EmptyState
                  title="No recommendations found"
                  description="We couldn't find any retailers with this product. Try a different search."
                />
              )}
            </div>
          )}
      </div>
    </div>
  )
}
