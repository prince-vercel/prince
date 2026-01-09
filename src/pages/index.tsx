import Image from 'next/image'
import Link from 'next/link'
import medicalImg from '@/assets/images/medikal.jpeg'
import visaImg from '@/assets/images/vize.jpeg'
import travelImg from '@/assets/images/seyahat.jpeg'

const images = {
  medical: medicalImg.src,
  visa: visaImg.src,
  travel: travelImg.src,
}

export default function HomePage() {
  return (
    <div className="page-wrapper">

   <header className="header">
  <div className="logo-wrapper">
    <Image src="/logo.png" alt="Logo" width={90} height={80} priority />
  </div>
</header>


      <div className="image-row">

        <Link href="/medical" className="image-card" style={{ backgroundImage: `url(${images.medical})` }}>
          <div className="overlay-dark" />
          <div className="title">Prince <br /> Medikal Estetik &<br /> Sağlık Hizmetleri</div>
        </Link>

        <Link href="/visa" className="image-card" style={{ backgroundImage: `url(${images.visa})` }}>
          <div className="overlay-dark" />
          <div className="title">Prince <br /> Vize Danışmanlığı</div>
        </Link>

        <Link href="/travel" className="image-card" style={{ backgroundImage: `url(${images.travel})` }}>
          <div className="overlay-dark" />
          <div className="title">Prince <br /> Turizm & Travel</div>
        </Link>

      </div>
    </div>
  )
}
