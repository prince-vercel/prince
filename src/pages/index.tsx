import Image from 'next/image'
import Link from 'next/link'

const images = {
  medical: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  visa: 'https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1200&q=80',
  travel: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
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
          <div className="title">Medikal</div>
        </Link>

        <Link href="/visa" className="image-card" style={{ backgroundImage: `url(${images.visa})` }}>
          <div className="overlay-dark" />
          <div className="title">Vize</div>
        </Link>

        <Link href="/travel" className="image-card" style={{ backgroundImage: `url(${images.travel})` }}>
          <div className="overlay-dark" />
          <div className="title">Seyahat</div>
        </Link>

      </div>
    </div>
  )
}
