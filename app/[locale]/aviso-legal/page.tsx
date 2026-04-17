import type { Metadata } from "next"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { buildPageMetadata } from "@/lib/wordpress"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata("aviso-legal", locale, {
    title: "Aviso Legal",
    description: "Aviso legal e informacion sobre el titular del sitio web staffdigital.ai conforme a la LSSI-CE.",
  })
}

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
      </div>
      <GlassmorphismNav />
      <div className="relative z-10 pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-6 sm:px-8 prose prose-invert prose-sm">
          <h1 className="text-3xl font-bold mb-2">Aviso Legal</h1>
          <p className="text-muted-foreground text-sm mb-8">Ultima actualizacion: 24 de marzo de 2026</p>

          <h2>1. Datos Identificativos (LSSI-CE, Art. 10)</h2>
          <p>En cumplimiento del articulo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informacion y de Comercio Electronico (LSSI-CE), se informa:</p>
          <ul>
            <li><strong>Titular:</strong> Web Design VIP Unipessoal Lda. (comercialmente &quot;StaffDigital AI&quot;)</li>
            <li><strong>NIF:</strong> PT516917029</li>
            <li><strong>Domicilio operativo:</strong> Carrer d&apos;Arago, 308, 1o 2a, 08009 Barcelona, Espana</li>
            <li><strong>Sede fiscal:</strong> Av. Afonso Costa 22 B, Lisbon Business Center, 1900-036 Lisboa, Portugal</li>
            <li><strong>Email:</strong> info@staffdigital.ai</li>
            <li><strong>Telefono:</strong> +34 931 229 129</li>
            <li><strong>Sitio web:</strong> https://www.staffdigital.ai</li>
            <li><strong>Actividad:</strong> Prestacion de servicios de automatizacion con inteligencia artificial para empresas</li>
          </ul>

          <h2>2. Objeto</h2>
          <p>El presente aviso legal regula el uso del sitio web www.staffdigital.ai (en adelante, &quot;el Sitio Web&quot;), del que es titular Web Design VIP Unipessoal Lda.</p>
          <p>La navegacion por el Sitio Web atribuye la condicion de usuario e implica la aceptacion plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal, la Politica de Privacidad y la Politica de Cookies.</p>

          <h2>3. Propiedad Intelectual e Industrial</h2>
          <p>Todos los contenidos del Sitio Web — incluyendo textos, fotografias, graficos, imagenes, iconos, tecnologia, software, enlaces, diseno grafico, codigo fuente y demas contenidos audiovisuales o sonoros — son propiedad intelectual de StaffDigital AI o de terceros que han autorizado su uso, y estan protegidos por la legislacion nacional e internacional sobre propiedad intelectual e industrial.</p>
          <p>Queda prohibida su reproduccion, distribucion, comunicacion publica, transformacion o cualquier otra actividad sin autorizacion expresa y por escrito del titular.</p>
          <p>Las marcas &quot;StaffDigital&quot;, &quot;StaffDigital AI&quot; y el logotipo asociado son marcas registradas.</p>

          <h2>4. Condiciones de Uso</h2>
          <p>El usuario se compromete a:</p>
          <ul>
            <li>Hacer un uso adecuado y licito del Sitio Web, conforme a la legislacion vigente y al presente Aviso Legal.</li>
            <li>No realizar actividades ilicitas, ilegales o contrarias a la buena fe y al orden publico.</li>
            <li>No provocar danos en los sistemas fisicos y logicos del Sitio Web, de sus proveedores o de terceros.</li>
            <li>No introducir ni difundir virus informaticos o cualquier otro sistema que sea susceptible de causar danos.</li>
            <li>No intentar acceder, utilizar o manipular los datos del titular, terceros proveedores u otros usuarios.</li>
          </ul>

          <h2>5. Exclusion de Responsabilidad</h2>
          <p>StaffDigital AI no se hace responsable de:</p>
          <ul>
            <li>La informacion publicada en el Sitio Web cuando haya sido manipulada o introducida por un tercero ajeno.</li>
            <li>Los danos o perjuicios derivados de la imposibilidad de acceso al Sitio Web o de errores en su contenido.</li>
            <li>Los contenidos y servicios de sitios web de terceros a los que se pueda acceder a traves de enlaces.</li>
            <li>Los resultados obtenidos mediante el uso de las soluciones de IA, que tienen caracter asistencial y no sustituyen el criterio profesional humano.</li>
          </ul>

          <h2>6. Uso de Inteligencia Artificial</h2>
          <p>Este sitio web utiliza tecnologias de inteligencia artificial generativa en sus servicios y productos. En cumplimiento del Reglamento Europeo de IA (AI Act, Reglamento UE 2024/1689):</p>
          <ul>
            <li>Los sistemas de IA empleados se clasifican como de &quot;riesgo limitado&quot; conforme a la normativa vigente.</li>
            <li>Se informa al usuario cuando interactua con un sistema de IA (chatbot, agente de voz).</li>
            <li>El contenido generado por IA se identifica como tal cuando sea aplicable.</li>
            <li>No se realizan evaluaciones de riesgo social (social scoring) ni vigilancia biometrica.</li>
          </ul>

          <h2>7. Enlaces a Terceros</h2>
          <p>El Sitio Web puede contener enlaces a sitios web de terceros. StaffDigital AI no asume ninguna responsabilidad por el contenido, politicas de privacidad o practicas de sitios web de terceros.</p>

          <h2>8. Legislacion Aplicable y Jurisdiccion</h2>
          <p>Este Aviso Legal se rige por la legislacion espanola. Para la resolucion de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Barcelona (Espana), salvo que la ley imponga otro fuero.</p>
          <p>Para consumidores y usuarios, seran competentes los juzgados del domicilio del consumidor conforme a la legislacion vigente.</p>
          <p>Puedes acceder a la plataforma de resolucion de litigios en linea de la UE en: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary">https://ec.europa.eu/consumers/odr</a></p>
        </article>
      </div>
      <Footer />
    </main>
  )
}
