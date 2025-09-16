'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Filter, Upload } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface MenuItem {
  _id?: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  price: number
  category: string
  categoryAr: string
  imageUrl: string
  uploadedImage?: string
  preparationTime: number
  averageRating: number
  totalReviews: number
  isAvailable: boolean
  isFeatured: boolean
  ingredients: string[]
  allergens: string[]
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = [
    { value: 'appetizers', label: 'Appetizers', labelAr: 'مقبلات' },
    { value: 'main-courses', label: 'Main Courses', labelAr: 'أطباق رئيسية' },
    { value: 'desserts', label: 'Desserts', labelAr: 'حلويات' },
    { value: 'beverages', label: 'Beverages', labelAr: 'مشروبات' },
    { value: 'specials', label: 'Specials', labelAr: 'أطباق خاصة' }
  ]

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/meals`)
      if (response.data.success) {
        setMenuItems(response.data.data.meals || [])
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
      toast.error('Failed to fetch menu items')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredMenuItems = menuItems.filter(item =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleDeleteItem = async (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/meals/${itemId}`)
        toast.success('Menu item deleted successfully')
        fetchMenuItems()
      } catch (error) {
        console.error('Error deleting menu item:', error)
        toast.error('Failed to delete menu item')
      }
    }
  }

  const handleSaveItem = async (itemData: MenuItem) => {
    try {
      if (editingItem) {
        // Update existing item
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/meals/${editingItem._id}`, itemData)
        toast.success('Menu item updated successfully')
      } else {
        // Add new item
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/meals`, itemData)
        toast.success('Menu item added successfully')
      }
      setIsModalOpen(false)
      setEditingItem(null)
      fetchMenuItems()
    } catch (error) {
      console.error('Error saving menu item:', error)
      toast.error('Failed to save menu item')
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
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
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
                src={item.uploadedImage || item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {item.categoryAr}
                </span>
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
                {item.isFeatured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.nameEn}</p>
                </div>
                <span className="text-xl font-bold text-primary-600">{item.price} ر.س</span>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>⏱️ {item.preparationTime} min</span>
                <span>⭐ {item.averageRating} ({item.totalReviews})</span>
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
                onClick={() => handleDeleteItem(item._id!)}
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
    nameEn: item?.nameEn || '',
    description: item?.description || '',
    descriptionEn: item?.descriptionEn || '',
    price: item?.price || 0,
    category: item?.category || 'appetizers',
    categoryAr: item?.categoryAr || 'مقبلات',
    imageUrl: item?.imageUrl || '',
    uploadedImage: item?.uploadedImage || '',
    preparationTime: item?.preparationTime || 15,
    averageRating: item?.averageRating || 0,
    totalReviews: item?.totalReviews || 0,
    isAvailable: item?.isAvailable ?? true,
    isFeatured: item?.isFeatured ?? false,
    ingredients: item?.ingredients || [],
    allergens: item?.allergens || []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }
      
      // Auto-set categoryAr when category changes
      if (name === 'category') {
        const categoryMap: { [key: string]: string } = {
          'appetizers': 'مقبلات',
          'main-courses': 'أطباق رئيسية',
          'desserts': 'حلويات',
          'beverages': 'مشروبات',
          'specials': 'أطباق خاصة'
        }
        newData.categoryAr = categoryMap[value] || 'مقبلات'
      }
      
      return newData
    })
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
                Name (Arabic) *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="اسم الوجبة بالعربية"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name (English) *
              </label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Meal name in English"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Arabic) *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="input-field"
                placeholder="وصف الوجبة بالعربية"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (English) *
              </label>
              <textarea
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleInputChange}
                required
                rows={3}
                className="input-field"
                placeholder="Meal description in English"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (SAR) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="input-field"
                placeholder="25.00"
              />
            </div>
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
                <option value="appetizers">Appetizers</option>
                <option value="main-courses">Main Courses</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
                <option value="specials">Specials</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prep Time (minutes) *
              </label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleInputChange}
                required
                min="1"
                className="input-field"
                placeholder="15"
              />
            </div>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients (comma-separated)
              </label>
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  ingredients: e.target.value.split(',').map(ing => ing.trim()).filter(ing => ing)
                }))}
                className="input-field"
                placeholder="ingredient1, ingredient2, ingredient3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allergens (comma-separated)
              </label>
              <input
                type="text"
                name="allergens"
                value={formData.allergens.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  allergens: e.target.value.split(',').map(all => all.trim()).filter(all => all)
                }))}
                className="input-field"
                placeholder="nuts, dairy, gluten"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
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
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Featured item
              </label>
            </div>
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

