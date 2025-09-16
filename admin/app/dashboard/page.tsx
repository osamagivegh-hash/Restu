'use client'

import { useEffect, useState } from 'react'
import { Users, MessageSquare, Briefcase, Utensils, TrendingUp, Clock, Megaphone } from 'lucide-react'
import axios from 'axios'

interface DashboardStats {
  totalContacts: number
  totalApplications: number
  totalMenuItems: number
  totalBookings: number
  totalAds: number
  recentContacts: any[]
  recentApplications: any[]
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalApplications: 0,
    totalMenuItems: 0,
    totalBookings: 0,
    totalAds: 0,
    recentContacts: [],
    recentApplications: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [contactsRes, applicationsRes, adsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/contact?limit=5`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/careers?limit=5`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/ads/admin`)
      ])

      setStats({
        totalContacts: contactsRes.data.data?.pagination?.totalContacts || 0,
        totalApplications: applicationsRes.data.data?.pagination?.totalApplications || 0,
        totalMenuItems: 6, // Static for now
        totalBookings: 0, // Will implement booking system
        totalAds: adsRes.data.data?.total || 0,
        recentContacts: contactsRes.data.data?.contacts || [],
        recentApplications: applicationsRes.data.data?.careers || []
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Job Applications',
      value: stats.totalApplications,
      icon: Briefcase,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Menu Items',
      value: stats.totalMenuItems,
      icon: Utensils,
      color: 'bg-yellow-500',
      change: '+2'
    },
    {
      title: 'Ads & News',
      value: stats.totalAds,
      icon: Megaphone,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Bookings',
      value: stats.totalBookings,
      icon: Clock,
      color: 'bg-indigo-500',
      change: '+15%'
    }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Golden Dragon Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h3>
          <div className="space-y-3">
            {stats.recentContacts.length > 0 ? (
              stats.recentContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{contact.formattedDate}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      contact.status === 'new' ? 'bg-red-100 text-red-800' :
                      contact.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent contacts</p>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Job Applications</h3>
          <div className="space-y-3">
            {stats.recentApplications.length > 0 ? (
              stats.recentApplications.map((application, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{application.fullName}</p>
                    <p className="text-sm text-gray-600">{application.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{application.formattedDate}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      application.status === 'new' ? 'bg-red-100 text-red-800' :
                      application.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent applications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

