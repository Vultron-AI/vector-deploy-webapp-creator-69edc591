/**
 * E2E Tests - Search Flow
 *
 * Tests for the search functionality including query input and results.
 */

import { test, expect } from '@playwright/test'

test.describe('Search Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('shows empty state initially', async ({ page }) => {
    // Should show the search bar
    await expect(page.getByTestId('search-bar')).toBeVisible()
    await expect(page.getByTestId('search-input')).toBeVisible()

    // Should show the neutrality badge
    await expect(page.getByTestId('neutrality-banner')).toBeVisible()
  })

  test('allows entering a search query', async ({ page }) => {
    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('Sony headphones')

    await expect(searchInput).toHaveValue('Sony headphones')
  })

  test('submits search and shows results', async ({ page }) => {
    // Enter search query
    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('Samsung TV')

    // Click search button
    await page.getByTestId('search-button').click()

    // Wait for results (mock API has a delay)
    await page.waitForTimeout(1500)

    // Should show recommendation cards
    await expect(
      page.getByTestId('recommendation-card-best_value')
    ).toBeVisible()
    await expect(
      page.getByTestId('recommendation-card-fastest_delivery')
    ).toBeVisible()
    await expect(
      page.getByTestId('recommendation-card-best_quality')
    ).toBeVisible()
  })

  test('validates empty search query', async ({ page }) => {
    // When query is empty, the search button should be disabled
    // This prevents submission of empty queries
    await expect(page.getByTestId('search-button')).toBeDisabled()

    // Enter some text, button should become enabled
    await page.getByTestId('search-input').fill('test')
    await expect(page.getByTestId('search-button')).toBeEnabled()

    // Clear the input, button should be disabled again
    await page.getByTestId('search-input').fill('')
    await expect(page.getByTestId('search-button')).toBeDisabled()
  })

  test('shows zip code input when location button is clicked', async ({ page }) => {
    // Initially zip code input should not be visible
    await expect(page.getByTestId('zipcode-input')).not.toBeVisible()

    // Click the location button (MapPin icon)
    await page.locator('button[title="Add zip code for local pricing"]').click()

    // Now zip code input should be visible
    await expect(page.getByTestId('zipcode-input')).toBeVisible()
  })
})
