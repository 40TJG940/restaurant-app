export default async function sendOrder(prevState: any, formData: FormData) {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  try {
    // Extract form data
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const selectedVeggies = formData.getAll('veggies') as string[]
    const selectedProtein = formData.get('protein') as string
    const selectedSauce = formData.get('sauce') as string

    // Basic validation
    if (!username || !email) {
      return {
        orderStatus: false,
        error: 'Nom et email requis',
        order: null
      }
    }

    if (!selectedProtein || !selectedSauce || selectedVeggies.length === 0) {
      return {
        orderStatus: false,
        error: 'Veuillez sélectionner au moins un légume, une protéine et une sauce',
        order: null
      }
    }

    // Prepare ingredients list
    const ingredientsList = {
      veggies: selectedVeggies,
      protein: selectedProtein,
      sauce: selectedSauce
    }

    // Send to API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        ingredientsList
      })
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        orderStatus: false,
        error: result.error || 'Erreur lors de la commande',
        order: null
      }
    }

    return {
      orderStatus: true,
      success: result.message,
      order: result.order,
      error: null
    }

  } catch (error) {
    console.error('Error in sendOrder:', error)
    return {
      orderStatus: false,
      error: 'Erreur de connexion. Veuillez réessayer.',
      order: null
    }
  }
}