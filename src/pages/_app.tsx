/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/Home.css'

import TravelHeader from '@/src/components/TravelComponents/Header'
import TravelFooter from '@/src/components/TravelComponents/Footer'
import MedicalHeader from '@/src/components/MedicalComponents/Header'
import MedicalFooter from '@/src/components/MedicalComponents/Footer'

// Google Analytics event tracking
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isTravelPage = router.pathname.startsWith('/travel')
  const isMedicalPage = router.pathname.startsWith('/medical')

  // Page view tracking with GA4
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', {
          page_path: url,
        })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
  return (
    <>
      {isTravelPage && <TravelHeader />}
      {isMedicalPage && <MedicalHeader />}
      
      <Component {...pageProps} />
      
      {isTravelPage && <TravelFooter />}
      {isMedicalPage && <MedicalFooter />}
    </>
  )
}
