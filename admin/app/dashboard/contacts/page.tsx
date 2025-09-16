'use client'

import { useEffect, useState } from 'react'
import { Eye, CheckCircle, Clock, XCircle, Search, Filter, X } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  createdAt: string
  formattedDate: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchContacts()
  }, [currentPage, statusFilter])

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter })
      })

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/contact?${params}`
      )

      setContacts(response.data.data.contacts)
      setTotalPages(response.data.data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Failed to fetch contacts')
    } finally {
      setIsLoading(false)
    }
  }

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/contact/${contactId}`,
        { status: newStatus }
      )
      
      toast.success('Contact status updated')
      fetchContacts()
    } catch (error) {
      console.error('Error updating contact status:', error)
      toast.error('Failed to update contact status')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4 text-red-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600">Manage customer inquiries and feedback</p>
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
                placeholder="Search contacts..."
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
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Contact</th>
                <th className="table-header">Subject</th>
                <th className="table-header">Status</th>
                <th className="table-header">Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                      {contact.phone && (
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="font-medium">{contact.subject}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(contact.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{contact.formattedDate}</div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="btn-secondary text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="btn-secondary disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="btn-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{selectedContact.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedContact.email}</p>
              </div>
              
              {selectedContact.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <p className="text-gray-900">{selectedContact.subject}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <p className="text-gray-900">{selectedContact.formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

