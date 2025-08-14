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
      } else {
        router.push('/dashboard')
      }
    }
  }, [projects, projectId, router])

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
      <ProjectDetails project={project} onUpdate={updateProject} />
    </DashboardLayout>
  )
}