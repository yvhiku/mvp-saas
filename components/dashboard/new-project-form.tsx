'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProjects } from '@/hooks/use-projects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

export function NewProjectForm() {
  const { createProject } = useProjects()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target_market: '',
    main_features: [] as string[],
  })

  const [currentFeature, setCurrentFeature] = useState('')

  const addFeature = () => {
    if (currentFeature.trim() && !formData.main_features.includes(currentFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        main_features: [...prev.main_features, currentFeature.trim()]
      }))
      setCurrentFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      main_features: prev.main_features.filter(f => f !== feature)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (formData.main_features.length === 0) {
        throw new Error('Please add at least one main feature')
      }

      const project = await createProject(formData)
      router.push(`/dashboard/project/${project.id}`)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>
            Tell us about your startup idea and we'll help you build the blueprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Startup Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., TaskFlow, EcoTracker, FinanceAI"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Idea Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your startup idea, the problem it solves, and how it works..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="target_market">Target Market</Label>
              <Input
                id="target_market"
                value={formData.target_market}
                onChange={(e) => setFormData(prev => ({ ...prev, target_market: e.target.value }))}
                placeholder="e.g., Small business owners, College students, Enterprise teams"
                required
              />
            </div>

            <div>
              <Label htmlFor="features">Main Features</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  id="features"
                  value={currentFeature}
                  onChange={(e) => setCurrentFeature(e.target.value)}
                  placeholder="Enter a feature and press Add"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature} variant="secondary">
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.main_features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFeature(feature)}
                    />
                  </Badge>
                ))}
              </div>
              
              {formData.main_features.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Add at least one main feature for your startup
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || formData.main_features.length === 0}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}