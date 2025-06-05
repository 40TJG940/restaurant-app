export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-400">EAT</h3>
            <p className="text-gray-300 leading-relaxed">
              Restaurant fresh & healthy proposant des plats sains et savoureux, 
              préparés avec des ingrédients de qualité.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liens rapides</h4>
            <nav className="space-y-2">
              <a href="/menu-offer" className="block text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Notre carte
              </a>
              <a href="/opening-hours" className="block text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Horaires
              </a>
              <a href="/make-your-own-salad" className="block text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Commander
              </a>
              <a href="/our-recipes" className="block text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Nos recettes
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 123 Rue de la Santé, Paris</p>
              <p>📞 01 23 45 67 89</p>
              <p>✉️ contact@eat-restaurant.fr</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EAT Restaurant. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}