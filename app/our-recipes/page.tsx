'use client'

import { useState, useMemo, useEffect } from 'react'
import LatestRecipe from '@/components/LatestRecipe'

interface Recipe {
  id: number
  name: string
  image: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  rating: number
  reviewCount: number
}

// Fonction pour récupérer les recettes (équivalent de getStaticProps)
async function getRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=20&skip=0')
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes')
    }
    
    const data = await response.json()
    return data.recipes || []
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export default function OurRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('Toutes')

  // Charger les recettes
  useEffect(() => {
    getRecipes().then(data => {
      setRecipes(data)
      setLoading(false)
    })
  }, [])

  // Filtrer les recettes
  const filteredRecipes = useMemo(() => {
    if (selectedFilter === 'Toutes') return recipes
    
    return recipes.filter(recipe => {
      switch (selectedFilter) {
        case 'Facile':
          return recipe.difficulty === 'Easy'
        case 'Rapide':
          return (recipe.prepTimeMinutes + recipe.cookTimeMinutes) <= 30
        case 'Végétarien':
          return recipe.tags.some(tag => 
            tag.toLowerCase().includes('vegetarian') || 
            tag.toLowerCase().includes('vegan')
          )
        case 'Protéinées':
          return recipe.caloriesPerServing > 400
        case 'Légères':
          return recipe.caloriesPerServing < 300
        default:
          return true
      }
    })
  }, [recipes, selectedFilter])

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Chargement des recettes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            👨‍🍳 Nos Recettes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez une sélection de recettes savoureuses et équilibrées, 
            soigneusement choisies par nos chefs pour vous inspirer
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 animate-slide-up">
          {[
            { emoji: '📖', number: filteredRecipes.length, label: 'Recettes' },
            { emoji: '⏱️', number: '15-45', label: 'Minutes' },
            { emoji: '👨‍🍳', number: '3', label: 'Niveaux' },
            { emoji: '🌍', number: '5+', label: 'Cuisines' }
          ].map((stat, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="text-4xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold text-primary-600 mb-1">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-12 animate-slide-up">
          <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              🔍 Filtres de recettes
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Toutes', 'Facile', 'Rapide', 'Végétarien', 'Protéinées', 'Légères'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {filteredRecipes.map((recipe: Recipe, index: number) => (
              <div
                key={recipe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LatestRecipe recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Aucune recette trouvée
            </h3>
            <p className="text-gray-500 mb-6">
              Essayez un autre filtre pour découvrir plus de recettes !
            </p>
            <button
              onClick={() => setSelectedFilter('Toutes')}
              className="btn-primary"
            >
              Voir toutes les recettes
            </button>
          </div>
        )}

        {/* Featured Recipe Section */}
        <div className="mt-20 card p-12 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🌟 Recette de la semaine
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Chaque semaine, nos chefs sélectionnent une recette spéciale à essayer absolument
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Salade Rainbow aux superaliments
                </h3>
                <p className="text-gray-600">
                  Une explosion de couleurs et de saveurs avec quinoa, avocat, 
                  graines de chia et une vinaigrette à base de tahini.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱️ 20 min</span>
                  <span>👥 4 portions</span>
                  <span>🔥 320 cal</span>
                </div>
                <button className="btn-secondary">
                  📖 Voir la recette
                </button>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-br from-green-200 to-orange-200 w-full h-full flex items-center justify-center text-6xl">
                  🥗
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📧 Recevez nos nouvelles recettes
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir chaque semaine de nouvelles idées 
            de recettes saines et savoureuses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="btn-primary">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}