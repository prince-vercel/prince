/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { db } from "@/src/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import { getCollectionName } from '../../lib/localization'
import i18n from '../../i18n'
import '../../i18n'

export default function PackageList() {
  const router = useRouter()
  const { t, isReady } = useSafeTranslation()
  const { destination } = router.query
  const [tours, setTours] = useState<any[]>([])
  const [loadingTours, setLoadingTours] = useState(true)
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedMaxPeople, setSelectedMaxPeople] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([])
  const [showPricedOnly, setShowPricedOnly] = useState(false)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const collectionName = getCollectionName('traveltours', i18n.language)
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        const toursData = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTours(toursData)
      } catch (error) {
        console.error('Tur yükleme hatası:', error)
      } finally {
        setLoadingTours(false)
      }
    }

    fetchTours()
  }, [i18n.language])

  useEffect(() => {
    if (destination && typeof destination === 'string') {
      setSelectedDestinations([destination])
    }
  }, [destination])

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/İ/g, 'i')
      .trim()
  }

  const toggleValue = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredPackages = useMemo(() => {
    return tours.filter((tour) => {
      const destinationOk =
        selectedDestinations.length === 0 ||
        selectedDestinations.some(dest =>
          normalizeText(dest) === normalizeText(tour.location || '')
        )

      const durationOk =
        selectedDurations.length === 0 ||
        selectedDurations.includes(tour.duration || '')

      const maxPeopleOk = (() => {
        if (selectedMaxPeople.length === 0) return true
        const maxPeople = tour.maxPeople || 10
        return selectedMaxPeople.some(range => {
          if (range === '5-10') return maxPeople >= 5 && maxPeople <= 10
          if (range === '10-20') return maxPeople >= 10 && maxPeople <= 20
          if (range === '20+') return maxPeople >= 20
          return false
        })
      })()

      const priceOk =
        (tour.price || 0) >= priceRange[0] && (tour.price || 0) <= priceRange[1]

      const daysOk =
        selectedDays.length === 0 ||
        selectedDays.some(day => (tour.days || []).includes(day))

      const inclusionsOk =
        selectedInclusions.length === 0 ||
        selectedInclusions.some(inc => {
          if (tour.includedInPrice && typeof tour.includedInPrice === 'string') {
            return tour.includedInPrice.includes(inc)
          }
          return false
        })

      const pricedOk = !showPricedOnly || !tour.price || tour.price === 0

      return destinationOk && durationOk && maxPeopleOk && priceOk && daysOk && inclusionsOk && pricedOk
    })
  }, [tours, selectedDestinations, selectedDurations, selectedMaxPeople, priceRange, selectedDays, selectedInclusions, showPricedOnly])

  const uniqueDestinations = useMemo(() => {
    const defaultDestinations = ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa"]
    const dbDestinations = new Set(tours.map(tour => tour.location).filter(Boolean))
    const combined = new Set([...defaultDestinations, ...Array.from(dbDestinations)])
    return Array.from(combined).sort()
  }, [tours])

  const uniqueDurations = useMemo(() => {
    const defaultDurations = ["2 Gün 2 Gece", "3 Gün 3 Gece", "4 Gün 5 Gece", "5 Gün 6 Gece"]
    const dbDurations = new Set(tours.map(tour => tour.duration).filter(Boolean))
    const combined = new Set([...defaultDurations, ...Array.from(dbDurations)])
    return Array.from(combined)
  }, [tours])

  const uniqueInclusions = useMemo(() => {
    const defaultInclusions = ['Yemek Dahil', 'Alkollü', 'Alkolsüz', 'Teleferik', 'Feribot', 'Müze Girişi']
    const dbInclusions = new Set<string>()
    tours.forEach(tour => {
      if (tour.includedInPrice && typeof tour.includedInPrice === 'string') {
        const items = tour.includedInPrice.split(',').map((item: string) => item.trim())
        items.forEach((inc: string) => {
          if (inc) dbInclusions.add(inc)
        })
      }
    })
    const combined = new Set([...defaultInclusions, ...Array.from(dbInclusions)])
    return Array.from(combined).sort()
  }, [tours])

  return (
    <>

      {/* ===== HERO / BREADCRUMB (AYNI) ===== */}
      <div className="paralax-container lg:py-20 py-12 relative overflow-hidden" style={{ backgroundColor: '#d7b76e' }}>
        <div className="absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50">
        </div>

        <img src="/assets/images/illustration/breadcrunb__shape.png" alt="shape" className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]" />

        <div className="container relative z-2 pb-10">
          <ol className="breadcrumb2" style={{ color: 'white' }}>
            <li className="breadcrumb-item2">
              <Link href="/travel" suppressHydrationWarning>{isReady ? t('travel.pages.breadcrumb.home') : ''}</Link>
            </li>
            <li className="breadcrumb-item2" suppressHydrationWarning> {isReady ? t('travel.pages.all.breadcrumb') : ''}</li>
          </ol>

          <h2 className="l:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white font-medium max-w-[640px]" suppressHydrationWarning>
            {isReady ? t('travel.pages.all.title') : ''}
          </h2>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative">
        <div className="container mt-10">
          <div className="grid grid-cols-12 lg:gap-12 ">

            {/* LIST (AYNI STİL) */}
            <div className="lg:col-span-8 col-span-12 grid md:grid-cols-2 grid-cols-1 gap-base">
              {loadingTours ? (
                <div className="col-span-2 text-center py-20">
                  <p className="text-lg text-gray-500" suppressHydrationWarning>{isReady ? t('travel.pages.all.results.loading') : ''}</p>
                </div>
              ) : filteredPackages.length === 0 ? (
                <div className="col-span-2 text-center py-20">
                  <p className="text-lg text-gray-500" suppressHydrationWarning>{isReady ? t('travel.pages.all.results.noTours') : ''}</p>
                </div>
              ) : (
                filteredPackages.map((tour) => (
                  <div
                    key={tour.id}
                    className="group/card package-card-style-one"
                    onMouseEnter={() => setHoveredCardId(tour.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                  >
                    <div className="overflow-hidden relative" style={{ height: '280px', maxHeight: '280px' }}>
                      <a href={`/travel/all/${tour.id}`} className="block w-full h-full">
                        {tour.mainImageUrl || tour.imageUrl ? (
                          <img
                            src={tour.mainImageUrl || tour.imageUrl}
                            alt={tour.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            className="group-hover/card:scale-105 duration-300"
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%' }} className="bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400" suppressHydrationWarning>{isReady ? t('travel.pages.all.results.noImage') : ''}</span>
                          </div>
                        )}
                      </a>
                    </div>

                    <h4 className="card-title-alpha lg:mt-6 mt-5" style={{ color: hoveredCardId === tour.id ? '#d7b76e' : 'black' }}>
                      <a href={`/travel/all/${tour.id}`}>{tour.title}</a>
                    </h4>

                    <ul className="flex flex-wrap text-sm font-medium text-dark-2 mt-4 package-feature">
                      {tour.days ? (
                        <li className="mr-4">
                          <i className="bi bi-calendar-event text-primary-1 mr-2"></i>
                          {tour.days.slice(0, 2).join(', ')}
                        </li>
                      ) : null}

                      {tour.location ? (
                        <li className="mr-4">
                          <i className="bi bi-geo-alt text-primary-1 mr-2"></i>
                          {tour.location}
                        </li>
                      ) : null}

                      <li className="mr-4">
                        {tour.price ? (
                          <>
                            <i className="bi bi-currency-euro text-primary-1 mr-2"></i>
                            {tour.price}€
                          </>
                        ) : (
                          <>
                            <i className="bi bi-currency-euro text-primary-1 mr-2"></i>
                            {isReady ? t('travel.pages.all.results.getPrice') : ''}
                          </>
                        )}
                      </li>
                    </ul>

                    <a href={`/travel/all/${tour.id}`} className="package-explore-btn" style={{ color: hoveredCardId === tour.id ? '#d7b76e' : 'black' }} suppressHydrationWarning>
                      {isReady ? t('travel.pages.all.filters.exploreNow') : ''}
                    </a>
                  </div>
                ))
              )}
            </div>

            {/* ===== FILTER SIDEBAR (AYNI STİL, SADECE BAĞLI) ===== */}
            <div className="lg:col-span-4 col-span-12">
              <div className="pb-[10px] mb-8 border-b border-dark-1 border-opacity-10">
                <h4 className="text-lg font-semibold text-dark-1" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.title') : ''}</h4>
              </div>

              {/* PRICE FILTER */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1" suppressHydrationWarning>
                  {isReady ? t('travel.pages.all.filters.priceRange') : ''}
                </h5>

                <div className="pt-4 flex gap-3 items-center">
                  <input
                    type="number"
                    placeholder={isReady ? t('travel.pages.all.filters.priceRangeMin') : ''}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full h-12 border border-dark-1 border-opacity-20 px-3 outline-0"
                    suppressHydrationWarning
                  />

                  <span className="text-dark-2">–</span>

                  <input
                    type="number"
                    placeholder={isReady ? t('travel.pages.all.filters.priceRangeMax') : ''}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full h-12 border border-dark-1 border-opacity-20 px-3 outline-0"
                    suppressHydrationWarning
                  />
                </div>

                <div className="custom-checkbox mt-3">
                  <input
                    type="checkbox"
                    id="priced-only"
                    checked={showPricedOnly}
                    onChange={() => setShowPricedOnly(!showPricedOnly)}
                  />
                  <label htmlFor="priced-only" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.showPricedOnly') : ''}</label>
                </div>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* DESTINATIONS */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.destination') : ''}</h5>
                <select
                  value={selectedDestinations[0] || ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedDestinations([e.target.value])
                    } else {
                      setSelectedDestinations([])
                    }
                  }}
                  className="w-full  h-12 border border-dark-1 border-opacity-20  outline-0"
                  style={{ backgroundColor: '#fff', color: '#333' }}
                >
                  <option value="" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.allDestinations') : ''}</option>
                  {uniqueDestinations.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* DURATION */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.days') : ''}</h5>
                <select
                  value={selectedDays[0] || ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedDays([e.target.value])
                    } else {
                      setSelectedDays([])
                    }
                  }}
                  className="w-full h-12 border border-dark-1 border-opacity-20 outline-0"
                  style={{ backgroundColor: '#fff', color: '#333' }}
                >
                  <option value="" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.allDays') : ''}</option>
                  {['Her Gün', 'Sabah', 'Akşam', 'Öğleden Sonra', 'Öğleden Önce', 'Tam Gün', 'Hafta Sonu', 'Hafta İçi', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* INCLUSIONS */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.inclusions') : ''}</h5>
                <ul className="pt-4">
                  {uniqueInclusions.map((item, i) => (
                    <li key={i} className="pt-3 first:pt-0">
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`inc-${i}`}
                          checked={selectedInclusions.includes(item)}
                          onChange={() =>
                            toggleValue(item, selectedInclusions, setSelectedInclusions)
                          }
                        />
                        <label htmlFor={`inc-${i}`}>{item}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
