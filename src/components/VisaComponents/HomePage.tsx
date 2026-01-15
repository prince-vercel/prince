'use client'

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
    </>
  )
}

