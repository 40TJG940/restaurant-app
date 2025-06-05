export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { username, email, ingredientsList } = body

    // Basic validation
    if (!username || !email || !ingredientsList) {
      return new Response(
        JSON.stringify({ 
          error: 'Données manquantes. Username, email et liste d\'ingrédients requis.' 
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Format d\'email invalide.' 
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Calculate price based on ingredients
    const basePrice = 8.90
    const proteinPrice = 3.50
    const premiumVeggiePrice = 1.50
    
    let totalPrice = basePrice
    
    // Add protein cost if protein selected
    if (ingredientsList.protein) {
      totalPrice += proteinPrice
    }
    
    // Add premium veggie costs (simplified calculation)
    if (ingredientsList.veggies && ingredientsList.veggies.length > 3) {
      totalPrice += (ingredientsList.veggies.length - 3) * premiumVeggiePrice
    }

    // Create new order
    const newOrder = { 
      id: Date.now(), 
      username, 
      email, 
      ingredientsList,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      status: 'confirmed',
      estimatedTime: '15-20 minutes',
      createdAt: new Date().toISOString()
    }

    // Simulate order processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return new Response(JSON.stringify({
      success: true,
      order: newOrder,
      message: 'Commande confirmée avec succès!'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error processing order:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Erreur lors du traitement de la commande. Veuillez réessayer.' 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}