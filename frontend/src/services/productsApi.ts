/**
 * Products API Service
 *
 * API methods for searching products and getting recommendations.
 * Uses mock data initially, structured for easy backend integration.
 */

import { api, getErrorMessage } from './api'
import {
  searchProducts as mockSearch,
  getProductVariants as mockGetVariants,
  getRecommendations as mockGetRecommendations,
} from './mockData'
import type {
  SearchResult,
  ProductVariant,
  RecommendationResult,
  PreferenceWeights,
} from '@/types/product'

// Set to true to use real backend API, false for mock data
const USE_BACKEND = false

/**
 * Search for products by query
 */
export async function searchProducts(
  query: string,
  zipCode?: string
): Promise<SearchResult> {
  if (!USE_BACKEND) {
    return mockSearch(query)
  }

  try {
    const response = await api.get<SearchResult>('/api/products/search/', {
      params: { q: query, zip_code: zipCode },
    })
    return response.data
  } catch (error) {
    console.error('Search failed:', getErrorMessage(error))
    throw error
  }
}

/**
 * Get product variants for a specific product
 */
export async function getProductVariants(
  productId: string
): Promise<ProductVariant[]> {
  if (!USE_BACKEND) {
    return mockGetVariants(productId)
  }

  try {
    const response = await api.get<ProductVariant[]>(
      `/api/products/${productId}/variants/`
    )
    return response.data
  } catch (error) {
    console.error('Failed to get variants:', getErrorMessage(error))
    throw error
  }
}

/**
 * Get recommendations for a product with given preferences
 */
export async function getRecommendations(
  productId: string,
  preferences: PreferenceWeights,
  zipCode?: string
): Promise<RecommendationResult> {
  if (!USE_BACKEND) {
    return mockGetRecommendations(productId, preferences, zipCode)
  }

  try {
    const response = await api.post<RecommendationResult>(
      '/api/recommendations/',
      {
        product_id: productId,
        preferences: {
          value_weight: preferences.value,
          speed_weight: preferences.speed,
          trust_weight: preferences.trust,
          quality_weight: preferences.quality,
        },
        zip_code: zipCode,
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to get recommendations:', getErrorMessage(error))
    throw error
  }
}

/**
 * API service object for convenient imports
 */
export const productsApi = {
  searchProducts,
  getProductVariants,
  getRecommendations,
}

export default productsApi
