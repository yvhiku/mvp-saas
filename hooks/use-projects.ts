'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'

export interface Project {
  id: string
  user_id: string
  name: string
  description: string
  target_market: string
  main_features: string[]
  blueprint: any | null
  wireframe_url: string | null
  pitch_deck: any | null
  checklist: any | null
  status: string
  created_at: string
  updated_at: string
}

export function useProjects() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      console.log('Fetching projects for user:', user.email)
      console.log('User ID:', user.id)
      fetchProjects()
    } else {
      console.log('No user, clearing projects')
      setProjects([])
      setLoading(false)
    }
  }, [user])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      console.log('Fetching projects from database...')
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        throw error
      }
      
      console.log('Fetched projects:', data?.length || 0, 'Projects:', data?.map(p => ({ id: p.id, name: p.name })))
      console.log('Full project data:', data)
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: {
    name: string
    description: string
    target_market: string
    main_features: string[]
  }) => {
    try {
      console.log('Creating project:', projectData.name, 'for user:', user?.id)
      
      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...projectData,
          user_id: user?.id,
          status: 'draft',
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating project:', error)
        throw error
      }
      
      console.log('Project created successfully:', data)
      await fetchProjects()
      return data
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  }

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      console.log('Updating project:', projectId)
      
      const { error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', projectId)

      if (error) {
        console.error('Error updating project:', error)
        throw error
      }
      
      console.log('Project updated successfully')
      await fetchProjects()
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  const deleteProject = async (projectId: string) => {
    try {
      console.log('Deleting project:', projectId)
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) {
        console.error('Error deleting project:', error)
        throw error
      }
      
      console.log('Project deleted successfully')
      await fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}