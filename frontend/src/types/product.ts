/**
 * Product Types
 *
 * TypeScript interfaces for the ShopAssist product comparison tool.
 */

// Retailer information
export interface Retailer {
  id: string
  name: string
  logo?: string
  trustScore: number // 0-100
  returnPolicy: string
  warrantyInfo?: string
}

// Price breakdown with transparent cost components
export interface PriceBreakdown {
  itemPrice: number
  shippingCost: number
  deliveryCost?: number // Additional delivery/handling
  installationCost?: number // Optional installation
  tax?: number
  totalCost: number
  currency: string
  isEstimated: boolean // True if some costs are estimates
}

// Review summary
export interface ReviewSummary {
  rating: number // 0-5
  reviewCount: number
  sentimentThemes: string[] // e.g., ["durable", "easy to use", "good value"]
  verifiedPurchases: number
}

// Product variant (different versions of same product)
export interface ProductVariant {
  id: string
  name: string
  differentiators: Record<string, string> // e.g., { size: "Large", color: "Blue" }
  imageUrl?: string
}

// Score breakdown for transparency
export interface Score {
  value: number // 0-100, price competitiveness
  speed: number // 0-100, delivery speed
  trust: number // 0-100, retailer trustworthiness
  quality: number // 0-100, product quality based on reviews
  fit: number // 0-100, how well it matches user preferences
  overall: number // 0-100, weighted combination
}

// Trade-off explanation
export interface Tradeoff {
  category: 'price' | 'speed' | 'trust' | 'quality'
  description: string
  impact: 'positive' | 'negative' | 'neutral'
}

// Delivery information
export interface DeliveryInfo {
  estimatedDeliveryDate: string
  deliveryWindow: string // e.g., "3-5 business days"
  shippingMethod: string
  isFreeShipping: boolean
}

// Full recommendation with all details
export interface Recommendation {
  id: string
  type: 'best_value' | 'fastest_delivery' | 'best_quality'
  product: Product
  retailer: Retailer
  priceBreakdown: PriceBreakdown
  delivery: DeliveryInfo
  reviews: ReviewSummary
  scores: Score
  whySelected: string
  tradeoffs: Tradeoff[]
  purchaseUrl: string
}

// Product information
export interface Product {
  id: string
  name: string
  description: string
  category: string
  brand: string
  imageUrl?: string
  variants?: ProductVariant[]
}

// User search preferences
export type PresetType = 'best_value' | 'fastest_delivery' | 'most_trusted' | 'custom'

export interface SearchPreset {
  id: PresetType
  label: string
  description: string
  weights: PreferenceWeights
}

export interface PreferenceWeights {
  value: number // 0-1
  speed: number // 0-1
  trust: number // 0-1
  quality: number // 0-1
}

export interface SearchFilters {
  query: string
  zipCode?: string
  preset: PresetType
  customWeights?: PreferenceWeights
  selectedVariantId?: string
}

// API response types
export interface SearchResult {
  products: Product[]
  totalCount: number
}

export interface RecommendationResult {
  recommendations: Recommendation[]
  searchQuery: string
  appliedPreferences: PreferenceWeights
  timestamp: string
}
