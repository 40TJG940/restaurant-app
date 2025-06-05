'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

// Composant RecipeCard sophistiqué
function RecipeCard({ recipe, index, viewMode }: { recipe: Recipe, index: number, viewMode: 'grid' | 'list' }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200'
      default: return 'bg-rose-100 text-rose-700 border-rose-200'
    }
  }

  if (viewMode === 'list') {
    return (
      <article 
        className={`
          group flex bg-white rounded-xl overflow-hidden border border-gray-200/60
          hover:border-gray-300 hover:shadow-xl transition-all duration-300
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
        `}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        <div className="relative w-48 h-32 flex-shrink-0">
          <Image 
            src={recipe.image} 
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <div className="flex-1 p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{recipe.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{recipe.cuisine} • {totalTime}min • {recipe.servings} portions</p>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span> {recipe.rating}
              </span>
              <span>🔥 {recipe.caloriesPerServing} cal</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <Link href={`/our-recipes/${recipe.id}`}>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                Voir recette
              </button>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article 
      className={`
        group relative bg-white rounded-2xl overflow-hidden border border-gray-200/60
        hover:border-gray-300 hover:shadow-2xl transition-all duration-500
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={recipe.image} 
          alt={recipe.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Floating action button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`
            absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md border border-white/20
            flex items-center justify-center transition-all duration-300 z-20
            ${isLiked 
              ? 'bg-red-500/90 text-white' 
              : 'bg-white/90 text-gray-700 hover:bg-white hover:scale-110'
            }
          `}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Badges */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-md border ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="bg-white/95 backdrop-blur-md rounded-lg px-2 py-1 border border-white/20">
            <span className="text-sm font-semibold text-gray-800">
              ⭐ {recipe.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight line-clamp-2 flex-1 mr-2">
            {recipe.name}
          </h3>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">{recipe.cuisine}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-sm text-gray-500">Temps</div>
            <div className="font-semibold text-gray-900">{totalTime}min</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-sm text-gray-500">Portions</div>
            <div className="font-semibold text-gray-900">{recipe.servings}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-sm text-gray-500">Calories</div>
            <div className="font-semibold text-gray-900">{recipe.caloriesPerServing}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {recipe.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link href={`/our-recipes/${recipe.id}`}>
          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium group-hover:bg-gray-800">
            Voir la recette complète
          </button>
        </Link>
      </div>
    </article>
  );
}

async function getRecipes(limit: number = 50): Promise<Recipe[]> {
  try {
    const response = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=0`)
    
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
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('Toutes')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [recipesPerPage, setRecipesPerPage] = useState(12)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getRecipes(50).then(data => {
      setAllRecipes(data)
      setLoading(false)
    })
  }, [])

  const filteredAndSortedRecipes = useMemo(() => {
    let filtered = allRecipes

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedFilter !== 'Toutes') {
      filtered = filtered.filter(recipe => {
        switch (selectedFilter) {
          case 'Facile': return recipe.difficulty === 'Easy'
          case 'Rapide': return (recipe.prepTimeMinutes + recipe.cookTimeMinutes) <= 30
          case 'Végétarien': return recipe.tags.some(tag => 
            tag.toLowerCase().includes('vegetarian') || tag.toLowerCase().includes('vegan')
          )
          case 'Protéinées': return recipe.caloriesPerServing > 400
          case 'Légères': return recipe.caloriesPerServing < 300
          case 'Populaires': return recipe.rating >= 4.5
          default: return true
        }
      })
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating
        case 'time': return (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes)
        case 'calories': return a.caloriesPerServing - b.caloriesPerServing
        case 'name':
        default: return a.name.localeCompare(b.name)
      }
    })

    return filtered.slice(0, recipesPerPage)
  }, [allRecipes, selectedFilter, sortBy, recipesPerPage, searchTerm])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-gray-600 rounded-full animate-spin mx-auto opacity-30" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <p className="text-lg text-gray-600 font-medium">Chargement des recettes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header sophistiqué */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
            Collection Culinaire
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection raffinée de recettes du monde entier, 
            soigneusement choisies pour éveiller vos papilles
          </p>
        </header>

        {/* Barre de recherche sophistiquée */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une recette, cuisine ou ingrédient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 text-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contrôles avancés */}
        <div className="bg-white rounded-2xl p-6 mb-12 border border-gray-200/60 shadow-sm">
          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {['Toutes', 'Facile', 'Rapide', 'Végétarien', 'Protéinées', 'Légères', 'Populaires'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border
                  ${selectedFilter === filter
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Options d'affichage */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Trier par:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
              >
                <option value="name">Nom A-Z</option>
                <option value="rating">Note ⭐</option>
                <option value="time">Temps ⏱️</option>
                <option value="calories">Calories 🔥</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Afficher:</label>
              <select 
                value={recipesPerPage} 
                onChange={(e) => setRecipesPerPage(Number(e.target.value))}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
              >
                <option value={6}>6 recettes</option>
                <option value={12}>12 recettes</option>
                <option value={24}>24 recettes</option>
                <option value={50}>50 recettes</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats dynamiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { number: filteredAndSortedRecipes.length, label: 'Recettes trouvées', icon: '📖' },
            { number: Math.round(filteredAndSortedRecipes.reduce((acc, r) => acc + (r.prepTimeMinutes + r.cookTimeMinutes), 0) / filteredAndSortedRecipes.length || 0), label: 'Temps moyen (min)', icon: '⏱️' },
            { number: new Set(filteredAndSortedRecipes.map(r => r.cuisine)).size, label: 'Cuisines', icon: '🌍' },
            { number: Math.round((filteredAndSortedRecipes.reduce((acc, r) => acc + r.rating, 0) / filteredAndSortedRecipes.length || 0) * 10) / 10, label: 'Note moyenne', icon: '⭐' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center border border-gray-200/60 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Grille/Liste de recettes */}
        {filteredAndSortedRecipes.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-4"
          }>
            {filteredAndSortedRecipes.map((recipe: Recipe, index: number) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 opacity-20">🔍</div>
            <h3 className="text-3xl font-light text-gray-600 mb-4">
              Aucune recette trouvée
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Essayez de modifier vos filtres ou votre recherche pour découvrir plus de recettes
            </p>
            <button
              onClick={() => {
                setSelectedFilter('Toutes')
                setSearchTerm('')
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl transition-colors duration-200 font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>
    </div>
  )
}