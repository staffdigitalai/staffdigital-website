"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTour } from "./tour-provider"
import Link from "next/link"

interface Rect { x: number; y: number; width: number; height: number }

export function TourOverlay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const t = useTranslations("tour")
  const { currentStep, totalSteps, step, isActive, start, next, prev, skip } = useTour()
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const [containerRect, setContainerRect] = useState<Rect | null>(null)

  // Recalculate rects when step changes
  useEffect(() => {
    if (!isActive || !containerRef.current) return
    const update = () => {
      const container = containerRef.current
      if (!container) return
      const cRect = container.getBoundingClientRect()
      setContainerRect({ x: 0, y: 0, width: cRect.width, height: cRect.height })

      if (step.target === "full-mockup") {
        setTargetRect(null)
        return
      }
      const el = container.querySelector(`[data-tour-target="${step.target}"]`)
      if (!el) { setTargetRect(null); return }
      const tRect = el.getBoundingClientRect()
      setTargetRect({ x: tRect.x - cRect.x, y: tRect.y - cRect.y, width: tRect.width, height: tRect.height })
    }
    // Small delay to let mockup re-render after state change
    const timer = setTimeout(update, 50)
    const ro = new ResizeObserver(update)
    ro.observe(containerRef.current)
    return () => { clearTimeout(timer); ro.disconnect() }
  }, [isActive, step.target, containerRef, currentStep])

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0
  const isCTA = step.id === "cta-final"

  const getPopoverStyle = (): React.CSSProperties => {
    if (!targetRect || !containerRect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    const pad = 16; const popW = 320
    switch (step.popoverPosition) {
      case "right": return { top: Math.max(pad, targetRect.y + targetRect.height / 2 - 90), left: targetRect.x + targetRect.width + pad }
      case "left": return { top: Math.max(pad, targetRect.y + targetRect.height / 2 - 90), left: Math.max(pad, targetRect.x - popW - pad) }
      case "top": return { top: Math.max(pad, targetRect.y - 200), left: Math.max(pad, targetRect.x + targetRect.width / 2 - popW / 2) }
      default: return { top: targetRect.y + targetRect.height + pad, left: Math.max(pad, Math.min(targetRect.x + targetRect.width / 2 - popW / 2, (containerRect.width) - popW - pad)) }
    }
  }

  if (!isActive) {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-[2px] rounded-2xl">
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
    )
  }

  return (
    <>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-gray-200/80 rounded-t-2xl overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" initial={{ width: "0%" }} animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
      </div>

      {/* Spotlight */}
      {containerRect && (
        <svg className="absolute inset-0 z-30 pointer-events-none" width={containerRect.width} height={containerRect.height} style={{ borderRadius: "1rem" }}>
          <defs>
            <mask id="tour-spotlight">
              <rect width="100%" height="100%" fill="white" />
              {targetRect && (
                <motion.rect fill="black" rx={8} initial={false}
                  animate={{ x: targetRect.x - 4, y: targetRect.y - 4, width: targetRect.width + 8, height: targetRect.height + 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#tour-spotlight)" />
        </svg>
      )}

      {/* Popover */}
      <AnimatePresence mode="wait">
        <motion.div key={currentStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
          className="absolute z-40 w-80 pointer-events-auto" style={getPopoverStyle()}>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl shadow-gray-400/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-medium">{currentStep + 1} / {totalSteps}</span>
              <button onClick={skip} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={16} /></button>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1.5">{t(`steps.${step.i18nKey}.title`)}</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{t(`steps.${step.i18nKey}.description`)}</p>
            {isCTA ? (
              <div className="space-y-2">
                <Link href="/demo" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] bg-gradient-to-r from-blue-500 to-purple-600">{t("cta_button")}</Link>
                <button onClick={skip} className="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors">{t("close")}</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button onClick={prev} disabled={isFirstStep} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ArrowLeft size={14} />{t("previous")}</button>
                <button onClick={next} className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600"><ArrowRight size={14} />{t("next")}</button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
