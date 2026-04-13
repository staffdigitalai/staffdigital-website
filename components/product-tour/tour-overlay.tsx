"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { useTour } from "./tour-provider"

// ─── Arrow for tooltip ───────────────────────────────────────────────
function TooltipArrow({ side }: { side: string }) {
  const base = "absolute w-3 h-3 bg-white rotate-45 border-gray-200"
  switch (side) {
    case "right": return <div className={`${base} -left-1.5 top-6 border-l border-b`} />
    case "left": return <div className={`${base} -right-1.5 top-6 border-r border-t`} />
    case "top": return <div className={`${base} -bottom-1.5 left-8 border-r border-b`} />
    case "bottom": return <div className={`${base} -top-1.5 left-8 border-l border-t`} />
    default: return null
  }
}

export function TourOverlay() {
  const t = useTranslations("tour")
  const { currentStep, totalSteps, step, isActive, start, next, prev, skip } = useTour()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0
  const isCTA = step.id === "csat"

  // Track container dimensions
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => { const r = el.getBoundingClientRect(); setDims({ w: r.width, h: r.height }) }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Zoom transform: pan toward spotlight center + scale
  const getZoomTransform = (): React.CSSProperties => {
    if (!isActive) return {}
    const z = step.zoom ?? 1
    if (z <= 1) return {}
    const sl = step.spotlight
    const cx = sl.x + sl.w / 2
    const cy = sl.y + sl.h / 2
    // Pan so the spotlight center moves toward the viewport center
    const tx = (50 - cx) * (z - 1) * 0.6
    const ty = (50 - cy) * (z - 1) * 0.6
    return {
      transform: `scale(${z}) translate(${tx}%, ${ty}%)`,
      transformOrigin: `${cx}% ${cy}%`,
      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }

  // Spotlight rect in pixels
  const sl = step.spotlight
  const spotPx = {
    x: (sl.x / 100) * dims.w,
    y: (sl.y / 100) * dims.h,
    w: (sl.w / 100) * dims.w,
    h: (sl.h / 100) * dims.h,
  }

  // Tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    const { x, y } = step.beacon
    const pad = 3
    switch (step.tooltipSide) {
      case "right": return { top: `${y}%`, left: `${x + pad}%`, transform: "translateY(-50%)" }
      case "left": return { top: `${y}%`, left: `${x - pad}%`, transform: "translate(-100%, -50%)" }
      case "top": return { top: `${y - pad}%`, left: `${x}%`, transform: "translate(-50%, -100%)" }
      case "bottom": default: return { top: `${y + pad}%`, left: `${x}%`, transform: "translateX(-50%)" }
    }
  }

  // ─── Start screen ──────────────────────────────────────────────────
  if (!isActive) {
    return (
      <div className="relative max-w-6xl mx-auto" ref={containerRef}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: "3px solid #f8a58455" }}>
          <Image src={step.image} alt="StaffDigital AI" width={1920} height={1080} className="w-full h-auto" priority />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Play size={28} className="text-white ml-1" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t("title")}</h3>
              <p className="text-sm text-white/80 mb-6">{t("subtitle")}</p>
              <button onClick={start} className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-500 to-purple-600">
                {t("start_button")}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Active tour ───────────────────────────────────────────────────
  return (
    <div className="relative max-w-6xl mx-auto" ref={containerRef}>
      {/* Progress bar */}
      <div className="h-1 bg-gray-200 rounded-t-2xl overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }} />
      </div>

      {/* Frame with peach border (like Storylane) */}
      <div className="relative rounded-b-2xl overflow-hidden" style={{ border: "3px solid #f8a58455", borderTop: "none" }}>

        {/* Screenshot with zoom transform */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={getZoomTransform()}
          >
            <Image src={step.image} alt={t(`steps.${step.i18nKey}.title`)} width={1920} height={1080} className="w-full h-auto" priority />
          </motion.div>
        </AnimatePresence>

        {/* SVG spotlight overlay (darkens everything except spotlight rect) */}
        {dims.w > 0 && (
          <svg className="absolute inset-0 z-10 pointer-events-none" width="100%" height="100%" preserveAspectRatio="none"
            viewBox={`0 0 ${dims.w} ${dims.h}`}>
            <defs>
              <mask id="spotlight-mask">
                <rect width={dims.w} height={dims.h} fill="white" />
                <motion.rect
                  fill="black" rx={12}
                  initial={false}
                  animate={{ x: spotPx.x - 6, y: spotPx.y - 6, width: spotPx.w + 12, height: spotPx.h + 12 }}
                  transition={{ type: "spring", stiffness: 250, damping: 30 }}
                />
              </mask>
            </defs>
            <rect width={dims.w} height={dims.h} fill="rgba(0,0,0,0.45)" mask="url(#spotlight-mask)" />
            {/* Spotlight border glow */}
            <motion.rect
              fill="none" stroke="#f8a584" strokeWidth={2} rx={12} opacity={0.6}
              initial={false}
              animate={{ x: spotPx.x - 6, y: spotPx.y - 6, width: spotPx.w + 12, height: spotPx.h + 12 }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
            />
          </svg>
        )}

        {/* Hotspot beacon (pulsing black dot) */}
        <motion.div
          key={`beacon-${currentStep}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute z-20 pointer-events-none"
          style={{ left: `${step.beacon.x}%`, top: `${step.beacon.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-gray-900 border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-gray-900/40 animate-ping" />
          </div>
        </motion.div>

        {/* Tooltip with arrow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tooltip-${currentStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="absolute z-30 w-72 sm:w-80"
            style={getTooltipStyle()}
          >
            <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl shadow-gray-400/30">
              <TooltipArrow side={step.tooltipSide} />

              {/* Counter + close */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 font-medium">{currentStep + 1}/{totalSteps}</span>
                <button onClick={skip} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={16} /></button>
              </div>

              {/* Content */}
              <h4 className="text-base font-bold text-gray-900 mb-1.5">{t(`steps.${step.i18nKey}.title`)}</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{t(`steps.${step.i18nKey}.description`)}</p>

              {/* CTA or nav */}
              {isCTA ? (
                <div className="space-y-2">
                  <Link href="/demo" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-white font-semibold text-sm hover:scale-[1.02] transition-all bg-gray-900">{t("cta_button")}</Link>
                  <button onClick={skip} className="w-full text-xs text-gray-400 hover:text-gray-600 py-1">{t("close")}</button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button onClick={prev} disabled={isFirstStep} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ArrowLeft size={14} />{t("previous")}
                  </button>
                  <button onClick={next} className="flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all">
                    {t("next")}<ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Fixed CTA bottom-right (like Storylane "Reservar una demostración") */}
        <div className="absolute bottom-4 right-4 z-30">
          <Link href="/demo" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 bg-gray-900 hover:bg-gray-800">
            👉 {t("cta_button")}
          </Link>
        </div>
      </div>
    </div>
  )
}
