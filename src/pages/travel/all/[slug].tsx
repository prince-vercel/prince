/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'

import heroImg from '@/assets/images/hero/h1.webp'
import breadcrumbShape from '@/assets/images/illustration/breadcrunb__shape.png'
import birdWhite from '@/assets/images/illustration/bird-illustration-w.png'
import bird from '@/assets/images/illustration/bird-illustration.png'
import tree from '@/assets/images/illustration/tree-illustration.png'


export default function TravelDetailPage() {
  const router = useRouter()
  const { slug } = router.query
  const [activeTab, setActiveTab] = useState<'booking' | 'enquiry'>('booking')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [tour, setTour] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false)
  const [enquirySuccess, setEnquirySuccess] = useState('')

  useEffect(() => {
    if (!slug) return

    const fetchTour = async () => {
      try {
        const docRef = doc(db, 'traveltours', slug as string)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setTour(docSnap.data())
          setImageLoading(false)
        }
      } catch (error) {
        console.error('Tur detayı yükleme hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTour()
  }, [slug])

  useEffect(() => {
    // Görüntü değişirse loading'i sıfırla
    if (tour?.mainImageUrl) {
      setImageLoading(false)
    }
  }, [tour?.mainImageUrl])

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingEnquiry(true)

    try {
      if (!slug || !enquiryForm.name || !enquiryForm.email || !enquiryForm.phone) {
        alert('Lütfen tüm alanları doldurunuz')
        setSubmittingEnquiry(false)
        return
      }

      await addDoc(collection(db, 'traveltours', slug as string, 'enquiries'), {
        name: enquiryForm.name,
        email: enquiryForm.email,
        phone: enquiryForm.phone,
        message: enquiryForm.message,
        createdAt: serverTimestamp()
      })

      setEnquirySuccess('Bilgi talebi başarıyla gönderildi! Kısa sürede sizinle iletişime geçeceğiz.')
      setEnquiryForm({ name: '', email: '', phone: '', message: '' })
      
      setTimeout(() => setEnquirySuccess(''), 5000)
    } catch (error) {
      console.error('Bilgi talep gönderme hatası:', error)
      alert('Gönderme işlemi başarısız oldu')
    } finally {
      setSubmittingEnquiry(false)
    }
  }

  return (
    <>

      {/* BREADCRUMB */}
      <div className="paralax-container lg:py-36 py-20 relative overflow-hidden">
        <div
          className="jarallax absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50 before:z-minus"
          data-jarallax
        >
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-1"></div>
                <span className="mt-2 text-gray-600">Yükleniyor...</span>
              </div>
            </div>
          )}
          <img 
            className="jarallax-img" 
            src={tour?.mainImageUrl} 
            alt="Kapak"
            onLoad={() => setImageLoading(false)}
            style={{ opacity: imageLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
          />
        </div>

        <img src={breadcrumbShape.src} className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]" alt="" />
        <img src={birdWhite.src} className="absolute top-[10%] right-[4%] z-1 w-[7.5%]" alt="" />

        <div className="container relative z-2">
          <nav aria-label="breadcrumb">
                    <ol className="breadcrumb2" style={{color:'white'}}>
            <li className="breadcrumb-item2">
              <Link href="/travel">Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2"> Seyahat Detayı</li>
          </ol>
          </nav>

          <h2 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
            {loading ? '' : tour?.title || 'Tur Detayı'}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className=" relative z-1">
        <img src={tree.src} className="absolute top-1/2 -translate-y-1/2 right-0 max-w-[14%] z-minus hidden lg:block" alt="" />
        <img src={bird.src} className="absolute top-[5%] left-[1%] max-w-[9%] z-minus hidden lg:block" alt="" />

        <div className="container">
          <div className="grid grid-cols-12 gap-base">

            {/* SOL TARAF */}
            <div className="lg:col-span-8 col-span-12">


<ul className="bg-white lg:px-base lg:py-4 py-4 flex lg:overflow-hidden lg:mt-[-40px] mt-base border">

  {/* INFORMATION */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#information" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-info-circle text-lg"></i>
      </div>
      <span className="whitespace-nowrap">Bilgiler</span>
    </a>
  </li>

  {/* TOUR PLAN */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#plan" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-calendar-check text-lg"></i>
      </div>
      <span className="whitespace-nowrap">Tur Planı</span>
    </a>
  </li>

  {/* FAQ */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#faq" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-question-circle text-lg"></i>
      </div>
      <span className="whitespace-nowrap">SSS</span>
    </a>
  </li>

  {/* GALLERY */}
  <li className="grow py-1 border-r border-primary-1 last:border-none px-5">
    <a href="#gallery" className="flex items-center justify-center text-dark-2 hover:text-primary-1 font-medium duration-200">
      <div className="shrink-0 mr-2">
        <i className="bi bi-images text-lg"></i>
      </div>
      <span className="whitespace-nowrap">Galeri</span>
    </a>
  </li>

</ul>



              <div className="pack__disc" id="Information">
  <div className="flex justify-between items-center gap-2 flex-wrap lg:pt-12 pt-8 lg:pb-4">
    <h2 className="font-sans lg:text-[45px] md:text-xl text-lg font-semibold">
      ₺{tour?.price || 0}/<span className="lg:text-lg text-md font-normal">Kişi Başına</span>
    </h2>
  </div>

  <h5 className="lg:text-lg text-base text-dark-1 font-semibold leading-[1.5] mb-6">
    {tour?.description || 'Tur açıklaması yükleniyor...'}
  </h5>

  <ul className="pack__list mt-4">
    <li><i className="bi bi-clock"></i> {tour?.duration || '4 Gün 5 Gece'}</li>
    <li><i className="bi bi-person"></i> Maksimum Kişi: {tour?.maxPeople || 10}</li>
    <li><i className="bi bi-map"></i> {tour?.location || 'Lokasyon'}</li>
  </ul>

  {/* PRICE INCLUDES */}
  <ul className="mt-base">
    <li className="lg:flex lg:pt-6 pt-5 pb-5 border-t border-stock-1">
      <div className="lg:w-1/3 font-medium">Fiyata Dahil Olanlar</div>
      <div className="lg:w-2/3 mt-4 lg:mt-0">
        <ul className="grid grid-cols-2 gap-3">
          {tour?.includedInPrice?.split('\n').filter((item: string) => item.trim()).map((item: string, i: number) => (
            <li key={i} className="flex items-center text-sm">
              <i className="bi bi-check2 text-primary-1 mr-2"></i>
              {item.replace('- ', '')}
            </li>
          ))}
        </ul>
      </div>
    </li>

    {/* PRICE EXCLUDES */}
    <li className="lg:flex lg:pt-6 pt-5 pb-5 border-t border-stock-1">
      <div className="lg:w-1/3 font-medium">Fiyata Dahil Olmayan Şeyler</div>
      <div className="lg:w-2/3 mt-4 lg:mt-0">
        <ul className="grid grid-cols-2 gap-3">
          {tour?.notIncludedInPrice?.split('\n').filter((item: string) => item.trim()).map((item: string, i: number) => (
            <li key={i} className="flex items-center text-sm">
              <i className="bi bi-check2 text-primary-1 mr-2"></i>
              {item.replace('- ', '')}
            </li>
          ))}
        </ul>
      </div>
    </li>
  </ul>

  {/* TOUR PLAN */}
  <div className="lg:pt-10 pt-8 pb-8" id="plan">
    <h3 className="text-dark-1 font-semibold text-2xl mb-4">Tur Planı</h3>

    {tour?.tourPlan && tour.tourPlan.length > 0 ? (
      tour.tourPlan.map((d: any) => (
        <div key={d.day} className="flex single__count mt-6">
          <div className="day__count shrink-0 relative z-10" style={{ paddingTop: '20px' }}>
            <style>{`
              .single__count .day__count::before {
                top: 20px !important;
              }
            `}</style>
            <div className="w-10 h-10 rounded-full border border-primary-1 flex items-center justify-center font-semibold text-primary-1 bg-white">
              {String(d.day).padStart(2, '0')}
            </div>
          </div>
          <div className="ml-4 pb-8">
            <h5 className="font-semibold text-dark-1 text-lg mb-2">Gün {d.day}</h5>
            <p className="whitespace-pre-line">{d.content}</p>
          </div>
        </div>
      ))
    ) : (
      <div style={{ height: '100px' }}></div>
    )}
  </div>
</div>
{/* FAQ */}
<div className="pt-2 pb-5" id="faq">
  <h3 className="text-dark-1 font-semibold text-2xl mb-2">Sıkça Sorulan Sorular</h3>
  <p className="text-dark-1 font-medium mb-4">
    Bu turun detayları, ücretlendirmesi, zaman dilimi ve diğer önemli bilgiler aşağıda bulunmaktadır. Sorularınız varsa lütfen bizimle iletişime geçiniz.
  </p>

  <div className="accordion lg:space-y-6 space-y-5">
    {tour?.faq && tour.faq.length > 0 ? (
      tour.faq.map((item: any, i: number) => (
        <div key={i} className="single__accordion border border-stock-1">
          <button
            type="button"
            onClick={() =>
              setOpenFaq(openFaq === i ? null : i)
            }
            className="toggle px-5 py-3 leading-1.5 text-2md text-start w-full text-dark-1 font-serif font-semibold"
          >
            {String(i + 1).padStart(2, '0')}. {item.question}
          </button>

          {openFaq === i && (
            <div className="inner px-5 pb-5">
              <p className="text-base font-sans text-dark-3 leading-1.9 !pb-0">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))
    ) : (
      <div style={{ height: '200px' }}></div>
    )}
  </div>
</div>

{/* GALLERY */}
<div className="lg:pt-10 pt-8" id="gallery">
  <h3 className="text-dark-1 font-semibold text-2xl mb-2">Galeri</h3>
  <p className="text-dark-1 font-medium mb-4">
    Bu turun muhteşem anılarını içeren fotoğraflar aşağıda bulunmaktadır. Her resmi büyütmek için tıklayabilirsiniz.
  </p>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  }}>
    {tour?.galleryImageUrls && tour.galleryImageUrls.length > 0 ? (
      tour.galleryImageUrls.map((imageUrl: string, idx: number) => (
        <div key={idx} className="masonry-item relative group overflow-hidden rounded-lg" style={{ height: '280px' }}>
          <img
            src={imageUrl}
            alt={`${tour.title} ${idx + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
            className="duration-200 group-hover:scale-[103%]"
          />
          <a
            href={imageUrl}
            data-fancybox="details"
            className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center"
          >
            <div className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
              <i className="bi bi-camera"></i>
            </div>
          </a>
        </div>
      ))
    ) : (
      <div style={{ height: '300px' }}></div>
    )}
  </div>
</div>
 

            </div>

            {/* SAĞ TARAF */}
          <div className="lg:col-span-4 col-span-12">

  <ul id="tabs-nav" className="booking-tabs flex gap-4 pb-6">
    <li
      className={`tab-link basis-1/2 ${activeTab === 'booking' ? 'active' : ''}`}
      onClick={() => setActiveTab('booking')}
    >
      Rezervasyon
    </li>
    <li
      className={`tab-link basis-1/2 ${activeTab === 'enquiry' ? 'active' : ''}`}
      onClick={() => setActiveTab('enquiry')}
    >
      Bilgi Talep
    </li>
  </ul>

  {activeTab === 'booking' && (
    <div className="tab-content active">
      <form
        autoComplete="off"
        className="lg:px-base px-5 lg:pt-6 lg:pb-base pt-4 pb-5 bg-white border-primary-1 border"
      >
   



        <a href="/travel/form" className="btn_primary__v1 !w-full justify-center mt-5 hover:text-white">
          Şimdi Rezervasyon Yap
        </a>
      </form>
    </div>
  )}

  {activeTab === 'enquiry' && (
    <div className="tab-content active">
      <form onSubmit={handleEnquirySubmit} className="lg:px-base px-5 lg:py-base py-5 bg-white border-primary-1 border">
        <h4 className="lg:text-lg text-2md text-dark-1 font-semibold">
          Şimdi Bilgi Talep Et
        </h4>

        <p className="regular-text-v1 mt-2">
          Aşağıdaki formu doldurarak turumuzla ilgili detaylı bilgi talep edebilirsiniz. Ekibimiz kısa sürede sizinle iletişime geçecektir.
        </p>

        {enquirySuccess && (
          <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '4px', marginTop: '12px', marginBottom: '12px' }}>
            {enquirySuccess}
          </div>
        )}

        <div className="lg:mt-base mt-5">
          <input 
            className="input_style__primary" 
            placeholder="Adınız" 
            value={enquiryForm.name}
            onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="lg:mt-base mt-5">
          <input 
            className="input_style__primary" 
            type="email"
            placeholder="Email" 
            value={enquiryForm.email}
            onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>

        <div className="lg:mt-base mt-5">
          <input 
            className="input_style__primary" 
            placeholder="Telefon Numarası" 
            value={enquiryForm.phone}
            onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>

        <div className="lg:mt-base mt-5">
          <textarea
            rows={6}
            className="input_style__primary"
            placeholder="Ek Açıklama..."
            value={enquiryForm.message}
            onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
          />
        </div>

        <button 
          type="submit"
          disabled={submittingEnquiry}
          className="btn_primary__v1 !w-full justify-center mt-5"
        >
          {submittingEnquiry ? 'Gönderiliyor...' : 'Bilgi Talep Et'}
        </button>
      </form>
    </div>
  )}

  <aside className="widget widget_social lg:mt-[50px] mt-10">
    <h4 className="text-dark-1 lg:text-[25px] text-2md font-semibold mb-1">
      Sosyal Bağlantılar
    </h4>
             <div className="cs_social_links cs_social_desktop">
  <a href="#">
    <i className="fa-brands fa-facebook-f" style={{ color: '#E8604C'  }}></i>
  </a>
  <a href="#">
    <i className="fa-brands fa-youtube" style={{ color: '#E8604C'  }}></i>
  </a>
  <a href="#">
    <i className="fa-brands fa-instagram" style={{ color: '#E8604C'  }}></i>
  </a>
</div>
  </aside>
</div>


          </div>
        </div>
      </div>

    </>
  )
}
