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
  return buildPageMetadata("privacidad", locale, {
    title: "Politica de Privacidad",
    description: "Politica de privacidad de StaffDigital AI. Informacion sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.",
  })
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let page = null
  try {
    page = await getPage("privacidad", toWpmlLang(locale))
  } catch (error) {
    console.error("Error fetching privacidad page:", error)
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
                dangerouslySetInnerHTML={{ __html: page.title?.rendered ?? "Politica de Privacidad" }}
              />
              <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
            </>
          ) : (
            <PrivacidadFallbackEs />
          )}
        </article>
      </div>
      <Footer />
    </main>
  )
}

function PrivacidadFallbackEs() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Politica de Privacidad</h1>
      <p className="text-muted-foreground text-sm mb-8">Ultima actualizacion: 24 de marzo de 2026</p>

          <h2>1. Responsable del Tratamiento</h2>
          <ul>
            <li><strong>Razon social:</strong> StaffDigital AI (Web Design VIP Unipessoal Lda.)</li>
            <li><strong>NIF:</strong> PT516917029</li>
            <li><strong>Domicilio:</strong> Carrer d&apos;Arago, 308, 1o 2a, 08009 Barcelona, Espana</li>
            <li><strong>Sede fiscal:</strong> Av. Afonso Costa 22 B, Lisbon Business Center, 1900-036 Lisboa, Portugal</li>
            <li><strong>Email:</strong> info@staffdigital.ai</li>
            <li><strong>Web:</strong> https://www.staffdigital.ai</li>
          </ul>

          <h2>2. Datos que Recopilamos</h2>
          <p>Recopilamos datos personales cuando:</p>
          <ul>
            <li><strong>Rellenas un formulario:</strong> nombre, apellidos, email, telefono, empresa, sector y mensaje.</li>
            <li><strong>Usas el chat:</strong> datos proporcionados durante la conversacion con nuestro asistente (Chatwoot).</li>
            <li><strong>Realizas una llamada:</strong> numero de telefono, grabacion y transcripcion de la llamada con nuestro agente de voz IA (ElevenLabs).</li>
            <li><strong>Navegas por el sitio:</strong> datos tecnicos (IP, navegador, dispositivo) mediante cookies analiticas (Google Analytics/GTM).</li>
          </ul>

          <h2>3. Finalidad del Tratamiento</h2>
          <table>
            <thead>
              <tr><th>Finalidad</th><th>Base Legal (RGPD)</th></tr>
            </thead>
            <tbody>
              <tr><td>Responder a consultas y solicitudes</td><td>Art. 6.1.b — Ejecucion precontractual</td></tr>
              <tr><td>Enviar presupuestos y propuestas</td><td>Art. 6.1.b — Ejecucion precontractual</td></tr>
              <tr><td>Gestionar demos solicitadas</td><td>Art. 6.1.b — Ejecucion precontractual</td></tr>
              <tr><td>Mejorar nuestros servicios</td><td>Art. 6.1.f — Interes legitimo</td></tr>
              <tr><td>Analisis web y estadisticas</td><td>Art. 6.1.a — Consentimiento (cookies)</td></tr>
              <tr><td>Grabacion de llamadas IA</td><td>Art. 6.1.a — Consentimiento informado previo</td></tr>
            </tbody>
          </table>

          <h2>4. Destinatarios de los Datos</h2>
          <p>Tus datos pueden ser comunicados a los siguientes encargados del tratamiento:</p>
          <table>
            <thead>
              <tr><th>Proveedor</th><th>Proposito</th><th>Ubicacion</th></tr>
            </thead>
            <tbody>
              <tr><td>Vercel Inc.</td><td>Alojamiento web</td><td>EE.UU. (DPF)</td></tr>
              <tr><td>Cloudflare Inc.</td><td>CDN y seguridad</td><td>EE.UU. (DPF)</td></tr>
              <tr><td>Google LLC</td><td>Analitica (GA4/GTM), Google Workspace</td><td>EE.UU. (DPF)</td></tr>
              <tr><td>Resend Inc.</td><td>Envio de emails transaccionales</td><td>EE.UU. (DPF)</td></tr>
              <tr><td>ElevenLabs Inc.</td><td>Agentes de voz IA, transcripcion</td><td>EE.UU. (DPF)</td></tr>
              <tr><td>Anthropic PBC</td><td>Motor IA conversacional</td><td>EE.UU. (DPF)</td></tr>
              <tr><td>Chatwoot (self-hosted)</td><td>Chat en vivo y CRM</td><td>UE (OVH, Francia)</td></tr>
              <tr><td>OVH SAS</td><td>Servidor dedicado</td><td>UE (Francia)</td></tr>
              <tr><td>Telnyx LLC</td><td>Telefonia SIP</td><td>EE.UU. (DPF)</td></tr>
            </tbody>
          </table>
          <p>Las transferencias internacionales a EE.UU. se amparan en el EU-US Data Privacy Framework (DPF), decisiones de adecuacion de la Comision Europea, o clausulas contractuales tipo (SCC).</p>

          <h2>5. Plazo de Conservacion</h2>
          <ul>
            <li><strong>Formularios y consultas:</strong> 2 anos desde la ultima comunicacion.</li>
            <li><strong>Datos contractuales:</strong> duracion del contrato + 5 anos (obligacion fiscal).</li>
            <li><strong>Grabaciones de llamadas IA:</strong> 90 dias, salvo consentimiento expreso para mas tiempo.</li>
            <li><strong>Cookies analiticas:</strong> segun la politica de cada proveedor (max. 26 meses para GA4).</li>
          </ul>

          <h2>6. Derechos del Interesado</h2>
          <p>Conforme al RGPD (arts. 15-22) y la LOPDGDD, puedes ejercer:</p>
          <ul>
            <li><strong>Acceso:</strong> obtener confirmacion y copia de tus datos.</li>
            <li><strong>Rectificacion:</strong> corregir datos inexactos.</li>
            <li><strong>Supresion:</strong> solicitar la eliminacion de tus datos.</li>
            <li><strong>Oposicion:</strong> oponerte al tratamiento basado en interes legitimo.</li>
            <li><strong>Limitacion:</strong> restringir el tratamiento en determinados supuestos.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
          </ul>
          <p>Para ejercerlos, escribenos a <strong>info@staffdigital.ai</strong> indicando tu nombre y el derecho que deseas ejercer. Responderemos en un plazo maximo de 30 dias.</p>
          <p>Puedes presentar una reclamacion ante la <strong>Agencia Espanola de Proteccion de Datos (AEPD)</strong> — <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary">www.aepd.es</a> — o ante la <strong>Comissao Nacional de Proteccao de Dados (CNPD)</strong> en Portugal.</p>

          <h2>7. Inteligencia Artificial y Decisiones Automatizadas</h2>
          <p>Conforme al Reglamento Europeo de Inteligencia Artificial (AI Act, Reglamento UE 2024/1689), informamos que:</p>
          <ul>
            <li>Nuestros agentes de voz y chatbots utilizan modelos de IA generativa para interactuar con los usuarios.</li>
            <li>Al inicio de cada interaccion, se informa al usuario de que esta hablando con un sistema de IA.</li>
            <li>No se toman decisiones automatizadas con efectos juridicos sin intervencion humana.</li>
            <li>Las llamadas telefonicas con IA son grabadas y transcritas, previo aviso al inicio de la llamada.</li>
            <li>Puedes solicitar intervencion humana en cualquier momento durante la interaccion.</li>
          </ul>

          <h2>8. Seguridad</h2>
          <p>Aplicamos medidas tecnicas y organizativas adecuadas: cifrado TLS/SSL, acceso restringido, servidores en la UE, copias de seguridad, monitorizacion y auditorias periodicas.</p>

          <h2>9. Modificaciones</h2>
          <p>Nos reservamos el derecho de actualizar esta politica. La fecha de ultima actualizacion se indica al inicio del documento. Te recomendamos revisarla periodicamente.</p>
    </>
  )
}
