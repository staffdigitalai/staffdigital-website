"use client"

interface StaffDigitalLogoProps {
  variant?: "icon" | "full" | "horizontal"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizes = {
  sm: { icon: 32, text: 20, gap: 8 },
  md: { icon: 40, text: 24, gap: 10 },
  lg: { icon: 52, text: 30, gap: 12 },
  xl: { icon: 68, text: 40, gap: 14 },
}

function LogoIcon({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer hexagonal frame */}
      <path
        d="M24 2L43.0526 12.5V33.5L24 44L4.94744 33.5V12.5L24 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.3"
      />

      {/* Inner S-shaped neural pathway */}
      <path
        d="M16 16C16 16 20 13 26 13C32 13 34 16 34 19C34 22 30 24 24 24C18 24 14 26 14 29C14 32 16 35 22 35C28 35 32 32 32 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Neural nodes */}
      <circle cx="26" cy="13" r="2.5" fill="currentColor" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
      <circle cx="22" cy="35" r="2.5" fill="currentColor" />

      {/* Connection dots - outer ring */}
      <circle cx="34" cy="19" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="14" cy="29" r="1.5" fill="currentColor" opacity="0.6" />

      {/* Pulse ring on center node */}
      <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="0.75" opacity="0.2">
        <animate
          attributeName="r"
          values="3;7;3"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

function LogoText({ fontSize = 24, className }: { fontSize?: number; className?: string }) {
  return (
    <span
      className={`font-sans font-extrabold tracking-tight leading-none ${className ?? ""}`}
      style={{ fontSize, letterSpacing: "-0.02em" }}
    >
      <span className="text-foreground">Staff</span>
      <span className="text-foreground/80">Digital</span>
      <span
        className="font-black"
        style={{
          fontSize: fontSize * 1.05,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa, #818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        .AI
      </span>
    </span>
  )
}

export function StaffDigitalLogo({
  variant = "full",
  size = "md",
  className,
}: StaffDigitalLogoProps) {
  const s = sizes[size]

  if (variant === "icon") {
    return <LogoIcon size={s.icon} className={className} />
  }

  return (
    <div className={`flex items-center text-foreground ${className ?? ""}`} style={{ gap: s.gap }}>
      <LogoIcon size={s.icon} />
      <LogoText fontSize={s.text} />
    </div>
  )
}

/* Dark background variant for footer and other dark sections */
export function StaffDigitalLogoDark({
  variant = "full",
  size = "md",
  className,
}: StaffDigitalLogoProps) {
  const s = sizes[size]

  if (variant === "icon") {
    return (
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M24 2L43.0526 12.5V33.5L24 44L4.94744 33.5V12.5L24 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.2"
        />
        <path
          d="M16 16C16 16 20 13 26 13C32 13 34 16 34 19C34 22 30 24 24 24C18 24 14 26 14 29C14 32 16 35 22 35C28 35 32 32 32 32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="13" r="2.5" fill="currentColor" />
        <circle cx="24" cy="24" r="2.5" fill="currentColor" />
        <circle cx="22" cy="35" r="2.5" fill="currentColor" />
        <circle cx="34" cy="19" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="14" cy="29" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    )
  }

  return (
    <div className={`flex items-center ${className ?? ""}`} style={{ gap: s.gap }}>
      <StaffDigitalLogoDark variant="icon" size={size} />
      <span
        className="font-sans font-extrabold tracking-tight leading-none"
        style={{ fontSize: s.text, letterSpacing: "-0.02em" }}
      >
        <span className="text-foreground">Staff</span>
        <span className="text-foreground/70">Digital</span>
        <span
          className="font-black"
          style={{
            fontSize: s.text * 1.05,
            background: "linear-gradient(135deg, #3b82f6, #7c3aed, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          .AI
        </span>
      </span>
    </div>
  )
}
