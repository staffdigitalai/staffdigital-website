"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { tourSteps, type TourStep } from "./tour-steps"

interface TourContextValue {
  currentStep: number
  totalSteps: number
  step: TourStep
  isActive: boolean
  start: () => void
  next: () => void
  prev: () => void
  skip: () => void
}

const TourContext = createContext<TourContextValue | null>(null)

export function useTour() {
  const ctx = useContext(TourContext)
  if (!ctx) throw new Error("useTour must be used within TourProvider")
  return ctx
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(-1)
  const totalSteps = tourSteps.length
  const isActive = currentStep >= 0
  const step = tourSteps[Math.max(0, currentStep)] ?? tourSteps[0]

  const start = useCallback(() => setCurrentStep(0), [])
  const next = useCallback(() => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1)), [totalSteps])
  const prev = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 0)), [])
  const skip = useCallback(() => setCurrentStep(-1), [])

  useEffect(() => {
    if (!isActive) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); next() }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev() }
      else if (e.key === "Escape") { e.preventDefault(); skip() }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isActive, next, prev, skip])

  const value = useMemo<TourContextValue>(
    () => ({ currentStep, totalSteps, step, isActive, start, next, prev, skip }),
    [currentStep, totalSteps, step, isActive, start, next, prev, skip],
  )

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>
}
