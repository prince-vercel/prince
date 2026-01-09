/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'

import breadcrumbBg from '@/assets/images/backgrounds/breadcrumb-bg.webp'
import breadcrumbShape from '@/assets/images/illustration/breadcrunb__shape.png'
import treeIllustration from '@/assets/images/illustration/tree-illustration.png'

interface Blog {
  id: string
  title: string
  desc: string
  imageUrl: string
  secondaryImage1Url?: string
  secondaryImage2Url?: string
  createdAt?: Date
}

export default function BlogDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      try {
        const docSnapshot = await getDoc(doc(db, 'travelblogs', slug as string))
        if (docSnapshot.exists()) {
          setBlog({
            id: docSnapshot.id,
            ...docSnapshot.data(),
            createdAt: docSnapshot.data().createdAt?.toDate(),
          } as Blog)
        }
      } catch (error) {
        console.error('Blog yükleme hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  if (loading) {
    return <div className="container py-20 text-center">Yükleniyor...</div>
  }

  if (!blog) {
    return <div className="container py-20">Blog bulunamadı</div>
  }

  return (
    <>

      {/* BREADCRUMB */}
       <div className="paralax-container lg:py-20 py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50">
          <img src={breadcrumbBg.src} alt="breadcrumb" className="w-full h-full object-cover" />
        </div>

        <Image src={breadcrumbShape} alt="shape" className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]" />

        <div className="container relative z-2">
          <nav>
            <ol className="breadcrumb2 text-white">
              <li><Link href="/travel">Anasayfa</Link></li>
              <li><Link href="/travel/blog">Blog</Link></li>
            </ol>
          </nav>

          <h2 className="l:text-[54px] mt-2 pb-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
            {blog.title}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className=" lg:pt-[110px] pt-[86px] relative z-1">
        <Image src={treeIllustration} alt="tree" className="absolute top-1/2 -translate-y-1/2 right-0 max-w-[14%] z-minus hidden lg:block" />

        <div className="container">
          <div className="grid grid-cols-12 gap-base">
            <div className="lg:col-span-8 col-span-12">

              <div className="blog__details">

                {/* HEADER */}
                <div className="disc__header text-center lg:pb-7 pb-6 border-b border-stock-1 lg:mb-10">
                  <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: '350px', borderRadius: '8px', objectFit: 'cover' }} />

                  <ul className="flex items-center justify-center lg:text-sm text-xs font-medium text-dark-2 flex-wrap pt-7">
                    <li className="flex items-center pl-2 pr-2">
                      <i className="bi bi-calendar-week" />
                      <span className="ml-2">{blog.createdAt?.toLocaleDateString('tr-TR')}</span>
                    </li>
                  </ul>

                  <h3 className="text-dark-1 font-medium leading-[1.43] lg:text-2xl text-[28px] mt-[14px]">
                    {blog.title}
                  </h3>
                </div>

                {/* BODY */}
                <div className="disc__wrapper">
                  <p>
                    {blog.desc}
                  </p>

                  {(blog.secondaryImage1Url || blog.secondaryImage2Url) && (
                    <div className="grid grid-cols-2 lg:gap-base gap-5 lg:pt-[10px] lg:pb-9 pb-6">
                      {blog.secondaryImage1Url && (
                        <img src={blog.secondaryImage1Url} alt="secondary1" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />
                      )}
                      {blog.secondaryImage2Url && (
                        <img src={blog.secondaryImage2Url} alt="secondary2" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />
                      )}
                    </div>
                  )}
                </div>

                {/* TAGS */}
                <div className="disc__bottom mt-[10px] lg:pt-6 lg:pb-6 pt-5 pb-5 border-t border-b border-stock-2">
                  <Link href="/travel/blog" className="text-primary-1 hover:text-primary-2 font-medium">← Bloğa Dön</Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 col-span-12">


    
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
