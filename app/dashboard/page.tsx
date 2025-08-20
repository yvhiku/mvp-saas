'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ProjectsGrid } from '@/components/dashboard/projects-grid'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to auth')
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Debug info */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-medium text-yellow-800">Debug Info:</h3>
          <p className="text-sm text-yellow-700">User ID: {user?.id}</p>
          <p className="text-sm text-yellow-700">User Email: {user?.email}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email}!
          </h2>
          <p className="text-gray-600">
            Ready to build your next MVP? Create a new project or continue working on existing ones.
          </p>
        </div>
        <ProjectsGrid />
      </div>
    </DashboardLayout>
  )
}