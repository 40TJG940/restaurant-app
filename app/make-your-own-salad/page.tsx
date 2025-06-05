'use client'

import { useActionState, useState } from 'react'
import sendOrder from '@/actions/sendOrder'
import ListOfIngredientsPerType from '@/components/ListOfIngredientsPerType'

export default function MakeYourOwnSaladPage() {
  const [state, formAction, isPending] = useActionState(sendOrder, { orderStatus: false })
  
  // Local state for ingredient selections
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([])
  const [selectedProtein, setSelectedProtein] = useState<string[]>([])
  const [selectedSauce, setSelectedSauce] = useState<string[]>([])

  // Calculate estimated price
  const calculatePrice = () => {
    const basePrice = 8.90
    const proteinPrice = selectedProtein.length > 0 ? 3.50 : 0
    const extraVeggiesPrice = selectedVeggies.length > 3 ? (selectedVeggies.length - 3) * 1.50 : 0
    return (basePrice + proteinPrice + extraVeggiesPrice).toFixed(2)
  }

  if (state.orderStatus && state.order) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                🎉 Commande confirmée !
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Merci {state.order.username}, votre salade personnalisée est en préparation
              </p>
            </div>

            {/* Order Details */}
            <div className="card p-8 text-left max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                📋 Détails de votre commande
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Numéro de commande :</span>
                  <span className="font-bold text-primary-600">#{state.order.id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Temps estimé :</span>
                  <span className="font-bold text-green-600">{state.order.estimatedTime}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Prix total :</span>
                  <span className="font-bold text-2xl text-gray-800">{state.order.totalPrice}€</span>
                </div>

                {/* Ingredients Summary */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-bold text-gray-800">🥗 Votre composition :</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Légumes : </span>
                      <span className="text-gray-600">{state.order.ingredientsList.veggies.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Protéine : </span>
                      <span className="text-gray-600">{state.order.ingredientsList.protein}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Sauce : </span>
                      <span className="text-gray-600">{state.order.ingredientsList.sauce}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                🥗 Créer une nouvelle salade
              </button>
              <a href="/menu-offer" className="btn-secondary block">
                🍽️ Voir toute la carte
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🥗 Créez votre salade
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Composez votre salade sur-mesure en 3 étapes simples
          </p>
        </div>

        {/* Price Display */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 animate-slide-up">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Prix estimé : <span className="text-primary-600">{calculatePrice()}€</span>
            </h2>
            <p className="text-gray-600">
              Base 8,90€ + Protéine 3,50€ + Légumes supplémentaires 1,50€/unité (au-delà de 3)
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-12">
          {/* Error Display */}
          {state.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">❌ {state.error}</p>
            </div>
          )}

          {/* Customer Information */}
          <div className="card p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mr-4">1</span>
              👤 Vos informations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
          </div>

          {/* Ingredient Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step 2: Vegetables */}
            <div className="card p-8 animate-slide-up">
              <div className="flex items-center mb-6">
                <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mr-4">2</span>
                <h2 className="text-2xl font-bold text-gray-800">Légumes</h2>
              </div>
              
              <ListOfIngredientsPerType
                type="veggies"
                title="Choisissez vos légumes"
                emoji="🥬"
                selectedItems={selectedVeggies}
                onSelectionChange={setSelectedVeggies}
                multiple={true}
              />
              
              {/* Hidden inputs for form submission */}
              {selectedVeggies.map((veggie, index) => (
                <input key={index} type="hidden" name="veggies" value={veggie} />
              ))}
            </div>

            {/* Step 3: Protein */}
            <div className="card p-8 animate-slide-up">
              <div className="flex items-center mb-6">
                <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mr-4">3</span>
                <h2 className="text-2xl font-bold text-gray-800">Protéine</h2>
              </div>
              
              <ListOfIngredientsPerType
                type="proteins"
                title="Choisissez votre protéine"
                emoji="🥩"
                selectedItems={selectedProtein}
                onSelectionChange={setSelectedProtein}
                multiple={false}
              />
              
              {/* Hidden input for form submission */}
              {selectedProtein.length > 0 && (
                <input type="hidden" name="protein" value={selectedProtein[0]} />
              )}
            </div>

            {/* Step 4: Sauce */}
            <div className="card p-8 animate-slide-up">
              <div className="flex items-center mb-6">
                <span className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mr-4">4</span>
                <h2 className="text-2xl font-bold text-gray-800">Sauce</h2>
              </div>
              
              <ListOfIngredientsPerType
                type="sauces"
                title="Choisissez votre sauce"
                emoji="🥄"
                selectedItems={selectedSauce}
                onSelectionChange={setSelectedSauce}
                multiple={false}
              />
              
              {/* Hidden input for form submission */}
              {selectedSauce.length > 0 && (
                <input type="hidden" name="sauce" value={selectedSauce[0]} />
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="card p-8 bg-gradient-to-r from-gray-50 to-gray-100 animate-slide-up">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📝 Récapitulatif de votre commande
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <h4 className="font-bold text-gray-700">🥬 Légumes</h4>
                <div className="min-h-[60px] flex items-center justify-center">
                  {selectedVeggies.length > 0 ? (
                    <div className="space-y-1">
                      {selectedVeggies.map((veggie, index) => (
                        <span key={index} className="block text-sm text-gray-600 bg-white px-2 py-1 rounded">
                          {veggie}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Aucun légume sélectionné</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-gray-700">🥩 Protéine</h4>
                <div className="min-h-[60px] flex items-center justify-center">
                  {selectedProtein.length > 0 ? (
                    <span className="text-sm text-gray-600 bg-white px-3 py-2 rounded">
                      {selectedProtein[0]}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Aucune protéine sélectionnée</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-gray-700">🥄 Sauce</h4>
                <div className="min-h-[60px] flex items-center justify-center">
                  {selectedSauce.length > 0 ? (
                    <span className="text-sm text-gray-600 bg-white px-3 py-2 rounded">
                      {selectedSauce[0]}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Aucune sauce sélectionnée</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center animate-slide-up">
            <button
              type="submit"
              disabled={isPending || selectedVeggies.length === 0 || selectedProtein.length === 0 || selectedSauce.length === 0}
              className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
                isPending || selectedVeggies.length === 0 || selectedProtein.length === 0 || selectedSauce.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Validation en cours...
                </span>
              ) : (
                `🛒 Commander ma salade - ${calculatePrice()}€`
              )}
            </button>
            
            {(selectedVeggies.length === 0 || selectedProtein.length === 0 || selectedSauce.length === 0) && (
              <p className="mt-4 text-gray-500 text-sm">
                Veuillez sélectionner au moins un légume, une protéine et une sauce
              </p>
            )}
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-16 card p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            💡 Conseils de nos chefs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-bold text-gray-700 mb-2">🥗 Combinaisons populaires :</h4>
              <ul className="space-y-1">
                <li>• Roquette + Saumon fumé + Vinaigrette citron</li>
                <li>• Épinards + Quinoa + Sauce tahini</li>
                <li>• Laitue + Poulet grillé + Sauce César</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-2">⚡ Le saviez-vous ?</h4>
              <ul className="space-y-1">
                <li>• Plus de 5 légumes = boost nutritionnel</li>
                <li>• Avocat + quinoa = protéines complètes</li>
                <li>• Préparation en moins de 5 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}