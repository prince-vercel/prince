/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'


interface Blog {
  id: string
  title: string
  description: string
  imageUrl: string
  isFavorite: boolean
  createdAt: any
}

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Firebase'den blogları çek
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'medicalblogs'))
        const blogsData: Blog[] = []
        querySnapshot.forEach((doc) => {
          blogsData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
          } as Blog)
        })
        setBlogs(blogsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
      } catch (error) {
        console.error('Blog yükleme hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE)

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return blogs.slice(start, start + POSTS_PER_PAGE)
  }, [currentPage, blogs])

  return (
    <>

      <div className="cs_height_170" />

      <div className="container">
        <ol className="breadcrumb2">
          <li className="breadcrumb-item2">
            <Link href="/medical">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item2 active">Blog</li>
        </ol>

        <div className="cs_height_18" />

        <h1 className="cs_fs_72 mb-0">Psikoloji ve Yaşam Tarzı</h1>

        <div className="cs_height_96 cs_height_lg_70" />

        <div className="row cs_row_gap_50">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
              <p>Bloglar yükleniyor...</p>
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
              <p>Henüz blog yok.</p>
            </div>
          ) : (
            paginatedPosts.map((post) => (
              <div key={post.id} className="col-xl-4 col-md-6">
                <div className="cs_post cs_style_1">
                  <div
                    className="cs_post_thumb cs_view_mouse"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '300px',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(`/medical/blog/${post.id}`)}
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  <div className="cs_post_info">
                    <div>
                      <div className="cs_post_meta">
                        <div className="cs_posted_by">
                          {post.createdAt?.toLocaleDateString('tr-TR')}
                        </div>
                        <div className="cs_post_social">
                          <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                          <a href="#"><i className="fa-brands fa-facebook-f" /></a>
                          <a href="#"><i className="fa-brands fa-twitter" /></a>
                        </div>
                      </div>

                      <h2 className="cs_post_title cs_semibold cs_fs_32">
                        <span>{post.title}</span>
                      </h2>
                    </div>

                    <div className="cs_heading_color cs_medium">
                      <a href="#" className="cs_post_btn">
                        Devamını Oku
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cs_height_110 cs_height_lg_70" />

        <ul className="cs_pagination_box">
          {Array.from({ length: totalPages }).map((_, i) => (
            <li key={i}>
              <button
                className={`cs_pagination_item cs_center ${
                  currentPage === i + 1 ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="cs_height_200 cs_height_xl_150 cs_height_lg_110" />

      <section className="cs_footer_margin_0">
        <div className="container">
          <div className="cs_banner cs_style_9 cs_white_bg cs_radius_30">
            <div className="cs_banner_img">
              <Image
                src="/assets/img/doctors/banner_img_3.png"
                alt="Banner"
                width={600}
                height={400}
              />
            </div>

            <h2 className="cs_banner_title cs_fs_72">
              Sağlığınızı Geri <br /> Planda Bırakmayın!
            </h2>

            <p className="cs_banner_subtitle cs_fs_20 cs_medium m-0">
              Bugün deneyimli tıbbi profesyonellerimizden <br />
              biriyle randevu alın!
            </p>
          </div>
        </div>
      </section>


      <span className="cs_scrollup">
        <i className="fa-solid fa-arrow-up" />
      </span>
    </>
  )
}
