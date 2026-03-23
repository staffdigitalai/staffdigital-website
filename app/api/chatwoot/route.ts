import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const CHATWOOT_URL = "https://chat.staffdigital.eu"
const ACCOUNT_ID = "2"
const INBOX_ID = "2"
const API_TOKEN = process.env.CHATWOOT_API_TOKEN
const NOTIFICATION_EMAIL = "info@staffdigital.ai"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactPayload {
  name: string
  email: string
  phone_number?: string
  custom_attributes?: Record<string, string>
}

interface ConversationPayload {
  contact_id: number
  inbox_id: number
  message: {
    content: string
  }
  custom_attributes?: Record<string, string>
}

// Create a contact in Chatwoot
async function createContact(data: ContactPayload) {
  const response = await fetch(`${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api_access_token": API_TOKEN,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create contact: ${error}`)
  }

  return response.json()
}

// Create a conversation with a message
async function createConversation(data: ConversationPayload) {
  const response = await fetch(`${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api_access_token": API_TOKEN,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create conversation: ${error}`)
  }

  return response.json()
}

// Add labels to a conversation
async function addLabels(conversationId: number, labels: string[]) {
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${ACCOUNT_ID}/conversations/${conversationId}/labels`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_access_token": API_TOKEN,
      },
      body: JSON.stringify({ labels }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to add labels: ${error}`)
  }

  return response.json()
}

// Send email notification
async function sendEmailNotification(formType: string, formData: Record<string, string>, messageContent: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email notification")
    return
  }

  const subjectMap: Record<string, string> = {
    consulta: `Nueva consulta de ${formData.nombre || formData.name || "Web"}`,
    presupuesto: `Solicitud de presupuesto de ${formData.nombre || formData.name || "Web"}`,
    demo: `Solicitud de demo de ${formData.nombre || formData.name || "Web"}`,
  }

  const subject = subjectMap[formType] || `Nuevo formulario web de ${formData.nombre || "Web"}`

  try {
    await resend.emails.send({
      from: "StaffDigital AI <notificaciones@staffdigital.ai>",
      to: [NOTIFICATION_EMAIL],
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1B82F2, #0EA572); padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">StaffDigital AI</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Nuevo ${formType} desde la web</p>
          </div>
          <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef; border-radius: 0 0 12px 12px;">
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">${messageContent}</pre>
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;" />
            <p style="font-size: 12px; color: #6c757d; margin: 0;">
              Responde directamente a ${formData.email || "N/A"} o desde
              <a href="https://chat.staffdigital.eu" style="color: #1B82F2;">Chatwoot</a>.
            </p>
          </div>
        </div>
      `,
      replyTo: formData.email || undefined,
    })
  } catch (emailError) {
    // Log but don't fail the request — Chatwoot is the primary destination
    console.error("Email notification failed:", emailError)
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!API_TOKEN) {
      console.error("CHATWOOT_API_TOKEN is not set")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { formType, formData } = body

    if (!formType || !formData) {
      return NextResponse.json(
        { error: "Missing formType or formData" },
        { status: 400 }
      )
    }

    // 1. Create contact
    const contactResponse = await createContact({
      name: formData.nombre || formData.name,
      email: formData.email,
      phone_number: formData.telefono || formData.phone,
      custom_attributes: {
        empresa: formData.empresa || formData.company || "",
        source: "staffdigital.ai",
      },
    })

    const contactId = contactResponse.payload?.contact?.id

    if (!contactId) {
      throw new Error("Failed to get contact ID")
    }

    // 2. Create conversation based on form type
    let messageContent: string
    let labels: string[]
    let customAttributes: Record<string, string> = {
      form_type: formType,
      source: "staffdigital.ai",
    }

    switch (formType) {
      case "consulta":
        messageContent = `Nueva consulta desde staffdigital.ai

Nombre: ${formData.nombre || formData.name}
Email: ${formData.email}
Telefono: ${formData.telefono || formData.phone || "No proporcionado"}
Empresa: ${formData.empresa || formData.company || "No proporcionada"}
Mensaje: ${formData.mensaje || formData.message}`
        labels = ["consulta"]
        break

      case "presupuesto":
        messageContent = `Solicitud de presupuesto desde staffdigital.ai

Nombre: ${formData.nombre || formData.name}
Email: ${formData.email}
Telefono: ${formData.telefono || formData.phone || "No proporcionado"}
Empresa: ${formData.empresa || formData.company || "No proporcionada"}
Servicio: ${formData.servicio || formData.service || "No especificado"}
Presupuesto estimado: ${formData.presupuesto || formData.budget || "No especificado"}
Descripcion: ${formData.descripcion || formData.description || "Sin descripcion"}`
        labels = ["presupuesto"]
        customAttributes.servicio = formData.servicio || formData.service || ""
        break

      case "demo":
        messageContent = `Solicitud de demo desde staffdigital.ai

Nombre: ${formData.nombre || formData.name}
Email: ${formData.email}
Telefono: ${formData.telefono || formData.phone || "No proporcionado"}
Empresa: ${formData.empresa || formData.company || "No proporcionada"}
Producto: ${formData.producto || formData.product || "No especificado"}
Fecha preferida: ${formData.fecha || formData.date || "No especificada"}`
        labels = ["demo"]
        customAttributes.producto = formData.producto || formData.product || ""
        break

      default:
        messageContent = `Formulario desde staffdigital.ai

${JSON.stringify(formData, null, 2)}`
        labels = ["web"]
    }

    const conversationResponse = await createConversation({
      contact_id: contactId,
      inbox_id: parseInt(INBOX_ID),
      message: {
        content: messageContent,
      },
      custom_attributes: customAttributes,
    })

    // 3. Add labels
    if (conversationResponse.id) {
      await addLabels(conversationResponse.id, labels)
    }

    // 4. Send email notification (non-blocking — don't await)
    sendEmailNotification(formType, formData, messageContent)

    return NextResponse.json({
      success: true,
      contactId,
      conversationId: conversationResponse.id,
    })
  } catch (error) {
    console.error("Chatwoot API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
