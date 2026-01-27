/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { getCollectionName } from '@/src/lib/localization';
import { useSafeTranslation } from '../../hooks/useSafeTranslation';
import i18n from '../../i18n';


interface Country {
  id: string;
  title: string;
  imageUrl: string;
  price?: number;
  createdAt: any;
  minPrice?: number | null;
}

interface Tour {
  id: string;
  countryId: string;
  price?: number;
  [key: string]: any;
}

const Countries = () => {
  const router = useRouter();
  const { t, isReady } = useSafeTranslation();
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [toursData, setToursData] = useState<Tour[]>([]);
  const [selectedVisa, setSelectedVisa] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ülkeleri çek
        const countriesCollectionName = getCollectionName('travelcountries', i18n.language);
        const countriesQ = query(collection(db, countriesCollectionName), orderBy('createdAt', 'desc'));
        const countriesSnap = await getDocs(countriesQ);
        const countriesData = countriesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Country[];

        // Turları çek ve fiyatları hesapla
        const toursCollectionName = getCollectionName('traveltours', i18n.language);
        const toursQ = query(collection(db, toursCollectionName), orderBy('createdAt', 'desc'));
        const toursSnap = await getDocs(toursQ);

        const toursData = toursSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Tour[];

        setToursData(toursData);

        // Her ülke için en düşük fiyatı hesapla

        const countriesWithMinPrice = countriesData.map(country => {
          const countryTours = toursData.filter((tour: Tour) => tour.countryId === country.id);
          const prices = countryTours
            .map(tour => tour.price)
            .filter((price): price is number => price !== undefined && price !== null && price > 0);
          const minPrice = prices.length > 0 ? Math.min(...prices) : null;
          return {
            ...country,
            minPrice
          };
        });

        setCountryList(countriesWithMinPrice);
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
      }
    };

    fetchData();
  }, [i18n.language]);

  const filteredCountries = useMemo(() => {
    return countryList.filter(country => {
      if (selectedVisa && !toursData.some(tour => tour.countryId === country.id && tour.visaStatus === selectedVisa)) return false;
      if (selectedCategory && !toursData.some(tour => tour.countryId === country.id && tour.category === selectedCategory)) return false;
      if (selectedRegion && !toursData.some(tour => tour.countryId === country.id && tour.region === selectedRegion)) return false;
      return true;
    });
  }, [countryList, selectedVisa, selectedCategory, selectedRegion, toursData]);

  return (
    <div className="container py-10" style={{ marginTop: '120px' }}>
      {/* Filtreler */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex flex-col">
          <select
            value={selectedVisa}
            onChange={(e) => setSelectedVisa(e.target.value)}
            className="px-2 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
          >
            <option value="">Vize durumu</option>
            <option value="Vizesiz">Vizesiz</option>
            <option value="Vizeli">Vizeli</option>
          </select>
        </div>
        <div className="flex flex-col">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
          >
            <option value="">Kategori</option>
            <option value="Gemi turu">Gemi turu</option>
            <option value="Kültür turu">Kültür turu</option>
          </select>
        </div>
        <div className="flex flex-col">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-2 py-2 border border-gray-400 rounded-md bg-white text-gray-900"
          >
            <option value="">Bölge</option>
            <option value="Orta Doğu">Orta Doğu</option>
            <option value="Avrupa">Avrupa</option>
            <option value="Asya">Asya</option>
            <option value="Amerika">Amerika</option>
            <option value="Afrika">Afrika</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {filteredCountries.map((country, index) => (
          <div
            key={`${country.id}-${index}`}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:scale-105 rounded-md transition-all duration-300 group min-h-[350px]"
            onClick={() => router.push(`/travel/all?destination=${country.id}`)}
          >
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-black px-3 py-1 rounded-md font-semibold z-10">
              {country.title}
            </div>
           <div
  className="relative w-full overflow-hidden"
  style={{ height: '350px' }}
>
  <Image
    src={country.imageUrl}
    alt={country.title}
    fill
    style={{ objectFit: 'cover' }}
  />

  <div
    className="absolute"
    style={{
      bottom: '15px',
      right: '12px',
      borderRadius: '8px',
      textAlign: 'right',
      zIndex: 20,
      color: '#fff',
    }}
  >
    {country.minPrice && (
      <>
        <div style={{ fontSize: '35px', fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          €{country.minPrice}
        </div>
        <div style={{ fontSize: '13px', lineHeight: '1', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
          'den başlayan <br /> fiyatlar
        </div>
      </>
    )}
    
  </div>
</div>

        
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;