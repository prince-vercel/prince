import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        
        const first_name = formData.get('first_name') as string
        const last_name = formData.get('last_name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const subject = formData.get('subject') as string
        const message = formData.get('message') as string
        const recaptcha_token = formData.get('recaptcha_token') as string

        // Validation
        if (!first_name || !last_name || !email || !phone || !message) {
            return NextResponse.json(
                { success: false, message: 'Lütfen tüm zorunlu alanları doldurunuz.' },
                { status: 400 }
            )
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailPattern.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Geçerli bir e-posta adresi giriniz.' },
                { status: 400 }
            )
        }

        // Phone validation
        const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '')
        const phonePattern = /^(\+90|90|0)?[1-9][0-9]{9}$/
        if (!phonePattern.test(cleanedPhone)) {
            return NextResponse.json(
                { success: false, message: 'Geçerli bir Türkiye telefon numarası giriniz.' },
                { status: 400 }
            )
        }

        // reCAPTCHA verification (optional - implement if needed)
        // For now, we'll just check if token exists
        if (!recaptcha_token) {
            return NextResponse.json(
                { success: false, message: 'Güvenlik doğrulaması başarısız.' },
                { status: 403 }
            )
        }

        // Here you would typically:
        // 1. Verify reCAPTCHA token with Google
        // 2. Send email using nodemailer or similar
        // 3. Save to database if needed

        // For now, we'll just return success
        // TODO: Implement actual email sending and reCAPTCHA verification
        
        console.log('Contact form submission:', {
            first_name,
            last_name,
            email,
            phone,
            subject,
            message,
            recaptcha_token: recaptcha_token.substring(0, 20) + '...'
        })

        return NextResponse.json({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
        })

    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' },
            { status: 500 }
        )
    }
}
