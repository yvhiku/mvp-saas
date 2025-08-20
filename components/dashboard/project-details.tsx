'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Brain,
  FileText,
  Image,
  CheckSquare,
  Download,
  Loader2,
  ArrowLeft,
  Hammer,
} from 'lucide-react'
import type { Project } from '@/hooks/use-projects'
import { generateBlueprint, generatePitchDeck, generateLaunchChecklist, type BlueprintData, type PitchDeckSlide } from '@/lib/openai'
import { generateWireframe, type WireframeData } from '@/lib/figma'

interface ProjectDetailsProps {
  project: Project
  onUpdate: (projectId: string, updates: Partial<Project>) => void
}

export function ProjectDetails({ project, onUpdate }: ProjectDetailsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState({
    blueprint: false,
    wireframe: false,
    pitchDeck: false,
    checklist: false,
  })
  const [error, setError] = useState<string | null>(null)

  console.log('ProjectDetails - Rendering project:', project.id, project.name)

  const generateProjectBlueprint = async () => {
    setLoading(prev => ({ ...prev, blueprint: true }))
    setError(null)

    try {
      console.log('Generating blueprint for project:', project.id)
      // Call the API route instead of direct function
      const response = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: project.name,
          description: project.description,
          targetMarket: project.target_market,
          features: project.main_features,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate blueprint')
      }
      console.log('Blueprint generated successfully')
      await onUpdate(project.id, { blueprint: data.blueprint })
    } catch (error: any) {
      console.error('Error generating blueprint:', error)
      setError(error.message)
    } finally {
      setLoading(prev => ({ ...prev, blueprint: false }))
    }
  }

  const generateProjectWireframe = async () => {
    setLoading(prev => ({ ...prev, wireframe: true }))
    setError(null)

    try {
      const response = await fetch('/api/generate-wireframe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blueprint: project.blueprint,
          projectName: project.name,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate wireframe')
      }

      await onUpdate(project.id, { wireframe_url: data.wireframe.url })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(prev => ({ ...prev, wireframe: false }))
    }
  }

  const generateProjectPitchDeck = async () => {
    if (!project.blueprint) {
      setError('Please generate a blueprint first')
      return
    }

    setLoading(prev => ({ ...prev, pitchDeck: true }))
    setError(null)

    try {
      const response = await fetch('/api/generate-pitch-deck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blueprint: project.blueprint,
          projectName: project.name,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate pitch deck')
      }

      await onUpdate(project.id, { pitch_deck: data.pitchDeck })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(prev => ({ ...prev, pitchDeck: false }))
    }
  }

  const generateProjectChecklist = async () => {
    if (!project.blueprint) {
      setError('Please generate a blueprint first')
      return
    }

    setLoading(prev => ({ ...prev, checklist: true }))
    setError(null)

    try {
      const checklist = generateLaunchChecklist(project.blueprint)
      await onUpdate(project.id, { checklist })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(prev => ({ ...prev, checklist: false }))
    }
  }

  const downloadPitchDeck = async () => {
    if (!project.pitch_deck) return

    // Simulate PDF generation and download
    const slides = project.pitch_deck as PitchDeckSlide[]
    const content = slides.map(slide => `${slide.title}\n\n${slide.content}\n\n---\n\n`).join('')
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name}-pitch-deck.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const updateChecklistItem = async (itemId: string, completed: boolean) => {
    if (!project.checklist) return

    const updatedChecklist = project.checklist.map((item: any) =>
      item.id === itemId ? { ...item, completed } : item
    )

    await onUpdate(project.id, { checklist: updatedChecklist })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
          <Badge className="text-sm">
            {project.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {error && (
        <Alert className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blueprint">Blueprint</TabsTrigger>
          <TabsTrigger value="wireframe">Wireframe</TabsTrigger>
          <TabsTrigger value="pitch-deck">Pitch Deck</TabsTrigger>
          <TabsTrigger value="checklist">Launch Checklist</TabsTrigger>
         <TabsTrigger value="mvp-builder">MVP Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Target Market</Label>
                  <p className="text-gray-600">{project.target_market}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Main Features</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.main_features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Blueprint
                    </span>
                    <Badge variant={project.blueprint ? "default" : "secondary"}>
                      {project.blueprint ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Wireframe
                    </span>
                    <Badge variant={project.wireframe_url ? "default" : "secondary"}>
                      {project.wireframe_url ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Pitch Deck
                    </span>
                    <Badge variant={project.pitch_deck ? "default" : "secondary"}>
                      {project.pitch_deck ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4" />
                      Launch Checklist
                    </span>
                    <Badge variant={project.checklist ? "default" : "secondary"}>
                      {project.checklist ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Hammer className="h-4 w-4" />
                      MVP Builder
                    </span>
                    <Badge variant="secondary">
                      Available
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blueprint">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Blueprint Generator
              </CardTitle>
              <CardDescription>
                Generate a comprehensive analysis of your startup idea
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!project.blueprint ? (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Your Blueprint</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI will analyze your idea and create a detailed blueprint
                  </p>
                  <Button
                    onClick={generateProjectBlueprint}
                    disabled={loading.blueprint}
                    className="min-w-[150px]"
                  >
                    {loading.blueprint ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Blueprint'
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Product Concept</h3>
                    <p className="text-gray-700 leading-relaxed">{project.blueprint.concept}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Feature Prioritization</h3>
                    <div className="space-y-3">
                      {project.blueprint.features?.map((feature: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{feature.name}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                          <Badge variant={
                            feature.priority === 'high' ? 'default' :
                            feature.priority === 'medium' ? 'secondary' : 'outline'
                          }>
                            {feature.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Competitor Analysis</h3>
                    <div className="grid gap-4">
                      {project.blueprint.competitors?.map((competitor: any, index: number) => (
                        <Card key={index}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">{competitor.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-medium text-green-700 mb-2">Strengths</h5>
                                <ul className="text-sm space-y-1">
                                  {competitor.strengths?.map((strength: string, i: number) => (
                                    <li key={i} className="text-gray-600">• {strength}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium text-red-700 mb-2">Weaknesses</h5>
                                <ul className="text-sm space-y-1">
                                  {competitor.weaknesses?.map((weakness: string, i: number) => (
                                    <li key={i} className="text-gray-600">• {weakness}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wireframe">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Wireframe Preview
              </CardTitle>
              <CardDescription>
                AI-generated wireframe based on your blueprint
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!project.wireframe_url ? (
                <div className="text-center py-8">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Wireframe</h3>
                  <p className="text-gray-600 mb-6">
                    Create a visual wireframe based on your blueprint
                  </p>
                  <Button
                    onClick={generateProjectWireframe}
                    disabled={loading.wireframe || !project.blueprint}
                    className="min-w-[150px]"
                  >
                    {loading.wireframe ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Wireframe'
                    )}
                  </Button>
                  {!project.blueprint && (
                    <p className="text-sm text-gray-500 mt-3">
                      Generate a blueprint first to create wireframes
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={project.wireframe_url}
                      alt={`${project.name} wireframe`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={generateProjectWireframe} variant="outline">
                      Regenerate
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pitch-deck">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Pitch Deck Generator
              </CardTitle>
              <CardDescription>
                AI-generated pitch deck slides for your startup
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!project.pitch_deck ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Pitch Deck</h3>
                  <p className="text-gray-600 mb-6">
                    Create a professional pitch deck based on your blueprint
                  </p>
                  <Button
                    onClick={generateProjectPitchDeck}
                    disabled={loading.pitchDeck || !project.blueprint}
                    className="min-w-[150px]"
                  >
                    {loading.pitchDeck ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Pitch Deck'
                    )}
                  </Button>
                  {!project.blueprint && (
                    <p className="text-sm text-gray-500 mt-3">
                      Generate a blueprint first to create a pitch deck
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Pitch Deck Slides</h3>
                    <Button onClick={downloadPitchDeck} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {(project.pitch_deck as PitchDeckSlide[])?.map((slide, index) => (
                      <Card key={index} className="bg-gray-50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">
                            Slide {index + 1}: {slide.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="whitespace-pre-line text-sm text-gray-700">
                            {slide.content}
                          </div>
                          {slide.notes && (
                            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                <strong>Notes:</strong> {slide.notes}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Launch Checklist
              </CardTitle>
              <CardDescription>
                Track your progress toward launching your MVP
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!project.checklist ? (
                <div className="text-center py-8">
                  <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Launch Checklist</h3>
                  <p className="text-gray-600 mb-6">
                    Get a customized checklist based on your project blueprint
                  </p>
                  <Button
                    onClick={generateProjectChecklist}
                    disabled={loading.checklist || !project.blueprint}
                    className="min-w-[150px]"
                  >
                    {loading.checklist ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Checklist'
                    )}
                  </Button>
                  {!project.blueprint && (
                    <p className="text-sm text-gray-500 mt-3">
                      Generate a blueprint first to create a launch checklist
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {['high', 'medium', 'low'].map(priority => {
                    const tasks = project.checklist.filter((item: any) => item.priority === priority)
                    if (tasks.length === 0) return null

                    return (
                      <div key={priority}>
                        <h3 className="text-lg font-semibold mb-3 capitalize">
                          {priority} Priority Tasks
                        </h3>
                        <div className="space-y-2">
                          {tasks.map((item: any) => (
                            <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <Checkbox
                                checked={item.completed}
                                onCheckedChange={(checked) => 
                                  updateChecklistItem(item.id, checked as boolean)
                                }
                              />
                              <div className="flex-1">
                                <p className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                                  {item.task}
                                </p>
                                <p className="text-sm text-gray-600">{item.category}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mvp-builder">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hammer className="h-5 w-5" />
                MVP Builder
              </CardTitle>
              <CardDescription>
                Build your actual MVP with guided development tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Hammer className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready to Build Your MVP?</h3>
                <p className="text-gray-600 mb-6">
                  Use our comprehensive MVP Builder to generate code, set up your database, and deploy your application.
                </p>
                <Button onClick={() => router.push('/dashboard/mvp-builder')}>
                  <Hammer className="mr-2 h-4 w-4" />
                  Open MVP Builder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={`text-sm font-medium ${className}`}>{children}</label>
}