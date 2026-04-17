import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageWrapperProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  showBreadcrumbs?: boolean
}

export function PageWrapper({
  children,
  breadcrumbs = [],
  showBreadcrumbs = true,
}: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full opacity-30 dark:opacity-100 transition-opacity duration-500">
          <Aurora
            colorStops={["#475569", "#64748b", "#475569"]}
            amplitude={1.2}
            blend={0.6}
            speed={0.8}
          />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />

          {showBreadcrumbs && breadcrumbs.length > 0 && (
            <div className="pt-24 md:pt-28 px-4">
              <div className="max-w-6xl mx-auto">
                <Breadcrumb>
                  <BreadcrumbList className="text-foreground/60">
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/" className="hover:text-foreground/90 transition-colors">
                          Inicio
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {breadcrumbs.map((item, index) => (
                      <BreadcrumbItem key={index}>
                        <BreadcrumbSeparator className="text-foreground/40" />
                        {item.href ? (
                          <BreadcrumbLink asChild>
                            <Link href={item.href} className="hover:text-foreground/90 transition-colors">
                              {item.label}
                            </Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-foreground/90">
                            {item.label}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          )}

          {children}
          <Footer />
        </div>
      </main>
    </div>
  )
}
