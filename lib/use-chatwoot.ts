"use client"

import { useState } from "react"

type FormType = "consulta" | "presupuesto" | "demo"

interface ConsultaFormData {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  mensaje: string
}

interface PresupuestoFormData {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  servicio: string
  presupuesto?: string
  descripcion?: string
}

interface DemoFormData {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  producto: string
  fecha?: string
}

type FormData = ConsultaFormData | PresupuestoFormData | DemoFormData

interface UseChatwootReturn {
  submit: (formType: FormType, formData: FormData) => Promise<void>
  isLoading: boolean
  error: string | null
  success: boolean
  reset: () => void
}

export function useChatwoot(): UseChatwootReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (formType: FormType, formData: FormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/chatwoot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formType, formData }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el formulario")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return { submit, isLoading, error, success, reset }
}
