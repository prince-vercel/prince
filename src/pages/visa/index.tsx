import Link from 'next/link'

export default function VisaPage() {
  return (
    <div className="container p-4">
      <h1>Vize Sayfası</h1>
      <p>Vize içerikleri burada olacak.</p>

      <Link href="/" className="btn btn-dark mt-3">
        Anasayfaya Dön
      </Link>
    </div>
  )
}
