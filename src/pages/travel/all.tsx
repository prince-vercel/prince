/* eslint-disable @typescript-eslint/prefer-as-const */
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
  const { destination, countryId } = router.query

  const clampStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical' as 'vertical',
    fontSize: '13px',
  }
  const [tours, setTours] = useState<any[]>([])
  const [loadingTours, setLoadingTours] = useState(true)
  const [countries, setCountries] = useState<any[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedMaxPeople, setSelectedMaxPeople] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedStartDate, setSelectedStartDate] = useState<string>('')
  const [selectedEndDate, setSelectedEndDate] = useState<string>('')
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
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

    const fetchCountries = async () => {
      try {
        const collectionName = getCollectionName('travelcountries', i18n.language)
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        const countriesData = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCountries(countriesData)
      } catch (error) {
        console.error('Ülke yükleme hatası:', error)
      }
    }

    fetchTours()
    fetchCountries()
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
    const filtered = tours.filter((tour) => {
      const countryIdOk = !countryId || tour.countryId === countryId

      const destinationOk =
        selectedDestinations.length === 0 ||
        selectedDestinations.some(dest => {
          const country = countries.find(c => c.id === dest || c.title === dest)
          return country && (tour.countryId === dest || tour.countryId === country.title || tour.countryId === country.id)
        })

      const cityOk =
        selectedCities.length === 0 ||
        selectedCities.some(city => {
          if (tour.location && typeof tour.location === 'string') {
            const cities = tour.location.split(',').map((c: string) => c.trim())
            return cities.some((tourCity: string) => tourCity === city)
          }
          return false
        })

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

      const dateOk = (() => {
        if (!selectedStartDate && !selectedEndDate) return true
        
        const tourStartDate = tour.startDate ? new Date(tour.startDate) : null
        const tourEndDate = tour.endDate ? new Date(tour.endDate) : null
        const filterStartDate = selectedStartDate ? new Date(selectedStartDate) : null
        const filterEndDate = selectedEndDate ? new Date(selectedEndDate) : null
        
        // Eğer turda tarih varsa ve filtre tarihi varsa karşılaştır
        if (tourStartDate && filterStartDate) {
          if (tourStartDate < filterStartDate) return false
        }
        if (tourEndDate && filterEndDate) {
          if (tourEndDate > filterEndDate) return false
        }
        if (tourStartDate && filterEndDate) {
          if (tourStartDate > filterEndDate) return false
        }
        if (tourEndDate && filterStartDate) {
          if (tourEndDate < filterStartDate) return false
        }
        
        // Eğer turda tarih yoksa ve tarih filtresi varsa, eşleşmez
        if ((selectedStartDate || selectedEndDate) && !tourStartDate && !tourEndDate) {
          return false
        }
        
        return true
      })()

      const inclusionsOk =
        selectedInclusions.length === 0 ||
        selectedInclusions.some(inc => {
          if (tour.includedInPrice && typeof tour.includedInPrice === 'string') {
            return tour.includedInPrice.includes(inc)
          }
          return false
        })

      const airlineOk =
        selectedAirlines.length === 0 ||
        selectedAirlines.includes(tour.airline || '')

      const pricedOk = !showPricedOnly || !tour.price || tour.price === 0

      const statusOk = tour.status !== 'pasif'

      const allOk = countryIdOk && destinationOk && cityOk && durationOk && maxPeopleOk && priceOk && daysOk && dateOk && inclusionsOk && airlineOk && pricedOk && statusOk

      if (!allOk) {
        console.log('Tour filtered out:', tour.title, { countryIdOk, destinationOk, cityOk, durationOk, maxPeopleOk, priceOk, daysOk, dateOk, inclusionsOk, pricedOk, statusOk })
      }

      return allOk
    })
    console.log('Filtered packages count:', filtered.length, 'selectedDestinations:', selectedDestinations, 'countryId:', countryId)
    return filtered
  }, [tours, selectedDestinations, selectedCities, selectedDurations, selectedMaxPeople, priceRange, selectedDays, selectedStartDate, selectedEndDate, selectedInclusions, selectedAirlines, showPricedOnly, countries, countryId])

  const uniqueDestinations = useMemo(() => {
    const dbDestinations = new Set(tours.map(tour => tour.countryId).filter(Boolean))
    const combined = new Set([ ...Array.from(dbDestinations)])
    return Array.from(combined).sort()
  }, [tours])

  const uniqueCities = useMemo(() => {
    const dbCities = new Set<string>()
    const filteredTours = selectedDestinations.length > 0 ? tours.filter(tour => {
      const country = countries.find(c => c.id === tour.countryId || c.title === tour.countryId)
      return country && (selectedDestinations.includes(country.id) || selectedDestinations.includes(country.title))
    }) : tours
    filteredTours.forEach(tour => {
      if (tour.location && typeof tour.location === 'string') {
        const cities = tour.location.split(',').map((city: string) => city.trim()).filter(Boolean)
        cities.forEach((city: string) => dbCities.add(city))
      }
    })
    return Array.from(dbCities).sort()
  }, [tours, selectedDestinations, countries])

  const uniqueInclusions = useMemo(() => {
    const inclusionMap = new Map<string, string>()
    tours.forEach(tour => {
      if (tour.includedInPrice && typeof tour.includedInPrice === 'string') {
        const items = tour.includedInPrice.split('\n').map((item: string) => item.trim())
        items.forEach((inc: string) => {
          const lower = inc.toLowerCase()
          if (lower && !inclusionMap.has(lower)) {
            inclusionMap.set(lower, inc)
          }
        })
      }
    })
    return Array.from(inclusionMap.values()).sort().slice(0, 10)
  }, [tours])

  const uniqueAirlines = useMemo(() => {
    const airlines = new Set(tours.map(tour => tour.airline).filter(Boolean))
    return Array.from(airlines).sort()
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
          <div className="flex flex-col lg:flex-row lg:gap-12">

            {/* ===== FILTER SIDEBAR (AYNI STİL, SADECE BAĞLI) ===== */}
            <div className="lg:w-1/3 w-full">
              <div className="pb-[10px] mb-8 border-b border-dark-1 border-opacity-10">
                <h4 className="text-lg font-semibold text-dark-1" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.title') : ''}</h4>
              </div>

              {/* CITIES */}
              <aside>
                <h5 className="md:text-md text-base pb-2 font-semibold text-dark-1" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.destination') : ''}</h5>
                <select
                  value={selectedCities[0] || ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedCities([e.target.value])
                    } else {
                      setSelectedCities([])
                    }
                  }}
                  className="w-full  h-12 border border-dark-1 border-opacity-20  outline-0"
                  style={{ backgroundColor: '#fff', color: '#333' }}
                >
                  <option value="">Tüm Şehirler</option>
                  {uniqueCities.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* AIRLINES */}
              <aside>
                <h5 className="md:text-md text-base pb-2 font-semibold text-dark-1">Havayolu Şirketi</h5>
                <select
                  value={selectedAirlines[0] || ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedAirlines([e.target.value])
                    } else {
                      setSelectedAirlines([])
                    }
                  }}
                  className="w-full h-12 border border-dark-1 border-opacity-20 outline-0"
                  style={{ backgroundColor: '#fff', color: '#333' }}
                >
                  <option value="">Tüm Havayolu Şirketleri</option>
                  {uniqueAirlines.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* PRICE FILTER */}
              <aside>
                <h5 className="md:text-md text-base font-semibold text-dark-1" suppressHydrationWarning>
                  {isReady ? t('travel.pages.all.filters.priceRange') : ''}
                </h5>

                <div className="pt-2 flex gap-3 items-center">
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
              
              {/* DATE FILTER */}
              <aside>
                <h5 className="md:text-md text-base font-semibold text-dark-1" suppressHydrationWarning>{isReady ? t('travel.pages.all.filters.days') : ''}</h5>
                 <div className="pt-2 space-y-3">
                  <div className="flex items-center mb-2">
                    <i className="bi bi-calendar mr-2 text-gray-500"></i>
                    <span className="text-sm font-medium mr-2">Başlangıç:</span>
                    <input
                      type="date"
                      value={selectedStartDate}
                      onChange={(e) => setSelectedStartDate(e.target.value)}
                      className="flex-1 h-12 border border-dark-1 border-opacity-20 px-3 outline-0"
                      style={{ backgroundColor: '#fff', color: '#333',borderRadius: '4px' }}
                    />
                  </div>
                  <div className="flex items-center">
                    <i className="bi bi-calendar mr-2 text-gray-500"></i>
                    <span className="text-sm font-medium mr-8">Bitiş:</span>
                    <input
                      type="date"
                      value={selectedEndDate}
                      onChange={(e) => setSelectedEndDate(e.target.value)}
                      className="flex-1 h-12 border border-dark-1 border-opacity-20 px-3 outline-0 ml-3"
                      style={{ backgroundColor: '#fff', color: '#333' }}
                    />
                  </div>
                </div>
              </aside>
         
            </div>

            {/* LIST (AYNI STİL) */}
            <div className="gap-base mt-2">
              {loadingTours ? (
                <div className="col-span-2 text-center py-20">
                  <p className="text-lg text-gray-500" suppressHydrationWarning>{isReady ? t('travel.pages.all.results.loading') : ''}</p>
                </div>
              ) : filteredPackages.length === 0 ? (
                <div className="col-span-2 text-czenter py-20">
                  <p className="text-lg text-gray-500" suppressHydrationWarning>{isReady ? t('travel.pages.all.results.noTours') : ''}</p>
                </div>
              ) : (
             filteredPackages.map((tour) => (
  <div
    key={tour.id}
    className="overflow-hidden relative mb-5 flex bg-gray-50 border border-gray-200"
    style={{ borderRadius: '16px', height: '200px' }}
    onMouseEnter={() => setHoveredCardId(tour.id)}
    onMouseLeave={() => setHoveredCardId(null)}
  >
    {/* IMAGE */}
    <div className="relative" style={{ width: '300px', height: '200px', flexShrink: 0 }}>
      <a href={`/travel/all/${tour.id}`} className="block w-full h-full">
        {tour.mainImageUrl || tour.imageUrl ? (
          <img
            src={tour.mainImageUrl || tour.imageUrl}
            alt={tour.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">
              Görsel Yok
            </span>
          </div>
        )}
      </a>

      {tour.status === 'tükendi' && (
        <span
          className="text-lg font-bold"
          style={{
            fontSize: '16px',
            backgroundColor: '#f8d9d9',
            color: '#cc0000',
            padding: '4px 8px',
            borderRadius: '4px',
            opacity: 0.8,
            position:'absolute',
            left:'4%',
            top:'5%',
          }}
        >
          • TÜKENDİ
        </span>
      )}
    </div>

    {/* CONTENT */}
    <div
      className="p-4 flex flex-col justify-between"
      style={{ width: '550px', minHeight: '200px', maxHeight: '200px' }}
    >
      <div>
        <h3 className="font-bold mb-1 flex items-center gap-2" style={{fontSize:'14px'}}>
          {tour.title}
     
        </h3>

        <p className="font-semibold mb-1" style={clampStyle} >
          {tour.route}
        </p>

        <div className="text-sm font-semibold mb-2" style={clampStyle}>
          <i className="bi bi-geo-alt mr-1"></i> {tour.location}
        </div>

        <div className="text-xs font-semibold whitespace-nowrap">
          GİDİŞ: {tour.startDate ? new Date(tour.startDate).toLocaleDateString('tr-TR') : '-'}
          {' '}–{' '}
          DÖNÜŞ: {tour.endDate ? new Date(tour.endDate).toLocaleDateString('tr-TR') : '-'}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-md font-extrabold">
          {tour.price ? `${tour.price} €` : 'Fiyat Al'}
        </span>
     {tour.airlineLogoUrl && (
            <img src={tour.airlineLogoUrl} alt={tour.airlineName || 'Airline'} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'contain', imageRendering: 'auto',marginBottom: '15px' }} />
          )}
        <button
          onClick={() => router.push(`/travel/all/${tour.id}`)}
        >
          Detay
        </button>
      </div>
    </div>
    </div>
))

              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
