import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// URL de la imagen del acta de matrimonio
const ACTA_IMAGE_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5f9f6ffc-306a-41aa-abf6-421418ea77c1.jpeg'

export async function POST() {
  try {
    const recipients = [
      'ricarlopez2708@gmail.com',
      'aixajimenart2929@gmail.com'
    ]

    const { data, error } = await resend.emails.send({
      from: 'Acta de Matrimonio <onboarding@resend.dev>',
      to: recipients,
      subject: 'Acta de Matrimonio - Renovacion de Votos - Ricardo y Aixa',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #fff5f8; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ff1493; font-size: 28px; margin-bottom: 10px;">Acta de Matrimonio</h1>
          <h2 style="color: #ff69b4; font-size: 20px; margin-top: 0;">Renovando Votos</h2>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Se ha firmado el acta de matrimonio entre <strong>Ricardo</strong> y <strong>Aixa</strong>.
          </p>
          <p style="color: #ff1493; font-size: 18px;">
            Con todo el amor del mundo, hoy 24 de Mayo del 2026.
          </p>
          <div style="margin: 30px 0;">
            <img src="${ACTA_IMAGE_URL}" alt="Acta de Matrimonio" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);" />
          </div>
          <p style="color: #ff69b4; font-size: 16px; font-style: italic;">
            Prometo amarte y cuidarte siempre mi reina hermosa, te amo con toda mi alma
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error al enviar el correo' },
      { status: 500 }
    )
  }
}
