"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useTranslations, useLocale} from "next-intl"
import { Volume2, Play, Pause, Phone, MessageSquare, Calendar, HeartPulse } from "lucide-react"
import Link from "next/link"
import { IconBadge } from "@/components/ui/icon-system"

const useCaseIcons = [Phone, MessageSquare, Calendar, HeartPulse]

// Total simulated call duration in seconds
const CALL_DURATION = 32
// Pause after completing before looping
const LOOP_PAUSE_MS = 2000

export function VoiceBlock() {
  const locale = useLocale()
  const prefix = locale === "es" ? "" : `/${locale}`
  const t = useTranslations("voice")

  // Animation state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSecond, setCurrentSecond] = useState(0)
  const [barHeights, setBarHeights] = useState<number[]>(Array(24).fill(8))
  const [visibleWords, setVisibleWords] = useState(0)

  // Refs for cleanup
  const cardRef = useRef<HTMLDivElement>(null)
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const useCases = t.raw("use_cases") as string[] | undefined
  const transcriptText = (t("transcript_preview") || "Buenos dias, gracias por llamar. Soy Laura, tu asistente virtual. Como puedo ayudarte hoy?") as string
  const transcriptWords = transcriptText.split(" ")

  // Reset all animation state
  const resetAll = useCallback(() => {
    setCurrentSecond(0)
    setBarHeights(Array(24).fill(8))
    setVisibleWords(0)
  }, [])

  // -- IntersectionObserver: start/stop on viewport enter/leave --
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true)
        } else {
          setIsPlaying(false)
          resetAll()
          if (loopTimeoutRef.current) {
            clearTimeout(loopTimeoutRef.current)
            loopTimeoutRef.current = null
          }
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [resetAll])

  // -- Waveform animation: random bar heights every 120ms --
  useEffect(() => {
    if (!isPlaying) {
      setBarHeights(Array(24).fill(8))
      return
    }

    const interval = setInterval(() => {
      setBarHeights(
        Array.from({ length: 24 }, (_, i) => {
          // Natural wave: center bars taller, edges shorter
          const centerFactor = 1 - Math.abs(i - 11.5) / 12
          const base = 4 + centerFactor * 16
          return Math.max(4, Math.min(28, base + (Math.random() - 0.5) * 14))
        })
      )
    }, 120)

    return () => clearInterval(interval)
  }, [isPlaying])

  // -- Progress bar + timer: increment every ~470ms (32 steps in ~15s) --
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSecond((prev) => {
        if (prev >= CALL_DURATION) return prev // handled by loop effect
        return prev + 1
      })
    }, 470)

    return () => clearInterval(interval)
  }, [isPlaying])

  // -- Typewriter: reveal one word every ~350ms --
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev >= transcriptWords.length) return prev // handled by loop effect
        return prev + 1
      })
    }, 350)

    return () => clearInterval(interval)
  }, [isPlaying, transcriptWords.length])

  // -- Loop: when progress reaches 32, pause 2s, then reset all --
  useEffect(() => {
    if (currentSecond >= CALL_DURATION && isPlaying) {
      loopTimeoutRef.current = setTimeout(() => {
        resetAll()
      }, LOOP_PAUSE_MS)

      return () => {
        if (loopTimeoutRef.current) {
          clearTimeout(loopTimeoutRef.current)
          loopTimeoutRef.current = null
        }
      }
    }
  }, [currentSecond, isPlaying, resetAll])

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 bg-bg-page dark:bg-bg-page animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column - Content */}
          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-subtle dark:bg-bg-subtle border border-brand-secondary-hover/25 dark:border-accent-cyan/40 mb-6">
              <Volume2 className="w-3.5 h-3.5 text-brand-secondary dark:text-accent-cyan" />
              <span className="text-xs font-semibold tracking-widest text-foreground/65 dark:text-white/55 uppercase">
                {t("badge") || "Voz Humana HD"}
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
                {t("title_gradient")}
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-foreground/55 dark:text-foreground/50 text-base sm:text-lg leading-[1.7] mb-8 max-w-md">
              {t("text")}
            </p>
            
            {/* Use Cases */}
            {useCases && useCases.length > 0 && (
              <div className="space-y-2.5 mb-8">
                {useCases.map((useCase, index) => {
                  const Icon = useCaseIcons[index] || Phone
                  return (
                    <div key={index} className="flex items-center gap-3 group">
                      <IconBadge icon={Icon} size="sm" />
                      <span className="text-sm text-foreground/60">{useCase}</span>
                    </div>
                  )
                })}
              </div>
            )}
            
            {/* CTA Link */}
            <Link
              href={`${prefix}/demo-voice`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{ 
                background: "linear-gradient(135deg, #0078AA, #7C3AED)",
                boxShadow: "0 4px 12px rgba(0,120,170,0.2)" 
              }}
            >
              <Volume2 className="w-4 h-4" />
              {t("cta") || "Escuchar demo de voz"}
            </Link>
          </div>
          
          {/* Right Column - Audio Player (auto-play on viewport) */}
          <div className="relative">
            <div ref={cardRef} className="card-premium rounded-2xl overflow-hidden p-6 sm:p-8">
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gradient-from to-gradient-to flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t("demo_title") || "Demo de Voz Humana"}</p>
                    <p className="text-xs text-foreground/40">
                      {t("demo_subtitle") || "Agente IA atendiendo llamada"}
                      {isPlaying && (
                        <span className="inline-flex items-center gap-1.5 ml-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">En vivo</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                {/* Waveform */}
                <div className="py-5 px-3 rounded-xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.04] dark:border-white/[0.05] mb-4">
                  <div className="flex items-center justify-center gap-1 h-8">
                    {barHeights.map((h, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-gradient-to-t from-gradient-from to-gradient-to transition-all duration-150"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause button with pulsing ring */}
                  <div className="relative">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative w-11 h-11 rounded-full bg-gradient-to-br from-gradient-from to-gradient-to flex items-center justify-center text-white hover:scale-105 transition-transform z-10"
                      style={{ boxShadow: "0 4px 12px rgba(0,120,170,0.25)" }}
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    {isPlaying && (
                      <span className="absolute inset-0 rounded-full border-2 border-brand-secondary/40 animate-ping" style={{ animationDuration: "2s" }} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gradient-from to-gradient-to transition-all duration-100"
                        style={{ width: `${(currentSecond / CALL_DURATION) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-foreground/35">
                      <span>{formatTime(currentSecond)}</span>
                      <span>{formatTime(CALL_DURATION)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Transcript with typewriter */}
                <div className="mt-5 p-4 rounded-xl bg-foreground/[0.02] dark:bg-white/[0.02] border border-foreground/[0.04] dark:border-white/[0.04]">
                  <p className="text-[10px] font-semibold text-foreground/35 uppercase tracking-widest mb-1.5">
                    {t("transcript_label") || "Transcripcion"}
                  </p>
                  <div className="min-h-[3.5rem]">
                    <p className="text-sm text-foreground/60 italic leading-relaxed">
                      &ldquo;{transcriptWords.slice(0, visibleWords).join(" ")}
                      {visibleWords < transcriptWords.length && visibleWords > 0 && (
                        <span className="inline-block w-[2px] h-4 bg-brand-secondary dark:bg-brand-secondary ml-1 animate-pulse align-middle" />
                      )}
                      {visibleWords >= transcriptWords.length && <>&rdquo;</>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="mt-5 text-center text-xs text-foreground/45 dark:text-white/35">
              {t("microcopy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
