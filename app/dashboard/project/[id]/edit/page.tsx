'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useProjects } from '@/hooks/use-projects'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, X } from 'lucide-react'
import type { Project } from '@/hooks/use-projects'

export default function EditProjectPage() {
  const { user, loading: authLoading } = useAuth()
  const { projects, loading: projectsLoading, updateProject } = useProjects()
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    target_market: '',
    main_features: [] as string[],
  })

  const [currentFeature, setCurrentFeature] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = projects.find(p => p.id === projectId)
      if (foundProject) {
        setProject(foundProject)
        setFormData({
          name: foundProject.name,
          description: foundProject.description,
          target_market: foundProject.target_market,
          main_features: [...foundProject.main_features],
        })
      } else {
        router.push('/dashboard')
      }
    }
  }, [projects, projectId, router])

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
    setSuccess(false)

    try {
      if (formData.main_features.length === 0) {
        throw new Error('Please add at least one main feature')
      }

      await updateProject(projectId, formData)
      setSuccess(true)
      setTimeout(() => {
        router.push(`/dashboard/project/${projectId}`)
      }, 1500)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || !project) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push(`/dashboard/project/${projectId}`)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
            <CardDescription>
              Update your project details and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  Project updated successfully! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., TaskFlow, EcoTracker, FinanceAI"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
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
                  onClick={() => router.push(`/dashboard/project/${projectId}`)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || formData.main_features.length === 0}
                  className="flex-1"
                >
                  {loading ? 'Updating...' : 'Update Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}