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
  createdAt: any;
}

const Countries = () => {
  const router = useRouter();
  const { t, isReady } = useSafeTranslation();
  const [countryList, setCountryList] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const collectionName = getCollectionName('travelcountries', i18n.language);
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const countriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Country[];
        setCountryList(countriesData);
      } catch (error) {
        console.error('Ülke yükleme hatası:', error);
      }
    };

    fetchCountries();
  }, [i18n.language]);

  return (
    <div className="container py-10" style={{ marginTop: '120px' }}>
      <div className="grid grid-cols-3 gap-6">
        {countryList.map((country, index) => (
          <div
            key={`${country.id}-${index}`}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl rounded-md transition-all duration-300 group"
            onClick={() => router.push(`/travel/all?destination=${country.id}`)}
          >
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 text-black px-3 py-1 rounded-md font-semibold z-10">
              {country.title}
            </div>
            <div className="w-full h-48 overflow-hidden relative">
              <Image
                src={country.imageUrl}
                alt={country.title}
                width={400}
                height={192}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;