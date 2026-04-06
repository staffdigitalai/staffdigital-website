import type React from "react"
import { Suspense } from "react"
import { getLocale } from "next-intl/server"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { ChatwootWidget } from "@/components/chatwoot-widget"
import { FormModalProvider } from "@/components/contact-form-modals"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="Uw0vYKoZylDM8S2GioiNZbwGdoWYgeywihU5jNrgnvc" />
        {/* Cookiebot domain verification */}
        <meta name="cookiebot-domain-verify" content="53835036-9914-4249-a422-05644e8eb2c8" />
        {/* Cookiebot CMP — deferred, loads after initial paint */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="53835036-9914-4249-a422-05644e8eb2c8"
          data-blockingmode="auto"
          defer
        />
        {/* GTM — deferred until after first paint for better LCP */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('load',function(){setTimeout(function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MDB34SRP');},1500)});`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDB34SRP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "StaffDigital AI",
              url: "https://www.staffdigital.ai",
              logo: "https://www.staffdigital.ai/logo.png",
              description:
                "Agentes IA con voz humana para empresas. Atención telefónica, WhatsApp, chat web y consultoría de seguridad IA.",
              telephone: "+34931229129",
              email: "info@staffdigital.ai",
              foundingDate: "2024",
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                minValue: 10,
                maxValue: 50,
              },
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "Carrer d'Aragó, 308, 1o 2a",
                  addressLocality: "Barcelona",
                  addressRegion: "Catalonia",
                  postalCode: "08009",
                  addressCountry: "ES",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "Av. Afonso Costa 22 B, Lisbon Business Center",
                  addressLocality: "Lisboa",
                  postalCode: "1900-036",
                  addressCountry: "PT",
                },
              ],
              sameAs: [
                "https://www.linkedin.com/company/staffdigitalai",
                "https://www.instagram.com/staffdigitalai",
                "https://www.facebook.com/staffdigitalai",
                "https://www.youtube.com/@staffdigitalai",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+34931229129",
                email: "info@staffdigital.ai",
                contactType: "sales",
                availableLanguage: ["Spanish", "Portuguese", "English"],
              },
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <FormModalProvider>
            <Suspense fallback={null}>
              <NavigationTransition />
              <PageTransition>{children}</PageTransition>
            </Suspense>
            <ChatwootWidget />
            <SpeedInsights />
          </FormModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
