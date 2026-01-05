import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { to, subject, message, recipientName } = await request.json()

    if (!to || !subject || !message) {
      return Response.json({ error: 'Eksik parametreler' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    await transporter.sendMail({
      from: `"HappenCode Medical" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Prince'ten Cevap: ${subject}`,
      html: `
        <p>Merhaba <b>${recipientName}</b>,</p>
        <p>${message}</p>
      `
    })

    return Response.json({ success: true })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('Email hata:', errorMsg)
    return Response.json(
      { error: 'Email gönderilemedi', details: errorMsg },
      { status: 500 }
    )
  }
}
