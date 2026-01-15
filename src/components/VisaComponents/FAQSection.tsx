'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const { t } = useTranslation()
  
  const faqs: FAQItem[] = t('visa.faq.questions', { returnObjects: true }) as FAQItem[]
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section section-faq">
      <div className="container">
        <div className="section-head" data-scroll-animation>
          <span className="heading-2 colorfull font-bold">{t('visa.faq.title')}</span>
        </div>
        <div className="main-inner">
          <div className="accordion">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className={`btn-accordion heading-4 ${openIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="accordion-icon">
                    <Image
                      src="/visa/assets/img/icon/accordion-caret.svg"
                      width={6}
                      height={9}
                      alt="Caret Down"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </button>
                {openIndex === index && (
                  <div className="accordion-inner">
                    <div className="body-sm">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="cta-card" data-scroll-animation>
            <strong className="heading-3">{t('visa.faq.cta.title')}</strong>
            <div className="body-lg">
              <p>{t('visa.faq.cta.description')}</p>
            </div>
            <Link title={t('visa.faq.cta.button')} href="/visa/basvuru-yap" className="btn btn-primary">
              {t('visa.faq.cta.button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

