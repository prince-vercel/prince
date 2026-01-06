/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

import breadcrumbBg from "../../../assets/images/backgrounds/breadcrumb-bg.webp";
import breadcrumbShape from "../../../assets/images/illustration/breadcrunb__shape.png";
import birdWhite from "../../../assets/images/illustration/bird-illustration-w.png";

export default function PackageList() {
  const router = useRouter()
  const { destination } = router.query
  const [tours, setTours] = useState<any[]>([])
  const [loadingTours, setLoadingTours] = useState(true)
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedMaxPeople, setSelectedMaxPeople] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const q = query(collection(db, 'traveltours'), orderBy('createdAt', 'desc'))
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
  }, [])

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

      return destinationOk && durationOk && maxPeopleOk && priceOk
    })
  }, [tours, selectedDestinations, selectedDurations, selectedMaxPeople, priceRange])

  const uniqueDestinations = useMemo(() => {
    const defaultDestinations = ["İstanbul","Ankara","İzmir","Antalya","Bursa"]
    const dbDestinations = new Set(tours.map(tour => tour.location).filter(Boolean))
    const combined = new Set([...defaultDestinations, ...Array.from(dbDestinations)])
    return Array.from(combined).sort()
  }, [tours])

  const uniqueDurations = useMemo(() => {
    const defaultDurations = ["2 Gün 2 Gece","3 Gün 3 Gece","4 Gün 5 Gece","5 Gün 6 Gece"]
    const dbDurations = new Set(tours.map(tour => tour.duration).filter(Boolean))
    const combined = new Set([...defaultDurations, ...Array.from(dbDurations)])
    return Array.from(combined)
  }, [tours])

  return (
    <>

      {/* ===== HERO / BREADCRUMB (AYNI) ===== */}
      <div className="paralax-container lg:py-20 py-12 relative overflow-hidden">
        <div className="absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50">
          <img src={breadcrumbBg.src} alt="breadcrumb" className="w-full h-full object-cover" />
        </div>

        <img src={breadcrumbShape.src} alt="shape" className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]" />
        <img src={birdWhite.src} alt="bird" className="absolute top-[10%] right-[4%] z-1 w-[7.5%]" />

        <div className="container relative z-2 pb-10">
          <ol className="breadcrumb2" style={{color:'white'}}>
            <li className="breadcrumb-item2">
              <Link href="/travel">Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2"> Seyahatler</li>
          </ol>

          <h2 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white font-medium max-w-[640px]">
            Arid Most Popular Tours
          </h2>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative">
        <div className="container mt-10">
          <div className="grid grid-cols-12 lg:gap-12 gap-base">

            {/* LIST (AYNI STİL) */}
            <div className="lg:col-span-8 col-span-12 grid md:grid-cols-2 grid-cols-1 gap-base">
              {loadingTours ? (
                <div className="col-span-2 text-center py-20">
                  <p className="text-lg text-gray-500">Turlar yükleniyor...</p>
                </div>
              ) : filteredPackages.length === 0 ? (
                <div className="col-span-2 text-center py-20">
                  <p className="text-lg text-gray-500">Tur bulunamadı</p>
                </div>
              ) : (
                filteredPackages.map((tour) => (
                  <div key={tour.id} className="group/card package-card-style-one">
                    <div className="overflow-hidden relative" style={{height: '280px', maxHeight: '280px'}}>
                      <a href={`/travel/all/${tour.id}`} className="block w-full h-full">
                        {tour.mainImageUrl || tour.imageUrl ? (
                          <img
                            src={tour.mainImageUrl || tour.imageUrl}
                            alt={tour.title}
                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            className="group-hover/card:scale-105 duration-300"
                          />
                        ) : (
                          <div style={{width: '100%', height: '100%'}} className="bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Görsel Yok</span>
                          </div>
                        )}
                      </a>
                    </div>

                    <h3 className="card-title-alpha group-hover/card:text-primary-1 lg:mt-6 mt-5">
                      <a href={`/travel/all/${tour.id}`}>{tour.title}</a>
                    </h3>

                    <ul className="flex flex-wrap text-sm font-medium text-dark-2 mt-4 package-feature">
                      <li className="mr-4 ">
                        <i className="bi bi-people text-primary-1 ml-1 mr-2"></i>{tour.maxPeople || 10} Kişi
                      </li>
                      <li className="mr-4">
                        <i className="bi bi-clock text-primary-1 mr-2"></i>
                        {tour.duration || '4 Gün 5 Gece'}
                      </li>
                      <li>
                        <i className="bi bi-geo-alt text-primary-1 mr-2"></i>
                        {tour.location || 'Destination'}
                      </li>
                    </ul>

                    <a href={`/travel/all/${tour.id}`} className="package-explore-btn">
                      Şimdi Keşfet
                    </a>
                  </div>
                ))
              )}
            </div>

            {/* ===== FILTER SIDEBAR (AYNI STİL, SADECE BAĞLI) ===== */}
            <div className="lg:col-span-4 col-span-12">
              <div className="pb-[10px] mb-8 border-b border-dark-1 border-opacity-10">
                <h4 className="text-lg font-semibold text-dark-1">Filtrele</h4>
              </div>

            {/* PRICE FILTER */}
            <aside>
              <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">
                Fiyat Aralığı (₺):
              </h5>

              <div className="pt-4 flex gap-3 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full h-12 border border-dark-1 border-opacity-20 px-3 outline-0"
                />

                <span className="text-dark-2">–</span>

                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-12 border border-dark-1 border-opacity-20 px-3 outline-0"
                />
              </div>
            </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* DESTINATIONS */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">Şehir</h5>
                <ul className="pt-4">
                  {uniqueDestinations.map((item, i) => (
                    <li key={i} className="pt-3 first:pt-0">
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`des-${i}`}
                          checked={selectedDestinations.includes(item)}
                          onChange={() =>
                            toggleValue(item, selectedDestinations, setSelectedDestinations)
                          }
                        />
                        <label htmlFor={`des-${i}`}>{item}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* DURATION */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">Gün Sayısı</h5>
                <ul className="pt-4">
                  {uniqueDurations.map((item, i) => (
                    <li key={i} className="pt-3 first:pt-0">
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`dur-${i}`}
                          checked={selectedDurations.includes(item)}
                          onChange={() =>
                            toggleValue(item, selectedDurations, setSelectedDurations)
                          }
                        />
                        <label htmlFor={`dur-${i}`}>{item}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* MAX PEOPLE */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">Maks Kişi Sayısı</h5>
                <ul className="pt-4">
                  {[{label: "5-10 kişi", value: "5-10"}, {label: "10-20 kişi", value: "10-20"}, {label: "20+ kişi", value: "20+"}].map((item, i) => (
                    <li key={i} className="pt-3 first:pt-0">
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`people-${i}`}
                          checked={selectedMaxPeople.includes(item.value)}
                          onChange={() =>
                            toggleValue(item.value, selectedMaxPeople, setSelectedMaxPeople)
                          }
                        />
                        <label htmlFor={`people-${i}`}>{item.label}</label>
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
