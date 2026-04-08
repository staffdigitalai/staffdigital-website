"use client"

// Premium 3D Glassmorphism Icons - Stacked Diamond/Rhombus Style
// Inspired by the reference image with isometric perspective
// Brand colors: Cyan #0078AA → Violet #7C3AED → Pink #EC4899

// 4-point star sparkle component
function Sparkle({ x, y, size = 20 }: { x: number; y: number; size?: number }) {
  return (
    <g>
      {/* Main sparkle glow */}
      <ellipse 
        cx={x} cy={y} 
        rx={size * 0.8} ry={size * 0.8} 
        fill="white" 
        fillOpacity="0.3"
        filter="url(#sparkleBlur)"
      />
      {/* 4-point star */}
      <path
        d={`
          M ${x} ${y - size}
          Q ${x + size * 0.15} ${y - size * 0.15} ${x + size} ${y}
          Q ${x + size * 0.15} ${y + size * 0.15} ${x} ${y + size}
          Q ${x - size * 0.15} ${y + size * 0.15} ${x - size} ${y}
          Q ${x - size * 0.15} ${y - size * 0.15} ${x} ${y - size}
          Z
        `}
        fill="white"
        fillOpacity="0.95"
      />
      {/* Center bright point */}
      <circle cx={x} cy={y} r={size * 0.15} fill="white" />
    </g>
  )
}

// Shared SVG definitions
function GlassDefinitions({ id }: { id: string }) {
  return (
    <defs>
      {/* Outer glow filter */}
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feFlood floodColor="#0078AA" floodOpacity="0.4" />
        <feComposite in2="blur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      {/* Sparkle blur */}
      <filter id="sparkleBlur">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      
      {/* Noise/grain texture */}
      <filter id={`${id}-grain`} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="overlay" result="blend" />
        <feComposite in="blend" in2="SourceGraphic" operator="atop" />
      </filter>
      
      {/* Top layer - bright cyan */}
      <linearGradient id={`${id}-top`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A3E0" />
        <stop offset="50%" stopColor="#0078AA" />
        <stop offset="100%" stopColor="#0066CC" />
      </linearGradient>
      
      {/* Middle layer - cyan to violet transition */}
      <linearGradient id={`${id}-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
      </linearGradient>
      
      {/* Bottom layer - violet to pink */}
      <linearGradient id={`${id}-bottom`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      
      {/* Reflection/shine gradient */}
      <linearGradient id={`${id}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.6" />
        <stop offset="30%" stopColor="white" stopOpacity="0.2" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  )
}

// ═══════════════════════════════════════
// ICON 1 — CANALES (Stacked chat diamonds)
// ═══════════════════════════════════════
export function GlassIconChannels({ className = "" }: { className?: string }) {
  const id = "channels"
  return (
    <div className={`relative ${className}`} style={{ width: 100, height: 100 }}>
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,120,170,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
          transform: "scale(1.5)",
          filter: "blur(10px)"
        }}
      />
      <svg viewBox="0 0 100 100" fill="none" className="relative w-full h-full">
        <GlassDefinitions id={id} />
        
        {/* Bottom diamond - violet/pink */}
        <path 
          d="M50 75 L25 55 L50 35 L75 55 Z"
          fill={`url(#${id}-bottom)`}
          fillOpacity="0.85"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Middle diamond - transition */}
        <path 
          d="M50 60 L25 40 L50 20 L75 40 Z"
          fill={`url(#${id}-mid)`}
          fillOpacity="0.75"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Top diamond - bright cyan */}
        <path 
          d="M50 45 L25 25 L50 5 L75 25 Z"
          fill={`url(#${id}-top)`}
          fillOpacity="0.9"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Shine reflection on top diamond */}
        <path 
          d="M50 8 L30 22 L50 15 L65 20 Z"
          fill={`url(#${id}-shine)`}
        />
        
        {/* Chat bubble symbol on top */}
        <ellipse cx="50" cy="25" rx="10" ry="5" fill="white" fillOpacity="0.3" />
        
        {/* Sparkle */}
        <Sparkle x={30} y={12} size={10} />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════
// ICON 2 — IA (Stacked processor diamonds)
// ═══════════════════════════════════════
export function GlassIconAI({ className = "" }: { className?: string }) {
  const id = "ai"
  return (
    <div className={`relative ${className}`} style={{ width: 100, height: 100 }}>
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,120,170,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
          transform: "scale(1.5)",
          filter: "blur(10px)"
        }}
      />
      <svg viewBox="0 0 100 100" fill="none" className="relative w-full h-full">
        <GlassDefinitions id={id} />
        
        {/* Bottom diamond - violet/pink */}
        <path 
          d="M50 78 L22 53 L50 28 L78 53 Z"
          fill={`url(#${id}-bottom)`}
          fillOpacity="0.85"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Middle diamond - transition */}
        <path 
          d="M50 62 L22 37 L50 12 L78 37 Z"
          fill={`url(#${id}-mid)`}
          fillOpacity="0.75"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Top diamond - bright cyan */}
        <path 
          d="M50 46 L22 21 L50 -4 L78 21 Z"
          fill={`url(#${id}-top)`}
          fillOpacity="0.9"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Shine reflection on top diamond */}
        <path 
          d="M50 0 L28 18 L50 10 L68 16 Z"
          fill={`url(#${id}-shine)`}
        />
        
        {/* CPU/chip symbol - small diamond in center */}
        <path 
          d="M50 35 L42 27 L50 19 L58 27 Z"
          fill="white"
          fillOpacity="0.4"
        />
        <circle cx="50" cy="27" r="4" fill="white" fillOpacity="0.6" />
        
        {/* Circuit dots */}
        <circle cx="35" cy="27" r="2" fill="white" fillOpacity="0.5" />
        <circle cx="65" cy="27" r="2" fill="white" fillOpacity="0.5" />
        
        {/* Sparkle */}
        <Sparkle x={28} y={8} size={10} />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════
// ICON 3 — CITAS (Stacked calendar diamonds)
// ═══════════════════════════════════════
export function GlassIconCalendar({ className = "" }: { className?: string }) {
  const id = "calendar"
  return (
    <div className={`relative ${className}`} style={{ width: 100, height: 100 }}>
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,120,170,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
          transform: "scale(1.5)",
          filter: "blur(10px)"
        }}
      />
      <svg viewBox="0 0 100 100" fill="none" className="relative w-full h-full">
        <GlassDefinitions id={id} />
        
        {/* Bottom diamond - violet/pink */}
        <path 
          d="M50 78 L22 53 L50 28 L78 53 Z"
          fill={`url(#${id}-bottom)`}
          fillOpacity="0.85"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Middle diamond - transition */}
        <path 
          d="M50 62 L22 37 L50 12 L78 37 Z"
          fill={`url(#${id}-mid)`}
          fillOpacity="0.75"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Top diamond - bright cyan */}
        <path 
          d="M50 46 L22 21 L50 -4 L78 21 Z"
          fill={`url(#${id}-top)`}
          fillOpacity="0.9"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Shine reflection */}
        <path 
          d="M50 0 L28 18 L50 10 L68 16 Z"
          fill={`url(#${id}-shine)`}
        />
        
        {/* Calendar grid on top layer */}
        <line x1="40" y1="20" x2="60" y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="40" y1="26" x2="60" y2="26" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="40" y1="32" x2="60" y2="32" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
        
        {/* Check mark */}
        <path 
          d="M46 25 L49 28 L55 21"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Sparkle */}
        <Sparkle x={28} y={8} size={10} />
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════
// ICON 4 — DATOS (Stacked database diamonds)
// ═══════════════════════════════════════
export function GlassIconDatabase({ className = "" }: { className?: string }) {
  const id = "database"
  return (
    <div className={`relative ${className}`} style={{ width: 100, height: 100 }}>
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,120,170,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
          transform: "scale(1.5)",
          filter: "blur(10px)"
        }}
      />
      <svg viewBox="0 0 100 100" fill="none" className="relative w-full h-full">
        <GlassDefinitions id={id} />
        
        {/* Bottom diamond - violet/pink */}
        <path 
          d="M50 78 L22 53 L50 28 L78 53 Z"
          fill={`url(#${id}-bottom)`}
          fillOpacity="0.85"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Middle diamond - transition */}
        <path 
          d="M50 62 L22 37 L50 12 L78 37 Z"
          fill={`url(#${id}-mid)`}
          fillOpacity="0.75"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Top diamond - bright cyan */}
        <path 
          d="M50 46 L22 21 L50 -4 L78 21 Z"
          fill={`url(#${id}-top)`}
          fillOpacity="0.9"
          filter={`url(#${id}-grain)`}
        />
        
        {/* Shine reflection */}
        <path 
          d="M50 0 L28 18 L50 10 L68 16 Z"
          fill={`url(#${id}-shine)`}
        />
        
        {/* Database symbol - stacked ellipses */}
        <ellipse cx="50" cy="18" rx="12" ry="4" fill="white" fillOpacity="0.5" />
        <ellipse cx="50" cy="24" rx="12" ry="4" fill="white" fillOpacity="0.35" stroke="white" strokeOpacity="0.4" strokeWidth="0.5" />
        <ellipse cx="50" cy="30" rx="12" ry="4" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
        
        {/* Sparkle */}
        <Sparkle x={28} y={8} size={10} />
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
