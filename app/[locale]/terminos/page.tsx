import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { buildPageMetadata, getPage, toWpmlLang } from "@/lib/wordpress"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("terminos", locale, {
    title: "Terminos y Condiciones",
    description: "Terminos y condiciones de uso de los servicios de StaffDigital AI.",
  })
}

export default async function TerminosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("terminos", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching terminos page:", error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
      </div>
      <GlassmorphismNav />
      <div className="relative z-10 pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-6 sm:px-8 prose prose-invert prose-sm">
          {page?.content?.rendered ? (
            <>
              <h1
                className="text-3xl font-bold mb-6"
                dangerouslySetInnerHTML={{ __html: page.title?.rendered ?? "Terminos y Condiciones" }}
              />
              <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
            </>
          ) : (
            <TerminosFallbackEs />
          )}
        </article>
      </div>
      <Footer />
    </main>
  )
}

function TerminosFallbackEs() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Terminos y Condiciones</h1>
      <p className="text-muted-foreground text-sm mb-8">Ultima actualizacion: 24 de marzo de 2026</p>

          <h2>1. Objeto</h2>
          <p>Los presentes Terminos y Condiciones regulan el acceso y uso del sitio web www.staffdigital.ai, asi como la contratacion de los servicios de automatizacion con inteligencia artificial ofrecidos por Web Design VIP Unipessoal Lda. (en adelante, &quot;StaffDigital AI&quot;).</p>

          <h2>2. Servicios</h2>
          <p>StaffDigital AI ofrece los siguientes servicios:</p>
          <ul>
            <li><strong>Chatbots y asistentes IA:</strong> automatizacion de atencion al cliente por chat (web, WhatsApp, redes sociales).</li>
            <li><strong>Agentes de voz IA:</strong> atencion telefonica automatizada con voz natural.</li>
            <li><strong>Automatizacion omnicanal:</strong> integracion y automatizacion de flujos de trabajo entre canales.</li>
            <li><strong>Seguridad IA:</strong> videovigilancia inteligente con deteccion de eventos.</li>
            <li><strong>Consultoria IA:</strong> analisis, estrategia e implementacion de soluciones de IA.</li>
          </ul>

          <h2>3. Proceso de Contratacion</h2>
          <ol>
            <li><strong>Solicitud:</strong> El cliente solicita informacion o una demo a traves de los formularios del sitio web o por telefono.</li>
            <li><strong>Propuesta:</strong> StaffDigital AI elabora una propuesta personalizada con alcance, precios y plazos.</li>
            <li><strong>Aceptacion:</strong> El contrato se formaliza con la aceptacion por escrito de la propuesta.</li>
            <li><strong>Implementacion:</strong> Se configura y despliega la solucion segun la metodologia acordada.</li>
            <li><strong>Soporte:</strong> Se proporciona soporte tecnico y mantenimiento segun el plan contratado.</li>
          </ol>

          <h2>4. Precios y Pagos</h2>
          <ul>
            <li>Los precios se indican en euros (EUR), impuestos no incluidos salvo que se indique lo contrario.</li>
            <li>El pago se realiza segun las condiciones especificadas en cada propuesta comercial.</li>
            <li>Los planes de suscripcion se facturan de forma mensual o anual, segun lo contratado.</li>
            <li>El impago puede conllevar la suspension temporal del servicio, previo aviso de 15 dias.</li>
          </ul>

          <h2>5. Nivel de Servicio (SLA)</h2>
          <ul>
            <li><strong>Disponibilidad objetivo:</strong> 99,5% mensual para los servicios en la nube.</li>
            <li><strong>Soporte:</strong> segun el plan contratado (horario laboral, 12h o 24/7).</li>
            <li><strong>Tiempo de respuesta:</strong> Critico: 1h / Alto: 4h / Normal: 24h laborables.</li>
            <li>Las interrupciones programadas se notificaran con 48 horas de antelacion.</li>
          </ul>

          <h2>6. Inteligencia Artificial — Limitaciones</h2>
          <ul>
            <li>Los sistemas de IA son herramientas de asistencia y no sustituyen el criterio profesional humano.</li>
            <li>Los resultados generados por IA pueden contener errores. El cliente es responsable de la revision y validacion final.</li>
            <li>StaffDigital AI no garantiza la precision al 100% de las respuestas generadas por modelos de lenguaje.</li>
            <li>Las grabaciones y transcripciones de llamadas IA se tratan conforme a la Politica de Privacidad.</li>
            <li>El cliente es responsable del uso etico y legal de las soluciones de IA contratadas.</li>
          </ul>

          <h2>7. Propiedad Intelectual</h2>
          <ul>
            <li>Los desarrollos, configuraciones y flujos de trabajo creados por StaffDigital AI para el cliente son propiedad del cliente una vez pagados en su totalidad.</li>
            <li>Las herramientas, frameworks y metodologias propias de StaffDigital AI permanecen como propiedad del titular.</li>
            <li>Los datos del cliente son propiedad exclusiva del cliente en todo momento.</li>
          </ul>

          <h2>8. Confidencialidad</h2>
          <p>Ambas partes se comprometen a mantener la confidencialidad de la informacion intercambiada durante la prestacion del servicio. Esta obligacion se mantiene durante 2 anos despues de la finalizacion de la relacion comercial.</p>

          <h2>9. Resolucion del Contrato</h2>
          <ul>
            <li>Cualquiera de las partes puede resolver el contrato con un preaviso de 30 dias.</li>
            <li>En caso de incumplimiento grave, la parte afectada puede resolver el contrato de forma inmediata.</li>
            <li>Tras la resolucion, StaffDigital AI facilitara la exportacion de los datos del cliente en un plazo de 30 dias.</li>
          </ul>

          <h2>10. Limitacion de Responsabilidad</h2>
          <p>La responsabilidad total de StaffDigital AI frente al cliente no excedera el importe total facturado en los 12 meses anteriores al hecho causante. Se excluyen los danos indirectos, lucro cesante o perdida de datos, salvo dolo o negligencia grave.</p>

          <h2>11. Legislacion Aplicable</h2>
          <p>Estos Terminos se rigen por la legislacion espanola. Para la resolucion de controversias, las partes se someten a los Juzgados y Tribunales de Barcelona (Espana), sin perjuicio del fuero que corresponda al consumidor conforme a la normativa vigente.</p>
          <p>Plataforma de resolucion de litigios en linea: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary">https://ec.europa.eu/consumers/odr</a></p>

          <h2>12. Contacto</h2>
          <p>Para cualquier consulta sobre estos Terminos:</p>
          <ul>
            <li><strong>Email:</strong> info@staffdigital.ai</li>
            <li><strong>Telefono:</strong> +34 931 229 129</li>
            <li><strong>Direccion:</strong> Carrer d&apos;Arago, 308, 1o 2a, 08009 Barcelona</li>
          </ul>
    </>
  )
}
