'use client'

import { useState, useMemo } from 'react'
import DishItem from './DishItem'

interface Dish {
  fields: {
    title?: string
    slug?: string
    category?: string
    price?: number
    image?: string
    description?: string
    ingredients?: string[]
    featured?: boolean
  }
  content?: string
}

interface FilterByCategoryProps {
  dishes: Dish[]
}

export default function FilterByCategory({ dishes }: FilterByCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(dishes.map(dish => dish.fields.category)))
    return [
      { key: 'all', label: 'Tous les plats', emoji: '🍽️' },
      { key: 'salads', label: 'Salades', emoji: '🥗' },
      { key: 'mains', label: 'Plats chauds', emoji: '🍖' },
      { key: 'bowls', label: 'Bowls', emoji: '🥙' },
      ...uniqueCategories
        .filter(cat => !['salads', 'mains', 'bowls'].includes(cat))
        .map(cat => ({ 
          key: cat, 
          label: cat.charAt(0).toUpperCase() + cat.slice(1), 
          emoji: '🍴' 
        }))
    ]
  }, [dishes])

  // Filter dishes based on selected category
  const filteredDishes = useMemo(() => {
    if (selectedCategory === 'all') return dishes
    return dishes.filter(dish => dish.fields.category === selectedCategory)
  }, [dishes, selectedCategory])

  return (
    <div className="space-y-8">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
              selectedCategory === category.key
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200 hover:border-primary-300'
            }`}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-gray-600">
          {filteredDishes.length} plat{filteredDishes.length > 1 ? 's' : ''} 
          {selectedCategory !== 'all' && (
            <span> dans la catégorie "{categories.find(c => c.key === selectedCategory)?.label}"</span>
          )}
        </p>
      </div>

      {/* Filtered Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish, index) => (
            <div
              key={dish.fields.slug || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DishItem
                title={dish.fields.title}
                slug={dish.fields.slug}
                category={dish.fields.category}
                price={dish.fields.price}
                image={dish.fields.image}
                description={dish.fields.description}
                ingredients={dish.fields.ingredients}
                featured={dish.fields.featured}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Aucun plat trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              Aucun plat ne correspond à cette catégorie pour le moment.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="btn-primary"
            >
              Voir tous les plats
            </button>
          </div>
        )}
      </div>
    </div>
  )
}