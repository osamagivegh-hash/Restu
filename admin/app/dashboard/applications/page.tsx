'use client'

import { useEffect, useState } from 'react'
import { Eye, Download, CheckCircle, Clock, XCircle, Search, Filter, X } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Application {
  _id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  position: string
  experience: string
  coverLetter: string
  cvOriginalName: string
  cvSize: number
  formattedFileSize: string
  status: string
  createdAt: string
  formattedDate: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchApplications()
  }, [currentPage, statusFilter, positionFilter])

  const fetchApplications = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(positionFilter !== 'all' && { position: positionFilter })
      })

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/careers?${params}`
      )

      setApplications(response.data.data.careers)
      setTotalPages(response.data.data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast.error('Failed to fetch applications')
    } finally {
      setIsLoading(false)
    }
  }

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/careers/${applicationId}`,
        { status: newStatus }
      )
      
      toast.success('Application status updated')
      fetchApplications()
    } catch (error) {
      console.error('Error updating application status:', error)
      toast.error('Failed to update application status')
    }
  }

  const downloadCV = async (applicationId: string, fileName: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/careers/${applicationId}/cv`,
        { responseType: 'blob' }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success('CV downloaded successfully')
    } catch (error) {
      console.error('Error downloading CV:', error)
      toast.error('Failed to download CV')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4 text-red-500" />
      case 'reviewing':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'interview':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800'
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800'
      case 'interview':
        return 'bg-blue-100 text-blue-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredApplications = applications.filter(application =>
    application.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.position.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600">Manage job applications and CVs</p>
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
                placeholder="Search applications..."
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
              <option value="reviewing">Reviewing</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Positions</option>
              <option value="Head Chef">Head Chef</option>
              <option value="Sous Chef">Sous Chef</option>
              <option value="Server">Server</option>
              <option value="Host/Hostess">Host/Hostess</option>
              <option value="Kitchen Assistant">Kitchen Assistant</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Applicant</th>
                <th className="table-header">Position</th>
                <th className="table-header">Experience</th>
                <th className="table-header">Status</th>
                <th className="table-header">CV</th>
                <th className="table-header">Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{application.fullName}</div>
                      <div className="text-sm text-gray-500">{application.email}</div>
                      <div className="text-sm text-gray-500">{application.phone}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="font-medium">{application.position}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm">{application.experience}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(application.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm">
                      <div className="font-medium">{application.cvOriginalName}</div>
                      <div className="text-gray-500">{application.formattedFileSize}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{application.formattedDate}</div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="btn-secondary text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => downloadCV(application._id, application.cvOriginalName)}
                        className="btn-primary text-sm"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        CV
                      </button>
                      <select
                        value={application.status}
                        onChange={(e) => updateApplicationStatus(application._id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="interview">Interview</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
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

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <p className="text-gray-900">{selectedApplication.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <p className="text-gray-900">{selectedApplication.lastName}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedApplication.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{selectedApplication.phone}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <p className="text-gray-900">{selectedApplication.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-gray-900">{selectedApplication.experience}</p>
                </div>
              </div>
              
              {selectedApplication.coverLetter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">CV File</label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900">{selectedApplication.cvOriginalName}</p>
                  <span className="text-sm text-gray-500">({selectedApplication.formattedFileSize})</span>
                  <button
                    onClick={() => downloadCV(selectedApplication._id, selectedApplication.cvOriginalName)}
                    className="btn-primary text-sm"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <p className="text-gray-900">{selectedApplication.formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

