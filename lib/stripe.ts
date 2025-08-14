import { loadStripe } from '@stripe/stripe-js'

export const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Basic',
    price: 29,
    features: [
      'Up to 3 projects',
      'AI Blueprint Generation',
      'Basic Wireframes',
      'Email Support'
    ]
  },
  pro: {
    name: 'Pro',
    price: 79,
    features: [
      'Unlimited projects',
      'Advanced AI Analysis',
      'Premium Wireframes',
      'Pitch Deck Generation',
      'Priority Support',
      'Freelancer Collaboration'
    ]
  }
}

export async function createCheckoutSession(priceId: string, userId: string) {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
      }),
    })

    const session = await response.json()
    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}