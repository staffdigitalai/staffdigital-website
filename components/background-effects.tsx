"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface BackgroundEffectsProps {
  className?: string
  showGrid?: boolean
  showOrbs?: boolean
  intensity?: "low" | "medium" | "high"
}

export function BackgroundEffects({ 
  className,
  showGrid = true,
  showOrbs = true,
  intensity = "medium"
}: BackgroundEffectsProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true

  // Intensity-based opacity
  const orbOpacity = {
    low: "opacity-20",
    medium: "opacity-40",
    high: "opacity-60"
  }[intensity]

  const gridOpacity = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-70"
  }[intensity]

  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden", className)}>
      {/* SVG Grid Pattern */}
      {showGrid && (
        <svg 
          className={cn(
            "absolute inset-0 w-full h-full",
            gridOpacity,
            "transition-opacity duration-500"
          )}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="grid-pattern" 
              width="60" 
              height="60" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke={isDark ? "rgba(0, 212, 255, 0.04)" : "rgba(0, 0, 0, 0.04)"}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      )}

      {/* Floating Orbs */}
      {showOrbs && (
        <>
          {/* Orb 1 - Neon Blue (top-right) */}
          <div 
            className={cn(
              "absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full",
              "animate-float-orb",
              orbOpacity,
              "transition-all duration-500"
            )}
            style={{
              background: isDark 
                ? "radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, rgba(0, 212, 255, 0.1) 40%, transparent 70%)"
                : "radial-gradient(circle, rgba(0, 153, 204, 0.2) 0%, rgba(0, 153, 204, 0.05) 40%, transparent 70%)",
              filter: "blur(40px)"
            }}
          />

          {/* Orb 2 - Purple (bottom-left) */}
          <div 
            className={cn(
              "absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full",
              "animate-float-orb-delayed",
              orbOpacity,
              "transition-all duration-500"
            )}
            style={{
              background: isDark 
                ? "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)"
                : "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.04) 40%, transparent 70%)",
              filter: "blur(50px)"
            }}
          />

          {/* Orb 3 - Lime Green (center-left) */}
          <div 
            className={cn(
              "absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full",
              "animate-float-orb-slow",
              orbOpacity,
              "transition-all duration-500"
            )}
            style={{
              background: isDark 
                ? "radial-gradient(circle, rgba(191, 255, 0, 0.15) 0%, rgba(191, 255, 0, 0.05) 40%, transparent 70%)"
                : "radial-gradient(circle, rgba(132, 204, 22, 0.1) 0%, rgba(132, 204, 22, 0.03) 40%, transparent 70%)",
              filter: "blur(45px)"
            }}
          />
        </>
      )}

      {/* Gradient overlay for smooth blending */}
      <div 
        className={cn(
          "absolute inset-0",
          "transition-colors duration-500",
          isDark 
            ? "bg-gradient-to-b from-black/0 via-black/20 to-black/60" 
            : "bg-gradient-to-b from-white/0 via-white/10 to-white/40"
        )}
      />
    </div>
  )
}
