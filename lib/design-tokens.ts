/**
 * Design tokens for StaffDigital AI
 *
 * Single source of truth for brand colors, gradients, shadows and
 * spacing. Prefer these exports over hardcoding hex values inline.
 *
 * CSS variables (defined in app/globals.css) should be used in className
 * strings; JS constants here are for inline styles and dynamic usage.
 */

// ─── Brand Colors ────────────────────────────────────────────────
export const colors = {
  // Primary brand palette (matches CSS vars --neon-blue, --purple-dark, --lime-green)
  neonBlue: "#0078AA",
  neonBlueRgb: "0, 120, 170",
  neonBlueDark: "#00D4FF", // Dark mode variant
  purpleDark: "#7C3AED",
  purpleDarkRgb: "124, 58, 237",
  purpleLight: "#8B5CF6", // Dark mode variant
  limeGreen: "#16A34A",
  limeGreenRgb: "22, 163, 74",
  limeGreenBright: "#BFFF00", // Dark mode variant
} as const

// ─── Gradients ───────────────────────────────────────────────────
export const gradients = {
  /** Primary brand gradient: blue → purple (use on CTAs, headings) */
  brand: `linear-gradient(135deg, ${colors.neonBlue} 0%, ${colors.purpleDark} 100%)`,

  /** Animated shimmering gradient (use with backgroundSize 200% + animation) */
  brandShimmer: `linear-gradient(135deg, ${colors.neonBlue} 0%, ${colors.purpleDark} 50%, ${colors.neonBlue} 100%)`,

  /** Subtle tinted background (cards, hero backgrounds) */
  brandSubtle: `linear-gradient(135deg, rgba(${colors.neonBlueRgb}, 0.05) 0%, rgba(${colors.purpleDarkRgb}, 0.05) 100%)`,

  /** Radial glow for hero backgrounds */
  brandGlow: `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${colors.neonBlueRgb}, 0.25) 0%, rgba(${colors.purpleDarkRgb}, 0.15) 40%, transparent 70%)`,

  /** Horizontal gradient for progress bars */
  brandHorizontal: `linear-gradient(90deg, ${colors.neonBlue} 0%, ${colors.purpleDark} 100%)`,
} as const

// ─── Shadows (brand-tinted) ──────────────────────────────────────
export const shadows = {
  /** Soft brand glow — for hover states on primary CTAs */
  brandSoft: `0 4px 25px rgba(${colors.neonBlueRgb}, 0.15)`,

  /** Strong brand glow — for primary CTAs with presence */
  brandStrong: `0 4px 25px rgba(${colors.neonBlueRgb}, 0.3), 0 8px 40px rgba(${colors.purpleDarkRgb}, 0.2)`,

  /** Card elevation with brand tint */
  cardBrand: `0 0 18px rgba(${colors.neonBlueRgb}, 0.12)`,

  /** Indigo border glow (for demo/tour frames) */
  indigoFrame: `0 0 18px rgba(99, 102, 241, 0.12)`,
} as const

// ─── Tailwind class helpers ──────────────────────────────────────
/** Tailwind className for primary brand gradient text (use with bg-clip-text text-transparent) */
export const gradientTextClass = "bg-gradient-to-r from-[#0078AA] to-[#7C3AED] bg-clip-text text-transparent"

/** Tailwind className for primary CTA button */
export const primaryCtaClass = "bg-gradient-to-r from-[#0078AA] to-[#7C3AED] text-white hover:scale-105 transition-all"

// ─── Spacing scale (matches Tailwind defaults) ───────────────────
export const spacing = {
  sectionY: "py-20",
  sectionYLarge: "py-28",
  containerX: "px-4 sm:px-6",
  maxWidth: "max-w-6xl mx-auto",
  maxWidthNarrow: "max-w-4xl mx-auto",
} as const

// ─── Border radius scale ─────────────────────────────────────────
export const radius = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  pill: "rounded-full",
} as const

// ─── Animation durations ─────────────────────────────────────────
export const durations = {
  fast: "duration-200",
  normal: "duration-300",
  slow: "duration-500",
  slower: "duration-700",
} as const
