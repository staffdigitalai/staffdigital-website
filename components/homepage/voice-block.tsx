"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Volume2, Play, Pause, Phone, MessageSquare, Calendar, HeartPulse } from "lucide-react"
import Link from "next/link"

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
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.04] dark:bg-white/[0.06] border border-foreground/[0.08] dark:border-white/[0.1] mb-6">
              <Volume2 className="w-4 h-4 text-[#0078AA] dark:text-[#00D4FF]" />
              <span className="text-xs font-semibold tracking-wide text-foreground/70 dark:text-white/70 uppercase">
                {t("badge") || "Voz Humana HD"}
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="text-foreground">{t("title_plain")} </span>
              <span className="bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent">
                {t("title_gradient")}
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {t("text")}
            </p>
            
            {/* Use Cases */}
            {useCases && useCases.length > 0 && (
              <div className="space-y-3 mb-8">
                {useCases.map((useCase, index) => {
                  const Icon = useCaseIcons[index] || Phone
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0078AA]/10 to-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#0078AA] dark:text-[#00D4FF]" />
                      </div>
                      <span className="text-sm text-foreground/70">{useCase}</span>
                    </div>
                  )
                })}
              </div>
            )}
            
            {/* CTA Link */}
            <Link
              href="/demo-voice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, rgb(0, 120, 170), rgb(124, 58, 237))" }}
            >
              <Volume2 className="w-4 h-4" />
              {t("cta") || "Escuchar demo de voz"}
            </Link>
          </div>
          
          {/* Right Column - Audio Player Visualization */}
          <div className="relative">
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.04] dark:from-white/[0.03] dark:to-white/[0.06] border border-foreground/[0.08] dark:border-white/[0.1]">
              {/* Gradient accents */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#0078AA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#7C3AED]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t("demo_title") || "Demo de Voz Humana"}</p>
                    <p className="text-xs text-foreground/50">{t("demo_subtitle") || "Agente IA atendiendo llamada"}</p>
                  </div>
                </div>
                
                {/* Waveform */}
                <div className="py-6 px-2 rounded-xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.05] dark:border-white/[0.06] mb-4">
                  <AudioWaveform isPlaying={isPlaying} />
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0078AA] to-[#7C3AED] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  
                  {/* Progress bar */}
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-foreground/[0.08] dark:bg-white/[0.1] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{
                          width: `${(currentTime / duration) * 100}%`,
                          background: "linear-gradient(90deg, rgb(0, 120, 170), rgb(124, 58, 237))",
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-foreground/40">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Transcript preview */}
                <div className="mt-6 p-4 rounded-xl bg-foreground/[0.02] dark:bg-white/[0.03] border border-foreground/[0.05] dark:border-white/[0.06]">
                  <p className="text-xs font-medium text-foreground/40 uppercase tracking-wide mb-2">
                    {t("transcript_label") || "Transcripcion"}
                  </p>
                  <p className="text-sm text-foreground/70 italic leading-relaxed">
                    &ldquo;{t("transcript_preview") || "Buenos dias, gracias por llamar. Soy Laura, tu asistente virtual. Como puedo ayudarte hoy?"}&rdquo;
                  </p>
                </div>
              </div>
            </div>
            
            {/* Microcopy */}
            <p className="mt-6 text-center text-sm text-foreground/35 dark:text-white/30">
              {t("microcopy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
