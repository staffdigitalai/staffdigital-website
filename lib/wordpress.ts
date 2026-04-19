// WordPress API Configuration
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.staffdigital.ai/wp-json/wp/v2';

// Types
export interface WPPost {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories: number[];
  content_types?: number[]; // Content type taxonomy (guia, comparativa, pregunta-seo)
  wpml_translations?: WPMLTranslations;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details: {
        sizes: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
  acf?: {
    meta_title?: string;
    meta_description?: string;
    reading_time?: number;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPSector {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Content Type taxonomy (guia, comparativa, pregunta-seo)
export interface WPContentType {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Service CPT with ACF fields
export interface WPService {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  menu_order: number;
  sectors?: number[]; // Sector taxonomy IDs
  wpml_translations?: WPMLTranslations;
  acf: {
    icono?: string;
    subtitulo?: string;
    // Stats bar
    stats_bar?: Array<{
      valor: string;
      etiqueta: string;
    }>;
    // Canales
    canales?: Array<{
      titulo: string;
      descripcion: string;
      icono: string;
      color: string;
    }>;
    // Features
    features?: Array<{
      titulo: string;
      descripcion: string;
      icono?: string;
    }>;
    // Beneficios
    beneficios?: Array<{
      texto: string;
    }>;
    // FAQ
    faq_titulo?: string;
    faq_items?: Array<{
      pregunta: string;
      respuesta: string;
    }>;
    // Testimonial
    testimonial_quote?: string;
    testimonial_nombre?: string;
    testimonial_cargo?: string;
    testimonial_empresa?: string;
    // Contextual relationships (populated by WP)
    sectores_contextuales?: Array<{
      sector_id: number;
      sector_slug: string;
      sector_nombre: string;
      sector_descripcion: string;
      sector_orden: number;
    }>;
    soluciones_contextuales?: Array<{
      solucion_id: number;
      solucion_slug: string;
      solucion_nombre: string;
      solucion_descripcion: string;
      solucion_imagen?: string; // Featured image URL from WP
      solucion_orden: number;
    }>;
    // Legacy fields
    caracteristicas?: Array<{
      titulo: string;
      descripcion: string;
    }>;
    casos_uso?: Array<{
      titulo: string;
      descripcion: string;
    }>;
    cta_texto?: string;
    cta_link?: string;
    es_destacado?: boolean;
    meta_title?: string;
    meta_description?: string;
  };
  // Yoast SEO
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{ url: string }>;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

// Sector Page CPT with ACF fields
export interface WPSectorPage {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  menu_order: number;
  wpml_translations?: WPMLTranslations;
  acf: {
    subtitulo?: string;
    icono?: string;
    problemas_sector?: Array<{
      problema: string;
      descripcion: string;
    }>;
    soluciones?: Array<{
      titulo: string;
      descripcion: string;
      icono?: string;
    }>;
    metricas?: Array<{
      valor: string;
      etiqueta: string;
      descripción?: string;
    }>;
    testimonios?: Array<{
      nombre: string;
      cargo: string;
      empresa: string;
      texto: string;
      imagen?: string;
    }>;
    servicios_relacionados?: number[]; // IDs of related services
    meta_title?: string;
    meta_description?: string;
    // ─── New ACF fields (for future data-driven template) ──
    // When WP dev populates these, the template uses them instead of
    // lib/sector-fallback-content.ts. All optional.
    sector_problemas?: Array<{
      titulo: string;
      descripcion: string;
      icono?: string;
    }>;
    sector_soluciones?: Array<{
      titulo: string;
      descripcion: string;
      metrica?: string;
      icono?: string;
    }>;
    sector_integraciones?: Array<{
      logo_url?: string;
      nombre: string;
      slug?: string;
    }>;
    sector_faq?: Array<{
      pregunta: string;
      respuesta: string;
    }>;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

// WordPress Page (for base pages like precios, nosotros, etc.)
export interface WPPage {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  parent: number;
  template: string;
  acf?: {
    subtitulo?: string;
    secciones?: Array<{
      tipo: string;
      titulo?: string;
      contenido?: string;
      items?: Array<{
        titulo: string;
        descripcion: string;
        icono?: string;
      }>;
    }>;
    // Pricing page specific
    planes?: Array<{
      nombre: string;
      precio: string;
      periodo?: string;
      descripcion: string;
      caracteristicas: string[];
      cta_texto: string;
      cta_link: string;
      destacado?: boolean;
    }>;
    meta_title?: string;
    meta_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPCaseStudy {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  sectors?: number[]; // Sector taxonomy IDs
  acf: {
    cliente?: string;
    sector?: string;
    resultado_principal?: string;
    resultado?: string;
    testimonio?: string;
    metricas?: Array<{
      valor: string;
      etiqueta: string;
    }>;
    servicios_utilizados?: number[];
    meta_title?: string;
    meta_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPFaq {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    pregunta?: string;
    respuesta?: string;
    sector?: string;
    orden?: number;
  };
}

export type SupportedLang = 'es' | 'pt-pt' | 'en';

// WPML exposes translation relationships on every translatable post/CPT.
// Keys are WPML locale codes: 'es' | 'en' | 'pt-pt'. Values are the
// corresponding post ID + slug in that language (may be absent).
export interface WPMLTranslations {
  es?: { id: number; slug: string; locale: 'es' };
  en?: { id: number; slug: string; locale: 'en' };
  'pt-pt'?: { id: number; slug: string; locale: 'pt-pt' };
}

/**
 * Build Next.js `alternates` metadata (canonical + hreflang `languages`)
 * for a CPT entry whose slug may differ across locales (WPML).
 *
 * Without this, `app/[locale]/layout.tsx` falls back to a naive prefix
 * swap (`/pagePath` → `/en/pagePath`) — which 404s for any translated
 * WPML slug and breaks hreflang for SEO crawlers.
 *
 * @param currentLocale Next.js locale for the current page: 'es' | 'en' | 'pt'
 * @param currentSlug   Slug in the current locale
 * @param basePath      Route prefix, e.g. "/blog", "/sectores", "/soluciones"
 * @param translations  `wpml_translations` from the WP response (optional)
 */
export function buildLocalizedAlternates(
  currentLocale: string,
  currentSlug: string,
  basePath: '/blog' | '/sectores' | '/soluciones',
  translations: WPMLTranslations | undefined,
): { canonical: string; languages: Record<string, string> } {
  // Resolve a slug per Next-locale, preferring the WPML translation and
  // falling back to the current slug when no translation exists (graceful
  // degrade — still a valid-shape URL for the crawler to follow).
  const slugFor = (locale: 'es' | 'en' | 'pt'): string | null => {
    if (locale === currentLocale) return currentSlug
    const wpmlKey = locale === 'pt' ? 'pt-pt' : locale
    const translated = translations?.[wpmlKey as keyof WPMLTranslations]?.slug
    return translated ?? null
  }

  const urlFor = (locale: 'es' | 'en' | 'pt'): string | null => {
    const slug = slugFor(locale)
    if (!slug) return null
    const prefix = locale === 'es' ? '' : `/${locale}`
    return `${prefix}${basePath}/${slug}`
  }

  const languages: Record<string, string> = {}
  const es = urlFor('es')
  const en = urlFor('en')
  const pt = urlFor('pt')
  if (es) languages.es = es
  if (en) languages.en = en
  if (pt) languages.pt = pt
  // x-default → ES master (standard WPML convention)
  if (es) languages['x-default'] = es

  const prefix = currentLocale === 'es' ? '' : `/${currentLocale}`
  const canonical = `${prefix}${basePath}/${currentSlug}`

  return { canonical, languages }
}

// Utility to build query string
function buildQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

// Fetch wrapper with error handling, timeout, and retry
async function wpFetch<T>(endpoint: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const queryString = buildQueryString(params);
  const url = `${WP_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        next: { revalidate: 300 }, // ISR: cache for 5 minutes
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText} for ${url}`);
      }

      return response.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        // Wait 1s before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError!;
}

// Get total pages from response headers (with retry)
async function wpFetchWithPagination<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {}
): Promise<{ data: T; totalPages: number; total: number }> {
  const queryString = buildQueryString(params);
  const url = `${WP_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        next: { revalidate: 300 },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText} for ${url}`);
      }

      const data = await response.json();
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
      const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);

      return { data, totalPages, total };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError!;
}

// Posts
export async function getPosts(options: {
  lang?: SupportedLang;
  category?: number;
  page?: number;
  perPage?: number;
  search?: string;
} = {}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  const { lang = 'es', category, page = 1, perPage = 9, search } = options;
  
  const { data, totalPages, total } = await wpFetchWithPagination<WPPost[]>('/posts', {
    lang,
    categories: category,
    page,
    per_page: perPage,
    search,
    _embed: 1,
  });

  return { posts: data, totalPages, total };
}

export async function getPost(slug: string, lang: SupportedLang = 'es'): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>('/posts', {
    slug,
    lang,
    _embed: 1,
  });

  return posts[0] || null;
}

/**
 * Related posts: same category, excluding the current post, ordered by date.
 * Used by `/blog/[slug]` to render up to 3 recommendations at the bottom.
 */
export async function getRelatedPosts(options: {
  categoryId?: number;
  excludeId: number;
  lang?: SupportedLang;
  perPage?: number;
} = { excludeId: 0 }): Promise<WPPost[]> {
  const { categoryId, excludeId, lang = 'es', perPage = 3 } = options;
  try {
    return await wpFetch<WPPost[]>('/posts', {
      lang,
      categories: categoryId,
      exclude: excludeId || undefined,
      per_page: perPage,
      orderby: 'date',
      order: 'desc',
      _embed: 1,
    });
  } catch {
    return [];
  }
}

// Categories
export async function getCategories(lang: SupportedLang = 'es'): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>('/categories', {
    lang,
    per_page: 100,
    hide_empty: 1,
  });
}

// Sectors
export async function getSectors(): Promise<WPSector[]> {
  return wpFetch<WPSector[]>('/sectors', {
    per_page: 100,
  });
}

// Get sectors by IDs (for service pages)
export async function getSectorsByIds(ids: number[]): Promise<WPSector[]> {
  if (!ids || ids.length === 0) return [];
  return wpFetch<WPSector[]>('/sectors', {
    include: ids.join(','),
    per_page: 100,
  });
}

// Case Studies
export async function getCaseStudies(options: {
  lang?: SupportedLang;
  sector?: number;
  page?: number;
  perPage?: number;
} = {}): Promise<{ caseStudies: WPCaseStudy[]; totalPages: number; total: number }> {
  const { lang = 'es', sector, page = 1, perPage = 9 } = options;
  
  const { data, totalPages, total } = await wpFetchWithPagination<WPCaseStudy[]>('/case-studies', {
    lang,
    sector,
    page,
    per_page: perPage,
    _embed: 1,
  });

  return { caseStudies: data, totalPages, total };
}

export async function getCaseStudy(slug: string, lang: SupportedLang = 'es'): Promise<WPCaseStudy | null> {
  const caseStudies = await wpFetch<WPCaseStudy[]>('/case-studies', {
    slug,
    lang,
    _embed: 1,
  });

  return caseStudies[0] || null;
}

// FAQs
export async function getFaqs(lang: SupportedLang = 'es'): Promise<WPFaq[]> {
  return wpFetch<WPFaq[]>('/faqs', {
    lang,
    per_page: 100,
  });
}

// Group FAQs by sector
export async function getFaqsGroupedBySector(lang: SupportedLang = 'es'): Promise<Map<string, WPFaq[]>> {
  const faqs = await getFaqs(lang);
  const grouped = new Map<string, WPFaq[]>();

  faqs.forEach((faq) => {
    const sector = faq.acf?.sector || 'General';
    if (!grouped.has(sector)) {
      grouped.set(sector, []);
    }
    grouped.get(sector)!.push(faq);
  });

  return grouped;
}

// Helper to get featured image URL
export function getFeaturedImageUrl(post: WPPost | WPCaseStudy, size: 'medium' | 'large' | 'full' = 'large'): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  
  if ('media_details' in media && media.media_details?.sizes) {
    return media.media_details.sizes[size]?.source_url || media.source_url;
  }
  
  return media.source_url;
}

// Helper to strip HTML from excerpt
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Helper to format date
export function formatDate(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============================================
// SERVICES
// ============================================

export async function getServices(options: {
  lang?: SupportedLang;
  perPage?: number;
} = {}): Promise<WPService[]> {
  const { lang = 'es', perPage = 100 } = options;
  
  return wpFetch<WPService[]>('/services', {
    lang,
    per_page: perPage,
    orderby: 'date',
    order: 'desc',
    _embed: 1,
  });
}

export async function getService(slug: string, lang: SupportedLang = 'es'): Promise<WPService | null> {
  const services = await wpFetch<WPService[]>('/services', {
    slug,
    lang,
    _embed: 1,
  });

  return services[0] || null;
}

// Get a map of service ID → featured image URL for all services
// Used by solution pages to display real images from WP instead of hardcoded local files
export async function getServiceImagesMap(): Promise<Record<number, string>> {
  const services = await getServices({ perPage: 50 });
  const imageMap: Record<number, string> = {};
  
  for (const service of services) {
    const imageUrl = service._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    if (imageUrl) {
      imageMap[service.id] = imageUrl;
    }
  }
  
  return imageMap;
}

// ============================================
// SECTOR PAGES
// ============================================

export async function getSectorPages(options: {
  lang?: SupportedLang;
  perPage?: number;
} = {}): Promise<WPSectorPage[]> {
  const { lang = 'es', perPage = 100 } = options;
  
  return wpFetch<WPSectorPage[]>('/sector-pages', {
    lang,
    per_page: perPage,
    orderby: 'menu_order',
    order: 'asc',
    _embed: 1,
  });
}

export async function getSectorPage(slug: string, lang: SupportedLang = 'es'): Promise<WPSectorPage | null> {
  const sectorPages = await wpFetch<WPSectorPage[]>('/sector-pages', {
    slug,
    lang,
    _embed: 1,
  });

  return sectorPages[0] || null;
}

// ============================================
// WORDPRESS PAGES (for precios, nosotros, etc.)
// ============================================

export async function getPage(slug: string, lang: SupportedLang = 'es'): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>('/pages', {
    slug,
    lang,
    _embed: 1,
  });

  return pages[0] || null;
}

export async function getPages(options: {
  lang?: SupportedLang;
  parent?: number;
  perPage?: number;
} = {}): Promise<WPPage[]> {
  const { lang = 'es', parent, perPage = 100 } = options;
  
  return wpFetch<WPPage[]>('/pages', {
    lang,
    parent,
    per_page: perPage,
    _embed: 1,
  });
}

// ============================================
// CONTENT TYPES TAXONOMY (for blog filtering)
// ============================================

export async function getContentTypes(lang: SupportedLang = 'es'): Promise<WPContentType[]> {
  return wpFetch<WPContentType[]>('/content-types', {
    lang,
    per_page: 100,
    hide_empty: 1,
  });
}

// Get posts filtered by content type
export async function getPostsByContentType(options: {
  contentType?: string; // slug: guia, comparativa, pregunta-seo
  lang?: SupportedLang;
  page?: number;
  perPage?: number;
  search?: string;
} = {}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  const { contentType, lang = 'es', page = 1, perPage = 9, search } = options;
  
  // First get the content type ID if slug provided
  let contentTypeId: number | undefined;
  if (contentType) {
    const contentTypes = await getContentTypes(lang);
    const found = contentTypes.find(ct => ct.slug === contentType);
    contentTypeId = found?.id;
  }
  
  const { data, totalPages, total } = await wpFetchWithPagination<WPPost[]>('/posts', {
    lang,
    'content-types': contentTypeId,
    page,
    per_page: perPage,
    search,
    _embed: 1,
  });

  return { posts: data, totalPages, total };
}

// Get SEO question posts (pregunta-seo content type)
export async function getSeoQuestionPosts(options: {
  lang?: SupportedLang;
  page?: number;
  perPage?: number;
} = {}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  return getPostsByContentType({
    ...options,
    contentType: 'pregunta-seo',
  });
}

// Get a single SEO question post by slug
export async function getSeoQuestionPost(slug: string, lang: SupportedLang = 'es'): Promise<WPPost | null> {
  // Get posts with pregunta-seo content type and matching slug
  const { posts } = await getPostsByContentType({
    contentType: 'pregunta-seo',
    lang,
    perPage: 100, // Get all to find by slug
  });
  
  return posts.find(p => p.slug === slug) || null;
}

// Get all SEO question slugs (for generateStaticParams)
export async function getAllSeoQuestionSlugs(lang: SupportedLang = 'es'): Promise<string[]> {
  const { posts } = await getSeoQuestionPosts({ lang, perPage: 100 });
  return posts.map(p => p.slug);
}

// ============================================
// HELPER FOR FEATURED IMAGES (extended)
// ============================================

export function getServiceFeaturedImageUrl(service: WPService): string | null {
  const media = service._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url || null;
}

export function getSectorPageFeaturedImageUrl(sectorPage: WPSectorPage): string | null {
  const media = sectorPage._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url || null;
}

export function getPageFeaturedImageUrl(page: WPPage): string | null {
  const media = page._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url || null;
}

// ─── Yoast SEO + WPML hreflang from WP pages ────────────────────
export interface YoastSEO {
  title?: string
  description?: string
  og_title?: string
  og_description?: string
  og_image?: Array<{ url: string; width: number; height: number }>
  canonical?: string
  robots?: Record<string, string>
  schema?: Record<string, unknown>
}

export interface WPMLHreflang {
  hreflang: string
  href: string
  lang?: string
}

export interface PageSEO {
  yoast: YoastSEO | null
  hreflang: WPMLHreflang[]
}

// WPML locale codes differ from our routing locales
const WPML_LOCALE_MAP: Record<string, string> = { es: "es", en: "en", pt: "pt-pt" }

/**
 * Build a Next.js Metadata object for any static page from WP Yoast data.
 * Falls back to provided defaults if Yoast isn't configured yet.
 *
 * @param slug - WP page slug (e.g. "precios", "tecnologia", "homepage")
 * @param locale - Current locale (es/en/pt)
 * @param fallback - Fallback title/description if Yoast unavailable
 */
export async function buildPageMetadata(
  slug: string,
  locale: string,
  fallback: { title: string; description: string },
): Promise<import("next").Metadata> {
  const { yoast, hreflang } = await getPageSEO(slug, locale)

  // Strip "| StaffDigital AI" suffix since layout adds it via template
  const cleanTitle = yoast?.title?.replace(/ \| StaffDigital AI$/i, "") ?? fallback.title
  const description = yoast?.description ?? fallback.description

  return {
    title: cleanTitle,
    description,
    openGraph: {
      title: yoast?.og_title?.replace(/ \| StaffDigital AI$/i, "") ?? cleanTitle,
      description: yoast?.og_description ?? description,
      images: yoast?.og_image?.map(i => ({ url: i.url, width: i.width, height: i.height })) ?? [],
      type: "website",
      siteName: "StaffDigital AI",
      locale: locale === "es" ? "es_ES" : locale === "pt" ? "pt_PT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: yoast?.og_title?.replace(/ \| StaffDigital AI$/i, "") ?? cleanTitle,
      description: yoast?.og_description ?? description,
    },
    alternates: {
      canonical: yoast?.canonical ?? `https://www.staffdigital.ai/${locale === "es" ? "" : locale + "/"}${slug === "homepage" ? "" : slug}`,
      languages: Object.fromEntries(
        hreflang
          .filter(h => h.hreflang !== "x-default")
          .map(h => [h.hreflang, h.href]),
      ),
    },
  }
}

export async function getPageSEO(slug: string, locale: string): Promise<PageSEO> {
  try {
    // 1. Fetch ES master page by slug (WPML master is always ES)
    const masterRes = await fetch(
      `${WP_API_URL}/pages?slug=${slug}`,
      { next: { revalidate: 3600 } },
    )
    if (!masterRes.ok) return { yoast: null, hreflang: [] }
    const masterPages = await masterRes.json()
    if (!masterPages.length) return { yoast: null, hreflang: [] }
    const master = masterPages[0]

    // 2. Find the translated page ID for the current locale
    let pageId = master.id
    if (locale !== "es") {
      const wpmlLocale = WPML_LOCALE_MAP[locale] ?? locale
      const translation = master.wpml_translations?.[wpmlLocale]
      if (translation) pageId = translation.id
    }

    // 3. Fetch the page in the correct language (by ID if different)
    const page = pageId !== master.id
      ? await fetch(`${WP_API_URL}/pages/${pageId}`, { next: { revalidate: 3600 } }).then(r => r.json())
      : master

    // 4. Normalize hreflang URLs (pt-pt → pt)
    const hreflang = (master.wpml_hreflang ?? []).map((h: WPMLHreflang) => ({
      ...h,
      href: h.href?.replace("/pt-pt/", "/pt/") ?? h.href,
    }))

    return {
      yoast: page.yoast_head_json ?? null,
      hreflang,
    }
  } catch {
    return { yoast: null, hreflang: [] }
  }
}
