'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, ArrowLeft, Users, Target, Zap, Shield } from 'lucide-react'

export default function AboutPage() {
  const router = useRouter()

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We believe every great idea deserves a chance to become reality. Our mission is to democratize startup creation.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI technology to provide insights and tools that were previously only available to well-funded startups.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We build for entrepreneurs, by entrepreneurs. Our community drives our product development and feature priorities.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your ideas are precious. We use enterprise-grade security to protect your intellectual property and data.'
    }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former startup founder with 2 successful exits. Passionate about helping entrepreneurs succeed.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-founder',
      bio: 'AI researcher and former Google engineer. Expert in machine learning and product development.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Product',
      bio: 'Product strategist with 8+ years at leading tech companies. Focused on user experience and growth.',
      image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
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
            <Button variant="ghost" onClick={() => router.push('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About MVP Builder AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to empower entrepreneurs worldwide by making startup creation 
            accessible, data-driven, and successful through the power of artificial intelligence.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                MVP Builder AI was born from a simple frustration: too many great ideas never see the light of day. 
                As serial entrepreneurs, we experienced firsthand the challenges of turning an idea into a viable business. 
                The process was time-consuming, expensive, and often overwhelming.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We realized that with the power of AI, we could democratize access to the tools and insights that 
                successful startups use. What once required expensive consultants, months of research, and significant 
                capital could now be accomplished in hours with intelligent automation.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, MVP Builder AI helps thousands of entrepreneurs validate their ideas, create professional 
                business plans, and build their first products. We're just getting started.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-blue-600 text-white">
            <CardContent className="py-12">
              <h2 className="text-2xl font-bold mb-4">Ready to Build Your Startup?</h2>
              <p className="text-blue-100 mb-6">
                Join thousands of entrepreneurs who've turned their ideas into successful businesses with MVP Builder AI.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => router.push('/auth')}
              >
                Start Building Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}