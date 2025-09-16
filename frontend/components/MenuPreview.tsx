'use client'

import { useState, useEffect } from 'react'
import { Star, Clock, Utensils, Eye, MessageCircle, Upload } from 'lucide-react'
import CommentsSection from './CommentsSection'
import AdsSection from './AdsSection'

interface Meal {
  _id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  price: number
  imageUrl: string
  uploadedImage?: string
  category: string
  categoryAr: string
  averageRating: number
  totalReviews: number
  preparationTime: number
  isFeatured: boolean
  ingredients: string[]
  allergens: string[]
}

export default function MenuPreview() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [showComments, setShowComments] = useState(false)

  const categories = [
    { id: 'all', name: 'الكل', nameAr: 'الكل' },
    { id: 'appetizers', name: 'Appetizers', nameAr: 'مقبلات' },
    { id: 'main-courses', name: 'Main Courses', nameAr: 'أطباق رئيسية' },
    { id: 'desserts', name: 'Desserts', nameAr: 'حلويات' },
    { id: 'beverages', name: 'Beverages', nameAr: 'مشروبات' },
    { id: 'specials', name: 'Specials', nameAr: 'أطباق خاصة' }
  ]

  useEffect(() => {
    fetchMeals()
  }, [selectedCategory])

  const fetchMeals = async () => {
    try {
      setLoading(true)
      const url = selectedCategory === 'all' 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meals/category/${selectedCategory}`
      
      console.log('Fetching meals from:', url)
      console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL)
      
      const response = await fetch(url)
      const data = await response.json()
      
      console.log('Meals response:', data)
      
      if (data.success) {
        setMeals(data.data.meals || data.data)
        console.log('Meals set:', data.data.meals || data.data)
      } else {
        console.error('API returned error:', data.message)
      }
    } catch (error) {
      console.error('خطأ في جلب الوجبات:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const openMealDetails = (meal: Meal) => {
    setSelectedMeal(meal)
    setShowComments(true)
  }

  const closeMealDetails = () => {
    setSelectedMeal(null)
    setShowComments(false)
  }

  if (loading) {
    return (
      <section id="menu" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-arabic-elegant arabic-heading">
            قائمة الطعام
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-arabic arabic-text">
            اكتشف مجموعة متنوعة من الأطباق الشرقية الأصيلة، محضرة بأفضل المكونات الطازجة
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-arabic ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category.nameAr}
            </button>
          ))}
        </div>

        {/* Ads Section */}
        <div className="mb-12">
          <AdsSection position="menu" className="max-w-4xl mx-auto" />
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div key={meal._id} className="card overflow-hidden group">
              <div className="image-container h-48">
                <img
                  src={meal.uploadedImage || meal.imageUrl}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />
                {meal.isFeatured && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium font-arabic">
                    مميز
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 font-arabic-elegant arabic-heading">
                      {meal.name}
                    </h3>
                    <span className="text-sm text-primary-600 font-medium font-arabic">
                      {meal.categoryAr}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600 font-arabic">
                      {meal.price} ر.س
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 font-arabic arabic-text leading-relaxed">
                  {meal.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {renderStars(meal.averageRating)}
                    <span className="text-sm text-gray-500 font-arabic">
                      ({meal.totalReviews})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-arabic">{meal.preparationTime} دقيقة</span>
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button
                    onClick={() => openMealDetails(meal)}
                    className="btn-primary flex-1 font-arabic flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>التعليقات</span>
                  </button>
                  <button className="btn-secondary font-arabic">
                    اطلب الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {meals.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-arabic-elegant">
              لا توجد وجبات متاحة
            </h3>
            <p className="text-gray-500 font-arabic arabic-text">
              لا توجد وجبات في هذه الفئة حالياً. يرجى المحاولة لاحقاً.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-arabic-elegant arabic-heading">
              هل تريد رؤية المزيد؟
            </h3>
            <p className="text-gray-600 mb-6 font-arabic arabic-text">
              تصفح قائمة الطعام الكاملة واكتشف جميع الأطباق المتاحة
            </p>
            <button className="btn-primary text-lg px-8 py-4 font-arabic">
              عرض القائمة الكاملة
            </button>
          </div>
        </div>
      </div>

      {/* Meal Details Modal */}
      {showComments && selectedMeal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 font-arabic-elegant arabic-heading">
                  {selectedMeal.name}
                </h3>
                <button
                  onClick={closeMealDetails}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <CommentsSection 
                mealId={selectedMeal._id} 
                mealName={selectedMeal.name} 
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}