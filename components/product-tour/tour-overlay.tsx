"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTour } from "./tour-provider"
import Link from "next/link"

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export function TourOverlay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const t = useTranslations("tour")
  const { currentStep, totalSteps, step, isActive, start, next, prev, skip } = useTour()
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const [containerRect, setContainerRect] = useState<Rect | null>(null)

  // Calculate target element position relative to container
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const updateRects = () => {
      const container = containerRef.current
      if (!container) return
      const cRect = container.getBoundingClientRect()
      setContainerRect({ x: 0, y: 0, width: cRect.width, height: cRect.height })

      const target = container.querySelector(`[data-tour-target="${step.target}"]`)
      if (!target) {
        setTargetRect(null)
        return
      }
      const tRect = target.getBoundingClientRect()
      setTargetRect({
        x: tRect.x - cRect.x,
        y: tRect.y - cRect.y,
        width: tRect.width,
        height: tRect.height,
      })
    }

    updateRects()
    const ro = new ResizeObserver(updateRects)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [isActive, step.target, containerRef, currentStep])

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0
  const isCTA = step.id === "cta-final"

  // Popover position calculation
  const getPopoverStyle = (): React.CSSProperties => {
    if (!targetRect || !containerRect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

    const pad = 16
    const popW = 320
    const popH = 180

    switch (step.popoverPosition) {
      case "right":
        return {
          top: targetRect.y + targetRect.height / 2 - popH / 2,
          left: targetRect.x + targetRect.width + pad,
        }
      case "left":
        return {
          top: targetRect.y + targetRect.height / 2 - popH / 2,
          left: targetRect.x - popW - pad,
        }
      case "top":
        return {
          top: targetRect.y - popH - pad,
          left: targetRect.x + targetRect.width / 2 - popW / 2,
        }
      case "bottom":
      default:
        return {
          top: targetRect.y + targetRect.height + pad,
          left: Math.max(pad, Math.min(
            targetRect.x + targetRect.width / 2 - popW / 2,
            (containerRect?.width ?? 800) - popW - pad,
          )),
        }
    }
  }

  // Start screen (before tour begins)
  if (!isActive) {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--neon-blue)] to-[var(--purple-dark)] flex items-center justify-center mx-auto mb-4">
            <Play size={28} className="text-white ml-1" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{t("title")}</h3>
          <p className="text-sm text-slate-300 mb-6">{t("subtitle")}</p>
          <button
            onClick={start}
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--neon-blue)]/25"
            style={{ background: "linear-gradient(135deg, var(--neon-blue), var(--purple-dark))" }}
          >
            {t("start_button")}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-slate-700/50 rounded-t-2xl overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, var(--neon-blue), var(--purple-dark))" }}
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Spotlight overlay */}
      {containerRect && (
        <svg
          className="absolute inset-0 z-30 pointer-events-none"
          width={containerRect.width}
          height={containerRect.height}
          style={{ borderRadius: "1rem" }}
        >
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              {targetRect && step.target !== "full-mockup" && (
                <motion.rect
                  fill="black"
                  rx={12}
                  initial={false}
                  animate={{
                    x: targetRect.x - 4,
                    y: targetRect.y - 4,
                    width: targetRect.width + 8,
                    height: targetRect.height + 8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.6)"
            mask="url(#spotlight-mask)"
          />
        </svg>
      )}

      {/* Popover */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="absolute z-40 w-80"
          style={getPopoverStyle()}
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-5 shadow-2xl shadow-black/30">
            {/* Step counter + close */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-medium">
                {currentStep + 1} / {totalSteps}
              </span>
              <button onClick={skip} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <h4 className="text-base font-bold text-white mb-1.5">
              {t(`steps.${step.i18nKey}.title`)}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {t(`steps.${step.i18nKey}.description`)}
            </p>

            {/* CTA final step */}
            {isCTA ? (
              <div className="space-y-2">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, var(--neon-blue), var(--purple-dark))" }}
                >
                  {t("cta_button")}
                </Link>
                <button
                  onClick={skip}
                  className="w-full text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors"
                >
                  {t("close")}
                </button>
              </div>
            ) : (
              /* Navigation buttons */
              <div className="flex items-center justify-between">
                <button
                  onClick={prev}
                  disabled={isFirstStep}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={14} />
                  {t("previous")}
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, var(--neon-blue), var(--purple-dark))" }}
                >
                  {isLastStep ? t("finish") : t("next")}
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
