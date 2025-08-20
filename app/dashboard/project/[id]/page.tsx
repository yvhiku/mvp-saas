'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useProjects } from '@/hooks/use-projects'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ProjectDetails } from '@/components/dashboard/project-details'
import type { Project } from '@/hooks/use-projects'

export default function ProjectPage() {
  const { user, loading: authLoading } = useAuth()
  const { projects, loading: projectsLoading, updateProject } = useProjects()
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [notFound, setNotFound] = useState(false)

  console.log('ProjectPage - projectId:', projectId)
  console.log('ProjectPage - projects:', projects.length)
  console.log('ProjectPage - authLoading:', authLoading, 'projectsLoading:', projectsLoading)

  useEffect(() => {
    if (!authLoading && !user) {
      console.log('No user, redirecting to auth')
      router.push('/auth')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!projectsLoading && projects.length > 0 && projectId) {
      console.log('Looking for project with ID:', projectId)
      console.log('Available projects:', projects.map(p => ({ id: p.id, name: p.name, user_id: p.user_id })))
      const foundProject = projects.find(p => p.id === projectId)
      console.log('Found project:', foundProject)
      
      if (foundProject) {
        setProject(foundProject)
        setNotFound(false)
      } else {
        console.log('Project not found!')
        console.log('Searching for ID:', projectId, 'Type:', typeof projectId)
        console.log('Available project IDs:', projects.map(p => ({ id: p.id, type: typeof p.id })))
        setNotFound(true)
      }
    }
    else if (!projectsLoading && projects.length === 0 && projectId) {
      console.log('No projects loaded yet, but projectId exists:', projectId)
    }
  }, [projects, projectId, projectsLoading])

  if (authLoading || projectsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return null
  }

  if (notFound) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or you don't have access to it.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    )
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <ProjectDetails project={project} onUpdate={updateProject} />
    </DashboardLayout>
  )
}