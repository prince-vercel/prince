'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import blogDetailsImg from '@/assets/img/blog/blog_details_1.jpeg'
import authorImg from '@/assets/img/blog/author.png'

import Header from '@/src/components/MedicalComponents/Header'
import Footer from '@/src/components/MedicalComponents/Footer'

export default function BlogDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug) return null

  return (
    <>
      <Header />

      <div className="cs_height_170" />

      <div className="container">
        <ol className="breadcrumb2">
          <li className="breadcrumb-item2">
            <Link href="/medical">Home</Link>
          </li>
          <li className="breadcrumb-item2">
            <Link href="/medical/blog">Blog</Link>
          </li>
          <li className="breadcrumb-item2 active">
            The Importance of Mental Health: Understanding and Managing Anxiety Disorders
          </li>
        </ol>

        <div className="cs_height_18" />

        <h1 className="cs_fs_72 mb-0">
          The Importance of Mental Health: Understanding and Managing Anxiety Disorders
        </h1>

        <div className="cs_height_54" />

        <div className="cs_blog_details_info" style={{margin:'15px'}}>
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_tags">
              <Link href="/medical/blog">Emergency</Link>
              <Link href="/medical/blog">Pediatric</Link>
              <Link href="/medical/blog">Cardiology</Link>
              <Link href="/medical/blog">Psychiatry</Link>
              <Link href="/medical/blog">Others</Link>
            </div>
            <div className="cs_blog_details_date">
              March 12, 2023 | Debri Bianca
            </div>
          </div>

          <div className="cs_social_links_wrap">
            <h2>Share:</h2>
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
              <h2>What is Anxiety Disorders</h2>

              <p>
                Anxiety disorders are a type of mental health disorder characterized by
                feelings of worry, anxiety, or fear that are strong enough to interfere
                with ones daily activities.
              </p>

              <ol>
                <li>
                  <b>Generalized Anxiety Disorder (GAD)</b>
                </li>
                <li>
                  <b>Panic Disorder</b>
                </li>
                <li>
                  <b>Social Anxiety Disorder</b>
                </li>
                <li>
                  <b>Obsessive-Compulsive Disorder (OCD)</b>
                </li>
                <li>
                  <b>Post-Traumatic Stress Disorder (PTSD)</b>
                </li>
              </ol>

              

              <h2>Yorumlar</h2>

            </div>

            <div className="cs_height_85" />

            <div className="cs_height_110" />


            <div className="cs_height_12" />

            <form>
              <label className="cs_input_label">Comment*</label>
              <textarea rows={6} className="cs_form_field_2" />

              <div className="cs_height_20" />

              <label className="cs_input_label">Your Name*</label>
              <input type="text" className="cs_form_field_2" />

              <div className="cs_height_20" />

              <label className="cs_input_label">Your Email*</label>
              <input type="email" className="cs_form_field_2" />

              <div className="cs_height_40" />

              <button className="cs_btn cs_style_1" style={{marginTop:'20px'}}>
                <span>Submit</span>
              </button>
            </form>
          </div>

          <div className="col-lg-4">
            <div className="cs_sidebar">
              <div className="cs_sidebar_item">
                <h2 className="cs_sidebar_widget_title">Popular Categories</h2>
                <ul>
                  <li><a href="#">Health Tips</a></li>
                  <li><a href="#">Trends</a></li>
                  <li><a href="#">Time Management</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="cs_height_135" />
      </div>

      <Footer />
    </>
  )
}
