import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

// Secret token to prevent unauthorized revalidation
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "staffdigital-revalidate-2026"

export async function POST(request: NextRequest) {
  // Verify secret
  const secret = request.headers.get("x-revalidate-secret")
    ?? request.nextUrl.searchParams.get("secret")

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }

  try {
    // Revalidate all locales of all pages
    revalidatePath("/", "layout")

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(error) },
      { status: 500 },
    )
  }
}

// Also support GET for simple webhook testing
export async function GET(request: NextRequest) {
  return POST(request)
}
