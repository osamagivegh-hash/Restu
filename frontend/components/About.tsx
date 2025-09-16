'use client'

import { Award, Users, Clock, Heart } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-2 mb-6">
                A Legacy of
                <span className="block text-gradient">Excellence</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              For over three decades, Golden Dragon has been the premier destination for 
              authentic Oriental cuisine. Our journey began with a simple vision: to bring 
              the rich flavors and traditions of the East to our community.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Today, we continue to honor that tradition while embracing innovation, 
              creating an unforgettable dining experience that celebrates the artistry 
              of Oriental cooking.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">30+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
                <div className="text-gray-600">Signature Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">15</div>
                <div className="text-gray-600">Awards Won</div>
              </div>
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Chef preparing authentic Oriental cuisine"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900">Award Winning</h4>
                  <p className="text-gray-600 text-sm">Best Oriental Restaurant 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
              <Heart className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">Passion</h3>
            <p className="text-gray-600">
              Every dish is crafted with love and dedication to authentic flavors.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">Community</h3>
            <p className="text-gray-600">
              Building lasting relationships with our valued customers and community.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
              <Clock className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">Tradition</h3>
            <p className="text-gray-600">
              Honoring time-tested recipes passed down through generations.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              Committed to delivering exceptional quality in every aspect of service.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

