"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useTour } from "./tour-provider"

export function TourOverlay() {
  const t = useTranslations("tour")
  const { currentStep, totalSteps, step, isActive, start, next, prev, skip } = useTour()

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0
  const isCTA = step.id === "csat"

  // Tooltip position based on anchor + side
  const getTooltipStyle = (): React.CSSProperties => {
    const { x, y } = step.tooltipAnchor
    const pad = 2 // % padding from anchor

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

  // Start screen
  if (!isActive) {
    return (
      <div className="relative max-w-6xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-300/50">
          {/* Show first screenshot as background */}
          <Image
            src={step.image}
            alt="StaffDigital AI Platform"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
          {/* Dark overlay with CTA */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
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
        </div>
      </div>
    )
  }

  // Active tour: screenshot + tooltip
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200 rounded-t-2xl overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Screenshot container */}
      <div className="relative rounded-b-2xl overflow-hidden border border-t-0 border-gray-200 shadow-2xl shadow-gray-300/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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

        {/* Tooltip positioned over the screenshot */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tooltip-${currentStep}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="absolute z-10 w-72 sm:w-80 pointer-events-auto"
            style={getTooltipStyle()}
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl shadow-gray-400/20">
              {/* Step counter + close */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 font-medium">
                  {currentStep + 1}/{totalSteps}
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
                    {t("next")}
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Fixed CTA button bottom-right (like Storylane "Reservar una demostración") */}
        <div className="absolute bottom-4 right-4 z-20">
          <Link
            href="/demo"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 bg-gray-900 hover:bg-gray-800"
          >
            👉 {t("cta_button")}
          </Link>
        </div>
      </div>
    </div>
  )
}
