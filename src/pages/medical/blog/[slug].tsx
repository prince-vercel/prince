/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/src/lib/firebase'

interface Blog {
  id: string
  title: string
  description: string
  imageUrl: string
  isFavorite: boolean
  createdAt: any
}

export default function BlogDetailPage() {
  const router = useRouter()
  const { slug } = router.query
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      try {
        setLoading(true)
        const docRef = doc(db, 'medicalblogs', String(slug))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const blogData = {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate(),
          } as Blog
          setBlog(blogData)
        } else {
          setError('Blog bulunamadı')
        }
      } catch (err) {
        console.error('Blog yükleme hatası:', err)
        setError('Blog yüklenirken hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  if (!slug || loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        {loading ? 'Blog yükleniyor...' : 'Yükleniyor...'}
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
        {error || 'Blog bulunamadı'}
      </div>
    )
  }

  return (
    <>
      <div className="container">
        <ol className="breadcrumb2">
          <li className="breadcrumb-item2">
            <Link href="/medical">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item2">
            <Link href="/medical/blog">Blog</Link>
          </li>
          <li className="breadcrumb-item2 active">
            {blog.title}
          </li>
        </ol>

        <div className="cs_height_18" />

        <h1 className="cs_fs_72 mb-0">
          {blog.title}
        </h1>

        <div className="cs_height_54" />

        <div className="cs_blog_details_info" style={{margin:'15px'}}>
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_date">
              {blog.createdAt?.toLocaleDateString('tr-TR')} | Blog Yöneticisi
            </div>
          </div>

          <div className="cs_social_links_wrap">
            <h2>Paylaş:</h2>
            <div className="cs_social_links">
              <a href="#"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="#"><i className="fa-brands fa-twitter" /></a>
            </div>
          </div>
        </div>

        <div className="cs_height_55" />

        <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', borderRadius: '12px' }}>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="cs_height_90 cs_height_lg_50" />

        <div className="row" style={{marginTop:'50px'}}>
          <div className="col-lg-8">
            <div className="cs_blog_details">
              <h2>Blog İçeriği</h2>

              <p>
                {blog.description}
              </p>

              <h2>Yorumlar</h2>
            </div>

            <div className="cs_height_85" />

            <div className="cs_height_110" />

            <div className="cs_height_12" />

            <form>
              <label className="cs_input_label">Yorum*</label>
              <textarea rows={6} className="cs_form_field_2" />

              <div className="cs_height_20" />

              <label className="cs_input_label">Adınız*</label>
              <input type="text" className="cs_form_field_2" />

              <div className="cs_height_20" />

              <label className="cs_input_label">E-Posta*</label>
              <input type="email" className="cs_form_field_2" />

              <div className="cs_height_40" />

              <button className="cs_btn cs_style_1" style={{marginTop:'20px'}}>
                <span>Gönder</span>
              </button>
            </form>
          </div>


        </div>

        <div className="cs_height_135" />
      </div>

    </>
  )
}
