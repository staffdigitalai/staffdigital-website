"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Volume2, Play, Pause, Phone, MessageSquare, Calendar, HeartPulse } from "lucide-react"
import Link from "next/link"
import { IconBadge } from "@/components/ui/icon-system"

// Audio waveform visualization component
function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full bg-gradient-to-t from-[#0078AA] to-[#7C3AED] transition-all duration-150 ${
            isPlaying ? "animate-wave" : "h-2"
          }`}
          style={{
            animationDelay: `${i * 50}ms`,
            height: isPlaying ? `${Math.random() * 24 + 8}px` : "8px",
          }}
        />
      ))}
    </div>
  )
}

const useCaseIcons = [Phone, MessageSquare, Calendar, HeartPulse]

export function VoiceBlock() {
  const t = useTranslations("voice")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(32) // Demo duration in seconds

  const useCases = t.raw("use_cases") as string[] | undefined

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-8 animate-fade-in-section">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column - Content */}
          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF4FF] dark:bg-[#0F1B2E] border border-[#0062CC]/25 dark:border-[#38BDF8]/40 mb-6">
              <Volume2 className="w-3.5 h-3.5 text-[#0078AA] dark:text-[#38BDF8]" />
              <span className="text-xs font-semibold tracking-widest text-foreground/65 dark:text-white/55 uppercase">
                {t("badge") || "Voz Humana HD"}
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
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
              href="/demo-voice"
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
          
          {/* Right Column - Audio Player */}
          <div className="relative">
            <div className="card-premium rounded-2xl overflow-hidden p-6 sm:p-8">
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t("demo_title") || "Demo de Voz Humana"}</p>
                    <p className="text-xs text-foreground/40">{t("demo_subtitle") || "Agente IA atendiendo llamada"}</p>
                  </div>
                </div>
                
                {/* Waveform */}
                <div className="py-5 px-3 rounded-xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.04] dark:border-white/[0.05] mb-4">
                  <AudioWaveform isPlaying={isPlaying} />
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center text-white hover:scale-105 transition-transform"
                    style={{ boxShadow: "0 4px 12px rgba(0,120,170,0.25)" }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{
                          width: `${(currentTime / duration) * 100}%`,
                          background: "linear-gradient(90deg, #0078AA, #7C3AED)",
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-foreground/35">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Transcript */}
                <div className="mt-5 p-4 rounded-xl bg-foreground/[0.02] dark:bg-white/[0.02] border border-foreground/[0.04] dark:border-white/[0.04]">
                  <p className="text-[10px] font-semibold text-foreground/35 uppercase tracking-widest mb-1.5">
                    {t("transcript_label") || "Transcripcion"}
                  </p>
                  <p className="text-sm text-foreground/60 italic leading-relaxed">
                    &ldquo;{t("transcript_preview") || "Buenos dias, gracias por llamar. Soy Laura, tu asistente virtual. Como puedo ayudarte hoy?"}&rdquo;
                  </p>
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
