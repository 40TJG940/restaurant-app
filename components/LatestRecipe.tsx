import Image from 'next/image'

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

interface LatestRecipeProps {
  recipe: Recipe
}

export default function LatestRecipe({ recipe }: LatestRecipeProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <article className="card overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
            {recipe.cuisine}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-xs font-semibold text-gray-700 ml-1">
            {recipe.rating} ({recipe.reviewCount})
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          {recipe.name}
        </h3>

        {/* Recipe Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl">⏱️</div>
            <div className="text-xs text-gray-500">Temps</div>
            <div className="text-sm font-semibold text-gray-700">{totalTime}min</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">👥</div>
            <div className="text-xs text-gray-500">Portions</div>
            <div className="text-sm font-semibold text-gray-700">{recipe.servings}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">🔥</div>
            <div className="text-xs text-gray-500">Calories</div>
            <div className="text-sm font-semibold text-gray-700">{recipe.caloriesPerServing}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>

        {/* Ingredients Preview */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Ingrédients principaux
          </h4>
          <div className="text-sm text-gray-600">
            {recipe.ingredients.slice(0, 3).join(', ')}
            {recipe.ingredients.length > 3 && `... +${recipe.ingredients.length - 3} autres`}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            <span>Voir la recette complète</span>
            <span className="ml-2">👨‍🍳</span>
          </button>
        </div>
      </div>
    </article>
  )
}