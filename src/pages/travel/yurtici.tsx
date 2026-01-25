/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
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
  createdAt: any;
  // ...other fields if needed
}

const Countries = () => {
  const router = useRouter();
  const { t, isReady } = useSafeTranslation();
  const [countryList, setCountryList] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ülkeleri çek
        const countriesCollectionName = getCollectionName('travelturkiye', i18n.language);
        const countriesQ = query(collection(db, countriesCollectionName), orderBy('createdAt', 'desc'));
        const countriesSnap = await getDocs(countriesQ);
        const countriesData = countriesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Country[];

        // Turları çek ve fiyatları hesapla
        const toursCollectionName = getCollectionName('travelyurtici', i18n.language);
        const toursQ = query(collection(db, toursCollectionName), orderBy('createdAt', 'desc'));
        const toursSnap = await getDocs(toursQ);
        const toursData = toursSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Tour[];

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

  return (
    <div className="container py-10" style={{ marginTop: '120px' }}>
      
      <div className="grid grid-cols-3 gap-6">
        {countryList.map((country, index) => (
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
                   <div style={{ fontSize: '35px', fontWeight: 700 ,marginBottom: '10px'}}>
                     €{country.minPrice}
                   </div>
                   <div style={{ fontSize: '13px', lineHeight: '1' }}>
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