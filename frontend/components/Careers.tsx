'use client'

import { useState } from 'react'
import { Upload, MapPin, Clock, Users, DollarSign, Briefcase } from 'lucide-react'

export default function Careers() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    cv: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cv: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value)
        }
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/careers`, {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          coverLetter: '',
          cv: null
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

  const jobOpenings = [
    {
      id: 1,
      title: "Head Chef",
      department: "Kitchen",
      location: "Downtown",
      type: "Full-time",
      salary: "$65,000 - $85,000",
      description: "Lead our kitchen team and create innovative Oriental dishes"
    },
    {
      id: 2,
      title: "Sous Chef",
      department: "Kitchen",
      location: "Downtown",
      type: "Full-time",
      salary: "$45,000 - $60,000",
      description: "Support the head chef and manage daily kitchen operations"
    },
    {
      id: 3,
      title: "Server",
      department: "Front of House",
      location: "Downtown",
      type: "Part-time",
      salary: "$15 - $20/hour + tips",
      description: "Provide exceptional service to our valued customers"
    },
    {
      id: 4,
      title: "Host/Hostess",
      department: "Front of House",
      location: "Downtown",
      type: "Part-time",
      salary: "$14 - $18/hour",
      description: "Welcome guests and manage reservations"
    },
    {
      id: 5,
      title: "Kitchen Assistant",
      department: "Kitchen",
      location: "Downtown",
      type: "Full-time",
      salary: "$30,000 - $40,000",
      description: "Support kitchen operations and food preparation"
    },
    {
      id: 6,
      title: "Manager",
      department: "Management",
      location: "Downtown",
      type: "Full-time",
      salary: "$50,000 - $70,000",
      description: "Oversee restaurant operations and staff management"
    }
  ]

  return (
    <section id="careers" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Join Our Team
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-2 mb-6">
            Career
            <span className="block text-gradient">Opportunities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Be part of our passionate team dedicated to delivering exceptional Oriental cuisine 
            and creating memorable dining experiences for our guests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Job Openings */}
          <div>
            <h3 className="text-2xl font-bold text-dark-900 mb-8">Current Openings</h3>
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-dark-900 mb-2">{job.title}</h4>
                      <p className="text-gray-600">{job.description}</p>
                    </div>
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, position: job.title }))}
                    className="btn-primary w-full"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-dark-900 mb-6">Apply Now</h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">Thank you! Your application has been submitted successfully.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">There was an error submitting your application. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a position</option>
                    <option value="Head Chef">Head Chef</option>
                    <option value="Sous Chef">Sous Chef</option>
                    <option value="Server">Server</option>
                    <option value="Host/Hostess">Host/Hostess</option>
                    <option value="Kitchen Assistant">Kitchen Assistant</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="2-3 years">2-3 years</option>
                    <option value="4-5 years">4-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us why you'd like to join our team..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CV/Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-300">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload"
                      required
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <span className="text-primary-600 font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
                    {formData.cv && (
                      <p className="text-sm text-green-600 mt-2">Selected: {formData.cv.name}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-dark-900 text-center mb-12">Why Work With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-dark-900 mb-2">Great Team</h4>
              <p className="text-gray-600">Work with passionate professionals in a supportive environment.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-dark-900 mb-2">Competitive Pay</h4>
              <p className="text-gray-600">We offer competitive salaries and benefits packages.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-dark-900 mb-2">Growth Opportunities</h4>
              <p className="text-gray-600">Advance your career with training and development programs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

