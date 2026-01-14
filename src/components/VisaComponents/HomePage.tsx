'use client'

import Image from 'next/image'
import AwardsSection from './AwardsSection'
import ComparisonSection from './ComparisonSection'
import CountryMarquee from './CountryMarquee'
import FeaturedImageBlock from './FeaturedImageBlock'
import HeroSection from './HeroSection'
import ReferencesSection from './ReferencesSection'
import ServicesSection from './ServicesSection'

export default function VisaHomePage() {
  return (
    <>
      <HeroSection />
      <CountryMarquee />
      <ServicesSection />
      <FeaturedImageBlock />
      <ComparisonSection />
      <AwardsSection />
      <ReferencesSection />

      {/* iframe-modal HTML'deki gibi başlangıçta gizli - global olarak burada */}
      <div id="iframe-modal" className="full-modal" style={{ transform: 'translateX(100%)' }}>
        <div id="iframe-modal-overlay" className="full-shadow"></div>
        <button className="close-modal-btn" aria-label="Modalı Kapat" data-iframe-modal-close>
          <Image
            loading="lazy"
            src="/visa/assets/img/icon/modal-close.svg"
            width={15}
            height={15}
            alt="Close"
          />
        </button>
        <div className="modal-inner">
          <div className="inner-huge"></div>
        </div>
      </div>
    </>
  )
}

