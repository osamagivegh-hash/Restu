'use client'

import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-gradient mb-4">
              Golden Dragon
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience the finest Oriental cuisine in an elegant atmosphere. 
              We bring authentic flavors and exceptional service to create 
              unforgettable dining experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">123 Oriental Street, Downtown District</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a href="mailto:info@goldendragon.com" className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                  info@goldendragon.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">Daily: 11:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('careers')}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300">Dine In</span>
              </li>
              <li>
                <span className="text-gray-300">Takeout</span>
              </li>
              <li>
                <span className="text-gray-300">Delivery</span>
              </li>
              <li>
                <span className="text-gray-300">Catering</span>
              </li>
              <li>
                <span className="text-gray-300">Private Events</span>
              </li>
              <li>
                <span className="text-gray-300">Reservations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300">Subscribe to our newsletter for special offers and updates</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-r-lg font-medium transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social Media */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Golden Dragon Restaurant. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

