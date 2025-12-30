"use client"

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import ChatAssistant from './chat-assistant'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Chat Assistant */}
            <ChatAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />

            {/* Floating Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-2xl flex items-center justify-center group"
                >
                    <MessageCircle className="w-7 h-7" />

                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        1
                    </span>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Chat with AI Assistant
                    </span>
                </motion.button>
            )}
        </>
    )
}
