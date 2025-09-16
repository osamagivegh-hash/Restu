import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Golden Dragon - Authentic Oriental Cuisine',
  description: 'Experience the finest Oriental cuisine at Golden Dragon. Authentic flavors, premium ingredients, and exceptional service in an elegant atmosphere.',
  keywords: 'oriental restaurant, chinese food, japanese cuisine, thai food, authentic asian cuisine, fine dining',
  authors: [{ name: 'Golden Dragon Restaurant' }],
  openGraph: {
    title: 'Golden Dragon - Authentic Oriental Cuisine',
    description: 'Experience the finest Oriental cuisine at Golden Dragon. Authentic flavors, premium ingredients, and exceptional service.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golden Dragon - Authentic Oriental Cuisine',
    description: 'Experience the finest Oriental cuisine at Golden Dragon.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

