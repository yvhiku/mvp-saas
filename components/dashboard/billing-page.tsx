'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Check, Crown, Loader2 } from 'lucide-react'
import { SUBSCRIPTION_PLANS, createCheckoutSession } from '@/lib/stripe'
import { useAuth } from '@/hooks/use-auth'

export function BillingPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (planName: string) => {
    if (!user) return

    setLoading(planName)
    setError(null)

    try {
      // In a real app, you'd have Stripe price IDs from your Stripe dashboard
      const priceId = planName === 'basic' ? 'price_basic_id' : 'price_pro_id'
      
      const session = await createCheckoutSession(priceId, user.id)
      
      if (session.url) {
        window.location.href = session.url
      }
    } catch (error: any) {
      setError('Failed to create checkout session. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-2">Choose the plan that works best for your startup journey</p>
      </div>

      {error && (
        <Alert className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
          <Card key={key} className={`relative ${key === 'pro' ? 'ring-2 ring-blue-600' : ''}`}>
            {key === 'pro' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">
                  <Crown className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full"
                variant={key === 'pro' ? 'default' : 'outline'}
                onClick={() => handleSubscribe(key)}
                disabled={loading === key}
              >
                {loading === key ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Get ${plan.name}`
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>Manage your current subscription and billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-sm text-gray-600">Limited features available</p>
            </div>
            <Button variant="outline">Manage Billing</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}