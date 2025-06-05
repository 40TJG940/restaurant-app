import Image from 'next/image'
import Link from 'next/link'

async function getRecipe(id: string) {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch recipe');
  }
  
  return res.json();
}

// Fonction pour enrichir les ingrédients avec des quantités réalistes
function enrichIngredients(ingredients: string[], servings: number) {
  const quantities = [
    '250g', '150g', '200ml', '3 cuillères à soupe', '1 tasse', '2 cuillères à café', 
    '400g', '100ml', '1 pièce', '2 pièces', '50g', '1 cuillère à soupe', '300g',
    '1/2 tasse', '2 gousses', '1 pincée', '500ml', '75g', '1/4 tasse', '3 pièces'
  ];
  
  return ingredients.map((ingredient, index) => {
    const quantity = quantities[index % quantities.length];
    return `${quantity} ${ingredient}`;
  });
}

// Fonction pour calculer les valeurs nutritionnelles détaillées
function calculateNutrition(recipe: any) {
  const baseCalories = recipe.caloriesPerServing;
  return {
    calories: baseCalories,
    proteins: Math.round(baseCalories * 0.15 / 4), // 15% des calories en protéines
    carbs: Math.round(baseCalories * 0.50 / 4),    // 50% des calories en glucides
    fats: Math.round(baseCalories * 0.35 / 9),     // 35% des calories en lipides
    fiber: Math.round(baseCalories * 0.02),        // Estimation fibres
    sodium: Math.round(baseCalories * 1.5),        // Estimation sodium en mg
    sugar: Math.round(baseCalories * 0.08)         // Estimation sucres
  };
}

export default async function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);
  const enrichedIngredients = enrichIngredients(recipe.ingredients, recipe.servings);
  const nutrition = calculateNutrition(recipe);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/our-recipes" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors">
        ← Retour aux recettes
      </Link>
      
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Image et infos principales */}
        <div className="lg:col-span-2">
          <div className="relative mb-8">
            <Image 
              src={recipe.image} 
              alt={recipe.name}
              width={800}
              height={500}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-gray-700 font-medium">({recipe.rating}/5)</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{recipe.name}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              {recipe.cuisine}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {recipe.difficulty}
            </span>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.slice(0, 3).map((tag: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Temps et portions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold text-blue-600">{recipe.prepTimeMinutes}</div>
              <div className="text-sm text-gray-600">Minutes de préparation</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-orange-600">{recipe.cookTimeMinutes}</div>
              <div className="text-sm text-gray-600">Minutes de cuisson</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-purple-600">{recipe.servings}</div>
              <div className="text-sm text-gray-600">Portions</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-green-600">{recipe.caloriesPerServing}</div>
              <div className="text-sm text-gray-600">Calories/portion</div>
            </div>
          </div>

          {/* Ingrédients avec quantités */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">🛒 Ingrédients</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">Pour {recipe.servings} personnes</span>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  📊 Ajuster les portions
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {enrichedIngredients.map((ingredient: string, index: number) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg border border-gray-200">
                    <input type="checkbox" className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions détaillées */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">👨‍🍳 Instructions</h2>
            <div className="space-y-6">
              {recipe.instructions.map((instruction: string, index: number) => (
                <div key={index} className="flex items-start bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed text-lg">{instruction}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      ⏱️ Étape {index + 1} - Temps estimé: {Math.round((recipe.prepTimeMinutes + recipe.cookTimeMinutes) / recipe.instructions.length)} min
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar avec infos nutritionnelles */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-8">
            {/* Informations nutritionnelles détaillées */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">📊 Valeurs nutritionnelles</h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600">{nutrition.calories}</div>
                <div className="text-sm text-gray-600">Calories par portion</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">Protéines</span>
                  <span className="font-bold text-blue-600">{nutrition.proteins}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-gray-700">Glucides</span>
                  <span className="font-bold text-yellow-600">{nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium text-gray-700">Lipides</span>
                  <span className="font-bold text-red-600">{nutrition.fats}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">Fibres</span>
                  <span className="font-bold text-green-600">{nutrition.fiber}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-700">Sodium</span>
                  <span className="font-bold text-purple-600">{nutrition.sodium}mg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="font-medium text-gray-700">Sucres</span>
                  <span className="font-bold text-pink-600">{nutrition.sugar}g</span>
                </div>
              </div>
            </div>

            {/* Conseils du chef */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">👨‍🍳 Conseils du chef</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start">
                  <span className="text-lg mr-2">💡</span>
                  <p>Préparez tous vos ingrédients avant de commencer la cuisson.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">🔥</span>
                  <p>Préchauffez votre four à 180°C pour une cuisson optimale.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-lg mr-2">❄️</span>
                  <p>Se conserve 2-3 jours au réfrigérateur dans un contenant hermétique.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg">
                💚 Ajouter aux favoris
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg">
                📱 Partager la recette
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg">
                🛒 Liste de courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}