import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    // Fetch the image from the public folder
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    const imageResponse = await fetch(`${baseUrl}/images/acta-matrimonio.jpeg`)
    const imageBuffer = await imageResponse.arrayBuffer()
    
    const recipients = [
      'ricarlopez2708@gmail.com',
      'aixajimenart2929@gmail.com'
    ]

    const { data, error } = await resend.emails.send({
      from: 'Acta de Matrimonio <onboarding@resend.dev>',
      to: recipients,
      subject: 'Acta de Matrimonio - Renovacion de Votos',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #fff5f8;">
          <h1 style="color: #ff1493; font-size: 28px;">Acta de Matrimonio</h1>
          <h2 style="color: #ff69b4; font-size: 20px;">Renovando Votos</h2>
          <p style="color: #333; font-size: 16px; margin: 20px 0;">
            Se ha firmado el acta de matrimonio entre <strong>Ricardo</strong> y <strong>Aixa</strong>.
          </p>
          <p style="color: #ff1493; font-size: 18px;">
            Con todo el amor del mundo, hoy 24 de Mayo del 2026.
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Adjunto encontraras el acta oficial.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'acta-de-matrimonio.jpeg',
          content: Buffer.from(imageBuffer),
        },
      ],
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
