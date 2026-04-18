"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Locale } from "@/i18n/config"

/**
 * Map of locale → URL slug for the current content.
 *
 * A locale key being missing / undefined signals that no translation exists
 * for that locale (e.g. a blog post only published in ES). Consumers can use
 * this to degrade gracefully to a listing URL instead of 404'ing.
 */
export type LocaleSlugMap = Partial<Record<Locale, string>>

export interface LocalizedSlugsState {
  /** Per-locale slug map for the current page. `null` = no localized content on this page. */
  slugs: LocaleSlugMap | null
  /** Route prefix under which the slug lives (e.g. "/blog", "/sectores", "/soluciones"). */
  basePath: string | null
}

interface LocalizedSlugsContextValue extends LocalizedSlugsState {
  /** Page components call this to register their WPML slug map. */
  register: (state: LocalizedSlugsState) => void
  /** Called on unmount to clear stale data when navigating away. */
  clear: () => void
}

const LocalizedSlugsContext = createContext<LocalizedSlugsContextValue | null>(
  null,
)

/**
 * Wraps the whole locale layout. Lives above the nav and every page so the
 * language switcher in the nav can read per-page slug maps that the active
 * page registers during render.
 */
export function LocalizedSlugsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<LocalizedSlugsState>({
    slugs: null,
    basePath: null,
  })

  const register = useCallback((next: LocalizedSlugsState) => {
    setState(next)
  }, [])

  const clear = useCallback(() => {
    setState({ slugs: null, basePath: null })
  }, [])

  const value = useMemo<LocalizedSlugsContextValue>(
    () => ({ ...state, register, clear }),
    [state, register, clear],
  )

  return (
    <LocalizedSlugsContext.Provider value={value}>
      {children}
    </LocalizedSlugsContext.Provider>
  )
}

/**
 * Read-only hook for consumers that need to resolve a locale → URL
 * (e.g. the language switcher in the nav).
 */
export function useLocalizedSlugs(): LocalizedSlugsState {
  const ctx = useContext(LocalizedSlugsContext)
  return ctx
    ? { slugs: ctx.slugs, basePath: ctx.basePath }
    : { slugs: null, basePath: null }
}

/**
 * Page-level registrar. Rendered anywhere inside a server page — pushes the
 * WPML slug map into context on mount, clears on unmount. Renders nothing.
 *
 *   <LocalizedSlugs
 *     basePath="/blog"
 *     slugs={{ es: post.slug, en: post.wpml_translations?.en?.slug, pt: post.wpml_translations?.['pt-pt']?.slug }}
 *   />
 */
export function LocalizedSlugs({
  slugs,
  basePath,
}: {
  slugs: LocaleSlugMap
  basePath: string
}) {
  const ctx = useContext(LocalizedSlugsContext)

  // Stable serialization so we only re-register when the actual map changes.
  const slugsKey = JSON.stringify(slugs)

  useEffect(() => {
    if (!ctx) return
    ctx.register({ slugs, basePath })
    return () => {
      ctx.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugsKey, basePath, ctx?.register, ctx?.clear])

  return null
}
