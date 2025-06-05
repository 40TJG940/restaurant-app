import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const queryType = searchParams.get('type')

  const veggies = [
    "Laitue romaine",
    "Roquette", 
    "Épinards",
    "Tomates cerises",
    "Concombre",
    "Avocat",
    "Carotte",
    "Betterave",
    "Olives",
    "Cornichons"
  ]

  const proteins = [
    "Poulet grillé",
    "Thon",
    "Saumon fumé",
    "Œufs durs",
    "Tofu",
    "Feta",
    "Mozzarella",
    "Quinoa",
    "Lentilles",
    "Pois chiches"
  ]

  const sauces = [
    "Vinaigrette balsamique",
    "Sauce César",
    "Vinaigrette moutarde",
    "Sauce au citron",
    "Huile d'olive",
    "Sauce tahini",
    "Vinaigrette au miel",
    "Sauce yaourt",
    "Pesto",
    "Sauce soja"
  ]

  let listIngredients = null

  switch(queryType) {
    case "proteins":
      listIngredients = proteins
      break
    case "veggies":
      listIngredients = veggies
      break
    case "sauces":
      listIngredients = sauces
      break
    default:
      listIngredients = { veggies, proteins, sauces }
  }

  return new Response(JSON.stringify(listIngredients), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}