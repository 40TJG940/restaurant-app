"use server"

interface OrderState {
  orderStatus: boolean;
  orderNumber?: number;
  message: string;
}

export default async function sendOrder(
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  try {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const veggies = formData.get('veggies') as string;
    const proteins = formData.get('proteins') as string;
    const sauces = formData.get('sauces') as string;
    
    if (!username || !email) {
      return {
        orderStatus: false,
        message: "Please fill in all required fields"
      };
    }
    
    const ingredientsList = [veggies, proteins, sauces].filter(Boolean);
    
    // Use relative URL instead of localhost
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:80' 
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:80';
    
    const response = await fetch(`${baseUrl}/api/order`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, ingredientsList })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const orderData = await response.json();
    
    return {
      orderStatus: true,
      orderNumber: orderData.id,
      message: "Order sent successfully!"
    };
  } catch (error) {
    return {
      orderStatus: false,
      message: "Error sending order. Please try again."
    };
  }
}