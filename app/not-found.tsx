import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Animation */}
        <div className="animate-fade-in">
          <div className="text-8xl md:text-9xl font-bold text-primary-500 mb-8 animate-bounce-soft">
            404
          </div>
          
          {/* Illustration */}
          <div className="text-6xl mb-8 animate-pulse">
            🍽️💨
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Oups ! Plat introuvable
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Il semble que cette page ait été dévorée ! 
            Notre chef a peut-être déplacé ce contenu ou il n'existe plus.
          </p>
        </div>

        {/* Error Details */}
        <div className="card p-8 mb-8 bg-gradient-to-r from-red-50 to-orange-50 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🔍 Que s'est-il passé ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              <div className="text-3xl">🔗</div>
              <h3 className="font-semibold text-gray-700">Lien cassé</h3>
              <p>Le lien que vous avez suivi est peut-être obsolète</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">✏️</div>
              <h3 className="font-semibold text-gray-700">Erreur de frappe</h3>
              <p>Il y a peut-être une faute dans l'URL</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🚚</div>
              <h3 className="font-semibold text-gray-700">Page déplacée</h3>
              <p>Cette page a peut-être été déplacée ou supprimée</p>
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-6 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800">
            🧭 Où souhaitez-vous aller ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/" 
              className="card p-6 hover:bg-primary-50 transition-all duration-200 group"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce-soft">🏠</div>
              <h3 className="font-bold text-gray-800 mb-2">Accueil</h3>
              <p className="text-gray-600 text-sm">Retour à la page principale</p>
            </Link>

            <Link 
              href="/menu-offer" 
              className="card p-6 hover:bg-primary-50 transition-all duration-200 group"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce-soft">🍽️</div>
              <h3 className="font-bold text-gray-800 mb-2">Notre carte</h3>
              <p className="text-gray-600 text-sm">Découvrez nos plats</p>
            </Link>

            <Link 
              href="/make-your-own-salad" 
              className="card p-6 hover:bg-primary-50 transition-all duration-200 group"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce-soft">🥗</div>
              <h3 className="font-bold text-gray-800 mb-2">Créer une salade</h3>
              <p className="text-gray-600 text-sm">Composez votre plat</p>
            </Link>

            <Link 
              href="/our-recipes" 
              className="card p-6 hover:bg-primary-50 transition-all duration-200 group"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce-soft">👨‍🍳</div>
              <h3 className="font-bold text-gray-800 mb-2">Nos recettes</h3>
              <p className="text-gray-600 text-sm">Inspirez-vous</p>
            </Link>
          </div>
        </div>

        {/* Search Alternative */}
        <div className="mt-12 card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 animate-slide-up">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🔍 Ou cherchez ce que vous voulez
          </h3>
          <p className="text-gray-600 mb-6">
            Utilisez notre navigation pour trouver exactement ce que vous cherchez
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Rechercher un plat, une recette..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="btn-primary">
              Rechercher
            </button>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-gray-500 text-sm">
            💡 <strong>Le saviez-vous ?</strong> Notre chef prépare plus de 50 plats différents chaque semaine !
          </p>
        </div>

        {/* Back button */}
        <div className="mt-8">
          <Link href="/" className="btn-secondary inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}