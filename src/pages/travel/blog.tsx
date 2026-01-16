/* eslint-disable @next/next/no-img-element */
'use client'

import { db } from '@/src/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSafeTranslation } from '../../hooks/useSafeTranslation'
import { getCollectionName } from '../../lib/localization'
import i18n from '../../i18n'
import '../../i18n'

interface Blog {
  id: string
  title: string
  desc: string
  imageUrl: string
  createdAt?: Date
}

const BLOGS_PER_PAGE = 6



const BlogList = () => {
  const { t, isReady } = useSafeTranslation()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Firebase'den blogları çek
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const collectionName = getCollectionName('travelblogs', i18n.language)
        const querySnapshot = await getDocs(collection(db, collectionName))
        const blogsData: Blog[] = []
        querySnapshot.forEach((doc) => {
          blogsData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
          } as Blog)
        })
        setBlogs(blogsData.sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)))
      } catch (error) {
        const errorMsg = isReady ? t('travel.pages.blog.errors.loading') : 'Blog yükleme hatası:'
        console.error(errorMsg, error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [i18n.language])

  return (
    <>
      <div className="paralax-container lg:py-20 py-12 relative overflow-hidden" style={{ backgroundColor: '#d7b76e' }}>
        <div className="absolute inset-0 z-minus before:content-[''] before:absolute before:inset-0 before:bg-[#030610] before:bg-opacity-50">
        </div>

        <img
          src="/assets/images/illustration/breadcrunb__shape.png"
          alt="placeholder"
          className="absolute bottom-0 left-0 z-1 lg:w-[12.5%] w-[20%]"
        />


        <div className="container relative z-2">
          <nav>
            <ol className="breadcrumb2" style={{ color: 'white' }}>
              <li className="breadcrumb-item2">
                <Link href="/travel" suppressHydrationWarning>{isReady ? t('travel.pages.breadcrumb.home') : ''}</Link>
              </li>
              <li className="breadcrumb-item2" suppressHydrationWarning> {isReady ? t('travel.pages.blog.breadcrumb') : ''}</li>
            </ol>
          </nav>

          <h2 className="l:text-[54px] pb-5 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]" suppressHydrationWarning>
            {isReady ? t('travel.pages.blog.title') : ''}
          </h2>
        </div>
      </div>

      <div className="lg:pt-30 pt-24 relative z-1">
        <Image src="/assets/images/illustration/tree-illustration.png" alt="tree" className="absolute top-1/2 -translate-y-1/2 right-0 max-w-[14%] z-minus hidden lg:block" width={100} height={100} />

        <div className="container">
          <div className="grid grid-cols-12">

            <div className="col-span-12">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', width: '100%', height: '300px' }} suppressHydrationWarning>
                  {isReady ? t('travel.pages.blog.loading') : ''}
                </div>
              ) : blogs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', width: '100%', height: '300px' }} suppressHydrationWarning>
                  {isReady ? t('travel.pages.blog.noBlogs') : ''}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 md:gap-x-32 gap-y-16">
                    {blogs.slice((currentPage - 1) * BLOGS_PER_PAGE, currentPage * BLOGS_PER_PAGE).map(blog => (
                      <div key={blog.id} className="mt-0 px-4 md:px-6">
                        <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />

                        <div className="lg:mt-[24px] mt-5">
                          <ul className="flex items-center text-[13px] font-medium text-dark-2">
                            <li className="flex items-center">
                              <i className="bi bi-calendar-date text-[15px]" />
                              <span className="ml-2">{blog.createdAt?.toLocaleDateString('tr-TR')}</span>
                            </li>
                          </ul>

                          <h2 className="text-dark-1 font-medium leading-[1.43] lg:text-l text-lg mt-[14px]">
                            {blog.title}
                          </h2>

                          <Link
                            href={`/travel/blog/${blog.id}`}
                            className="group inline-flex items-center mt-1 text-dark-1 font-medium hover:text-primary-1 duration-200"
                            suppressHydrationWarning
                          >
                            {isReady ? t('travel.pages.blog.view') : ''}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

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

                      {Array.from({ length: Math.ceil(blogs.length / BLOGS_PER_PAGE) }).map((_, i) => (
                        <li key={i}>
                          <button
                            onClick={() => setCurrentPage(i + 1)}
                            className={`font-medium text-sm duration-150 ${currentPage === i + 1 ? 'text-primary-1' : 'text-dark-1 hover:text-primary-1'
                              }`}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </button>
                        </li>
                      ))}

                      <li>
                        <button
                          disabled={currentPage === Math.ceil(blogs.length / BLOGS_PER_PAGE)}
                          onClick={() => setCurrentPage(p => p + 1)}
                          className="h-10 w-10 border border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white duration-200 disabled:opacity-40"
                        >
                          <i className="bi bi-chevron-right" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </>
              )}
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default BlogList
