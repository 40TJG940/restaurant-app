import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import DishItem from "@/components/DishItem"
import FilterByCategory from "@/components/FilterByCategory"

const getDishes = () => {
  try {
    const contentDir = path.join(process.cwd(), 'content/menu-offer')
    
    if (!fs.existsSync(contentDir)) {
      return []
    }
    
    const files = fs.readdirSync(contentDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    return mdFiles.map(file => {
      const fullPath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return {
        fields: {
          ...data,
          slug: data.slug || file.replace('.md', ''),
          title: data.title || 'Plat sans nom',
          category: data.category || 'autres',
          price: data.price || 0,
          image: data.image || '',
          description: data.description || '',
          ingredients: data.ingredients || [],
          featured: data.featured || false
        },
        content
      }
    })
  } catch (error) {
    console.error('Error loading dishes:', error)
    return []
  }
}

export default async function MenuOfferPage() {
  const dishes = getDishes()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Notre Carte
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de plats frais et savoureux, 
            préparés avec des ingrédients de qualité
          </p>
        </div>

        {/* Filter Component */}
        <div className="mb-12 animate-slide-up">
          <FilterByCategory dishes={dishes} />
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {dishes.length > 0 ? (
            dishes.map((dish, index) => {
              const fields = dish.fields || {}
              return (
                <div
                  key={fields.slug || index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DishItem
                    title={fields.title || 'Plat sans nom'}
                    slug={fields.slug || ''}
                    category={fields.category || 'autres'}
                    price={fields.price || 0}
                    image={fields.image || '/images/placeholder.jpg'}
                    description={fields.description || ''}
                    ingredients={fields.ingredients || []}
                    featured={fields.featured || false}
                  />
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Carte en cours de préparation
              </h3>
              <p className="text-gray-500">
                Nos chefs travaillent actuellement sur de nouveaux plats délicieux !
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="card p-12 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Envie de créer votre propre salade ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Composez votre salade sur-mesure en choisissant parmi notre sélection 
              d'ingrédients frais et de qualité
            </p>
            <a
              href="/make-your-own-salad"
              className="btn-secondary inline-flex items-center"
            >
              <span>🥗 Créer ma salade personnalisée</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}