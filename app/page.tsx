'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Lightbulb, Rocket, Users, ArrowRight, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to dashboard
  }

  const features = [
    {
      icon: Brain,
      title: 'AI Blueprint Generation',
      description: 'Transform your idea into a comprehensive business blueprint with AI-powered analysis'
    },
    {
      icon: Lightbulb,
      title: 'Smart Wireframes',
      description: 'Generate professional wireframes automatically based on your project requirements'
    },
    {
      icon: Rocket,
      title: 'Pitch Deck Creation',
      description: 'Create investor-ready pitch decks with AI assistance and professional templates'
    },
    {
      icon: Users,
      title: 'Launch Checklist',
      description: 'Get a personalized roadmap to take your MVP from concept to market'
    }
  ]

  const benefits = [
    'Save 100+ hours of planning time',
    'AI-powered market analysis',
    'Professional-grade deliverables',
    'Step-by-step launch guidance',
    'Competitor insights & positioning',
    'Export & share capabilities'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MVP Builder AI</span>
            </div>
            <div className="flex items-center gap-4">
              {!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') ? (
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
                  Connect to Supabase to enable authentication
                </div>
              ) : null}
              <Button onClick={() => router.push('/auth')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              From Idea to
              <span className="text-blue-600"> MVP Blueprint</span>
              <br />in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your startup idea into a comprehensive blueprint with AI-powered analysis, 
              professional wireframes, and investor-ready pitch decks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push('/auth')}>
                Start Building Your MVP
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Launch
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools powered by AI to accelerate your startup journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose MVP Builder AI?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8" onClick={() => router.push('/auth')}>
                Start Your Free Trial
              </Button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
                alt="Dashboard preview"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your MVP?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of entrepreneurs who've launched successful startups with our platform
          </p>
          <Button size="lg" variant="secondary" onClick={() => router.push('/auth')}>
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-lg font-semibold">MVP Builder AI</span>
            </div>
            <p className="text-gray-400">© 2024 MVP Builder AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}