'use client'

import Header from '@/src/components/TravelComponents/Header'
import Footer from '@/src/components/TravelComponents/Footer'
import { useState } from 'react'
import Link from 'next/link'

const Form = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    phone: '',
    email: '',
    destination: '',
    date: '',
    duration: '',
    guests: '',
    transfer: '',
    requests: '',
    contact: '',
  })

  const progressPercent = Math.round(((step + 1) / 3) * 100)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>

      <ol className="breadcrumb2" style={{ color: 'black', marginLeft: '10%' }}>
        <li className="breadcrumb-item2">
          <Link href="/travel">Anasayfa</Link>
        </li>
        <li className="breadcrumb-item2"> Seyahatler</li>
      </ol>

      <div className="lg:p-25 p-25">
        <div className="container">

          {/* TITLE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-dark-1 tracking-tight">
              Mükemmel <span className="text-primary-1">Tatili</span> Planla
            </h1>
            <p className="text-base lg:text-lg text-dark-3 max-w-2xl mx-auto">
              Kişiselleştirilmiş seyahat deneyimi için hemen rezervasyon yapın!
            </p>
          </div>

        
          <div className="flex items-center justify-between pb-10 pt-10">
            <div className="flex items-center gap-3">
              <span className={`inline-flex justify-center items-center lg:h-10 lg:w-10 w-9 h-9 rounded-full transition-all
                ${step >= 0 ? 'bg-primary-1 text-white scale-105' : 'bg-stock-1 text-dark-3'}`}>
                01
              </span>
              <p className="text-sm lg:text-base">Misafir Bilgileri</p>
            </div>

            <div className={`flex-1 h-1 mx-6 ${step >= 1 ? 'bg-primary-1' : 'bg-gray-300'} transition-colors`} />

            <div className="flex items-center gap-3">
              <span className={`inline-flex justify-center items-center lg:h-10 lg:w-10 w-9 h-9 rounded-full transition-all
                ${step >= 1 ? 'bg-primary-1 text-white scale-105' : 'bg-stock-1 text-dark-3'}`}>
                02
              </span>
              <p className="text-sm lg:text-base">Seyahat Detayları</p>
            </div>

            <div className={`flex-1 h-1 mx-6 ${step >= 2 ? 'bg-primary-1' : 'bg-gray-300'} transition-colors`} />

            <div className="flex items-center gap-3">
              <span className={`inline-flex justify-center items-center lg:h-10 lg:w-10 w-9 h-9 rounded-full transition-all
                ${step >= 2 ? 'bg-primary-1 text-white scale-105' : 'bg-stock-1 text-dark-3'}`}>
                03
              </span>
              <p className="text-sm lg:text-base">İletişim & Notlar</p>
            </div>
          </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">



            {/* FORM */}
            <div className="lg:col-span-8 col-span-12">
              <div
                key={step}
                className="grid grid-cols-2 lg:gap-7 gap-5 form-step-animate"
              >

                {step === 0 && (
                  <>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-person text-primary-1"></i>
                        Ad Soyad
                      </label>
                      <input name="name" value={formData.name} onChange={handleInputChange} className="input_style__primary col-span-2 w-full" placeholder="Adınız ve soyadınız" />
                    </div>
                    <div className="lg:col-span-1 col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-globe text-primary-1"></i>
                        Uyruk
                      </label>
                      <input name="nationality" value={formData.nationality} onChange={handleInputChange} className="input_style__primary w-full" placeholder="Örn: Türk" />
                    </div>
                    <div className="lg:col-span-1 col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-telephone text-primary-1"></i>
                        Telefon
                      </label>
                      <input name="phone" value={formData.phone} onChange={handleInputChange} className="input_style__primary w-full" placeholder="+90 5XX XXX XXXX" />
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-envelope text-primary-1"></i>
                        E-posta
                      </label>
                      <input name="email" value={formData.email} onChange={handleInputChange} className="input_style__primary w-full" placeholder="example@email.com" />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-geo-alt text-primary-1"></i>
                        Yer
                      </label>
                      <select name="destination" value={formData.destination} onChange={handleInputChange} className="input_style__primary w-full">
                        <option value="">Seçiniz</option>
                        <option value="İstanbul">İstanbul</option>
                        <option value="Kapadokya">Kapadokya</option>
                        <option value="Antalya">Antalya</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-calendar3 text-primary-1"></i>
                        Seyahat Tarihi
                      </label>
                      <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="input_style__primary w-full" />
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-moon-stars text-primary-1"></i>
                        Konaklama Süresi
                      </label>
                      <select name="duration" value={formData.duration} onChange={handleInputChange} className="input_style__primary w-full">
                        <option value="">Seçiniz</option>
                        <option value="1–3 Gün">1–3 Gün</option>
                        <option value="4–7 Gün">4–7 Gün</option>
                        <option value="7+ Gün">7+ Gün</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-people text-primary-1"></i>
                        Kişi Sayısı
                      </label>
                      <select name="guests" value={formData.guests} onChange={handleInputChange} className="input_style__primary w-full">
                        <option value="">Seçiniz</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3+">3+</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-airplane text-primary-1"></i>
                        Havalimanı Transferi
                      </label>
                      <select name="transfer" value={formData.transfer} onChange={handleInputChange} className="input_style__primary w-full">
                        <option value="">Seçiniz</option>
                        <option value="Evet">Evet</option>
                        <option value="Hayır">Hayır</option>
                      </select>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-pencil-square text-primary-1"></i>
                        Özel Talepler
                      </label>
                      <textarea name="requests" value={formData.requests} onChange={handleInputChange} rows={4} className="input_style__primary w-full" placeholder="Özel talepleriniz..." />
                    </div>
                    <div className="col-span-2">
                      <label className="flex items-center gap-2 text-dark-2 font-medium mb-2">
                        <i className="bi bi-chat-dots text-primary-1"></i>
                        İletişim Tercihi
                      </label>
                      <select name="contact" value={formData.contact} onChange={handleInputChange} className="input_style__primary w-full">
                        <option value="">Seçiniz</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Telefon">Telefon</option>
                        <option value="E-posta">E-posta</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* BUTTONS */}
              <div className="mt-10 flex justify-between items-center">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="btn_primary__v1 outlined"
                  >
                    Geri
                  </button>
                )}

                {step < 2 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="btn_primary__v1"
                  >
                    Devam Et
                  </button>
                ) : (
                  <button className="btn_primary__v1">
                    Formu Gönder
                  </button>
                )}
              </div>

              {/* TRUST */}
              <div className="mt-4 flex items-center gap-2 text-sm text-dark-3">
                <i className="bi bi-shield-lock text-primary-1"></i>
                <span>Bilgileriniz gizlidir ve üçüncü kişilerle paylaşılmaz.</span>
              </div>
            </div>

            {/* STICKY SUMMARY */}
<div className="lg:col-span-4 col-span-12 hidden lg:block">
  <div className="sticky top-20 max-w-[360px] border-2 border-primary-1 rounded-lg p-6 bg-gradient-to-br from-white">
    <div className="flex items-center justify-between gap-4 mb-6">
      <h5 className="font-bold text-dark-1 text-lg flex items-center gap-2">
        <i className="bi bi-clipboard-check text-primary-1"></i>
        Form Özeti
      </h5>
      {/* PROGRESS */}
      <div className="flex justify-center">
        <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
          <svg className="transform -rotate-90" width="80" height="80" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeDasharray={`${(progressPercent / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF6B35" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-primary-1">{progressPercent}</span>
            <span className="text-xs text-dark-3 font-medium">%</span>
          </div>
        </div>
      </div>
    </div>

    <ul className="text-sm text-dark-2 space-y-3 border-l-4 border-primary-1 pl-4">
                  {formData.name && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-person-check text-primary-1 text-base"></i>
                      <span><strong>Ad:</strong> {formData.name}</span>
                    </li>
                  )}
                  {formData.nationality && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-globe text-primary-1 text-base"></i>
                      <span><strong>Uyruk:</strong> {formData.nationality}</span>
                    </li>
                  )}
                  {formData.phone && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-telephone text-primary-1 text-base"></i>
                      <span><strong>Telefon:</strong> {formData.phone}</span>
                    </li>
                  )}
                  {formData.email && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-envelope text-primary-1 text-base"></i>
                      <span><strong>E-posta:</strong> {formData.email}</span>
                    </li>
                  )}
                  {formData.destination && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-geo-alt text-primary-1 text-base"></i>
                      <span><strong>Yer:</strong> {formData.destination}</span>
                    </li>
                  )}
                  {formData.date && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-calendar3 text-primary-1 text-base"></i>
                      <span><strong>Tarih:</strong> {formData.date}</span>
                    </li>
                  )}
                  {formData.duration && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-moon-stars text-primary-1 text-base"></i>
                      <span><strong>Süre:</strong> {formData.duration}</span>
                    </li>
                  )}
                  {formData.guests && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-people text-primary-1 text-base"></i>
                      <span><strong>Kişi:</strong> {formData.guests}</span>
                    </li>
                  )}
                  {formData.transfer && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-airplane text-primary-1 text-base"></i>
                      <span><strong>Transfer:</strong> {formData.transfer}</span>
                    </li>
                  )}
                  {formData.requests && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-pencil-square text-primary-1 text-base"></i>
                      <span><strong>Talep:</strong> {formData.requests.substring(0, 30)}...</span>
                    </li>
                  )}
                  {formData.contact && (
                    <li className="flex items-center gap-2">
                      <i className="bi bi-chat-dots text-primary-1 text-base"></i>
                      <span><strong>İletişim:</strong> {formData.contact}</span>
                    </li>
                  )}
                  {!formData.name && !formData.destination && !formData.date && (
                    <li className="text-dark-3 italic">Bilgileri doldurmaya başlayın...</li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* MICRO ANIMATION */}
      <style jsx>{`
        .form-step-animate {
          animation: fadeSlide 0.4s ease;
        }
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Form
