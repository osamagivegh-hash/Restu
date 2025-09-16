'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Eye, MousePointer } from 'lucide-react'

interface Ad {
  _id: string
  title: string
  description: string
  imageUrl: string
  link?: string
  position: string
  clicks: number
  views: number
}

interface AdsSectionProps {
  position: 'hero' | 'menu' | 'footer' | 'sidebar'
  className?: string
}

export default function AdsSection({ position, className = '' }: AdsSectionProps) {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAds()
  }, [position])

  const fetchAds = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ads/active?position=${position}`)
      const data = await response.json()
      if (data.success) {
        setAds(data.data)
      }
    } catch (error) {
      console.error('خطأ في جلب الإعلانات:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdClick = async (adId: string, link?: string) => {
    try {
      // تسجيل النقرة
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ads/${adId}/click`, {
        method: 'POST'
      })

      // فتح الرابط إذا كان موجوداً
      if (link) {
        window.open(link, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.error('خطأ في تسجيل النقرة:', error)
    }
  }

  const handleAdView = async (adId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ads/${adId}/view`, {
        method: 'POST'
      })
    } catch (error) {
      console.error('خطأ في تسجيل المشاهدة:', error)
    }
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gray-200 rounded-lg h-48"></div>
      </div>
    )
  }

  if (ads.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {ads.map((ad) => (
        <div
          key={ad._id}
          className="relative group cursor-pointer"
          onClick={() => handleAdClick(ad._id, ad.link)}
          onMouseEnter={() => handleAdView(ad._id)}
        >
          <div className="image-container">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          </div>
          
          <div className="absolute inset-0 flex items-end p-4">
            <div className="text-white">
              <h3 className="text-lg font-bold mb-2 font-arabic-elegant arabic-heading">
                {ad.title}
              </h3>
              <p className="text-sm opacity-90 font-arabic arabic-text mb-3">
                {ad.description}
              </p>
              {ad.link && (
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-arabic">انقر للمزيد</span>
                </div>
              )}
            </div>
          </div>

          {/* إحصائيات الإعلان (للعرض فقط) */}
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Eye className="w-3 h-3" />
              <span>{ad.views}</span>
              <MousePointer className="w-3 h-3" />
              <span>{ad.clicks}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
