"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

/**
 * Required-by-default RGPD consent checkbox.
 *
 * All contact/demo forms on the site need an explicit opt-in checkbox
 * (required, unticked by default) linking to `/privacidad`. This is
 * the EU GDPR best practice — implicit consent via "by submitting you
 * accept" text is defensible but weaker.
 *
 * The parent form must:
 *  - keep a `useState<boolean>(false)` for the checked state
 *  - pass it to `checked` + `onChange`
 *  - disable its submit button while `!checked`
 *
 * The label links to the locale-aware `/privacidad` path (`/es/privacidad`
 * collapses to `/privacidad` per the next-intl `as-needed` config).
 */
export function ConsentCheckbox({
  checked,
  onChange,
  id = "form-consent",
}: {
  checked: boolean
  onChange: (next: boolean) => void
  id?: string
}) {
  const t = useTranslations("form_consent")
  const locale = useLocale()
  const privacyHref = locale === "es" ? "/privacidad" : `/${locale}/privacidad`

  return (
    <div className="flex items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 flex-shrink-0 rounded border border-default accent-brand-primary cursor-pointer"
        aria-describedby={`${id}-desc`}
      />
      <label
        htmlFor={id}
        id={`${id}-desc`}
        className="text-xs text-fg-muted leading-relaxed cursor-pointer select-none"
      >
        {t("label_prefix")}
        <Link href={privacyHref} className="underline hover:text-fg-primary">
          {t("label_link")}
        </Link>
        {t("label_suffix")}
      </label>
    </div>
  )
}
