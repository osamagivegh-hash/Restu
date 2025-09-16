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
              <Star className="w-5 h-5 text-gold-400 fill-current ml-2" />
              <span className="text-sm font-medium font-arabic">تقييم 4.9/5 • 500+ تقييم</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg font-arabic-elegant arabic-heading">
              المطبخ الشرقي
              <span className="block text-gradient">الأصيل</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed font-arabic arabic-text">
              استمتع بأرقى نكهات الشرق في أجواء أنيقة. 
              حيث تلتقي التقاليد بالابتكار في كل طبق.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => scrollToSection('menu')}
                className="btn-primary text-lg px-8 py-4 font-arabic"
              >
                تصفح قائمة الطعام
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-secondary text-lg px-8 py-4 font-arabic"
              >
                احجز طاولة
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-6 h-6 text-gold-400" />
                <div className="text-right">
                  <p className="text-sm font-medium font-arabic">مفتوح يومياً</p>
                  <p className="text-xs text-gray-300 font-arabic">11:00 ص - 11:00 م</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MapPin className="w-6 h-6 text-gold-400" />
                <div className="text-right">
                  <p className="text-sm font-medium font-arabic">الموقع</p>
                  <p className="text-xs text-gray-300 font-arabic">شارع الشرق، وسط البلد</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Star className="w-6 h-6 text-gold-400" />
                <div className="text-right">
                  <p className="text-sm font-medium font-arabic">تقييم ممتاز</p>
                  <p className="text-xs text-gray-300 font-arabic">4.9/5 من العملاء</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('about')}
          className="animate-bounce text-white hover:text-gold-400 transition-colors duration-300"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  )
}