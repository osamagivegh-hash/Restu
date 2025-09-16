'use client'

import { useState, useEffect } from 'react'
import { Star, MessageCircle, ThumbsUp, User } from 'lucide-react'

interface Comment {
  _id: string
  name: string
  rating: number
  comment: string
  mealName: string
  createdAt: string
}

interface CommentsSectionProps {
  mealId: string
  mealName: string
}

export default function CommentsSection({ mealId, mealName }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  })

  // جلب التعليقات
  useEffect(() => {
    fetchComments()
  }, [mealId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/meal/${mealId}`)
      const data = await response.json()
      if (data.success) {
        setComments(data.data.comments)
      }
    } catch (error) {
      console.error('خطأ في جلب التعليقات:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          mealId,
          mealName
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setFormData({ name: '', email: '', rating: 5, comment: '' })
        setShowForm(false)
        fetchComments() // إعادة جلب التعليقات
        alert('تم إرسال تعليقك بنجاح! سيتم مراجعته قبل النشر.')
      } else {
        alert('حدث خطأ في إرسال التعليق. يرجى المحاولة مرة أخرى.')
      }
    } catch (error) {
      console.error('خطأ في إرسال التعليق:', error)
      alert('حدث خطأ في إرسال التعليق. يرجى المحاولة مرة أخرى.')
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => {
              if (interactive) {
                setFormData({ ...formData, rating: star })
              }
            }}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 font-arabic-elegant arabic-heading">
          آراء العملاء
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary font-arabic flex items-center space-x-2 space-x-reverse"
        >
          <MessageCircle className="w-5 h-5" />
          <span>أضف تعليقاً</span>
        </button>
      </div>

      {/* نموذج إضافة تعليق */}
      {showForm && (
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 font-arabic-elegant arabic-heading">
            شاركنا رأيك
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الاسم *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input font-arabic"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input font-arabic"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                التقييم *
              </label>
              {renderStars(formData.rating, true)}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                التعليق *
              </label>
              <textarea
                required
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="form-textarea font-arabic"
                placeholder="شاركنا تجربتك مع هذه الوجبة..."
              />
            </div>
            
            <div className="flex space-x-4 space-x-reverse">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary font-arabic"
              >
                {submitting ? 'جاري الإرسال...' : 'إرسال التعليق'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary font-arabic"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* قائمة التعليقات */}
      {comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-arabic arabic-text">
            لا توجد تعليقات بعد. كن أول من يشارك رأيه!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 font-arabic">
                      {comment.name}
                    </h5>
                    <p className="text-sm text-gray-500 font-arabic">
                      {new Date(comment.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {renderStars(comment.rating)}
                </div>
              </div>
              
              <p className="text-gray-700 font-arabic arabic-text leading-relaxed">
                {comment.comment}
              </p>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 font-arabic">
                  تقييم لـ {comment.mealName}
                </span>
                <button className="flex items-center space-x-1 space-x-reverse text-gray-500 hover:text-primary-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-arabic">مفيد</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
