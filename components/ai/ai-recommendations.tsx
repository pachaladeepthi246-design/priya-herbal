"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Heart, ShoppingBag } from 'lucide-react'
import { HerbalProduct } from '@/lib/data/herbal-products'
import { getPersonalizedRecommendations, UserPreferences, RecommendationScore } from '@/lib/ai/recommendations'
import Image from 'next/image'
import Link from 'next/link'

interface AIRecommendationsProps {
    allProducts: HerbalProduct[]
    userPreferences?: UserPreferences
    title?: string
    limit?: number
}

export default function AIRecommendations({
    allProducts,
    userPreferences,
    title = "Recommended For You",
    limit = 8
}: AIRecommendationsProps) {
    const [recommendations, setRecommendations] = useState<RecommendationScore[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading and get recommendations
        setTimeout(() => {
            const defaultPreferences: UserPreferences = userPreferences || {
                categories: ['Hair Care', 'Skin Care'],
                priceRange: { min: 0, max: 1000 },
                concerns: ['hair fall', 'glowing skin', 'immunity']
            }

            const recs = getPersonalizedRecommendations(allProducts, defaultPreferences, limit)
            setRecommendations(recs)
            setIsLoading(false)
        }, 500)
    }, [allProducts, userPreferences, limit])

    if (isLoading) {
        return (
            <section className="py-16 bg-gradient-to-b from-green-50/50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Sparkles className="w-6 h-6 text-green-600 animate-pulse" />
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                            {title}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (recommendations.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-gradient-to-b from-green-50/50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-8 h-8 text-green-600" />
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                            {title}
                        </h2>
                        <Sparkles className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        AI-powered recommendations based on your preferences and wellness goals
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((rec, index) => (
                        <motion.div
                            key={rec.product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/product/${rec.product.slug}`}>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    {/* AI Badge */}
                                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        AI Pick
                                    </div>

                                    {/* Product Image */}
                                    <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                        <Image
                                            src={rec.product.imageUrl}
                                            alt={rec.product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {rec.product.discount > 0 && (
                                            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                                                {rec.product.discount}% OFF
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">
                                            {rec.product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                            {rec.product.description}
                                        </p>

                                        {/* AI Reasons */}
                                        <div className="mb-3 space-y-1">
                                            {rec.reasons.slice(0, 2).map((reason, i) => (
                                                <div key={i} className="flex items-start gap-2 text-xs text-green-700 dark:text-green-400">
                                                    <TrendingUp className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <span>{reason}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(rec.product.rating)
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                            }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                ({rec.product.reviewCount})
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-2xl font-bold text-green-600">
                                                    ₹{rec.product.price}
                                                </span>
                                                {rec.product.originalPrice > rec.product.price && (
                                                    <span className="text-sm text-gray-400 line-through ml-2">
                                                        ₹{rec.product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                                                <ShoppingBag className="w-4 h-4" />
                                                Add to Cart
                                            </button>
                                            <button className="p-2 border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 rounded-lg transition-colors group">
                                                <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:fill-red-500" />
                                            </button>
                                        </div>

                                        {/* Match Score */}
                                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500 dark:text-gray-400">AI Match Score</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                                            style={{ width: `${rec.score}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-semibold text-green-600">{Math.round(rec.score)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        Explore All Products
                        <Sparkles className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
