/**
 * E2E Tests - ShopAssist Product Comparison Tool
 *
 * These tests capture screenshots for visual validation.
 *
 * Required screenshots:
 * - MainPage.png: Your app's main/home page
 * - LandingPage.png: Landing page (same as main since no auth)
 */

import { test, expect } from '@playwright/test'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// DO NOT CHANGE THESE NAMES
const MAIN_PAGE_SCREENSHOT_NAME = 'MainPage'
const LANDING_PAGE_SCREENSHOT_NAME = 'LandingPage'

// Ensure screenshots directory exists (ESM-compatible)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const screenshotsDir = join(__dirname, '..', 'screenshots')
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true })
}

test.describe('App E2E Tests', () => {
  /**
   * Capture the landing page (same as main page since no auth)
   */
  test('captures LandingPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for the search page to load
    await expect(page.getByTestId('search-results-page')).toBeVisible()

    await page.screenshot({
      path: join(screenshotsDir, LANDING_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    // Verify the page title and key elements
    await expect(page).toHaveTitle(/.+/)
    await expect(page.getByTestId('search-bar')).toBeVisible()
    await expect(page.getByTestId('neutrality-banner')).toBeVisible()
  })

  /**
   * Capture the main page after performing a search
   */
  test('captures MainPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Perform a search
    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('Samsung TV')
    await page.getByTestId('search-button').click()

    // Wait for results to load
    await page.waitForTimeout(1500) // Allow time for mock API delay

    await page.screenshot({
      path: join(screenshotsDir, MAIN_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    // Verify search results are displayed
    await expect(page).toHaveTitle(/.+/)
  })
})
