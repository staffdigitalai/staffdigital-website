import createMiddleware from "next-intl/middleware"
import { type NextRequest } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)
  // Pass the current pathname so layout can build self-referential canonicals
  response.headers.set("x-pathname", request.nextUrl.pathname)
  return response
}

export const config = {
  // Match all pathnames except API routes, static files, and internal paths
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
