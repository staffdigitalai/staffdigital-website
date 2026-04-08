"use client"

interface StaffDigitalLogoProps {
  variant?: "icon" | "full" | "horizontal"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizes = {
  sm: { text: 18 },
  md: { text: 22 },
  lg: { text: 28 },
  xl: { text: 36 },
}

// Animated gradient text component for .AI
function AnimatedAI({ fontSize }: { fontSize: number }) {
  return (
    <span
      className="font-extrabold animate-gradient-flow"
      style={{
        fontSize,
        letterSpacing: "-0.02em",
        background: "linear-gradient(90deg, #0078AA, #7C3AED, #EC4899, #7C3AED, #0078AA)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      .AI
    </span>
  )
}

export function StaffDigitalLogo({
  variant = "full",
  size = "md",
  className,
}: StaffDigitalLogoProps) {
  const s = sizes[size]

  // For "icon" variant, just show "S" with gradient
  if (variant === "icon") {
    return (
      <span
        className={`font-extrabold animate-gradient-flow ${className ?? ""}`}
        style={{
          fontSize: s.text * 1.2,
          letterSpacing: "-0.02em",
          background: "linear-gradient(90deg, #0078AA, #7C3AED, #EC4899, #7C3AED, #0078AA)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        S
      </span>
    )
  }

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <span
        className="font-extrabold text-foreground"
        style={{ fontSize: s.text, letterSpacing: "-0.02em" }}
      >
        StaffDigital
      </span>
      <AnimatedAI fontSize={s.text} />
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
      <span
        className={`font-extrabold animate-gradient-flow ${className ?? ""}`}
        style={{
          fontSize: s.text * 1.2,
          letterSpacing: "-0.02em",
          background: "linear-gradient(90deg, #0078AA, #7C3AED, #EC4899, #7C3AED, #0078AA)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        S
      </span>
    )
  }

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <span
        className="font-extrabold text-foreground"
        style={{ fontSize: s.text, letterSpacing: "-0.02em" }}
      >
        StaffDigital
      </span>
      <AnimatedAI fontSize={s.text} />
    </div>
  )
}
