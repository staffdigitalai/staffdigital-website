export function CSSAurora() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      {/* Base dark background only visible in dark mode */}
      <div className="absolute inset-0 bg-transparent dark:bg-[#050A14]" />

      {/* Blob 1 — Cyan/Teal, top-left, slow horizontal drift */}
      <div className="aurora-global-blob aurora-global-blob-1" />

      {/* Blob 2 — Purple/Violet, top-right, vertical drift */}
      <div className="aurora-global-blob aurora-global-blob-2" />

      {/* Blob 3 — Sky-blue, center, scale + gentle rotate */}
      <div className="aurora-global-blob aurora-global-blob-3" />

      {/* Blob 4 — Purple accent, bottom-right, diagonal drift */}
      <div className="aurora-global-blob aurora-global-blob-4" />

      {/* Overall pulse overlay — breathes the aurora opacity */}
      <div className="aurora-pulse-overlay" />
    </div>
  )
}
