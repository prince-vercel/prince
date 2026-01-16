import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useLayoutEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../i18n'
import '../styles/globals.css'
import '../styles/Home.css'

import MedicalFooter from '@/src/components/MedicalComponents/Footer'
import MedicalHeader from '@/src/components/MedicalComponents/Header'
import TravelFooter from '@/src/components/TravelComponents/Footer'
import TravelHeader from '@/src/components/TravelComponents/Header'
import VisaFooter from '@/src/components/VisaComponents/Footer'
import VisaHeader from '@/src/components/VisaComponents/Header'

// CSS ID prefix'leri
const CSS_PREFIXES = {
  travel: 'travel-css-',
  medical: 'medical-css-',
  visa: 'visa-css-',
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isTravelPage = router.pathname.startsWith('/travel')
  const isMedicalPage = router.pathname.startsWith('/medical')
  const isVisaPage = router.pathname.startsWith('/visa')

  // CSS'leri temizle - sadece sayfa değiştiğinde diğer bölümlerin CSS'lerini kaldır
  useLayoutEffect(() => {
    // Tüm bölüm CSS'lerini kaldır
    const removeAllSectionCSS = () => {
      Object.values(CSS_PREFIXES).forEach((prefix) => {
        const links = document.querySelectorAll(`link[id^="${prefix}"]`)
        links.forEach((link) => link.remove())
      })
    }

    // Önce temizle
    removeAllSectionCSS()

    // Cleanup: Sayfa değiştiğinde tüm bölüm CSS'lerini kaldır
    return () => {
      removeAllSectionCSS()
    }
  }, [isTravelPage, isMedicalPage, isVisaPage, router.pathname])

  // Head render logları için useEffect
  useLayoutEffect(() => {
    if (isTravelPage || isMedicalPage) {
      console.log('🟢 [Head] Travel/Medical CSS\'leri yükleniyor... (hem css hem css2)')
      setTimeout(() => {
        const travelLinks = document.querySelectorAll(`link[id^="${CSS_PREFIXES.travel}"], link[id^="${CSS_PREFIXES.medical}"]`)
        console.log(`📦 [Travel/Medical CSS Check] DOM'da ${travelLinks.length} CSS bulundu:`)
        travelLinks.forEach((link) => {
          console.log(`   ✓ ${link.getAttribute('href')} (id: ${link.id})`)
        })
      }, 100)
    } else if (isVisaPage) {
      console.log('🟣 [Head] Visa CSS\'leri yükleniyor...')
      setTimeout(() => {
        const visaLinks = document.querySelectorAll(`link[id^="${CSS_PREFIXES.visa}"]`)
        console.log(`📦 [Visa CSS Check] DOM'da ${visaLinks.length} Visa CSS bulundu:`)
        visaLinks.forEach((link) => {
          console.log(`   ✓ ${link.getAttribute('href')} (id: ${link.id})`)
        })
      }, 100)
    }
  }, [isTravelPage, isMedicalPage, isVisaPage])

  return (
    <>
      {/* CSS'leri Head component'i ile yükle - sayfa render edilmeden önce */}
      {/* Travel ve Medical sayfaları için ortak CSS'ler - hem css hem css2 klasörlerindeki tüm CSS'ler */}
      {(isTravelPage || isMedicalPage) && (
        <Head>
          {/* /assets/css/ klasöründeki CSS'ler */}
          <link
            rel="stylesheet"
            href="/assets/css/plugins/bootstrap.min.css"
            id={`${CSS_PREFIXES.travel}bootstrap`}
            key="travel-bootstrap"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/fontawesome.min.css"
            id={`${CSS_PREFIXES.travel}fontawesome`}
            key="travel-fontawesome"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/animate.css"
            id={`${CSS_PREFIXES.travel}animate`}
            key="travel-animate"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/slick.css"
            id={`${CSS_PREFIXES.travel}slick`}
            key="travel-slick"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/odometer.css"
            id={`${CSS_PREFIXES.travel}odometer`}
            key="travel-odometer"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/lightgallery.min.css"
            id={`${CSS_PREFIXES.travel}lightgallery`}
            key="travel-lightgallery"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/jquery.timepicker.min.css"
            id={`${CSS_PREFIXES.travel}timepicker`}
            key="travel-timepicker"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/jquery-ui.css"
            id={`${CSS_PREFIXES.travel}jquery-ui`}
            key="travel-jquery-ui"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/select2.min.css"
            id={`${CSS_PREFIXES.travel}select2`}
            key="travel-select2"
          />
          <link
            rel="stylesheet"
            href="/assets/css/plugins/animated-headline.css"
            id={`${CSS_PREFIXES.travel}headline`}
            key="travel-headline"
          />
          <link
            rel="stylesheet"
            href="/assets/css/style.css"
            id={`${CSS_PREFIXES.travel}style`}
            key="travel-style"
          />

          {/* /assets/css2/ klasöründeki CSS'ler */}
          <link
            rel="stylesheet"
            href="/assets/css2/animate.css"
            id={`${CSS_PREFIXES.medical}animate`}
            key="medical-animate"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/bootstrap-icons.min.css"
            id={`${CSS_PREFIXES.medical}bootstrap-icons`}
            key="medical-bootstrap-icons"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/daterangepicker.css"
            id={`${CSS_PREFIXES.medical}daterangepicker`}
            key="medical-daterangepicker"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/fancybox.min.css"
            id={`${CSS_PREFIXES.medical}fancybox`}
            key="medical-fancybox"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/jarallax.css"
            id={`${CSS_PREFIXES.medical}jarallax`}
            key="medical-jarallax"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/jquery-ui.css"
            id={`${CSS_PREFIXES.medical}jquery-ui`}
            key="medical-jquery-ui"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/leaflet.css"
            id={`${CSS_PREFIXES.medical}leaflet`}
            key="medical-leaflet"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/select2.min.css"
            id={`${CSS_PREFIXES.medical}select2`}
            key="medical-select2"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/swiper-bundle.min.css"
            id={`${CSS_PREFIXES.medical}swiper`}
            key="medical-swiper"
          />
          <link
            rel="stylesheet"
            href="/assets/css2/styles.css"
            id={`${CSS_PREFIXES.medical}styles`}
            key="medical-styles"
          />
        </Head>
      )}
      {isVisaPage && (
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            id={`${CSS_PREFIXES.visa}fontawesome`}
            key="visa-fontawesome"
          />
          <link
            rel="stylesheet"
            href="/visa/assets/css/vendors.css"
            id={`${CSS_PREFIXES.visa}vendors`}
            key="visa-vendors"
          />
          <link
            rel="stylesheet"
            href="/visa/assets/css/main.css"
            id={`${CSS_PREFIXES.visa}main`}
            key="visa-main"
          />
          <link
            rel="stylesheet"
            href="/visa/assets/css/custom.css"
            id={`${CSS_PREFIXES.visa}custom`}
            key="visa-custom"
          />
        </Head>
      )}
      {isVisaPage && (
        <>
          <Script
            src="/visa/assets/js/lib.js"
            strategy="afterInteractive"
            key="visa-lib"
            onLoad={() => {
              console.log('✅ [Visa] lib.js yüklendi - Swiper artık mevcut')
            }}
          />
          <Script
            src="/visa/assets/js/main.js"
            strategy="afterInteractive"
            key="visa-main"
            onLoad={() => {
              console.log('✅ [Visa] main.js yüklendi')
            }}
          />
          <Script
            src="/visa/assets/js/custom5e1f.js"
            strategy="afterInteractive"
            key="visa-custom"
            onLoad={() => {
              console.log('✅ [Visa] custom5e1f.js yüklendi')
            }}
            onError={(e) => {
              console.error('❌ [Visa] custom5e1f.js yüklenirken hata:', e)
            }}
          />
        </>
      )}
      {isTravelPage && <TravelHeader />}
      {isMedicalPage && <MedicalHeader />}
      {isVisaPage && <VisaHeader />}

      <Component {...pageProps} />

      {isTravelPage && <TravelFooter />}
      {isMedicalPage && <MedicalFooter />}
      {isVisaPage && <VisaFooter />}
    </>
  )
}
