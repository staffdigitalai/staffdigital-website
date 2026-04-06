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
  Quote
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
        className="w-2 h-2 rounded-full bg-foreground/40"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.span
        className="w-2 h-2 rounded-full bg-foreground/40"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.span
        className="w-2 h-2 rounded-full bg-foreground/40"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  )
}

// Chat message component
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
      className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[80%] ${isAgent ? 'order-2' : 'order-1'}`}>
        {isAgent && (
          <span className="text-xs text-foreground/50 mb-1 block">{agentName}</span>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isAgent
              ? 'bg-foreground/10 text-foreground rounded-tl-sm'
              : 'bg-[var(--neon-blue)] text-black rounded-tr-sm'
          }`}
        >
          {message}
        </div>
      </div>
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
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--neon-blue)]/10 border border-[var(--neon-blue)]/30 text-sm font-medium mb-6">
            <span className="text-[var(--neon-blue)]">{badge}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}{" "}
            <span className="text-[var(--neon-blue)]">{titleHighlight}</span>
          </h2>
          
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto whitespace-pre-line">
            {subtitle}
          </p>
        </motion.div>

        {/* Main content: 2 columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column: Description + Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-foreground/70 leading-relaxed text-lg">
              {description}
            </p>

            {/* Illustration if provided */}
            {illustrationSrc && (
              <div className="relative rounded-2xl overflow-hidden border border-foreground/10">
                <Image
                  src={illustrationSrc}
                  alt={solutionName}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Testimonial */}
            <div className="relative p-6 rounded-2xl bg-foreground/5 border border-foreground/10">
              <Quote className="w-8 h-8 text-[var(--neon-blue)]/30 absolute top-4 left-4" />
              <blockquote className="pl-8 pt-4">
                <p className="text-foreground/80 italic leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--purple-dark)] flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-foreground/50">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Right column: Chat widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Chat widget with glassmorphism */}
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-background/80 border border-[var(--neon-blue)]/30 shadow-[0_0_30px_rgba(var(--neon-blue-rgb),0.15)]">
              {/* Chat header */}
              <div className="px-4 py-3 border-b border-foreground/10 flex items-center justify-between bg-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--purple-dark)] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    {/* Online indicator */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00FF94] rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{chatHeader}</div>
                    <div className="text-xs text-foreground/50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                      Online
                    </div>
                  </div>
                </div>
                {/* 24/7 badge */}
                <div className="px-2.5 py-1 rounded-full bg-[var(--lime-green)]/20 text-[var(--lime-green)] text-xs font-bold">
                  24/7
                </div>
              </div>

              {/* Chat messages area */}
              <div className="h-[320px] overflow-y-auto p-4 space-y-3">
                {/* Agent info */}
                <div className="text-center py-2">
                  <span className="text-xs text-foreground/40 bg-foreground/5 px-3 py-1 rounded-full">
                    {agentRole}
                  </span>
                </div>

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
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--purple-dark)] flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-foreground/10 rounded-2xl rounded-tl-sm">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat footer: Active channels */}
              <div className="px-4 py-3 border-t border-foreground/10 bg-foreground/5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-foreground/50 mr-1">Canales activos:</span>
                  {activeChannels.map((channel) => {
                    const Icon = channelIcons[channel]
                    return (
                      <div
                        key={channel}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/10 text-xs text-foreground/70"
                      >
                        <Icon className="w-3 h-3" />
                        <span>{channelLabels[channel]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--neon-blue)]/10 via-transparent to-[var(--purple-dark)]/10 rounded-3xl blur-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
