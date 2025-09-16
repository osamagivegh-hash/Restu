'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Eye, MousePointer, Search, Filter, Upload, ToggleLeft, ToggleRight, Megaphone } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Ad {
  _id?: string
  title: string
  description: string
  imageUrl: string
  link?: string
  position: 'hero' | 'menu' | 'footer' | 'sidebar'
  isActive: boolean
  startDate: string
  endDate?: string
  clicks: number
  views: number
  createdAt: string
}

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [positionFilter, setPositionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const positions = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'menu', label: 'Menu Section' },
    { value: 'footer', label: 'Footer' },
    { value: 'sidebar', label: 'Sidebar' }
  ]

  useEffect(() => {
    fetchAds()
  }, [])

  const fetchAds = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/ads/admin`)
      if (response.data.success) {
        setAds(response.data.data.ads || [])
      }
    } catch (error) {
      console.error('Error fetching ads:', error)
      toast.error('Failed to fetch ads')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === 'all' || ad.position === positionFilter
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && ad.isActive) ||
                         (statusFilter === 'inactive' && !ad.isActive)
    
    return matchesSearch && matchesPosition && matchesStatus
  })

  const handleAddAd = () => {
    setEditingAd(null)
    setIsModalOpen(true)
  }

  const handleEditAd = (ad: Ad) => {
    setEditingAd(ad)
    setIsModalOpen(true)
  }

  const handleDeleteAd = async (adId: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/ads/${adId}`)
        toast.success('Ad deleted successfully')
        fetchAds()
      } catch (error) {
        console.error('Error deleting ad:', error)
        toast.error('Failed to delete ad')
      }
    }
  }

  const handleToggleStatus = async (adId: string, currentStatus: boolean) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/ads/${adId}/toggle`)
      toast.success(currentStatus ? 'Ad deactivated' : 'Ad activated')
      fetchAds()
    } catch (error) {
      console.error('Error toggling ad status:', error)
      toast.error('Failed to update ad status')
    }
  }

  const handleSaveAd = async (adData: Ad) => {
    try {
      if (editingAd) {
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/ads/${editingAd._id}`, adData)
        toast.success('Ad updated successfully')
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/ads`, adData)
        toast.success('Ad created successfully')
      }
      setIsModalOpen(false)
      setEditingAd(null)
      fetchAds()
    } catch (error) {
      console.error('Error saving ad:', error)
      toast.error('Failed to save ad')
    }
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Ads & News Management</h1>
          <p className="text-gray-600">Manage your restaurant advertisements and news</p>
        </div>
        <button onClick={handleAddAd} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add New Ad
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search ads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Positions</option>
              {positions.map(position => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAds.map((ad) => (
          <div key={ad._id} className="card">
            <div className="relative">
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {positions.find(p => p.value === ad.position)?.label}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleToggleStatus(ad._id!, ad.isActive)}
                  className={`p-1 rounded-full ${
                    ad.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {ad.isActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">{ad.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{ad.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{ad.views}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MousePointer className="w-4 h-4" />
                  <span>{ad.clicks}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEditAd(ad)}
                className="btn-secondary flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteAd(ad._id!)}
                className="btn-danger"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAds.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No ads found
          </h3>
          <p className="text-gray-500">
            {searchTerm || positionFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first advertisement to get started'
            }
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AdModal
          ad={editingAd}
          onSave={handleSaveAd}
          onClose={() => {
            setIsModalOpen(false)
            setEditingAd(null)
          }}
        />
      )}
    </div>
  )
}

// Ad Modal Component
function AdModal({ 
  ad, 
  onSave, 
  onClose 
}: { 
  ad: Ad | null
  onSave: (ad: Ad) => void
  onClose: () => void 
}) {
  const [formData, setFormData] = useState<Ad>({
    title: ad?.title || '',
    description: ad?.description || '',
    imageUrl: ad?.imageUrl || '',
    link: ad?.link || '',
    position: ad?.position || 'hero',
    isActive: ad?.isActive ?? true,
    startDate: ad?.startDate || new Date().toISOString().split('T')[0],
    endDate: ad?.endDate || '',
    clicks: ad?.clicks || 0,
    views: ad?.views || 0,
    createdAt: ad?.createdAt || new Date().toISOString()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {ad ? 'Edit Ad' : 'Add New Ad'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position *
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                <option value="hero">Hero Section</option>
                <option value="menu">Menu Section</option>
                <option value="footer">Footer</option>
                <option value="sidebar">Sidebar</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link (Optional)
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (Optional)
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="btn-primary flex-1">
              {ad ? 'Update Ad' : 'Create Ad'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
