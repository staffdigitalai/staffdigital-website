"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MessageSquare,
  Instagram,
  Facebook,
  Bot,
  Quote,
  Clock
} from "lucide-react"
import Image from "next/image"

// Channel icons mapping
const channelIcons = {
  whatsapp: MessageCircle,
  phone: Phone,
  webchat: MessageSquare,
  email: Mail,
  instagram: Instagram,
  facebook: Facebook,
}

const channelLabels = {
  whatsapp: "WhatsApp",
  phone: "Teléfono",
  webchat: "Web Chat",
  email: "Email",
  instagram: "Instagram",
  facebook: "Facebook",
}

interface ConversationMessage {
  sender: 'agent' | 'customer'
  message: string
  delay: number
}

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

export interface OmnicanalShowcaseProps {
  solutionSlug: string
  solutionName: string
  badge: string
  title: string
  titleHighlight: string
  subtitle: string
  description: string
  chatHeader: string
  agentName: string
  agentRole: string
  conversation: ConversationMessage[]
  activeChannels: Array<'whatsapp' | 'phone' | 'webchat' | 'email' | 'instagram' | 'facebook'>
  testimonial: Testimonial
  accentColor?: string
  backgroundVariant?: 'default' | 'gradient' | 'mesh'
  illustrationSrc?: string
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <motion.span
        className="w-2 h-2 rounded-full bg-gray-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.span
        className="w-2 h-2 rounded-full bg-gray-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.span
        className="w-2 h-2 rounded-full bg-gray-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  )
}

// Chat message component - Cliste style
function ChatMessage({ 
  message, 
  isAgent, 
  agentName 
}: { 
  message: string
  isAgent: boolean
  agentName: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAgent ? 'justify-start' : 'justify-end'} gap-2`}
    >
      {isAgent && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gradient-from to-brand-primary flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`max-w-[75%]`}>
        {isAgent && (
          <span className="text-xs text-gray-500 mb-1 block">{agentName}</span>
        )}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isAgent
              ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
              : 'bg-bg-subtle text-white rounded-tr-sm'
          }`}
        >
          {message}
        </div>
      </div>
      {!isAgent && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0 text-gray-600 font-semibold text-xs">
          C
        </div>
      )}
    </motion.div>
  )
}

export function OmnicanalShowcase({
  solutionName,
  badge,
  title,
  titleHighlight,
  subtitle,
  description,
  chatHeader,
  agentName,
  agentRole,
  conversation,
  activeChannels,
  testimonial,
  illustrationSrc,
}: OmnicanalShowcaseProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)

  // Simulate conversation appearing progressively
  useEffect(() => {
    if (visibleMessages >= conversation.length) return

    const nextMessage = conversation[visibleMessages]
    
    // Show typing indicator before agent messages
    if (nextMessage.sender === 'agent') {
      setIsTyping(true)
      const typingTimer = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(prev => prev + 1)
      }, nextMessage.delay)
      return () => clearTimeout(typingTimer)
    } else {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1)
      }, nextMessage.delay)
      return () => clearTimeout(timer)
    }
  }, [visibleMessages, conversation])

  // Reset and restart conversation loop
  useEffect(() => {
    if (visibleMessages >= conversation.length) {
      const resetTimer = setTimeout(() => {
        setVisibleMessages(0)
      }, 5000) // Wait 5s before restarting
      return () => clearTimeout(resetTimer)
    }
  }, [visibleMessages, conversation.length])

  return (
    // ALWAYS WHITE BACKGROUND - ignores dark mode per spec
    <section className="py-20 px-4 relative overflow-hidden bg-white" data-theme-override="light">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Badge - Cliste style pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{badge}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            {title}{" "}
            <span className="text-brand-secondary">{titleHighlight}</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Main content: 2 columns - Cliste layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section title */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                This is what your customers see
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Key benefit text */}
            <p className="text-gray-600 leading-relaxed">
              Every conversation you&apos;re watching could be happening at midnight, on Sundays, or when your team is with other customers.
            </p>

            {/* Emphasis statement */}
            <p className="text-gray-900 font-semibold text-lg">
              Your competitors are losing these customers.
            </p>

            {/* Testimonial - Cliste style */}
            <div className="relative p-6 rounded-2xl bg-gray-50 border-l-4 border-brand-secondary">
              <Quote className="w-6 h-6 text-gray-300 absolute top-4 left-6" />
              <blockquote className="pl-6">
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-from to-brand-primary flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Right column: Chat widget - DARK HEADER like Cliste */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Chat widget container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Dark header - Cliste style */}
              <div className="px-4 py-3 flex items-center justify-between bg-bg-subtle">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-secondary" />
                  <span className="text-white font-medium text-sm">{chatHeader}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24/7</span>
                </div>
              </div>

              {/* Agent info bar */}
              <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-from to-brand-primary flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{agentName}</div>
                    <div className="text-xs text-gray-500">{agentRole}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-600 text-xs font-medium">Online</span>
                </div>
              </div>

              {/* Chat messages area */}
              <div className="h-[320px] overflow-y-auto p-4 space-y-4 bg-white">
                {/* Messages */}
                <AnimatePresence>
                  {conversation.slice(0, visibleMessages).map((msg, idx) => (
                    <ChatMessage
                      key={idx}
                      message={msg.message}
                      isAgent={msg.sender === 'agent'}
                      agentName={agentName}
                    />
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gradient-from to-brand-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat footer: Active channels */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-500 mr-1">Canales activos:</span>
                  {activeChannels.map((channel) => {
                    const Icon = channelIcons[channel]
                    return (
                      <div
                        key={channel}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs text-gray-600"
                      >
                        <Icon className="w-3 h-3" />
                        <span>{channelLabels[channel]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Decorative shadow/glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-gradient-from/5 via-transparent to-brand-primary/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
