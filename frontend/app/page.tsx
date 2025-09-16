'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import MenuPreview from '@/components/MenuPreview'
import Careers from '@/components/Careers'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="min-h-screen font-arabic">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <About />
      <MenuPreview />
      <Careers />
      <Contact />
      <Footer />
    </main>
  )
}

