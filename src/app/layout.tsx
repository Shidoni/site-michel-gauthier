import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Michel Gauthier — Artiste peintre',
    template: '%s — Michel Gauthier',
  },
  description: 'Site officiel de Michel Gauthier, artiste peintre. Découvrez ses œuvres, expositions et distinctions.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Michel Gauthier — Artiste peintre',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
