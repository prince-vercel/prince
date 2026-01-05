'use client'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import breadcrumbBg from '@/assets/images/backgrounds/breadcrumb-bg.webp'
import breadcrumbShape from '@/assets/images/illustration/breadcrunb__shape.png'
import birdWhite from '@/assets/images/illustration/bird-illustration-w.png'
import treeIllustration from '@/assets/images/illustration/tree-illustration.png'
import birdIllustration from '@/assets/images/illustration/bird-illustration.png'

import blogVideo from '@/assets/images/blog/blog-video.webp'
import videoIcon from '@/assets/images/icons/video-circle.svg'
import disc1 from '@/assets/images/details/des-disc-1.webp'
import disc2 from '@/assets/images/details/des-disc-2.webp'

import Header from '@/src/components/TravelComponents/Header'
import Footer from '@/src/components/TravelComponents/Footer'

import blog1 from '@/assets/images/blog/bs-1.webp'
import blog2 from '@/assets/images/blog/bs-2.webp'
import blog3 from '@/assets/images/blog/bs-3.webp'

import ts1 from '@/assets/images/blog/ts-1.webp'
import ts2 from '@/assets/images/blog/ts-2.webp'
import ts3 from '@/assets/images/blog/ts-3.webp'

const blogs = [
  {
    id: '1',
    title: 'İsviçre’de Trafalgar ile 24 Saat',
    date: '24 Sep 2022 · 6:30 PM',
    image: blog1,
  },
  {
    id: '2',
    title: 'Alplerin Eteklerinde Bir Gün',
    date: '26 Sep 2022 · 11:10 AM',
    image: blog2,
  },
  {
    id: '3',
    title: 'Zürih’te 48 Saat',
    date: '28 Sep 2022 · 09:45 AM',
    image: blog3,
  },
]

export default function BlogDetail() {
  const router = useRouter()
  const { slug } = router.query
  const blog = blogs.find(b => b.id === slug)

  if (!blog) {
    return <div className="container py-20">Blog bulunamadı</div>
  }

  return (
    <>

      {/* BREADCRUMB */}
      <div className="paralax-container lg:py-36 py-20 relative overflow-hidden">
        <div className="jarallax absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50 before:z-minus">
          <Image src={breadcrumbBg} alt="breadcrumb" fill className="object-cover" />
        </div>

        <Image src={breadcrumbShape} alt="shape" className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]" />
        <Image src={birdWhite} alt="bird" className="absolute top-[10%] right-[4%] z-1 w-[7.5%]" />

        <div className="container relative z-2">
          <nav>
            <ol className="breadcrumb2 text-white">
              <li><Link href="/travel">Anasayfa</Link></li>
              <li>Blog</li>
              <li className="active_page">{blog.title}</li>
            </ol>
          </nav>

          <h2 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
            {blog.title}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-gradient-to-t to-[#FFF1EC] from-white lg:pt-[110px] pt-[86px] relative z-1">
        <Image src={treeIllustration} alt="tree" className="absolute top-1/2 -translate-y-1/2 right-0 max-w-[14%] z-minus hidden lg:block" />
        <Image src={birdIllustration} alt="bird" className="absolute top-[5%] left-[1%] max-w-[9%] z-minus hidden lg:block" />

        <div className="container">
          <div className="grid grid-cols-12 gap-base">
            <div className="lg:col-span-8 col-span-12">

              <div className="blog__details">

                {/* HEADER */}
                <div className="disc__header text-center lg:pb-7 pb-6 border-b border-stock-1 lg:mb-10">
                  <Image src={blog.image} alt={blog.title} className="w-full" />

                  <ul className="flex items-center justify-center lg:text-sm text-xs font-medium text-dark-2 flex-wrap pt-7">
                    <li className="flex items-center pl-2 pr-2">
                      <i className="bi bi-calendar-week" />
                      <span className="ml-2">{blog.date}</span>
                    </li>
                    <li className="pl-2 pr-2">250 View</li>
                    <li className="pl-2 pr-2">02 Comments</li>
                  </ul>

                  <h3 className="text-dark-1 font-medium leading-[1.43] lg:text-2xl text-[28px] mt-[14px]">
                    {blog.title}
                  </h3>
                </div>

                {/* BODY */}
                <div className="disc__wrapper">
                  <p>
                    Al elit omnes impedit ius, vel et hinc agam fabulas. Ut audiam invenire iracundia vim.
                  </p>



                  <div className="grid grid-cols-2 lg:gap-base gap-5 lg:pt-[10px] lg:pb-9 pb-6">
                    <Image src={disc1} alt="details" className="w-full" />
                    <Image src={disc2} alt="details" className="w-full" />
                  </div>

                  <ul>
                    <li><i className="bi bi-check-circle" /> Professional Tour Guide</li>
                    <li><i className="bi bi-check-circle" /> Transportation included</li>
                    <li><i className="bi bi-check-circle" /> Full experience</li>
                  </ul>

                  <div className="relative mt-[10px] pb-[20px]">
                    <Image src={blogVideo} alt="video" className="w-full" />
                    <a
                      href="https://www.youtube.com/watch?v=vJoNqBZ9QlM"
                      className="inline-flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:h-20 lg:w-20 h-16 w-16 justify-center items-center rounded-full bg-primary-1 before:content-[''] before:absolute before:-inset-3 before:border-primary-1 before:border-2 before:rounded-full before:animate-pulse"
                    >
                      <Image src={videoIcon} alt="play" />
                    </a>
                  </div>
                </div>

                {/* TAGS */}
                <div className="disc__bottom mt-[10px] lg:pt-6 lg:pb-6 pt-5 pb-5 border-t border-b border-stock-2 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <h5 className="text-dark-1 font-semibold">Popular Tags:</h5>
                    <ul className="flex gap-2">
                      <li><a className="text-dark-3 hover:text-primary-1">Travel,</a></li>
                      <li><a className="text-dark-3 hover:text-primary-1">Hotel,</a></li>
                      <li><a className="text-dark-3 hover:text-primary-1">Tours</a></li>
                    </ul>
                  </div>

                  <button className="text-dark-2 flex items-center gap-2 hover:text-primary-1">
                    Share <i className="bi bi-share" />
                  </button>
                </div>
              </div>
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
