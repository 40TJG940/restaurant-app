import Image from 'next/image'
import Link from 'next/link'

interface DishItemProps {
  title: string
  slug: string
  category: string
  price: number
  image: string
  description: string
  ingredients: string[]
  featured?: boolean
}

export default function DishItem({ 
  title, 
  slug, 
  category, 
  price, 
  image, 
  description, 
  ingredients,
  featured = false 
}: DishItemProps) {
  return (
    <div className={`card group overflow-hidden ${featured ? 'ring-2 ring-primary-400 ring-opacity-50' : ''}`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title || 'Plat'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ⭐ Coup de cœur
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-lg font-bold text-primary-600">
            {(price || 0).toFixed(2)}€
          </span>
        </div>
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium uppercase">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Ingredients */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Ingrédients principaux
          </h4>
          <div className="flex flex-wrap gap-2">
            {ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                {ingredient}
              </span>
            ))}
            {ingredients.length > 3 && (
              <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs">
                +{ingredients.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <Link
            href={`/menu/${category}/${slug}`}
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            <span>En savoir plus</span>
            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}