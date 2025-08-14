'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Edit, Trash2, Download } from 'lucide-react'
import type { Project } from '@/hooks/use-projects'

interface ProjectCardProps {
  project: Project
  onView: (project: Project) => void
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
}

export function ProjectCard({ project, onView, onEdit, onDelete }: ProjectCardProps) {
  const [loading, setLoading] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgress = () => {
    let completed = 0
    if (project.blueprint) completed += 25
    if (project.wireframe_url) completed += 25
    if (project.pitch_deck) completed += 25
    if (project.checklist) completed += 25
    return completed
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setLoading(true)
      try {
        await onDelete(project.id)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {project.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(project)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={loading}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('_', ' ')}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(project.created_at).toLocaleDateString()}
            </span>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{getProgress()}%</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-2">
            {(Array.isArray(project.main_features) ? project.main_features : []).slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {(Array.isArray(project.main_features) ? project.main_features : []).length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{(Array.isArray(project.main_features) ? project.main_features : []).length - 3} more
              </Badge>
            )}
          </div>

          <Button
            onClick={() => onView(project)}
            className="w-full"
            variant="outline"
          >
            View Project
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}