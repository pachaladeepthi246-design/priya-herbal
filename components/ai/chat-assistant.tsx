"use client"

import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

interface ChatAssistantProps {
    isOpen: boolean
    onClose: () => void
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Namaste! 🙏 Welcome to PriyaHerbal. I\'m your AI wellness assistant. How can I help you find the perfect herbal solution today?',
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            // Call AI API (placeholder - integrate with OpenAI/Gemini)
            const response = await getAIResponse(input)

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error('Error getting AI response:', error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact our support team at +91 8500 647 979.',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // Quick action buttons
    const quickActions = [
        { label: 'Hair Fall Solutions', query: 'I need help with hair fall' },
        { label: 'Skin Care Routine', query: 'Suggest a skin care routine' },
        { label: 'Immunity Boosters', query: 'What are the best immunity boosters?' },
        { label: 'Women\'s Wellness', query: 'Products for women\'s health' }
    ]

    const handleQuickAction = (query: string) => {
        setInput(query)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">AI Wellness Assistant</h3>
                                <p className="text-xs text-green-100">Online • Instant replies</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="hover:bg-white/20 p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                            ? 'bg-green-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                {message.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                                        <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                    <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    {messages.length === 1 && (
                        <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick actions:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickAction(action.query)}
                                        className="text-xs px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white text-sm"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// AI Response function (placeholder - integrate with actual AI service)
async function getAIResponse(userMessage: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const messageLower = userMessage.toLowerCase()

    // Simple rule-based responses (replace with actual AI API call)
    if (messageLower.includes('hair fall') || messageLower.includes('hair loss')) {
        return `For hair fall, I recommend our bestselling products:

🌿 **Bhringraj Hair Oil** (₹349) - Promotes hair growth and reduces hair fall
🌿 **Onion Hair Oil** (₹429) - Strengthens roots and prevents thinning
🌿 **Methi Hair Pack** (₹249) - Controls hair fall effectively

Would you like to know more about any of these products?`
    }

    if (messageLower.includes('skin') || messageLower.includes('face')) {
        return `For glowing skin, here's what I suggest:

✨ **Turmeric Face Pack** (₹249) - Natural glow and brightening
✨ **Kumkumadi Tailam** (₹899) - Premium anti-aging oil
✨ **Vitamin C Serum** (₹699) - Brightens and evens skin tone

All products are 100% natural and Ayurvedic certified. Which concern would you like to address?`
    }

    if (messageLower.includes('immunity') || messageLower.includes('immune')) {
        return `Boost your immunity naturally with:

💪 **Chyawanprash** (₹449) - 40+ herbs for complete immunity
💪 **Giloy Tablets** (₹299) - Powerful immunity booster
💪 **Ashwagandha Capsules** (₹399) - Stress relief + immunity

These are our top-rated immunity products. Would you like to add any to your cart?`
    }

    if (messageLower.includes('women') || messageLower.includes('female')) {
        return `For women's wellness, we have specialized products:

🌸 **Shatavari Capsules** (₹399) - Hormonal balance
🌸 **Ashoka Syrup** (₹299) - Menstrual health
🌸 **Chandraprabha Vati** (₹249) - Overall wellness

All formulated specifically for women's health. What specific concern can I help you with?`
    }

    if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('discount')) {
        return `Great news! We're offering up to 46% off on all products! 🎉

Plus:
💰 Free shipping on orders above ₹499
🎁 Loyalty points on every purchase
📦 Subscribe & Save an extra 10%

Would you like me to suggest products within a specific budget?`
    }

    // Default response
    return `I'd be happy to help you find the perfect herbal solution! 

I can assist you with:
• Product recommendations
• Skin & hair care advice
• Immunity boosters
• Women's health products
• Order tracking
• Subscription management

What would you like to know more about?`
}
