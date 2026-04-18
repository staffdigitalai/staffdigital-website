"use client"

interface StaffDigitalLogoProps {
  variant?: "icon" | "full" | "horizontal"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

// ".AI" — solid brand-primary; keep glow/flow classes per spec.
function AnimatedAI({ className }: { className?: string }) {
  return (
    <span
      className={`font-extrabold text-brand-primary animate-gradient-flow animate-ai-glow ${className ?? ""}`}
      style={{ letterSpacing: "-0.02em" }}
    >
      .AI
    </span>
  )
}

export function StaffDigitalLogo({
  variant = "full",
  className,
}: StaffDigitalLogoProps) {
  // For "icon" variant, just show "S" with gradient
  if (variant === "icon") {
    return (
      <span
        className={`font-extrabold text-xl sm:text-2xl animate-gradient-flow animate-ai-glow ${className ?? ""}`}
        style={{
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
        className="font-extrabold text-xl sm:text-2xl text-slate-800 dark:text-slate-100"
        style={{ letterSpacing: "-0.02em" }}
      >
        StaffDigital
      </span>
      <AnimatedAI className="text-xl sm:text-2xl" />
    </div>
  )
}

/* Dark background variant for footer and other dark sections */
export function StaffDigitalLogoDark({
  variant = "full",
  className,
}: StaffDigitalLogoProps) {
  if (variant === "icon") {
    return (
      <span
        className={`font-extrabold text-xl sm:text-2xl animate-gradient-flow animate-ai-glow ${className ?? ""}`}
        style={{
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
        className="font-extrabold text-xl sm:text-2xl text-fg-primary"
        style={{ letterSpacing: "-0.02em" }}
      >
        StaffDigital
      </span>
      <AnimatedAI className="text-xl sm:text-2xl" />
    </div>
  )
}
