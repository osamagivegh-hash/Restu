'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, Users, Phone, Mail, Search, Filter, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface Booking {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  specialRequests: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
  formattedDate: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')

  // Sample booking data (in production, fetch from API)
  const sampleBookings: Booking[] = [
    {
      _id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1234567890',
      date: '2024-01-15',
      time: '19:00',
      guests: 4,
      specialRequests: 'Anniversary dinner, table by the window',
      status: 'confirmed',
      createdAt: '2024-01-10T10:00:00Z',
      formattedDate: 'Jan 10, 2024'
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1234567891',
      date: '2024-01-16',
      time: '18:30',
      guests: 2,
      specialRequests: 'Vegetarian options needed',
      status: 'pending',
      createdAt: '2024-01-11T14:30:00Z',
      formattedDate: 'Jan 11, 2024'
    },
    {
      _id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '+1234567892',
      date: '2024-01-17',
      time: '20:00',
      guests: 6,
      specialRequests: 'Business dinner, private room preferred',
      status: 'confirmed',
      createdAt: '2024-01-12T09:15:00Z',
      formattedDate: 'Jan 12, 2024'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(sampleBookings)
      setIsLoading(false)
    }, 1000)
  }, [])

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      // In production, make API call here
      setBookings(prev => prev.map(booking => 
        booking._id === bookingId ? { ...booking, status: newStatus as any } : booking
      ))
      toast.success('Booking status updated successfully')
    } catch (error) {
      console.error('Error updating booking status:', error)
      toast.error('Failed to update booking status')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = bookings.filter(booking =>
    (booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.phone.includes(searchTerm)) &&
    (statusFilter === 'all' || booking.status === statusFilter) &&
    (dateFilter === '' || booking.date === dateFilter)
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage restaurant bookings and reservations</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">{bookings.length}</div>
          <div className="text-sm text-gray-500">Total Bookings</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Customer</th>
                <th className="table-header">Date & Time</th>
                <th className="table-header">Guests</th>
                <th className="table-header">Status</th>
                <th className="table-header">Booked On</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{new Date(booking.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{booking.guests}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(booking.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{booking.formattedDate}</div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="btn-secondary text-sm"
                      >
                        View
                      </button>
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <p className="text-gray-900">{selectedBooking.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedBooking.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedBooking.email}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="text-gray-900">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <p className="text-gray-900">{selectedBooking.time}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guests</label>
                  <p className="text-gray-900">{selectedBooking.guests}</p>
                </div>
              </div>
              
              {selectedBooking.specialRequests && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedBooking.specialRequests}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedBooking.status)}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Booked On</label>
                <p className="text-gray-900">{selectedBooking.formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

