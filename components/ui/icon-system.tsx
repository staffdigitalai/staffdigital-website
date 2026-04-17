import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────
   StaffDigital Icon System
   
   Dual-layer strategy:
   A. Functional icons (80-90%) — clean outline, minimal badges
   B. Accent icons (10-20%) — premium gradient containers
   ───────────────────────────────────────────── */

// ── Shared types ──
interface IconProps {
  icon: LucideIcon
  className?: string
}

// ── A. FUNCTIONAL LAYER ──

/**
 * FeatureIcon — Default functional icon for cards, lists, features.
 * Clean outline icon in brand colors. 18-24px icon.
 */
export function FeatureIcon({ icon: Icon, className }: IconProps) {
  return (
    <Icon
      className={cn(
        "w-5 h-5 text-brand-secondary dark:text-accent-cyan",
        className
      )}
      strokeWidth={1.75}
    />
  )
}

/**
 * IconBadge — Functional icon inside a subtle badge container.
 * Soft bg, rounded-xl, 40-44px badge. Used in feature cards, metrics, lists.
 */
export function IconBadge({
  icon: Icon,
  size = "md",
  className,
}: IconProps & { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { badge: "w-9 h-9 rounded-lg", icon: "w-[18px] h-[18px]" },
    md: { badge: "w-11 h-11 rounded-xl", icon: "w-5 h-5" },
    lg: { badge: "w-12 h-12 rounded-xl", icon: "w-[22px] h-[22px]" },
  }
  const s = sizes[size]

  return (
    <div
      className={cn(
        s.badge,
        "flex items-center justify-center",
        "bg-bg-subtle dark:bg-bg-subtle",
        "group-hover:bg-brand-secondary/[0.12] dark:group-hover:bg-accent-cyan/[0.12]",
        "transition-colors duration-300",
        className
      )}
    >
      <Icon
        className={cn(s.icon, "text-brand-secondary dark:text-accent-cyan")}
        strokeWidth={1.75}
      />
    </div>
  )
}

/**
 * ProcessStepIcon — Functional icon for process/methodology steps.
 * Badge with numbered indicator. Clean outline icon.
 */
export function ProcessStepIcon({
  icon: Icon,
  stepNumber,
  className,
}: IconProps & { stepNumber: number | string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center",
          "bg-bg-subtle dark:bg-bg-subtle",
          "border border-brand-secondary/10 dark:border-accent-cyan/10"
        )}
      >
        <Icon
          className="w-5 h-5 text-brand-secondary dark:text-accent-cyan"
          strokeWidth={1.75}
        />
      </div>
      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-secondary dark:bg-accent-cyan flex items-center justify-center">
        <span className="text-[10px] font-bold text-white dark:text-fg-primary">
          {stepNumber}
        </span>
      </div>
    </div>
  )
}

// ── B. ACCENT LAYER ──

/**
 * AccentIcon — Premium gradient-tinted container for high-importance moments.
 * Used sparingly: hero support, key how-it-works steps, flagship features.
 * 28-40px icon inside a gradient container.
 */
export function AccentIcon({
  icon: Icon,
  variant = "primary",
  size = "md",
  className,
}: IconProps & {
  variant?: "primary" | "secondary" | "mixed"
  size?: "sm" | "md" | "lg"
}) {
  const variants = {
    primary:
      "bg-gradient-to-br from-gradient-from/[0.15] to-brand-secondary/[0.06] dark:from-gradient-from/[0.3] dark:to-gradient-from/[0.12] border-brand-secondary/25 dark:border-brand-secondary/30 shadow-[0_6px_20px_rgba(0,120,170,0.12)] dark:shadow-[0_6px_20px_rgba(0,120,170,0.2)]",
    secondary:
      "bg-gradient-to-br from-brand-primary/[0.12] to-gradient-to/[0.05] dark:from-brand-primary/[0.25] dark:to-accent-violet/[0.1] border-brand-primary/20 dark:border-accent-violet/25 shadow-[0_6px_20px_rgba(124,58,237,0.1)] dark:shadow-[0_6px_20px_rgba(124,58,237,0.18)]",
    mixed:
      "bg-gradient-to-br from-gradient-from/[0.12] to-gradient-to/[0.08] dark:from-gradient-from/[0.25] dark:to-gradient-to/[0.15] border-accent-blue/20 dark:border-accent-violet/25 shadow-[0_6px_20px_rgba(79,70,229,0.1)] dark:shadow-[0_6px_20px_rgba(124,58,237,0.18)]",
  }

  const sizes = {
    sm: { container: "w-14 h-14 rounded-xl", icon: "w-7 h-7" },
    md: { container: "w-20 h-20 rounded-2xl", icon: "w-8 h-8 sm:w-10 sm:h-10" },
    lg: { container: "w-20 h-20 sm:w-24 sm:h-24 rounded-2xl", icon: "w-8 h-8 sm:w-10 sm:h-10" },
  }

  const iconColors = {
    primary: "text-brand-secondary dark:text-accent-cyan",
    secondary: "text-brand-primary dark:text-accent-violet",
    mixed: "text-accent-blue dark:text-accent-violet",
  }

  const s = sizes[size]

  return (
    <div
      className={cn(
        s.container,
        "flex items-center justify-center border",
        "hover:scale-105 transition-all duration-500",
        variants[variant],
        className
      )}
    >
      <Icon
        className={cn(s.icon, iconColors[variant])}
        strokeWidth={1.5}
      />
    </div>
  )
}

/**
 * HighlightFeatureIcon — Accent icon with numbered badge overlay.
 * Used for "how it works" steps and other premium numbered sequences.
 */
export function HighlightFeatureIcon({
  icon: Icon,
  stepNumber,
  variant = "primary",
  size = "lg",
  badgeColor,
  className,
}: IconProps & {
  stepNumber: number | string
  variant?: "primary" | "secondary" | "mixed"
  size?: "sm" | "md" | "lg"
  badgeColor?: string
}) {
  const defaultBadgeColors = {
    primary: "bg-brand-secondary",
    secondary: "bg-brand-primary",
    mixed: "bg-gradient-to-r from-gradient-from to-gradient-to",
  }

  return (
    <div className={cn("relative", className)}>
      <AccentIcon icon={Icon} variant={variant} size={size} />
      <div
        className={cn(
          "absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md",
          badgeColor || defaultBadgeColors[variant]
        )}
      >
        <span className="text-[11px] font-bold text-white">{stepNumber}</span>
      </div>
    </div>
  )
}
