'use client'

import { useEffect, useState } from 'react'

export default function OpeningHoursPage() {
  const [currentDay, setCurrentDay] = useState<string>('')

  const openingHours = [
    { day: "Sunday", time: "closed" },
    { day: "Monday", time: "closed" },
    { day: "Tuesday", time: "10am to 3pm" },
    { day: "Wednesday", time: "10am to 3pm - 7pm to 10pm" },
    { day: "Thursday", time: "10am to 3pm" },
    { day: "Friday", time: "10am to 3pm" },
    { day: "Saturday", time: "10am to 3pm - 7pm to 10pm" },
  ]

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    setCurrentDay(today)
  }, [])

  const isOpen = (day: string, time: string) => {
    if (time === "closed") return false
    if (day !== currentDay) return true
    
    // Simple check - in real app, you'd check actual time
    return time !== "closed"
  }

  const isToday = (day: string) => day === currentDay

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Horaires d'ouverture
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Retrouvez-nous aux heures indiquées pour savourer nos plats frais et délicieux
          </p>
        </div>

        {/* Current Status */}
        <div className="mb-12 animate-slide-up">
          <div className={`card p-8 text-center border-l-8 ${
            openingHours.find(h => h.day === currentDay)?.time === "closed" 
              ? 'border-red-500 bg-red-50' 
              : 'border-green-500 bg-green-50'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                openingHours.find(h => h.day === currentDay)?.time === "closed" 
                  ? 'bg-red-500' 
                  : 'bg-green-500 animate-pulse'
              }`}></div>
              <h2 className="text-2xl font-bold">
                {openingHours.find(h => h.day === currentDay)?.time === "closed" 
                  ? '🔒 Actuellement fermé' 
                  : '🔓 Actuellement ouvert'
                }
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Aujourd'hui ({currentDay}): {openingHours.find(h => h.day === currentDay)?.time || 'closed'}
            </p>
          </div>
        </div>

        {/* Opening Hours Table */}
        <div className="card overflow-hidden animate-slide-up">
          <div className="bg-primary-600 text-white p-6">
            <h3 className="text-2xl font-bold text-center">
              📅 Nos horaires hebdomadaires
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {openingHours.map((schedule, index) => (
              <div
                key={schedule.day}
                className={`flex justify-between items-center p-6 transition-all duration-200 hover:bg-gray-50 ${
                  isToday(schedule.day) 
                    ? 'bg-primary-50 border-l-4 border-primary-500' 
                    : ''
                } ${
                  schedule.time === "closed" 
                    ? 'opacity-60' 
                    : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-4 ${
                    schedule.time === "closed" 
                      ? 'bg-red-400' 
                      : 'bg-green-400'
                  }`}></div>
                  <span className={`text-lg font-semibold ${
                    isToday(schedule.day) 
                      ? 'text-primary-700' 
                      : 'text-gray-800'
                  }`}>
                    {schedule.day}
                    {isToday(schedule.day) && (
                      <span className="ml-2 text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        Aujourd'hui
                      </span>
                    )}
                  </span>
                </div>
                
                <span className={`text-lg font-medium ${
                  schedule.time === "closed" 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  {schedule.time === "closed" ? "Fermé" : schedule.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              📞 Réservations
            </h4>
            <p className="text-gray-600 mb-4">
              Pour réserver une table ou passer commande :
            </p>
            <div className="space-y-2">
              <p className="font-medium">📞 01 23 45 67 89</p>
              <p className="font-medium">✉️ contact@eat-restaurant.fr</p>
            </div>
          </div>

          <div className="card p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              📍 Adresse
            </h4>
            <p className="text-gray-600 mb-4">
              Retrouvez-nous à :
            </p>
            <div className="space-y-2">
              <p className="font-medium">123 Rue de la Santé</p>
              <p className="font-medium">75014 Paris</p>
              <p className="text-sm text-gray-500">Métro : Glacière (Ligne 6)</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Prêt à découvrir nos saveurs ?
            </h3>
            <p className="text-gray-600 mb-6">
              Consultez notre carte et passez commande dès maintenant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/menu-offer" className="btn-primary">
                🍽️ Voir la carte
              </a>
              <a href="/make-your-own-salad" className="btn-secondary">
                🥗 Créer ma salade
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}