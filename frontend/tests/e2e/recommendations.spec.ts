/**
 * E2E Tests - Recommendations
 *
 * Tests for recommendation display and interactions.
 */

import { test, expect } from '@playwright/test'

test.describe('Recommendations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Perform a search to get recommendations
    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('Samsung TV')
    await page.getByTestId('search-button').click()

    // Wait for results
    await page.waitForTimeout(1500)
  })

  test('displays three recommendation cards', async ({ page }) => {
    // All three recommendation types should be visible
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

  test('shows score breakdown when toggle is clicked', async ({ page }) => {
    // Find the first score breakdown toggle
    const toggleButton = page
      .getByTestId('recommendation-card-best_value')
      .getByTestId('score-breakdown-toggle')

    // Click to expand
    await toggleButton.click()

    // Score breakdown should be visible
    await expect(
      page.getByTestId('recommendation-card-best_value').getByTestId('score-breakdown')
    ).toBeVisible()
  })

  test('toggles between card and table view', async ({ page }) => {
    // Initially should be in cards view
    await expect(page.getByTestId('view-cards')).toBeVisible()
    await expect(page.getByTestId('view-table')).toBeVisible()

    // Click table view
    await page.getByTestId('view-table').click()

    // Comparison table should be visible
    await expect(page.getByTestId('comparison-table')).toBeVisible()

    // Switch back to cards
    await page.getByTestId('view-cards').click()

    // Cards should be visible again
    await expect(
      page.getByTestId('recommendation-card-best_value')
    ).toBeVisible()
  })

  test('preference selector changes selection', async ({ page }) => {
    // Click on "Fastest Delivery" preset
    await page.getByTestId('preset-fastest_delivery').click()

    // Button should have secondary variant (indicating selection)
    await expect(page.getByTestId('preset-fastest_delivery')).toHaveClass(
      /bg-\[var\(--color-accent\)\]/
    )
  })

  test('shows advanced preferences when Advanced is clicked', async ({ page }) => {
    // Click Advanced button
    await page.getByTestId('preset-advanced').click()

    // Sliders should be visible
    await expect(page.getByTestId('weight-slider-value')).toBeVisible()
    await expect(page.getByTestId('weight-slider-speed')).toBeVisible()
    await expect(page.getByTestId('weight-slider-trust')).toBeVisible()
    await expect(page.getByTestId('weight-slider-quality')).toBeVisible()
  })

  test('purchase button opens in new tab', async ({ page, context }) => {
    // Listen for new page (popup)
    const pagePromise = context.waitForEvent('page')

    // Click the purchase button
    await page
      .getByTestId('recommendation-card-best_value')
      .getByTestId('purchase-button')
      .click()

    // Should open a new page
    const newPage = await pagePromise
    await newPage.waitForLoadState()

    // New page should have opened (URL will be the mock URL)
    expect(newPage.url()).toContain('walmart.com')
  })
})
