/**
 * AI-Powered Product Recommendation Engine
 * Uses collaborative filtering and content-based filtering
 */

import { HerbalProduct } from '../data/herbal-products'

export interface UserPreferences {
    categories?: string[]
    priceRange?: { min: number; max: number }
    concerns?: string[] // e.g., "hair fall", "acne", "immunity"
    previousPurchases?: string[] // product IDs
    viewedProducts?: string[] // product IDs
    age?: number
    gender?: 'male' | 'female' | 'other'
}

export interface RecommendationScore {
    product: HerbalProduct
    score: number
    reasons: string[]
}

/**
 * Generate personalized product recommendations
 */
export function getPersonalizedRecommendations(
    allProducts: HerbalProduct[],
    userPreferences: UserPreferences,
    limit: number = 10
): RecommendationScore[] {
    const scored: RecommendationScore[] = []

    for (const product of allProducts) {
        let score = 0
        const reasons: string[] = []

        // Category preference (30% weight)
        if (userPreferences.categories?.includes(product.category)) {
            score += 30
            reasons.push(`Matches your interest in ${product.category}`)
        }

        // Price range preference (15% weight)
        if (userPreferences.priceRange) {
            const { min, max } = userPreferences.priceRange
            if (product.price >= min && product.price <= max) {
                score += 15
                reasons.push('Within your budget')
            }
        }

        // Concern-based matching (25% weight)
        if (userPreferences.concerns) {
            const productTags = [...product.tags, ...product.benefits.join(' ').toLowerCase()]
            const matchingConcerns = userPreferences.concerns.filter(concern =>
                productTags.some(tag => tag.includes(concern.toLowerCase()))
            )
            if (matchingConcerns.length > 0) {
                score += 25 * (matchingConcerns.length / userPreferences.concerns.length)
                reasons.push(`Addresses your concern: ${matchingConcerns.join(', ')}`)
            }
        }

        // Bestseller bonus (10% weight)
        if (product.bestseller) {
            score += 10
            reasons.push('Popular choice')
        }

        // High rating bonus (10% weight)
        if (product.rating >= 4.7) {
            score += 10
            reasons.push('Highly rated by customers')
        }

        // Discount bonus (5% weight)
        if (product.discount >= 40) {
            score += 5
            reasons.push(`Great deal - ${product.discount}% off`)
        }

        // In stock bonus (5% weight)
        if (product.inStock) {
            score += 5
        }

        // Gender-specific recommendations
        if (userPreferences.gender === 'female' && product.category === "Women's Health") {
            score += 20
            reasons.push('Specially formulated for women')
        }

        // Avoid previously purchased (unless subscription)
        if (userPreferences.previousPurchases?.includes(product.id)) {
            if (product.subscriptionAvailable) {
                score += 15
                reasons.push('Available for subscription')
            } else {
                score -= 20 // Reduce score for already purchased non-subscription items
            }
        }

        // Viewed products get slight boost
        if (userPreferences.viewedProducts?.includes(product.id)) {
            score += 5
            reasons.push('You showed interest in this')
        }

        if (score > 0) {
            scored.push({ product, score, reasons })
        }
    }

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score)

    return scored.slice(0, limit)
}

/**
 * Get similar products based on a given product
 */
export function getSimilarProducts(
    targetProduct: HerbalProduct,
    allProducts: HerbalProduct[],
    limit: number = 6
): HerbalProduct[] {
    const scored: Array<{ product: HerbalProduct; score: number }> = []

    for (const product of allProducts) {
        if (product.id === targetProduct.id) continue

        let score = 0

        // Same category (40% weight)
        if (product.category === targetProduct.category) {
            score += 40
        }

        // Same subcategory (30% weight)
        if (product.subcategory === targetProduct.subcategory) {
            score += 30
        }

        // Similar price range (15% weight)
        const priceDiff = Math.abs(product.price - targetProduct.price)
        if (priceDiff < 200) {
            score += 15 * (1 - priceDiff / 200)
        }

        // Shared tags (15% weight)
        const sharedTags = product.tags.filter(tag => targetProduct.tags.includes(tag))
        if (sharedTags.length > 0) {
            score += 15 * (sharedTags.length / targetProduct.tags.length)
        }

        scored.push({ product, score })
    }

    scored.sort((a, b) => b.score - a.score)

    return scored.slice(0, limit).map(item => item.product)
}

/**
 * Get trending products based on ratings and reviews
 */
export function getTrendingProducts(
    allProducts: HerbalProduct[],
    limit: number = 8
): HerbalProduct[] {
    return allProducts
        .filter(p => p.inStock)
        .sort((a, b) => {
            const scoreA = a.rating * Math.log(a.reviewCount + 1)
            const scoreB = b.rating * Math.log(b.reviewCount + 1)
            return scoreB - scoreA
        })
        .slice(0, limit)
}

/**
 * Get products by concern/health goal
 */
export function getProductsByConcern(
    allProducts: HerbalProduct[],
    concern: string
): HerbalProduct[] {
    const concernLower = concern.toLowerCase()

    return allProducts.filter(product => {
        const searchText = [
            ...product.tags,
            ...product.benefits,
            product.description,
            product.longDescription
        ].join(' ').toLowerCase()

        return searchText.includes(concernLower)
    })
}

/**
 * Smart search with AI-powered suggestions
 */
export function smartSearch(
    allProducts: HerbalProduct[],
    query: string,
    limit: number = 20
): HerbalProduct[] {
    const queryLower = query.toLowerCase()
    const scored: Array<{ product: HerbalProduct; score: number }> = []

    for (const product of allProducts) {
        let score = 0

        // Exact name match (100 points)
        if (product.name.toLowerCase() === queryLower) {
            score += 100
        }

        // Name contains query (50 points)
        if (product.name.toLowerCase().includes(queryLower)) {
            score += 50
        }

        // Category match (30 points)
        if (product.category.toLowerCase().includes(queryLower)) {
            score += 30
        }

        // Tags match (40 points)
        const matchingTags = product.tags.filter(tag => tag.includes(queryLower))
        score += matchingTags.length * 40

        // Benefits match (20 points)
        const matchingBenefits = product.benefits.filter(benefit =>
            benefit.toLowerCase().includes(queryLower)
        )
        score += matchingBenefits.length * 20

        // Description match (10 points)
        if (product.description.toLowerCase().includes(queryLower)) {
            score += 10
        }

        // Ingredients match (15 points)
        const matchingIngredients = product.ingredients.filter(ing =>
            ing.toLowerCase().includes(queryLower)
        )
        score += matchingIngredients.length * 15

        if (score > 0) {
            scored.push({ product, score })
        }
    }

    scored.sort((a, b) => b.score - a.score)

    return scored.slice(0, limit).map(item => item.product)
}

/**
 * Get complementary products (products that go well together)
 */
export function getComplementaryProducts(
    targetProduct: HerbalProduct,
    allProducts: HerbalProduct[],
    limit: number = 4
): HerbalProduct[] {
    const complementary: HerbalProduct[] = []

    // For hair oil, suggest shampoo and mask
    if (targetProduct.subcategory === 'Hair Oils') {
        complementary.push(
            ...allProducts.filter(p =>
                p.category === 'Hair Care' &&
                (p.subcategory === 'Shampoos' || p.subcategory === 'Hair Masks') &&
                p.id !== targetProduct.id
            )
        )
    }

    // For face wash, suggest toner and moisturizer
    if (targetProduct.subcategory === 'Face Wash') {
        complementary.push(
            ...allProducts.filter(p =>
                p.category === 'Skin Care' &&
                (p.subcategory === 'Toners' || p.subcategory === 'Face Creams') &&
                p.id !== targetProduct.id
            )
        )
    }

    // For immunity products, suggest digestive health
    if (targetProduct.category === 'Immunity Boosters') {
        complementary.push(
            ...allProducts.filter(p =>
                p.category === 'Digestive Health' &&
                p.id !== targetProduct.id
            )
        )
    }

    // If not enough, add similar products
    if (complementary.length < limit) {
        const similar = getSimilarProducts(targetProduct, allProducts, limit - complementary.length)
        complementary.push(...similar.filter(p => !complementary.find(c => c.id === p.id)))
    }

    return complementary.slice(0, limit)
}

/**
 * Get bundle suggestions (buy together and save)
 */
export function getBundleSuggestions(
    targetProduct: HerbalProduct,
    allProducts: HerbalProduct[]
): Array<{ products: HerbalProduct[]; savings: number }> {
    const bundles: Array<{ products: HerbalProduct[]; savings: number }> = []

    // Create category-based bundles
    const sameCategory = allProducts.filter(p =>
        p.category === targetProduct.category &&
        p.id !== targetProduct.id &&
        p.inStock
    )

    if (sameCategory.length >= 2) {
        // Bundle 1: Target + 2 bestsellers from same category
        const bestsellers = sameCategory
            .filter(p => p.bestseller)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 2)

        if (bestsellers.length === 2) {
            const totalPrice = targetProduct.price + bestsellers[0].price + bestsellers[1].price
            const savings = Math.round(totalPrice * 0.15) // 15% bundle discount
            bundles.push({
                products: [targetProduct, ...bestsellers],
                savings
            })
        }
    }

    // Complementary bundle
    const complementary = getComplementaryProducts(targetProduct, allProducts, 2)
    if (complementary.length === 2) {
        const totalPrice = targetProduct.price + complementary[0].price + complementary[1].price
        const savings = Math.round(totalPrice * 0.12) // 12% bundle discount
        bundles.push({
            products: [targetProduct, ...complementary],
            savings
        })
    }

    return bundles
}
