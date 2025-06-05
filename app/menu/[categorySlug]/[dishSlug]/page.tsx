import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Showdown from 'showdown'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface DishDetailPageProps {
  params: Promise<{ 
    categorySlug: string
    dishSlug: string 
  }>
}

function getSingleDishBySlug(slug: string) {
  try {
    const contentDir = path.join(process.cwd(), 'content/menu-offer')
    
    if (!fs.existsSync(contentDir)) {
      return null
    }
    
    const files = fs.readdirSync(contentDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    for (const file of mdFiles) {
      const fullPath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContent)
      
      const fileSlug = data.slug || file.replace('.md', '')
      if (fileSlug === slug) {
        return {
          fields: data,
          content
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error loading dish:', error)
    return null
  }
}

export default async function DishDetailPage({ params }: DishDetailPageProps) {
  const { categorySlug, dishSlug } = await params
  const itemDish = getSingleDishBySlug(dishSlug)
  
  if (!itemDish) {
    notFound()
  }

  const fields = itemDish.fields
  const converter = new Showdown.Converter()
  const contentHTML = converter.makeHtml(itemDish.content)

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
            <li>
              <Link href={`/menu/${categorySlug}`} className="hover:text-primary-600 transition-colors">
                {categorySlug}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{fields.title}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <div className="animate-fade-in">
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={fields.image || '/images/placeholder.jpg'}
                alt={fields.title || 'Plat'}
                fill
                className="object-cover"
                priority
              />
              {/* Price Overlay */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-2xl font-bold text-primary-600">
                  {fields.price}€
                </span>
              </div>
              {/* Featured Badge */}
              {fields.featured && (
                <div className="absolute top-6 left-6 bg-primary-500 text-white px-3 py-2 rounded-full text-sm font-semibold">
                  ⭐ Coup de cœur
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 animate-slide-up">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium uppercase">
                  {fields.category}
                </span>
                {fields.featured && (
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    Recommandé
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                {fields.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {fields.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">🥬 Ingrédients</h3>
              <div className="grid grid-cols-2 gap-2">
                {(fields.ingredients || []).map((ingredient: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                    <span className="text-gray-700 font-medium">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <Link
                href="/make-your-own-salad"
                className="btn-primary w-full text-center block"
              >
                🛒 Commander maintenant - {fields.price}€
              </Link>
              <Link
                href={`/menu/${categorySlug}`}
                className="btn-secondary w-full text-center block"
              >
                ← Retour aux {categorySlug}
              </Link>
            </div>
          </div>
        </article>

        {/* Detailed Description */}
        <div className="card p-8 mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 Description détaillée</h2>
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-primary-600"
            dangerouslySetInnerHTML={{ __html: contentHTML }} 
          />
        </div>

        {/* Related Items or Call to Action */}
        <div className="text-center">
          <div className="card p-12 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Créez votre propre combinaison
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Inspiré par ce plat ? Créez votre propre salade personnalisée avec nos ingrédients frais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/make-your-own-salad" className="btn-primary">
                🥗 Créer ma salade
              </Link>
              <Link href="/menu-offer" className="btn-secondary">
                🍽️ Voir toute la carte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}