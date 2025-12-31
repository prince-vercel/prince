'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/src/components/MedicalComponents/Header'
import Footer from '@/src/components/MedicalComponents/Footer'

const posts = [
  {
    img: 'post_1.jpeg',
    date: 'March 12',
    title: 'The Importance of Mental Health: Understanding and Managing Anxiety Disorders',
    slug: 'mental-health-anxiety-disorders',
  },
  {
    img: 'post_2.jpeg',
    date: 'March 11',
    title: "A Parent's Guide to Childhood Vaccinations: What You Need to Know",
    slug: 'childhood-vaccinations-guide',
  },
  {
    img: 'post_3.jpeg',
    date: 'March 9',
    title: 'Preventing Heart Disease: Tips for a Heart-Healthy Lifestyle',
    slug: 'preventing-heart-disease',
  },
  {
    img: 'post_4.jpeg',
    date: 'March 8',
    title: 'Managing Chronic Pain: Treatment Options and Strategies',
    slug: 'managing-chronic-pain',
  },
  {
    img: 'post_5.jpeg',
    date: 'March 5',
    title: 'Understanding and Managing Diabetes: Tips for Healthy Living',
    slug: 'managing-diabetes',
  },
  {
    img: 'post_6.jpeg',
    date: 'March 2',
    title: 'The Role of Physical Therapy in Injury Recovery and Prevention',
    slug: 'physical-therapy-injury-recovery',
  },
  {
    img: 'post_7.jpeg',
    date: 'Feb 28',
    title: 'Breaking the Stigma: Raising Awareness for Mental Health Issues',
    slug: 'mental-health-awareness',
  },
  {
    img: 'post_8.jpeg',
    date: 'Feb 26',
    title: 'Allergies and Asthma: Causes, Symptoms, and Treatment Options',
    slug: 'allergies-and-asthma',
  },
  {
    img: 'post_9.jpeg',
    date: 'Feb 25',
    title: 'Caring for Your Skin: Tips for Healthy, Glowing Skin',
    slug: 'healthy-skin-care',
  },
]

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return posts.slice(start, start + POSTS_PER_PAGE)
  }, [currentPage])

  return (
    <>
      <Header />

      <div className="cs_height_170" />

      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/medical">Anasayfa</Link>
          </li>
          <li className="breadcrumb-item active">Blog</li>
        </ol>

        <div className="cs_height_18" />

        <h1 className="cs_fs_72 mb-0">Psychology and Life Style</h1>

        <div className="cs_height_96 cs_height_lg_70" />

        <div className="row cs_row_gap_50">
          {paginatedPosts.map((post, i) => (
            <div key={i} className="col-xl-4 col-md-6">
              <div className="cs_post cs_style_1">
                <Link
                  href={`/medical/blog/${post.slug}`}
                  className="cs_post_thumb cs_view_mouse"
                >
                  <Image
                    src={`/assets/img/blog/${post.img}`}
                    alt={post.title}
                    width={600}
                    height={450}
                    className="w-100 h-auto"
                  />
                </Link>

                <div className="cs_post_info">
                  <div>
                    <div className="cs_post_meta">
                      <div className="cs_posted_by">{post.date}</div>
                      <div className="cs_post_social">
                        <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                        <a href="#"><i className="fa-brands fa-facebook-f" /></a>
                        <a href="#"><i className="fa-brands fa-twitter" /></a>
                      </div>
                    </div>

                    <h2 className="cs_post_title cs_semibold cs_fs_32">
                      <Link href={`/medical/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                  </div>

                  <div className="cs_heading_color cs_medium">
                    <Link
                      href={`/medical/blog/${post.slug}`}
                      className="cs_post_btn"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
              Don’t Let Your Health <br /> Take a Backseat!
            </h2>

            <p className="cs_banner_subtitle cs_fs_20 cs_medium m-0">
              Schedule an appointment with one of our experienced <br />
              medical professionals today!
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <span className="cs_scrollup">
        <i className="fa-solid fa-arrow-up" />
      </span>
    </>
  )
}
