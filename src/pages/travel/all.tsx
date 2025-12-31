/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useMemo, useState } from "react";
import Link from "next/link";

import breadcrumbBg from "../../../assets/images/backgrounds/breadcrumb-bg.webp";
import breadcrumbShape from "../../../assets/images/illustration/breadcrunb__shape.png";
import birdWhite from "../../../assets/images/illustration/bird-illustration-w.png";

import p1 from "../../../assets/images/packages/p1-1.webp";
import p2 from "../../../assets/images/packages/p1-2.webp";
import p3 from "../../../assets/images/packages/p1-3.webp";
import p4 from "../../../assets/images/packages/p1-4.webp";
import p5 from "../../../assets/images/packages/p1-5.webp";
import p6 from "../../../assets/images/packages/p1-6.webp";
import p7 from "../../../assets/images/packages/p1-7.webp";
import p8 from "../../../assets/images/packages/p1-8.webp";

import Header from "@/src/components/TravelComponents/Header";
import Footer from "@/src/components/TravelComponents/Footer";

/* ---------------- DATA ---------------- */
const packages = [
  { image: p1, category: "Adventure", destination: "Italy", duration: "3 - 5 Days", price: 250 },
  { image: p2, category: "Honeymoon", destination: "Maldives", duration: "5 - 7 Days", price: 420 },
  { image: p3, category: "Cruise Tours", destination: "Singapore", duration: "2 - 4 Days", price: 180 },
  { image: p4, category: "City Tours", destination: "Thailand", duration: "Fullday (+8 hours)", price: 90 },
  { image: p5, category: "Museum Tours", destination: "Italy", duration: "2 - 8 hours", price: 60 },
  { image: p6, category: "Adventure", destination: "Hong Kong", duration: "More Than 7 Days", price: 520 },
  { image: p7, category: "City Tours", destination: "Singapore", duration: "3 - 5 Days", price: 210 },
  { image: p8, category: "Honeymoon", destination: "Maldives", duration: "5 - 7 Days", price: 480 },
];

export default function PackageList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);

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
    return packages.filter((pkg) => {
      const categoryOk =
        selectedCategories.length === 0 ||
        selectedCategories.includes(pkg.category);

      const destinationOk =
        selectedDestinations.length === 0 ||
        selectedDestinations.includes(pkg.destination);

      const durationOk =
        selectedDurations.length === 0 ||
        selectedDurations.includes(pkg.duration);

      const priceOk =
        pkg.price >= priceRange[0] && pkg.price <= priceRange[1];

      return categoryOk && destinationOk && durationOk && priceOk;
    });
  }, [selectedCategories, selectedDestinations, selectedDurations, priceRange]);

  return (
    <>
      <Header />

      {/* ===== HERO / BREADCRUMB (AYNI) ===== */}
      <div className="paralax-container lg:py-36 py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50">
          <img src={breadcrumbBg.src} alt="breadcrumb" className="w-full h-full object-cover" />
        </div>

        <img src={breadcrumbShape.src} alt="shape" className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]" />
        <img src={birdWhite.src} alt="bird" className="absolute top-[10%] right-[4%] z-1 w-[7.5%]" />

        <div className="container relative z-2 pb-10">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/travel">Anasayfa</Link>
            </li>
            <li className="breadcrumb-item">/ Seyahatler</li>
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
              {filteredPackages.map((pkg, index) => (
                <div key={index} className="group/card package-card-style-one">
                  <div className="overflow-hidden relative">
                    <a href="/package-details">
                      <img
                        src={pkg.image.src}
                        alt={`package-${index + 1}`}
                        className="w-full group-hover/card:scale-105 duration-300"
                      />
                    </a>
                  </div>

                  <h3 className="card-title-alpha group-hover/card:text-primary-1 lg:mt-6 mt-5">
                    <a href="/package-details">Tour Package {index + 1}</a>
                  </h3>

                  <ul className="flex flex-wrap text-sm font-medium text-dark-2 mt-4 package-feature">
                    <li className="mr-4 ">
                      <i className="bi bi-people text-primary-1 ml-1 "></i>05 People
                    </li>
                    <li className="mr-4">
                      <i className="bi bi-clock text-primary-1 "></i>
                      {pkg.duration}
                    </li>
                    <li>
                      <i className="bi bi-coin text-primary-1 mr-1"></i>
                      From <span className="text-primary-1 font-bold">${pkg.price}</span>
                    </li>
                  </ul>

                  <a href="/package-details" className="package-explore-btn">
                    Explore Now
                  </a>
                </div>
              ))}
            </div>

            {/* ===== FILTER SIDEBAR (AYNI STİL, SADECE BAĞLI) ===== */}
            <div className="lg:col-span-4 col-span-12">
              <div className="pb-[10px] mb-8 border-b border-dark-1 border-opacity-10">
                <h4 className="text-lg font-semibold text-dark-1">Filter by :</h4>
              </div>

{/* PRICE FILTER */}
<aside>
  <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">
    Filter Price:
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

              {/* CATEGORIES */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">Categories</h5>
                <ul className="pt-4">
                  {["Adventure","Day Long Tours","Cruise Tours","Honeymoon","City Tours","Museum Tours"].map((item, i) => (
                    <li key={i} className="pt-3 first:pt-0">
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`cat-${i}`}
                          checked={selectedCategories.includes(item)}
                          onChange={() =>
                            toggleValue(item, selectedCategories, setSelectedCategories)
                          }
                        />
                        <label htmlFor={`cat-${i}`}>{item}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="my-8 h-[3px] bg-[url('../images/illustration/wave.svg')] bg-repeat"></div>

              {/* DESTINATIONS */}
              <aside>
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">Destinations</h5>
                <ul className="pt-4">
                  {["Singapore","Italy","Thailand","Hong Kong","City Tours","Maldives"].map((item, i) => (
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
                <h5 className="lg:text-md text-base pb-2 font-semibold text-dark-1">Duration</h5>
                <ul className="pt-4">
                  {["2 - 8 hours","Fullday (+8 hours)","2 - 4 Days","3 - 5 Days","5 - 7 Days","More Than 7 Days"].map((item, i) => (
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
