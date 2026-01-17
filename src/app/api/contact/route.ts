import { NextRequest, NextResponse } from 'next/server'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'

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
                { success: false, message: 'Geçerli bir telefon numarası giriniz.' },
                { status: 400 }
            )
        }

        // Save to Firestore
        const docRef = await addDoc(collection(db, 'visacontact'), {
            first_name,
            last_name,
            email,
            phone,
            subject,
            message,
            recaptcha_token,
            createdAt: serverTimestamp(),
            status: 'new' // Yeni mesaj durumu
        })

        console.log('✅ Contact form saved with ID:', docRef.id)

        return NextResponse.json({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
            id: docRef.id
        })

    } catch (error: any) {
        console.error('❌ Contact form error:', error)
        return NextResponse.json(
            { 
                success: false, 
                message: 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        )
    }
}