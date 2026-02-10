/**
 * SearchBar Component
 *
 * Product search component with name input, optional zip code, and search button.
 * Includes form validation, loading state, and clear/reset functionality.
 */

import * as React from 'react'
import { Search, X, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Input } from '@/components/ui'

export interface SearchBarProps {
  onSearch: (query: string, zipCode?: string) => void
  isLoading?: boolean
  initialQuery?: string
  initialZipCode?: string
  className?: string
}

export function SearchBar({
  onSearch,
  isLoading = false,
  initialQuery = '',
  initialZipCode = '',
  className,
}: SearchBarProps) {
  const [query, setQuery] = React.useState(initialQuery)
  const [zipCode, setZipCode] = React.useState(initialZipCode)
  const [showZipCode, setShowZipCode] = React.useState(!!initialZipCode)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate query
    if (!query.trim()) {
      setError('Please enter a product name')
      return
    }

    // Validate zip code if provided
    if (showZipCode && zipCode && !/^\d{5}(-\d{4})?$/.test(zipCode)) {
      setError('Please enter a valid 5-digit zip code')
      return
    }

    setError(null)
    onSearch(query.trim(), showZipCode ? zipCode.trim() : undefined)
  }

  const handleClear = () => {
    setQuery('')
    setZipCode('')
    setError(null)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (error) setError(null)
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and dash
    const value = e.target.value.replace(/[^\d-]/g, '')
    setZipCode(value)
    if (error) setError(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('w-full', className)}
      data-testid="search-bar"
    >
      <div className="flex flex-col gap-3">
        {/* Main search row */}
        <div className="flex gap-2">
          {/* Product search input */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search for a product..."
              disabled={isLoading}
              className={cn(
                'flex h-11 w-full rounded-[var(--radius-md)] pl-10 pr-10 py-2 text-sm',
                'border border-[var(--color-border)]',
                'bg-[var(--color-bg)] text-[var(--color-fg)]',
                'placeholder:text-[var(--color-muted)]',
                'focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-focus-ring)]',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'transition-colors duration-[var(--motion-fast)]',
                error && 'border-[var(--color-error)]'
              )}
              aria-label="Product search"
              data-testid="search-input"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  'absolute right-3 top-1/2 -translate-y-1/2',
                  'text-[var(--color-muted)] hover:text-[var(--color-fg)]',
                  'transition-colors'
                )}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Zip code toggle button */}
          <Button
            type="button"
            variant={showZipCode ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setShowZipCode(!showZipCode)}
            className="h-11 w-11"
            title="Add zip code for local pricing"
          >
            <MapPin className="h-4 w-4" />
          </Button>

          {/* Search button */}
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="h-11 px-6"
            data-testid="search-button"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </Button>
        </div>

        {/* Zip code input (conditional) */}
        {showZipCode && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <Input
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              placeholder="Zip code (optional)"
              maxLength={10}
              disabled={isLoading}
              className="max-w-[200px] h-10"
              aria-label="Zip code for local pricing"
              data-testid="zipcode-input"
            />
            <span className="text-sm text-[var(--color-muted)]">
              For local pricing & delivery estimates
            </span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p
            className="text-sm text-[var(--color-error)] animate-in fade-in duration-200"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
