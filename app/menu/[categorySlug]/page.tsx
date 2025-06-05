import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import DishItem from "@/components/DishItem"
import Link from "next/link"

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>
}

const getDishesbyCategory = (category: string) => {
  try {
    const contentDir = path.join(process.cwd(), 'content/menu-offer')
    
    if (!fs.existsSync(contentDir)) {
      return []
    }
    
    const files = fs.readdirSync(contentDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    return mdFiles
      .map(file => {
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
      .filter(dish => dish.fields.category === category)
  } catch (error) {
    console.error('Error loading dishes:', error)
    return []
  }
}

const getCategoryInfo = (slug: string) => {
  const categories: Record<string, { name: string; description: string; emoji: string }> = {
    salads: {
      name: "Salades",
      description: "Nos salades fraîches et croquantes, préparées avec des ingrédients de saison",
      emoji: "🥗"
    },
    mains: {
      name: "Plats chauds",
      description: "Des plats savoureux et réconfortants, cuisinés avec passion",
      emoji: "🍖"
    },
    bowls: {
      name: "Bowls",
      description: "Nos bowls équilibrés, parfaits pour un repas complet et nutritif",
      emoji: "🥙"
    }
  }
  
  return categories[slug] || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: "Découvrez notre sélection dans cette catégorie",
    emoji: "🍴"
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params
  const dishes = getDishesbyCategory(categorySlug)
  const categoryInfo = getCategoryInfo(categorySlug)

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fade-in">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/menu-offer" className="hover:text-primary-600 transition-colors">
                Menu
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{categoryInfo.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {categoryInfo.description}
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center animate-slide-up">
          <p className="text-gray-600">
            {dishes.length} plat{dishes.length > 1 ? 's' : ''} disponible{dishes.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Dishes Grid */}
        {dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {dishes.map((dish, index) => {
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
                    category={fields.category || categorySlug}
                    price={fields.price || 0}
                    image={fields.image || '/images/placeholder.jpg'}
                    description={fields.description || ''}
                    ingredients={fields.ingredients || []}
                    featured={fields.featured || false}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Aucun plat dans cette catégorie
            </h3>
            <p className="text-gray-500 mb-6">
              Nos chefs travaillent sur de nouveaux plats pour cette catégorie !
            </p>
            <Link href="/menu-offer" className="btn-primary">
              Voir tous les plats
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-16 text-center">
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Explorez d'autres catégories
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/menu/salads" className="btn-primary">
                🥗 Salades
              </Link>
              <Link href="/menu/mains" className="btn-primary">
                🍖 Plats chauds
              </Link>
              <Link href="/menu/bowls" className="btn-primary">
                🥙 Bowls
              </Link>
              <Link href="/menu-offer" className="btn-secondary">
                🍽️ Voir tout le menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}