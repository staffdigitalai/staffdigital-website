# Project workflow rules

Rules agreed with the team. Must be followed by any agent (human or AI) contributing to this repository.

## Git workflow — MANDATORY

**🚫 No direct commits to `main`. Ever.**

Every change — even one-line refactors, typo fixes, copy tweaks — goes through a Pull Request. No exceptions.

### Workflow for any change

```bash
# 1. Always branch from latest main
git checkout main
git pull origin main
git checkout -b <type>/<short-description>

# 2. Make changes, commit (pre-commit hook enforces lint:colors)
# Note: .husky/pre-commit blocks commits with hardcoded colors

# 3. Push and open PR via gh CLI
git push -u origin <branch>
gh pr create --title "<type>: <description>" --body-file <body.md> --base main

# 4. Wait for Vercel preview + review. Merge via:
gh pr merge <pr-number> --squash --delete-branch
```

### Branch naming

- `feat/<name>` — new features
- `fix/<name>` — bug fixes
- `refactor/<name>` — code changes without behavior change
- `chore/<name>` — tooling, config, docs
- `design/<name>` — visual/UI-only changes

### PR body template

```markdown
## Summary
[What + why in 1-2 sentences]

## Changes
- [bullet of change 1]
- [bullet of change 2]

## Verification
- [ ] `npm run build` → 0 errors
- [ ] `npm run lint:colors` → PASS
- [ ] Tested in both light + dark mode
- [ ] Tested at mobile (375px) breakpoint

## Preview
🔗 [Vercel preview URL]

## Screenshots (for visual changes)
[Light + Dark mode, desktop + mobile where applicable]
```

## Design system — MANDATORY

- **Semantic tokens only** — no hex-arbitrary (`bg-[#0078AA]`) or raw palette (`bg-white`, `text-gray-500`)
- Reference: `app/globals.css` — all available tokens defined under `:root` and `.dark`
- Available via Tailwind utilities: `bg-brand-primary`, `text-fg-muted`, `border-default`, `from-gradient-from`, etc.
- Pre-commit hook blocks commits that re-introduce hex-arbitrary colors

### If you need a color that doesn't exist as a token

1. **First**: verify no existing token fits (check `app/globals.css`)
2. If genuinely new: add it as a CSS custom property in `:root` AND `.dark`
3. Expose via `@theme inline` block
4. Only then use the new class in your component

## Accessibility — MANDATORY

- **Respect `prefers-reduced-motion`**. Use `useReducedMotion()` hook from Framer Motion.
  - Anti-pattern: `<motion.div initial={{ opacity: 0 }}>` without reduced-motion check → elements stay invisible for users who prefer less motion
  - Correct pattern: use `useMotionReveal()` from `components/sector/use-motion-reveal.ts` or equivalent helper
- Semantic HTML: `<section aria-labelledby="...">`, `<main>`, `<article>` where appropriate
- Icons that are decorative: `aria-hidden="true"`
- Interactive elements: meaningful `aria-label` (not just "button")
- Forms: every input must have `<label>` or `aria-label`

## i18n — MANDATORY

- 3 locales supported: ES (default, no URL prefix), EN (`/en/`), PT (`/pt/`)
- **Every user-facing string must come from i18n via `t('key')`. Never hardcode copy in components** — not in JSX, not in `aria-label`, not in `alt`, not in button text.
- **When modifying an existing string, update ALL 3 locale files (`es.json`, `en.json`, `pt.json`) in the same commit.** A PR that touches only one locale for a live key will ship a mistranslation.
- Next-intl config: `onError: 'warn'` + `getMessageFallback` prevents crash on missing keys
- When adding a new key, add to ALL 3 locale files or the fallback renders `namespace.key` visibly

## Deployment / Vercel

- Preview deploys are **password-protected**. Use bypass token from `.env.local` (`VERCEL_AUTOMATION_BYPASS_SECRET`)
- Header: `x-vercel-protection-bypass: <token>` OR query: `?x-vercel-protection-bypass=<token>&x-vercel-set-bypass-cookie=true`
- Production auto-deploys from `main` (after PR merge)
- Preview URL available 2–3 min after push via `gh api repos/.../commits/<sha>/status`

## Screenshot protocol for PRs

When a PR changes anything visual:

| # | View | Theme | Viewport |
|---|---|---|---|
| 1 | Homepage `/` | Light | 1440×900 |
| 2 | Homepage `/` | Dark | 1440×900 |
| 3 | Homepage `/` | Dark | 375×812 (mobile) |
| 4 | Affected page | Light | 1440×900 |
| 5 | Affected page | Dark | 1440×900 |
| 6 | Affected page | Dark | 375×812 |
| 7 | Footer zoom | Dark | 1440×900 |

Attach screenshots directly in PR body (not as external links).

## WordPress integration

- CMS: `cms.staffdigital.ai` (WordPress with WPML + Yoast + ACF)
- SEO: `generateMetadata` in each `page.tsx` calls `buildPageMetadata(slug, locale, fallback)` from `lib/wordpress.ts`
- ACF with fallbacks: sector/service pages have fallback content in `lib/sector-fallback-content.ts` — when WP dev populates ACF, template auto-switches
- Revalidation: `/api/revalidate?secret=<secret>` triggered on WP publish (webhook configured on WP side)

## Forbidden practices

- ❌ `git push --force` or `--force-with-lease` to `main`
- ❌ `gh pr merge --admin` without passing required checks
- ❌ Hex-arbitrary colors in component classes
- ❌ Hardcoded user-facing strings (must go through i18n)
- ❌ `initial={{ opacity: 0 }}` without reduced-motion handling
- ❌ Creating new "Hero", "Card", "FAQ" variants without checking existing ones first
- ❌ Modifying locked files: `messages/es.json` is the source of truth for translation keys structure; `lib/sector-fallback-content.ts` may not be modified in scope-restricted PRs
