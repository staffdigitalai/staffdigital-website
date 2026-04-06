"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeSwitcherProps {
  className?: string
  variant?: "default" | "minimal"
}

export function ThemeSwitcher({ className, variant = "default" }: ThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return placeholder with same dimensions to prevent layout shift
    return (
      <div 
        className={cn(
          "w-9 h-9 rounded-full bg-white/5",
          variant === "minimal" && "w-8 h-8",
          className
        )} 
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  if (variant === "minimal") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "relative w-8 h-8 rounded-full flex items-center justify-center",
          "text-white/60 hover:text-white transition-all duration-300",
          "hover:bg-white/10",
          className
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <Sun 
          className={cn(
            "absolute w-4 h-4 transition-all duration-500",
            isDark 
              ? "opacity-0 rotate-90 scale-0" 
              : "opacity-100 rotate-0 scale-100"
          )} 
        />
        <Moon 
          className={cn(
            "absolute w-4 h-4 transition-all duration-500",
            isDark 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-0"
          )} 
        />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-9 h-9 rounded-full flex items-center justify-center",
        "bg-white/5 border border-white/10 backdrop-blur-sm",
        "hover:bg-white/10 hover:border-white/20",
        "transition-all duration-300 group cursor-pointer",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon */}
      <Sun 
        className={cn(
          "absolute w-4 h-4 transition-all duration-500",
          "text-white/70 group-hover:text-white",
          isDark 
            ? "opacity-0 rotate-90 scale-0" 
            : "opacity-100 rotate-0 scale-100"
        )} 
      />
      {/* Moon icon */}
      <Moon 
        className={cn(
          "absolute w-4 h-4 transition-all duration-500",
          "text-white/70 group-hover:text-white",
          isDark 
            ? "opacity-100 rotate-0 scale-100" 
            : "opacity-0 -rotate-90 scale-0"
        )} 
      />
      
      {/* Glow effect on hover */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
          isDark 
            ? "shadow-[0_0_12px_rgba(139,92,246,0.3)]" 
            : "shadow-[0_0_12px_rgba(0,212,255,0.3)]"
        )} 
      />
    </button>
  )
}
