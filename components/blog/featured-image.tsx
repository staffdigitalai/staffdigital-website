"use client"

import Image from "next/image"
import { stringHashIndex } from "./reading-time"

/**
 * Featured image for a blog post or card. When no `src` is provided
 * (the WP post has no `featured_media`), renders a semantic-token
 * gradient with the title overlay as a fallback — no grey placeholder.
 */
const GRADIENTS: [string, string][] = [
  ["from-brand-secondary/30",   "to-brand-primary/30"],
  ["from-accent-cyan/30",       "to-accent-violet/30"],
  ["from-brand-primary/30",     "to-accent-pink/30"],
  ["from-accent-blue/30",       "to-brand-secondary/30"],
  ["from-accent-violet/25",     "to-accent-cyan/25"],
  ["from-gradient-from/30",     "to-gradient-to/30"],
]

export function FeaturedImage({
  src,
  alt,
  title,
  priority = false,
  className = "",
  aspect = "aspect-[16/9]",
}: {
  src?: string | null
  alt: string
  title: string
  priority?: boolean
  className?: string
  aspect?: string
}) {
  if (src) {
    return (
      <div className={`relative w-full ${aspect} overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    )
  }

  // Fallback: deterministic gradient + the title as large low-opacity text.
  // Uses semantic color tokens so it auto-adapts to theme.
  const [fromCls, toCls] = GRADIENTS[stringHashIndex(title, GRADIENTS.length)]
  return (
    <div
      className={`relative w-full ${aspect} overflow-hidden bg-gradient-to-br ${fromCls} ${toCls} ${className}`}
    >
      <div className="absolute inset-0 flex items-end p-5">
        <span className="text-2xl sm:text-3xl font-bold text-fg-primary/30 dark:text-fg-primary/40 leading-tight line-clamp-4">
          {title}
        </span>
      </div>
    </div>
  )
}
