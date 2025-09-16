'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export default function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gradient font-arabic-elegant">
              التنين الذهبي
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <button
              onClick={() => scrollToSection('home')}
              className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-300 arabic-text"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-300 arabic-text"
            >
              من نحن
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-300 arabic-text"
            >
              قائمة الطعام
            </button>
            <button
              onClick={() => scrollToSection('careers')}
              className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-300 arabic-text"
            >
              الوظائف
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-300 arabic-text"
            >
              اتصل بنا
            </button>
            <button className="btn-primary font-arabic">
              احجز طاولة
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-right text-dark-700 hover:text-primary-600 font-medium py-2 transition-colors duration-300 arabic-text"
              >
                الرئيسية
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-right text-dark-700 hover:text-primary-600 font-medium py-2 transition-colors duration-300 arabic-text"
              >
                من نحن
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="block w-full text-right text-dark-700 hover:text-primary-600 font-medium py-2 transition-colors duration-300 arabic-text"
              >
                قائمة الطعام
              </button>
              <button
                onClick={() => scrollToSection('careers')}
                className="block w-full text-right text-dark-700 hover:text-primary-600 font-medium py-2 transition-colors duration-300 arabic-text"
              >
                الوظائف
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-right text-dark-700 hover:text-primary-600 font-medium py-2 transition-colors duration-300 arabic-text"
              >
                اتصل بنا
              </button>
              <button className="btn-primary w-full mt-4 font-arabic">
                احجز طاولة
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}