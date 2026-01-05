import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/Home.css'

import TravelHeader from '@/src/components/TravelComponents/Header'
import TravelFooter from '@/src/components/TravelComponents/Footer'
import MedicalHeader from '@/src/components/MedicalComponents/Header'
import MedicalFooter from '@/src/components/MedicalComponents/Footer'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isTravelPage = router.pathname.startsWith('/travel')
  const isMedicalPage = router.pathname.startsWith('/medical')


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
