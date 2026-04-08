"use client"

// Premium 3D Glassmorphism Icons for Done-For-You Section
// Brand colors: Cyan #0078AA, Violet #7C3AED

// Shared filter definitions for all icons
function GlassFilters() {
  return (
    <defs>
      {/* Main gradient cyan to violet */}
      <linearGradient id="glassGradientMain" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0078AA" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      
      {/* Lighter cyan for top layers */}
      <linearGradient id="glassGradientCyan" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0078AA" />
        <stop offset="100%" stopColor="#0078AA" stopOpacity="0.7" />
      </linearGradient>
      
      {/* Violet for back layers */}
      <linearGradient id="glassGradientViolet" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      
      {/* Mid transition */}
      <linearGradient id="glassGradientMid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0078AA" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
      </linearGradient>
      
      {/* Reflection gradient */}
      <linearGradient id="reflectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="50%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      
      {/* Grain texture filter */}
      <filter id="grainFilter" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feColorMatrix type="saturate" values="0" result="mono" />
        <feBlend in="SourceGraphic" in2="mono" mode="overlay" />
      </filter>
      
      {/* Blur for glass effect */}
      <filter id="glassBlur">
        <feGaussianBlur stdDeviation="1" />
      </filter>
      
      {/* Sparkle glow */}
      <filter id="sparkleGlow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  )
}

// Sparkle component for reflection effect
function Sparkle({ cx, cy, size = 6 }: { cx: number; cy: number; size?: number }) {
  return (
    <g filter="url(#sparkleGlow)">
      <circle cx={cx} cy={cy} r={size / 2} fill="white" fillOpacity="0.9" />
      <circle cx={cx} cy={cy} r={size / 4} fill="white" />
    </g>
  )
}

// ═══════════════════════════════════════
// ICON 1 — CANALES (Bandeja Omnicanal)
// ═══════════════════════════════════════
export function GlassIconChannels({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`relative w-20 h-20 ${className}`}
      style={{
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.3)) drop-shadow(0 0 40px rgba(124,58,237,0.2))"
      }}
    >
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <GlassFilters />
        
        {/* Back layer - violet chat bubble */}
        <path 
          d="M20 52 L20 32 Q20 24 28 24 L52 24 Q60 24 60 32 L60 44 Q60 52 52 52 L36 52 L28 60 L28 52 Z"
          fill="url(#glassGradientViolet)"
          fillOpacity="0.5"
          transform="translate(6, 6)"
        />
        
        {/* Mid layer - transition bubble */}
        <path 
          d="M16 48 L16 28 Q16 20 24 20 L48 20 Q56 20 56 28 L56 40 Q56 48 48 48 L32 48 L24 56 L24 48 Z"
          fill="url(#glassGradientMid)"
          fillOpacity="0.6"
          transform="translate(3, 3)"
        />
        
        {/* Front layer - cyan bubble with glass effect */}
        <path 
          d="M14 46 L14 26 Q14 18 22 18 L46 18 Q54 18 54 26 L54 38 Q54 46 46 46 L30 46 L22 54 L22 46 Z"
          fill="url(#glassGradientCyan)"
          fillOpacity="0.85"
        />
        
        {/* Glass reflection on front bubble */}
        <path 
          d="M16 28 Q16 22 22 20 L40 20 Q44 20 46 22"
          stroke="url(#reflectionGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Message lines inside */}
        <line x1="22" y1="28" x2="42" y2="28" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
        <line x1="22" y1="34" x2="36" y2="34" stroke="white" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
        
        {/* Sparkle */}
        <Sparkle cx={16} cy={20} size={7} />
        
        {/* Grain overlay */}
        <rect x="0" y="0" width="80" height="80" fill="white" fillOpacity="0.03" filter="url(#grainFilter)" />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════
// ICON 2 — IA (Agentes IA Autónomos)
// ═══════════════════════════════════════
export function GlassIconAI({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`relative w-20 h-20 ${className}`}
      style={{
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.3)) drop-shadow(0 0 40px rgba(124,58,237,0.2))"
      }}
    >
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <GlassFilters />
        
        {/* Back layer - chip base */}
        <rect 
          x="18" y="18" width="44" height="44" rx="10"
          fill="url(#glassGradientViolet)"
          fillOpacity="0.4"
          transform="translate(4, 4)"
        />
        
        {/* Mid layer */}
        <rect 
          x="16" y="16" width="44" height="44" rx="10"
          fill="url(#glassGradientMid)"
          fillOpacity="0.5"
          transform="translate(2, 2)"
        />
        
        {/* Front layer - main chip */}
        <rect 
          x="14" y="14" width="44" height="44" rx="10"
          fill="url(#glassGradientCyan)"
          fillOpacity="0.85"
        />
        
        {/* Inner circuit area */}
        <rect 
          x="22" y="22" width="28" height="28" rx="6"
          fill="url(#glassGradientMain)"
          fillOpacity="0.4"
        />
        
        {/* Circuit lines */}
        <line x1="36" y1="14" x2="36" y2="22" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="36" y1="50" x2="36" y2="58" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="14" y1="36" x2="22" y2="36" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="50" y1="36" x2="58" y2="36" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
        
        {/* Connection dots */}
        <circle cx="36" cy="14" r="2" fill="white" fillOpacity="0.7" />
        <circle cx="36" cy="58" r="2" fill="white" fillOpacity="0.7" />
        <circle cx="14" cy="36" r="2" fill="white" fillOpacity="0.7" />
        <circle cx="58" cy="36" r="2" fill="white" fillOpacity="0.7" />
        
        {/* Brain/AI symbol in center */}
        <circle cx="36" cy="36" r="8" fill="white" fillOpacity="0.3" />
        <circle cx="36" cy="36" r="4" fill="white" fillOpacity="0.6" />
        
        {/* Glass reflection */}
        <path 
          d="M18 24 Q18 18 24 16 L44 16"
          stroke="url(#reflectionGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Sparkle */}
        <Sparkle cx={18} cy={18} size={7} />
        
        {/* Grain overlay */}
        <rect x="0" y="0" width="80" height="80" fill="white" fillOpacity="0.03" filter="url(#grainFilter)" />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════
// ICON 3 — CITAS (Agenda Integrada)
// ═══════════════════════════════════════
export function GlassIconCalendar({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`relative w-20 h-20 ${className}`}
      style={{
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.3)) drop-shadow(0 0 40px rgba(124,58,237,0.2))"
      }}
    >
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <GlassFilters />
        
        {/* Back layer - calendar shadow */}
        <rect 
          x="14" y="16" width="44" height="48" rx="8"
          fill="url(#glassGradientViolet)"
          fillOpacity="0.4"
          transform="translate(6, 4)"
        />
        
        {/* Mid layer */}
        <rect 
          x="12" y="14" width="44" height="48" rx="8"
          fill="url(#glassGradientMid)"
          fillOpacity="0.5"
          transform="translate(3, 2)"
        />
        
        {/* Front layer - main calendar */}
        <rect 
          x="10" y="12" width="44" height="48" rx="8"
          fill="url(#glassGradientCyan)"
          fillOpacity="0.85"
        />
        
        {/* Calendar header bar */}
        <rect 
          x="10" y="12" width="44" height="14" rx="8"
          fill="url(#glassGradientMain)"
          fillOpacity="0.5"
        />
        <rect 
          x="10" y="20" width="44" height="6"
          fill="url(#glassGradientMain)"
          fillOpacity="0.5"
        />
        
        {/* Calendar rings */}
        <rect x="20" y="10" width="4" height="8" rx="2" fill="white" fillOpacity="0.7" />
        <rect x="40" y="10" width="4" height="8" rx="2" fill="white" fillOpacity="0.7" />
        
        {/* Grid lines (subtle) */}
        <line x1="10" y1="36" x2="54" y2="36" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="10" y1="48" x2="54" y2="48" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="25" y1="26" x2="25" y2="60" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="39" y1="26" x2="39" y2="60" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        
        {/* Check mark / selected day */}
        <circle cx="32" cy="42" r="8" fill="white" fillOpacity="0.3" />
        <path 
          d="M28 42 L31 45 L37 38"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Glass reflection */}
        <path 
          d="M14 20 Q14 14 20 14 L40 14"
          stroke="url(#reflectionGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Sparkle */}
        <Sparkle cx={14} cy={14} size={7} />
        
        {/* Grain overlay */}
        <rect x="0" y="0" width="80" height="80" fill="white" fillOpacity="0.03" filter="url(#grainFilter)" />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════
// ICON 4 — DATOS (CRM con IA)
// ═══════════════════════════════════════
export function GlassIconDatabase({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`relative w-20 h-20 ${className}`}
      style={{
        filter: "drop-shadow(0 0 20px rgba(0,120,170,0.3)) drop-shadow(0 0 40px rgba(124,58,237,0.2))"
      }}
    >
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <GlassFilters />
        
        {/* Bottom disk - violet */}
        <ellipse 
          cx="40" cy="56" rx="24" ry="10"
          fill="url(#glassGradientViolet)"
          fillOpacity="0.6"
        />
        <path 
          d="M16 56 L16 52 C16 58 28 64 40 64 C52 64 64 58 64 52 L64 56"
          fill="url(#glassGradientViolet)"
          fillOpacity="0.6"
        />
        
        {/* Middle disk - transition */}
        <ellipse 
          cx="40" cy="42" rx="24" ry="10"
          fill="url(#glassGradientMid)"
          fillOpacity="0.6"
        />
        <path 
          d="M16 42 L16 52 C16 46 28 52 40 52 C52 52 64 46 64 52 L64 42"
          fill="url(#glassGradientMid)"
          fillOpacity="0.5"
        />
        
        {/* Top disk - cyan with glass effect */}
        <ellipse 
          cx="40" cy="28" rx="24" ry="10"
          fill="url(#glassGradientCyan)"
          fillOpacity="0.85"
        />
        <path 
          d="M16 28 L16 42 C16 36 28 42 40 42 C52 42 64 36 64 42 L64 28"
          fill="url(#glassGradientCyan)"
          fillOpacity="0.7"
        />
        
        {/* Disk edge highlights */}
        <ellipse 
          cx="40" cy="28" rx="22" ry="8"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        
        {/* Glass reflection on top disk */}
        <path 
          d="M22 26 Q30 20 48 22"
          stroke="url(#reflectionGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Connection lines between disks */}
        <line x1="20" y1="32" x2="20" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="60" y1="32" x2="60" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        
        {/* Data dots on top disk */}
        <circle cx="32" cy="28" r="2" fill="white" fillOpacity="0.5" />
        <circle cx="40" cy="26" r="2" fill="white" fillOpacity="0.6" />
        <circle cx="48" cy="28" r="2" fill="white" fillOpacity="0.5" />
        
        {/* Sparkle */}
        <Sparkle cx={22} cy={22} size={7} />
        
        {/* Grain overlay */}
        <rect x="0" y="0" width="80" height="80" fill="white" fillOpacity="0.03" filter="url(#grainFilter)" />
      </svg>
    </div>
  )
}

// Export all icons as an array for easy iteration
export const glassStackIcons = [
  GlassIconChannels,  // Canales
  GlassIconAI,        // IA
  GlassIconCalendar,  // Citas
  GlassIconDatabase,  // Datos
]
