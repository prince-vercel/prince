'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import blogDetailsImg from '@/assets/img/blog/blog_details_1.jpeg'

import Header from '@/src/components/MedicalComponents/Header'
import Footer from '@/src/components/MedicalComponents/Footer'

export default function BlogDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug) return null

  return (
    <>

      <div className="cs_height_170" />

      <div className="container">
        <ol className="breadcrumb2">
          <li className="breadcrumb-item2">
            <Link href="/medical">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item2">
            <Link href="/medical/blog">Blog</Link>
          </li>
          <li className="breadcrumb-item2 active">
            Ruh Sağlığının Önemi: Anksiyete Bozukluğunu Anlamak ve Yönetmek
          </li>
        </ol>

        <div className="cs_height_18" />

        <h1 className="cs_fs_72 mb-0">
          Ruh Sağlığının Önemi: Anksiyete Bozukluğunu Anlamak ve Yönetmek
        </h1>

        <div className="cs_height_54" />

        <div className="cs_blog_details_info" style={{margin:'15px'}}>
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_tags">
              <Link href="/medical/blog">Acil Tıp</Link>
              <Link href="/medical/blog">Pediatri</Link>
              <Link href="/medical/blog">Kardiyoloji</Link>
              <Link href="/medical/blog">Psikiyatri</Link>
              <Link href="/medical/blog">Diğerleri</Link>
            </div>
            <div className="cs_blog_details_date">
              12 Mart 2023 | Debri Bianca
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

        <Image
          src={blogDetailsImg}
          alt="Blog Details"
          width={1200}
          height={700}
          className="w-100 cs_radius_20"
        />

        <div className="cs_height_90 cs_height_lg_50" />

        <div className="row" style={{marginTop:'50px'}}>
          <div className="col-lg-8">
            <div className="cs_blog_details">
              <h2>Anksiyete Bozukluğu Nedir</h2>

              <p>
                Anksiyete bozuklukları, günlük aktiviteleri etkileyecek kadar güçlü bir endişe, kaygı veya korku hissiyle karakterize edilen bir zihinsel sağlık bozukluğudur.
              </p>

              <ol>
                <li>
                  <b>Genelleştirilmiş Anksiyete Bozukluğu (GAD)</b>
                </li>
                <li>
                  <b>Panik Bozukluğu</b>
                </li>
                <li>
                  <b>Sosyal Anksiyete Bozukluğu</b>
                </li>
                <li>
                  <b>Obsesif-Kompulsif Bozukluğu (OKB)</b>
                </li>
                <li>
                  <b>Travma Sonrası Stres Bozukluğu (TSSB)</b>
                </li>
              </ol>

              

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

          <div className="col-lg-4">
            <div className="cs_sidebar">
              <div className="cs_sidebar_item">
                <h2 className="cs_sidebar_widget_title">Popüler Kategoriler</h2>
                <ul>
                  <li><a href="#">Sağlık İpuçları</a></li>
                  <li><a href="#">Trendler</a></li>
                  <li><a href="#">Zaman Yönetimi</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="cs_height_135" />
      </div>

    </>
  )
}
