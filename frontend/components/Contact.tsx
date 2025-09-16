'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-2 mb-6">
            Contact
            <span className="block text-gradient">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have questions, feedback, or want to make a reservation, 
            we're here to help make your experience exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-dark-900 mb-8">Visit Us</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 mb-1">Address</h4>
                  <p className="text-gray-600">
                    123 Oriental Street<br />
                    Downtown District<br />
                    City, State 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 mb-1">Phone</h4>
                  <p className="text-gray-600">
                    <a href="tel:+1234567890" className="hover:text-primary-600 transition-colors duration-300">
                      (123) 456-7890
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 mb-1">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:info@goldendragon.com" className="hover:text-primary-600 transition-colors duration-300">
                      info@goldendragon.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-900 mb-1">Hours</h4>
                  <div className="text-gray-600">
                    <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                    <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                    <p>Sunday: 12:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">123 Oriental Street, Downtown</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-dark-900 mb-6">Send us a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">There was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="Reservation">Make a Reservation</option>
                      <option value="Catering">Catering Inquiry</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Complaint">Complaint</option>
                      <option value="General">General Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-semibold text-dark-900 mb-2">Call Us</h4>
            <p className="text-gray-600">For immediate assistance or reservations</p>
            <a href="tel:+1234567890" className="text-primary-600 hover:text-primary-700 font-medium">
              (123) 456-7890
            </a>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-semibold text-dark-900 mb-2">Email Us</h4>
            <p className="text-gray-600">For detailed inquiries or feedback</p>
            <a href="mailto:info@goldendragon.com" className="text-primary-600 hover:text-primary-700 font-medium">
              info@goldendragon.com
            </a>
          </div>

          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-semibold text-dark-900 mb-2">Visit Us</h4>
            <p className="text-gray-600">Experience our atmosphere in person</p>
            <span className="text-primary-600 font-medium">123 Oriental Street</span>
          </div>
        </div>
      </div>
    </section>
  )
}

