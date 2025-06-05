'use client'

import { useEffect, useState } from 'react'

interface ListOfIngredientsPerTypeProps {
  type: 'veggies' | 'proteins' | 'sauces'
  title: string
  emoji: string
  selectedItems: string[]
  onSelectionChange: (items: string[]) => void
  multiple?: boolean
}

export default function ListOfIngredientsPerType({ 
  type, 
  title, 
  emoji, 
  selectedItems, 
  onSelectionChange,
  multiple = true 
}: ListOfIngredientsPerTypeProps) {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/ingredients?type=${type}`)
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des ingrédients')
        }
        
        const data = await response.json()
        setIngredients(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [type])

  const handleSelectionChange = (ingredient: string) => {
    if (multiple) {
      const newSelection = selectedItems.includes(ingredient)
        ? selectedItems.filter(item => item !== ingredient)
        : [...selectedItems, ingredient]
      onSelectionChange(newSelection)
    } else {
      // Single selection mode
      onSelectionChange([ingredient])
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">{emoji}</span>
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">{emoji}</span>
          {title}
        </h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">❌ {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <span className="mr-2">{emoji}</span>
        {title}
        {!multiple && (
          <span className="ml-2 text-sm text-gray-500">(Sélection unique)</span>
        )}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ingredients.map((ingredient, index) => {
          const isSelected = selectedItems.includes(ingredient)
          return (
            <label
              key={index}
              className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={type}
                value={ingredient}
                checked={isSelected}
                onChange={() => handleSelectionChange(ingredient)}
                className="sr-only"
              />
              
              <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 transition-all duration-200 ${
                isSelected
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <span className={`font-medium transition-colors duration-200 ${
                isSelected ? 'text-primary-700' : 'text-gray-700'
              }`}>
                {ingredient}
              </span>
              
              {isSelected && (
                <div className="absolute inset-0 rounded-lg ring-2 ring-primary-500 ring-opacity-50 pointer-events-none"></div>
              )}
            </label>
          )
        })}
      </div>
      
      {selectedItems.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Sélectionné{selectedItems.length > 1 ? 's' : ''} :</strong>{' '}
            {selectedItems.join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}