'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Filter, Upload } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface MenuItem {
  _id?: string
  name: string
  description: string
  price: string
  category: string
  image: string
  prepTime: string
  rating: number
  isAvailable: boolean
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = ['All', 'Signature', 'Premium', 'Popular', 'Comfort', 'Appetizer', 'Main Course', 'Dessert']

  const defaultMenuItems: MenuItem[] = [
    {
      name: "Peking Duck",
      description: "Traditional Beijing-style roasted duck with crispy skin, served with pancakes and hoisin sauce",
      price: "$45",
      category: "Signature",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      prepTime: "45 min",
      rating: 4.9,
      isAvailable: true
    },
    {
      name: "Sushi Omakase",
      description: "Chef's selection of premium sushi and sashimi, featuring the freshest seasonal ingredients",
      price: "$85",
      category: "Premium",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      prepTime: "30 min",
      rating: 4.8,
      isAvailable: true
    },
    {
      name: "Pad Thai Royal",
      description: "Authentic Thai stir-fried noodles with shrimp, tofu, and traditional spices",
      price: "$22",
      category: "Popular",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      prepTime: "20 min",
      rating: 4.7,
      isAvailable: true
    },
    {
      name: "Korean BBQ Platter",
      description: "Premium marinated beef and pork with traditional banchan sides",
      price: "$38",
      category: "Signature",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      prepTime: "35 min",
      rating: 4.9,
      isAvailable: true
    },
    {
      name: "Dim Sum Selection",
      description: "Traditional Cantonese steamed and fried dumplings with various fillings",
      price: "$28",
      category: "Popular",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      prepTime: "25 min",
      rating: 4.8,
      isAvailable: true
    },
    {
      name: "Ramen Deluxe",
      description: "Rich tonkotsu broth with chashu pork, soft-boiled egg, and fresh vegetables",
      price: "$18",
      category: "Comfort",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      prepTime: "15 min",
      rating: 4.6,
      isAvailable: true
    }
  ]

  useEffect(() => {
    // For now, use default menu items. In production, fetch from API
    setMenuItems(defaultMenuItems)
    setIsLoading(false)
  }, [])

  const filteredMenuItems = menuItems.filter(item =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === 'all' || item.category === categoryFilter)
  )

  const handleAddItem = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleDeleteItem = (itemName: string) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      setMenuItems(prev => prev.filter(item => item.name !== itemName))
      toast.success('Menu item deleted successfully')
    }
  }

  const handleSaveItem = (itemData: MenuItem) => {
    if (editingItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.name === editingItem.name ? { ...itemData, _id: item._id } : item
      ))
      toast.success('Menu item updated successfully')
    } else {
      // Add new item
      setMenuItems(prev => [...prev, { ...itemData, _id: Date.now().toString() }])
      toast.success('Menu item added successfully')
    }
    setIsModalOpen(false)
    setEditingItem(null)
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
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant menu items</p>
        </div>
        <button onClick={handleAddItem} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
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
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? 'all' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenuItems.map((item, index) => (
          <div key={item._id || index} className="card">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-xl font-bold text-primary-600">{item.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>⏱️ {item.prepTime}</span>
                <span>⭐ {item.rating}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEditItem(item)}
                className="btn-secondary flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(item.name)}
                className="btn-danger"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <MenuItemModal
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => {
            setIsModalOpen(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}

// Menu Item Modal Component
function MenuItemModal({ 
  item, 
  onSave, 
  onClose 
}: { 
  item: MenuItem | null
  onSave: (item: MenuItem) => void
  onClose: () => void 
}) {
  const [formData, setFormData] = useState<MenuItem>({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || '',
    category: item?.category || 'Popular',
    image: item?.image || '',
    prepTime: item?.prepTime || '',
    rating: item?.rating || 4.5,
    isAvailable: item?.isAvailable ?? true
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
            {item ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="$25"
              />
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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                <option value="Signature">Signature</option>
                <option value="Premium">Premium</option>
                <option value="Popular">Popular</option>
                <option value="Comfort">Comfort</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prep Time *
              </label>
              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="30 min"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
                min="1"
                max="5"
                step="0.1"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Available for order
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="btn-primary flex-1">
              {item ? 'Update Item' : 'Add Item'}
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

