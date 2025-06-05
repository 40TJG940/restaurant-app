import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.jpg"
            alt="Restaurant EAT"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Image Card */}
            <div className="animate-fade-in">
              <div className="card p-8 bg-white/95 backdrop-blur-sm">
                <div className="relative h-80 w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/images/chicken-caesar-salad.jpeg"
                    alt="Salade César au Poulet"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Fraîcheur & Qualité
                </h3>
                <p className="text-gray-600">
                  Découvrez nos plats préparés avec des ingrédients frais et de saison
                </p>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="text-white space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold">
                  <span className="text-primary-400">EAT</span><br />
                  <span className="text-white">Fresh & Healthy</span>
                </h1>
                <p className="text-xl lg:text-2xl leading-relaxed text-gray-200">
                  Savourez l'excellence avec nos plats frais, nos salades personnalisées 
                  et nos recettes uniques. Une expérience culinaire saine et délicieuse vous attend.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu-offer"
                  className="btn-primary text-center animate-bounce-soft"
                >
                  🍽️ Découvrir notre carte
                </Link>
                <Link
                  href="/make-your-own-salad"
                  className="btn-secondary text-center"
                >
                  🥗 Créer ma salade
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce text-white text-center">
            <p className="text-sm mb-2">Découvrez plus</p>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pourquoi choisir EAT ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience culinaire unique alliant fraîcheur, qualité et personnalisation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: 'Ingrédients frais',
                description: 'Sélection quotidienne des meilleurs produits locaux et de saison'
              },
              {
                icon: '👨‍🍳',
                title: 'Préparation artisanale',
                description: 'Nos chefs préparent chaque plat avec passion et savoir-faire'
              },
              {
                icon: '🎨',
                title: 'Personnalisation',
                description: 'Créez votre salade sur-mesure selon vos goûts et besoins'
              }
            ].map((feature, index) => (
              <div key={index} className="card p-8 text-center group hover:bg-primary-50 transition-colors duration-300">
                <div className="text-6xl mb-4 group-hover:animate-bounce-soft">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}