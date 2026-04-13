"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { useTour } from "./tour-provider"

// ─── Tooltip arrow (CSS triangle pointing toward the beacon) ─────────
function TooltipArrow({ side }: { side: string }) {
  // Arrow is a rotated square with selective borders to create a triangle effect
  switch (side) {
    case "right":
      return <div className="absolute -left-[7px] top-7 w-3.5 h-3.5 bg-white rotate-45 border-l border-b border-gray-200 shadow-sm" />
    case "left":
      return <div className="absolute -right-[7px] top-7 w-3.5 h-3.5 bg-white rotate-45 border-r border-t border-gray-200 shadow-sm" />
    case "top":
      return <div className="absolute -bottom-[7px] left-10 w-3.5 h-3.5 bg-white rotate-45 border-r border-b border-gray-200 shadow-sm" />
    case "bottom":
      return <div className="absolute -top-[7px] left-10 w-3.5 h-3.5 bg-white rotate-45 border-l border-t border-gray-200 shadow-sm" />
    default:
      return null
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

  // Track container dimensions for SVG mask
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setDims({ w: r.width, h: r.height })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Zoom: pan + scale toward spotlight center
  const getZoomTransform = (): React.CSSProperties => {
    if (!isActive) return {}
    const z = step.zoom ?? 1
    if (z <= 1) return {}
    const sl = step.spotlight
    const cx = sl.x + sl.w / 2
    const cy = sl.y + sl.h / 2
    const tx = (50 - cx) * (z - 1) * 0.6
    const ty = (50 - cy) * (z - 1) * 0.6
    return {
      transform: `scale(${z}) translate(${tx}%, ${ty}%)`,
      transformOrigin: `${cx}% ${cy}%`,
      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }

  // Spotlight rectangle in pixels
  const sl = step.spotlight
  const spotPx = {
    x: (sl.x / 100) * dims.w,
    y: (sl.y / 100) * dims.h,
    w: (sl.w / 100) * dims.w,
    h: (sl.h / 100) * dims.h,
  }

  // Tooltip position from beacon
  const getTooltipStyle = (): React.CSSProperties => {
    const { x, y } = step.beacon
    const pad = 3
    switch (step.tooltipSide) {
      case "right":
        return { top: `${y}%`, left: `${x + pad}%`, transform: "translateY(-50%)" }
      case "left":
        return { top: `${y}%`, left: `${x - pad}%`, transform: "translate(-100%, -50%)" }
      case "top":
        return { top: `${y - pad}%`, left: `${x}%`, transform: "translate(-50%, -100%)" }
      case "bottom":
      default:
        return { top: `${y + pad}%`, left: `${x}%`, transform: "translateX(-50%)" }
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // START SCREEN (before tour begins)
  // Storylane style: 20% dark overlay, no blur, no play icon,
  // dark title text, solid black button, hover:scale on container
  // ═══════════════════════════════════════════════════════════════════
  if (!isActive) {
    return (
      <div className="relative max-w-6xl mx-auto group" ref={containerRef}>
        <div
          className="relative rounded-2xl overflow-hidden transition-transform duration-700 group-hover:scale-[1.02] cursor-pointer"
          style={{
            border: "1px solid rgba(99, 102, 241, 0.25)",
            boxShadow: "0 0 18px rgba(99, 102, 241, 0.12)",
          }}
          onClick={start}
        >
          <Image
            src={step.image}
            alt="StaffDigital AI Platform"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
          {/* Light overlay — 20% opacity, NO blur (Storylane style) */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/25">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md px-6"
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: "rgb(26, 19, 72)" }}>
                {t("title")}
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(26, 19, 72, 0.7)" }}>
                {t("subtitle")}
              </p>
              <button className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 bg-black hover:bg-gray-800">
                {t("start_button")}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════
  // ACTIVE TOUR — fullscreen overlay to hide navbar
  // ═══════════════════════════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-50 bg-gray-100 overflow-auto flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl mx-auto" ref={containerRef}>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 rounded-t-2xl overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Frame */}
        <div
          className="relative rounded-b-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(99, 102, 241, 0.25)",
            borderTop: "none",
            boxShadow: "0 0 18px rgba(99, 102, 241, 0.12)",
          }}
        >

          {/* Screenshot with crossfade + zoom */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={getZoomTransform()}
            >
              <Image
                src={step.image}
                alt={t(`steps.${step.i18nKey}.title`)}
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* SVG spotlight mask overlay — 55% dark for more "pop" */}
          {dims.w > 0 && (
            <svg
              className="absolute inset-0 z-10 pointer-events-none"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              viewBox={`0 0 ${dims.w} ${dims.h}`}
            >
              <defs>
                <mask id="spotlight-mask">
                  <rect width={dims.w} height={dims.h} fill="white" />
                  <motion.rect
                    fill="black"
                    rx={12}
                    initial={false}
                    animate={{
                      x: spotPx.x - 6,
                      y: spotPx.y - 6,
                      width: spotPx.w + 12,
                      height: spotPx.h + 12,
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 30 }}
                  />
                </mask>
              </defs>
              <rect
                width={dims.w}
                height={dims.h}
                fill="rgba(0,0,0,0.55)"
                mask="url(#spotlight-mask)"
              />
              {/* Spotlight border — indigo/brand color, subtle */}
              <motion.rect
                fill="none"
                stroke="rgba(99, 102, 241, 0.35)"
                strokeWidth={1.5}
                rx={12}
                initial={false}
                animate={{
                  x: spotPx.x - 6,
                  y: spotPx.y - 6,
                  width: spotPx.w + 12,
                  height: spotPx.h + 12,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
              />
            </svg>
          )}

          {/* Hotspot beacon — brand blue, softer pulse */}
          <motion.div
            key={`beacon-${currentStep}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, type: "spring" }}
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${step.beacon.x}%`,
              top: `${step.beacon.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg ring-2 ring-blue-500/30" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-500/30 animate-pulse" />
            </div>
          </motion.div>

          {/* Tooltip with arrow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tooltip-${currentStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="absolute z-30 w-72 sm:w-80"
              style={getTooltipStyle()}
            >
              <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-xl">
                <TooltipArrow side={step.tooltipSide} />

                {/* Step counter — small, subtle */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-gray-400 font-medium tracking-wide">
                    {currentStep + 1}/{totalSteps}
                  </span>
                  <button
                    onClick={skip}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Content */}
                <h4 className="text-[15px] font-bold text-gray-900 mb-1.5">
                  {t(`steps.${step.i18nKey}.title`)}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                  {t(`steps.${step.i18nKey}.description`)}
                </p>

                {/* CTA or navigation */}
                {isCTA ? (
                  <div className="space-y-2">
                    <Link
                      href="/demo"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-white font-semibold text-sm hover:scale-[1.02] transition-all bg-black hover:bg-gray-800"
                    >
                      {t("cta_button")}
                    </Link>
                    <button
                      onClick={skip}
                      className="w-full text-xs text-gray-400 hover:text-gray-600 py-1"
                    >
                      {t("close")}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    {/* Previous — ghost button style */}
                    <button
                      onClick={prev}
                      disabled={isFirstStep}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ArrowLeft size={14} />
                      {t("previous")}
                    </button>
                    {/* Next — solid black button (Storylane style) */}
                    <button
                      onClick={next}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-all"
                    >
                      {t("next")}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Fixed CTA bottom-right */}
          <div className="absolute bottom-4 right-4 z-30">
            <Link
              href="/demo"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 bg-black hover:bg-gray-800"
            >
              👉 {t("cta_button")}
            </Link>
          </div>
        </div>

        {/* Close/exit button top-right (to exit fullscreen mode) */}
        <button
          onClick={skip}
          className="absolute -top-2 -right-2 z-40 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
