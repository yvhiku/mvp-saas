'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProjects } from '@/hooks/use-projects'
import { ProjectCard } from './project-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Rocket, Brain, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Project } from '@/hooks/use-projects'

export function ProjectsGrid() {
  const { projects, loading, deleteProject } = useProjects()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleView = (project: Project) => {
    router.push(`/dashboard/project/${project.id}`)
  }

  const handleEdit = (project: Project) => {
    router.push(`/dashboard/project/${project.id}/edit`)
  }

  console.log('ProjectsGrid - Projects:', projects.length, 'Loading:', loading)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Projects</h1>
          <p className="text-gray-600">Manage and track your startup projects</p>
        </div>
        <Button onClick={() => router.push('/dashboard/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {projects.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          {projects.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center p-6">
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">AI Blueprint</h3>
                  <p className="text-sm text-gray-600">Generate comprehensive business analysis</p>
                </Card>
                <Card className="text-center p-6">
                  <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pitch Deck</h3>
                  <p className="text-sm text-gray-600">Create investor-ready presentations</p>
                </Card>
                <Card className="text-center p-6">
                  <Rocket className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">MVP Builder</h3>
                  <p className="text-sm text-gray-600">Generate code and deploy your MVP</p>
                </Card>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first project to get started with MVP Builder AI. Transform your startup idea into reality with our AI-powered tools.
              </p>
              <Button onClick={() => router.push('/dashboard/new')} size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matching projects</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={deleteProject}
            />
          ))}
        </div>
      )}
    </div>
  )
}