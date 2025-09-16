'use client'

import { Star, Clock, Utensils } from 'lucide-react'

export default function MenuPreview() {
  const menuItems = [
    {
      id: 1,
      name: "Peking Duck",
      description: "Traditional Beijing-style roasted duck with crispy skin, served with pancakes and hoisin sauce",
      price: "$45",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Signature",
      prepTime: "45 min",
      rating: 4.9
    },
    {
      id: 2,
      name: "Sushi Omakase",
      description: "Chef's selection of premium sushi and sashimi, featuring the freshest seasonal ingredients",
      price: "$85",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
      category: "Premium",
      prepTime: "30 min",
      rating: 4.8
    },
    {
      id: 3,
      name: "Pad Thai Royal",
      description: "Authentic Thai stir-fried noodles with shrimp, tofu, and traditional spices",
      price: "$22",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Popular",
      prepTime: "20 min",
      rating: 4.7
    },
    {
      id: 4,
      name: "Korean BBQ Platter",
      description: "Premium marinated beef and pork with traditional banchan sides",
      price: "$38",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Signature",
      prepTime: "35 min",
      rating: 4.9
    },
    {
      id: 5,
      name: "Dim Sum Selection",
      description: "Traditional Cantonese steamed and fried dumplings with various fillings",
      price: "$28",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Popular",
      prepTime: "25 min",
      rating: 4.8
    },
    {
      id: 6,
      name: "Ramen Deluxe",
      description: "Rich tonkotsu broth with chashu pork, soft-boiled egg, and fresh vegetables",
      price: "$18",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Comfort",
      prepTime: "15 min",
      rating: 4.6
    }
  ]

  const categories = ["All", "Signature", "Premium", "Popular", "Comfort"]

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Our Menu
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-dark-900 mt-2 mb-6">
            Culinary
            <span className="block text-gradient">Masterpieces</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of authentic Oriental dishes, 
            each crafted with premium ingredients and traditional techniques.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                category === "All"
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-gold-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-dark-900">{item.name}</h3>
                  <span className="text-2xl font-bold text-primary-600">{item.price}</span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{item.prepTime}</span>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300">
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl p-8">
            <Utensils className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-dark-900 mb-4">
              Ready to Experience Our Full Menu?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Visit us today to explore our complete selection of authentic Oriental dishes, 
              or make a reservation for an unforgettable dining experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                View Full Menu
              </button>
              <button className="btn-secondary">
                Make Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

