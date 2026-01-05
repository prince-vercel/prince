/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import breadcrumbBg from '@/assets/images/backgrounds/breadcrumb-bg.webp'
import breadcrumbShape from '@/assets/images/illustration/breadcrunb__shape.png'
import birdWhite from '@/assets/images/illustration/bird-illustration-w.png'
import treeIllustration from '@/assets/images/illustration/tree-illustration.png'
import birdIllustration from '@/assets/images/illustration/bird-illustration.png'

import blog1 from '@/assets/images/blog/bs-1.webp'
import blog2 from '@/assets/images/blog/bs-2.webp'
import blog3 from '@/assets/images/blog/bs-3.webp'

import ts1 from '@/assets/images/blog/ts-1.webp'
import ts2 from '@/assets/images/blog/ts-2.webp'
import ts3 from '@/assets/images/blog/ts-3.webp'

import offerBanner from '@/assets/images/backgrounds/offer-side-banner.webp'
import Header from '@/src/components/TravelComponents/Header'
import Footer from '@/src/components/TravelComponents/Footer'

const BLOGS_PER_PAGE = 2

export const blogs = [
  {
    id: '1',
    title: 'İsviçre’de Trafalgar ile 24 Saat',
    date: '24 Eylül 2022 · 18:30',
    image: blog1,
    desc: 'İsviçre’de geçirdiğimiz unutulmaz bir günün detayları…',
    content: 'BURAYA UZUN BLOG İÇERİĞİ GELECEK',
  },
  {
    id: '2',
    title: 'Alplerin Eteklerinde Bir Gün',
    date: '26 Eylül 2022 · 11:10',
    image: blog2,
    desc: 'Doğa, tren yolları ve eşsiz manzaralar…',
    content: 'BURAYA UZUN BLOG İÇERİĞİ GELECEK',
  },
  {
    id: '3',
    title: 'Zürih’te 48 Saat',
    date: '28 Eylül 2022 · 09:45',
    image: blog3,
    desc: 'Şehir rehberi, yemek durakları ve öneriler…',
    content: 'BURAYA UZUN BLOG İÇERİĞİ GELECEK',
  },
]

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE)
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE
  const currentBlogs = blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE)

  return (
    <>
        <div className="paralax-container lg:py-36 py-20 relative overflow-hidden">
        <div
          className="jarallax absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50 before:z-minus"
          data-jarallax=""
        >
          <img
            className="jarallax-img"
            src={breadcrumbBg.src}
            alt="placeholder"
          />
        </div>

        <img
          src={breadcrumbShape.src}
          alt="placeholder"
          className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]"
        />
        <img
          src={birdWhite.src}
          alt="placeholder"
          className="absolute top-[10%] right-[4%] z-1 w-[7.5%]"
        />

        <div className="container relative z-2">
          <nav>
               <ol className="breadcrumb2" style={{color:'white'}}>
            <li className="breadcrumb-item2">
              <Link href="/travel">Anasayfa</Link>
            </li>
            <li className="breadcrumb-item2"> Blog</li>
          </ol>
          </nav>

          <h2 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
            Blog Yazıları & Seyahat Hikâyeleri
          </h2>
        </div>
      </div>

      <div className="lg:pt-30 pt-24 relative z-1 bg-gradient-to-t to-[#FFF1EC] from-white">
        <Image src={treeIllustration} alt="tree" className="absolute top-1/2 -translate-y-1/2 right-0 max-w-[14%] z-minus hidden lg:block" />
        <Image src={birdIllustration} alt="bird" className="absolute top-[5%] left-[1%] max-w-[9%] z-minus hidden lg:block" />

        <div className="container">
          <div className="grid grid-cols-12 gap-base">

            <div className="lg:col-span-8 col-span-12">
              {currentBlogs.map(blog => (
                <div key={blog.id} className="mt-10 first:mt-0">
                  <Image src={blog.image} alt="blog" className="w-full" />

                  <div className="lg:mt-[34px] mt-6">
                    <ul className="flex items-center text-[13px] font-medium text-dark-2">
                      <li className="flex items-center">
                        <i className="bi bi-calendar-date text-[15px]" />
                        <span className="ml-2">{blog.date}</span>
                      </li>
                    </ul>

                    <h2 className="text-dark-1 font-medium leading-[1.43] lg:text-2xl text-[28px] mt-[14px]">
                      {blog.title}
                    </h2>

                    <p className="regular-text-v1 !leading-1.6 mt-[14px]">
                      {blog.desc}
                    </p>

                    <Link
                      href={`/travel/blog/${blog.id}`}
                      className="group inline-flex items-center mt-6 text-dark-1 font-medium hover:text-primary-1 duration-200"
                    >
                      Devamını Oku
                    </Link>
                  </div>
                </div>
              ))}

              <nav>
                <ul className="flex justify-center items-center space-x-5 pt-[40px]">
                  <li>
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="h-10 w-10 border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white duration-200 disabled:opacity-40"
                    >
                      <i className="bi bi-chevron-left" />
                    </button>
                  </li>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => setCurrentPage(i + 1)}
                        className={`font-medium text-sm duration-150 ${
                          currentPage === i + 1 ? 'text-primary-1' : 'text-dark-1 hover:text-primary-1'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="h-10 w-10 border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white duration-200 disabled:opacity-40"
                    >
                      <i className="bi bi-chevron-right" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="lg:col-span-4 col-span-12">
              <aside className="widget">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Ara..."
                    className="w-full lg:h-[55px] h-[48px] border border-primary-1 bg-transparent outline-none px-5 py-2 text-[15px] text-dark-2 placeholder:text-dark-3 focus:border-secondary-1"
                  />
                  <button className="lg:h-[55px] h-[48px] bg-primary-1 w-14 flex justify-center items-center text-white hover:bg-secondary-1 duration-300">
                    <i className="bi bi-search" />
                  </button>
                </div>
              </aside>

              <aside className="widget lg:mt-12 mt-10">
                        <h4 className="text-dark-1 lg:text-[25px] text-2md leading-[1.6] capitalize font-semibold mb-5">
                  Trend Yazılar</h4>

                {[ts1, ts2, ts3].map((img, i) => (
                  <div key={i} className="flex items-center mt-6 group">
                    <Image src={img} alt="trend" className="w-20 mr-5 group-hover:scale-105 duration-200" />
                    <div>
                      <h5 className="font-semibold group-hover:text-primary-1 duration-200">
                        Avrupa’nın En Az Bilinen Şehirleri
                      </h5>
                      <span className="text-sm text-dark-3">23 Eylül 1999</span>
                    </div>
                  </div>
                ))}
              </aside>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogList
