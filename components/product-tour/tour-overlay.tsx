"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTour } from "./tour-provider"
import Link from "next/link"

export function TourOverlay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const t = useTranslations("tour")
  const { currentStep, totalSteps, step, isActive, start, next, prev, skip } = useTour()
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 })

  // Track container size
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setContainerSize({ w: r.width, h: r.height })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef])

  const { w, h } = containerSize
  const target = step.target
  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0
  const isCTA = step.id === "cta-final"

  // Convert percentage target to pixel rect
  const cutout = target
    ? {
        x: (target.x / 100) * w - 6,
        y: (target.y / 100) * h - 6,
        width: (target.w / 100) * w + 12,
        height: (target.h / 100) * h + 12,
      }
    : null

  // Popover position in pixels
  const getPopoverStyle = (): React.CSSProperties => {
    if (!target || !w) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

    const popW = 320
    const pad = 16
    const tX = (target.x / 100) * w
    const tY = (target.y / 100) * h
    const tW = (target.w / 100) * w
    const tH = (target.h / 100) * h

    switch (step.popoverPosition) {
      case "right":
        return {
          top: Math.max(pad, Math.min(tY + tH / 2 - 90, h - 200)),
          left: tX + tW + pad,
        }
      case "left":
        return {
          top: Math.max(pad, Math.min(tY + tH / 2 - 90, h - 200)),
          left: Math.max(pad, tX - popW - pad),
        }
      case "top":
        return {
          top: Math.max(pad, tY - 200),
          left: Math.max(pad, tX + tW / 2 - popW / 2),
        }
      case "bottom":
      default:
        return {
          top: tY + tH + pad,
          left: Math.max(pad, Math.min(tX + tW / 2 - popW / 2, w - popW - pad)),
        }
    }
  }

  // Start screen
  if (!isActive) {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-[2px] rounded-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Play size={28} className="text-white ml-1" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{t("title")}</h3>
          <p className="text-sm text-white/80 mb-6">{t("subtitle")}</p>
          <button
            onClick={start}
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-500 to-purple-600"
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
      <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-gray-200/80 rounded-t-2xl overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Spotlight overlay */}
      {w > 0 && (
        <svg
          className="absolute inset-0 z-30 pointer-events-none"
          width={w}
          height={h}
          style={{ borderRadius: "1rem" }}
        >
          <defs>
            <mask id="tour-spotlight">
              <rect width="100%" height="100%" fill="white" />
              {cutout && (
                <motion.rect
                  fill="black"
                  rx={8}
                  initial={false}
                  animate={{
                    x: cutout.x,
                    y: cutout.y,
                    width: cutout.width,
                    height: cutout.height,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.5)"
            mask="url(#tour-spotlight)"
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
          className="absolute z-40 w-80 pointer-events-auto"
          style={getPopoverStyle()}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl shadow-gray-400/20">
            {/* Step counter + close */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-medium">
                {currentStep + 1} / {totalSteps}
              </span>
              <button onClick={skip} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <h4 className="text-base font-bold text-gray-900 mb-1.5">
              {t(`steps.${step.i18nKey}.title`)}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {t(`steps.${step.i18nKey}.description`)}
            </p>

            {/* CTA on last step */}
            {isCTA ? (
              <div className="space-y-2">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {t("cta_button")}
                </Link>
                <button
                  onClick={skip}
                  className="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
                >
                  {t("close")}
                </button>
              </div>
            ) : (
              /* Navigation */
              <div className="flex items-center justify-between">
                <button
                  onClick={prev}
                  disabled={isFirstStep}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={14} />
                  {t("previous")}
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600"
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
