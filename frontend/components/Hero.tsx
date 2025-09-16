'use client'

import { ChevronDown, Star, Clock, MapPin } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Rating Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Star className="w-5 h-5 text-gold-400 fill-current mr-2" />
              <span className="text-sm font-medium">4.9/5 Rating • 500+ Reviews</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg">
              Authentic
              <span className="block text-gradient">Oriental Cuisine</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Experience the finest flavors of the East in an elegant atmosphere. 
              Where tradition meets innovation in every dish.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => scrollToSection('menu')}
                className="btn-primary text-lg px-10 py-4"
              >
                Explore Menu
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-secondary text-lg px-10 py-4 border-white text-white hover:bg-white hover:text-dark-900"
              >
                Make Reservation
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Clock className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Open Daily</h3>
                <p className="text-gray-300 text-sm">11:00 AM - 10:00 PM</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <MapPin className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Prime Location</h3>
                <p className="text-gray-300 text-sm">Downtown District</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Star className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Award Winning</h3>
                <p className="text-gray-300 text-sm">Best Oriental 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('about')}
          className="text-white hover:text-gold-400 transition-colors duration-300 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  )
}

