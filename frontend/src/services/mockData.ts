/**
 * Mock Data Service
 *
 * Provides realistic sample data for testing the UI before backend integration.
 */

import type {
  Product,
  Retailer,
  Recommendation,
  SearchPreset,
  PresetType,
  SearchResult,
  RecommendationResult,
  PreferenceWeights,
  ProductVariant,
} from '@/types/product'

// Mock Retailers
export const mockRetailers: Retailer[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    trustScore: 85,
    returnPolicy: '30-day free returns',
    warrantyInfo: 'Manufacturer warranty included',
  },
  {
    id: 'walmart',
    name: 'Walmart',
    logo: 'https://logo.clearbit.com/walmart.com',
    trustScore: 82,
    returnPolicy: '90-day returns in-store or by mail',
    warrantyInfo: 'Extended warranty available',
  },
  {
    id: 'bestbuy',
    name: 'Best Buy',
    logo: 'https://logo.clearbit.com/bestbuy.com',
    trustScore: 88,
    returnPolicy: '15-day return policy (45 for members)',
    warrantyInfo: 'Geek Squad Protection available',
  },
  {
    id: 'homedepot',
    name: 'Home Depot',
    logo: 'https://logo.clearbit.com/homedepot.com',
    trustScore: 86,
    returnPolicy: '90-day return policy for most items',
    warrantyInfo: 'Protection plans available',
  },
]

// Mock Products
export const mockProducts: Product[] = [
  // TVs
  {
    id: 'tv-samsung-55',
    name: 'Samsung 55" 4K Smart TV',
    description: 'Crystal UHD display with HDR support and built-in streaming apps',
    category: 'Electronics',
    brand: 'Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    variants: [
      { id: 'tv-samsung-50', name: '50" Model', differentiators: { size: '50 inch' } },
      { id: 'tv-samsung-55', name: '55" Model', differentiators: { size: '55 inch' } },
      { id: 'tv-samsung-65', name: '65" Model', differentiators: { size: '65 inch' } },
    ],
  },
  {
    id: 'tv-lg-55',
    name: 'LG 55" OLED 4K Smart TV',
    description: 'Self-lit OLED pixels with infinite contrast and Dolby Vision IQ',
    category: 'Electronics',
    brand: 'LG',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    variants: [
      { id: 'tv-lg-48', name: '48" Model', differentiators: { size: '48 inch' } },
      { id: 'tv-lg-55', name: '55" Model', differentiators: { size: '55 inch' } },
      { id: 'tv-lg-65', name: '65" Model', differentiators: { size: '65 inch' } },
      { id: 'tv-lg-77', name: '77" Model', differentiators: { size: '77 inch' } },
    ],
  },
  {
    id: 'tv-sony-55',
    name: 'Sony Bravia 55" 4K LED TV',
    description: 'Cognitive Processor XR with Triluminos Pro and Google TV built-in',
    category: 'Electronics',
    brand: 'Sony',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    variants: [
      { id: 'tv-sony-50', name: '50" Model', differentiators: { size: '50 inch' } },
      { id: 'tv-sony-55', name: '55" Model', differentiators: { size: '55 inch' } },
      { id: 'tv-sony-65', name: '65" Model', differentiators: { size: '65 inch' } },
      { id: 'tv-sony-75', name: '75" Model', differentiators: { size: '75 inch' } },
    ],
  },
  {
    id: 'tv-tcl-55',
    name: 'TCL 55" 4K Roku Smart TV',
    description: 'Affordable 4K with built-in Roku streaming and voice control',
    category: 'Electronics',
    brand: 'TCL',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    variants: [
      { id: 'tv-tcl-43', name: '43" Model', differentiators: { size: '43 inch' } },
      { id: 'tv-tcl-50', name: '50" Model', differentiators: { size: '50 inch' } },
      { id: 'tv-tcl-55', name: '55" Model', differentiators: { size: '55 inch' } },
      { id: 'tv-tcl-65', name: '65" Model', differentiators: { size: '65 inch' } },
    ],
  },
  // Headphones
  {
    id: 'headphones-sony',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with exceptional sound quality',
    category: 'Electronics',
    brand: 'Sony',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    variants: [
      { id: 'headphones-sony-black', name: 'Black', differentiators: { color: 'Black' } },
      { id: 'headphones-sony-silver', name: 'Silver', differentiators: { color: 'Silver' } },
    ],
  },
  {
    id: 'headphones-bose-700',
    name: 'Bose 700 Noise Cancelling Headphones',
    description: 'Premium noise cancellation with 11 levels of adjustment and crystal-clear calls',
    category: 'Electronics',
    brand: 'Bose',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    variants: [
      { id: 'headphones-bose-700-black', name: 'Black', differentiators: { color: 'Black' } },
      { id: 'headphones-bose-700-silver', name: 'Silver Luxe', differentiators: { color: 'Silver' } },
      { id: 'headphones-bose-700-white', name: 'Soapstone', differentiators: { color: 'White' } },
    ],
  },
  {
    id: 'headphones-jbl-live',
    name: 'JBL Live 660NC Wireless Headphones',
    description: 'Adaptive noise cancelling with JBL Signature Sound and 50-hour battery',
    category: 'Electronics',
    brand: 'JBL',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    variants: [
      { id: 'headphones-jbl-live-black', name: 'Black', differentiators: { color: 'Black' } },
      { id: 'headphones-jbl-live-blue', name: 'Blue', differentiators: { color: 'Blue' } },
      { id: 'headphones-jbl-live-white', name: 'White', differentiators: { color: 'White' } },
    ],
  },
  // Power Tools
  {
    id: 'drill-dewalt',
    name: 'DeWalt 20V MAX Cordless Drill',
    description: 'Powerful cordless drill with 2-speed transmission and LED light',
    category: 'Tools',
    brand: 'DeWalt',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
    variants: [
      { id: 'drill-dewalt-basic', name: 'Basic Kit', differentiators: { kit: 'Drill only' } },
      { id: 'drill-dewalt-combo', name: 'Combo Kit', differentiators: { kit: 'Drill + Impact Driver' } },
    ],
  },
  {
    id: 'drill-milwaukee',
    name: 'Milwaukee M18 FUEL Hammer Drill',
    description: 'Brushless motor with POWERSTATE technology for maximum performance',
    category: 'Tools',
    brand: 'Milwaukee',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
    variants: [
      { id: 'drill-milwaukee-tool', name: 'Tool Only', differentiators: { kit: 'Drill only' } },
      { id: 'drill-milwaukee-kit', name: 'Kit with Batteries', differentiators: { kit: 'Drill + 2 Batteries + Charger' } },
    ],
  },
  {
    id: 'drill-makita',
    name: 'Makita 18V LXT Cordless Drill',
    description: 'Compact and lightweight with variable speed and built-in LED',
    category: 'Tools',
    brand: 'Makita',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
    variants: [
      { id: 'drill-makita-basic', name: 'Bare Tool', differentiators: { kit: 'Drill only' } },
      { id: 'drill-makita-combo', name: 'Combo Kit', differentiators: { kit: 'Drill + Impact Driver + Batteries' } },
    ],
  },
  // Appliances
  {
    id: 'vacuum-dyson-v15',
    name: 'Dyson V15 Detect Cordless Vacuum',
    description: 'Laser reveals microscopic dust with piezo sensor for real-time particle counts',
    category: 'Appliances',
    brand: 'Dyson',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
    variants: [
      { id: 'vacuum-dyson-v15-absolute', name: 'Absolute', differentiators: { model: 'Full accessories' } },
      { id: 'vacuum-dyson-v15-complete', name: 'Complete', differentiators: { model: 'Extra attachments' } },
    ],
  },
  {
    id: 'mixer-kitchenaid',
    name: 'KitchenAid Artisan Stand Mixer',
    description: '5-quart tilt-head stand mixer with 10 speeds and planetary mixing action',
    category: 'Appliances',
    brand: 'KitchenAid',
    imageUrl: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400',
    variants: [
      { id: 'mixer-kitchenaid-red', name: 'Empire Red', differentiators: { color: 'Red' } },
      { id: 'mixer-kitchenaid-silver', name: 'Contour Silver', differentiators: { color: 'Silver' } },
      { id: 'mixer-kitchenaid-black', name: 'Onyx Black', differentiators: { color: 'Black' } },
      { id: 'mixer-kitchenaid-blue', name: 'Blue Velvet', differentiators: { color: 'Blue' } },
    ],
  },
]

// Mock Recommendations Generator
function generateRecommendations(product: Product): Recommendation[] {
  const now = new Date()
  const getDeliveryDate = (days: number) => {
    const date = new Date(now)
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return [
    {
      id: `rec-${product.id}-value`,
      type: 'best_value',
      product,
      retailer: mockRetailers[1], // Walmart
      priceBreakdown: {
        itemPrice: 449.99,
        shippingCost: 0,
        tax: 36.0,
        totalCost: 485.99,
        currency: 'USD',
        isEstimated: false,
      },
      delivery: {
        estimatedDeliveryDate: getDeliveryDate(5),
        deliveryWindow: '4-6 business days',
        shippingMethod: 'Standard Shipping',
        isFreeShipping: true,
      },
      reviews: {
        rating: 4.3,
        reviewCount: 2847,
        sentimentThemes: ['good value', 'reliable', 'easy setup'],
        verifiedPurchases: 2156,
      },
      scores: {
        value: 92,
        speed: 65,
        trust: 82,
        quality: 78,
        fit: 88,
        overall: 85,
      },
      whySelected: 'Lowest total cost with free shipping and excellent value score',
      tradeoffs: [
        { category: 'speed', description: 'Slower delivery than competitors', impact: 'negative' },
        { category: 'price', description: 'Best price among all retailers', impact: 'positive' },
      ],
      purchaseUrl: 'https://www.walmart.com/product/example',
    },
    {
      id: `rec-${product.id}-fast`,
      type: 'fastest_delivery',
      product,
      retailer: mockRetailers[0], // Amazon
      priceBreakdown: {
        itemPrice: 479.99,
        shippingCost: 0,
        tax: 38.4,
        totalCost: 518.39,
        currency: 'USD',
        isEstimated: false,
      },
      delivery: {
        estimatedDeliveryDate: getDeliveryDate(2),
        deliveryWindow: '1-2 business days',
        shippingMethod: 'Prime Free Same-Day',
        isFreeShipping: true,
      },
      reviews: {
        rating: 4.5,
        reviewCount: 12543,
        sentimentThemes: ['fast shipping', 'quality product', 'as described'],
        verifiedPurchases: 10234,
      },
      scores: {
        value: 75,
        speed: 98,
        trust: 85,
        quality: 82,
        fit: 80,
        overall: 84,
      },
      whySelected: 'Fastest delivery with Prime same-day shipping available',
      tradeoffs: [
        { category: 'price', description: '$32 more than cheapest option', impact: 'negative' },
        { category: 'speed', description: 'Arrives 3 days faster', impact: 'positive' },
      ],
      purchaseUrl: 'https://www.amazon.com/product/example',
    },
    {
      id: `rec-${product.id}-quality`,
      type: 'best_quality',
      product,
      retailer: mockRetailers[2], // Best Buy
      priceBreakdown: {
        itemPrice: 469.99,
        shippingCost: 0,
        installationCost: 49.99,
        tax: 41.6,
        totalCost: 561.58,
        currency: 'USD',
        isEstimated: true,
      },
      delivery: {
        estimatedDeliveryDate: getDeliveryDate(3),
        deliveryWindow: '2-4 business days',
        shippingMethod: 'Free Standard Shipping',
        isFreeShipping: true,
      },
      reviews: {
        rating: 4.7,
        reviewCount: 5621,
        sentimentThemes: ['excellent service', 'expert installation', 'premium experience'],
        verifiedPurchases: 4892,
      },
      scores: {
        value: 68,
        speed: 78,
        trust: 92,
        quality: 95,
        fit: 75,
        overall: 82,
      },
      whySelected: 'Highest trust and quality scores with professional installation available',
      tradeoffs: [
        { category: 'price', description: 'Highest total cost (includes installation)', impact: 'negative' },
        { category: 'quality', description: 'Best customer service and support', impact: 'positive' },
        { category: 'trust', description: 'Highest retailer trust score', impact: 'positive' },
      ],
      purchaseUrl: 'https://www.bestbuy.com/product/example',
    },
  ]
}

// Search Presets
export const searchPresets: SearchPreset[] = [
  {
    id: 'best_value',
    label: 'Best Value',
    description: 'Prioritize lowest total cost',
    weights: { value: 0.5, speed: 0.15, trust: 0.15, quality: 0.2 },
  },
  {
    id: 'fastest_delivery',
    label: 'Fastest Delivery',
    description: 'Prioritize getting it quickly',
    weights: { value: 0.2, speed: 0.5, trust: 0.15, quality: 0.15 },
  },
  {
    id: 'most_trusted',
    label: 'Most Trusted',
    description: 'Prioritize reliable retailers',
    weights: { value: 0.15, speed: 0.15, trust: 0.5, quality: 0.2 },
  },
  {
    id: 'custom',
    label: 'Custom',
    description: 'Set your own priorities',
    weights: { value: 0.25, speed: 0.25, trust: 0.25, quality: 0.25 },
  },
]

// Mock API Functions
export async function searchProducts(query: string): Promise<SearchResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Split query into words for better matching
  const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0)

  const results = mockProducts.filter((p) => {
    // Combine all searchable text
    const searchableText = `${p.name} ${p.category} ${p.brand}`.toLowerCase()

    // Check if ALL query words are found in the searchable text
    return queryWords.every(word => searchableText.includes(word))
  })

  // Return only matching results (empty array if no matches)
  return {
    products: results,
    totalCount: results.length,
  }
}

export async function getProductVariants(productId: string): Promise<ProductVariant[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = mockProducts.find((p) => p.id === productId)
  return product?.variants || []
}

export async function getRecommendations(
  productId: string,
  preferences: PreferenceWeights,
  _zipCode?: string
): Promise<RecommendationResult> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  // First try to find the product by its top-level ID
  let product = mockProducts.find((p) => p.id === productId)

  // If not found, search within product variants
  if (!product) {
    product = mockProducts.find((p) =>
      p.variants?.some((v) => v.id === productId)
    )
  }

  if (!product) {
    return {
      recommendations: [],
      searchQuery: productId,
      appliedPreferences: preferences,
      timestamp: new Date().toISOString(),
    }
  }

  return {
    recommendations: generateRecommendations(product),
    searchQuery: product.name,
    appliedPreferences: preferences,
    timestamp: new Date().toISOString(),
  }
}

export function getPresetWeights(preset: PresetType): PreferenceWeights {
  const presetConfig = searchPresets.find((p) => p.id === preset)
  return presetConfig?.weights || searchPresets[0].weights
}
