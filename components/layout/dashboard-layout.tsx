'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Home,
  FolderPlus,
  Settings,
  CreditCard,
  LogOut,
  Brain,
} from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'New Project', href: '/dashboard/new', icon: FolderPlus },
    { name: 'AI Tools', href: '/dashboard/ai-tools', icon: Brain },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center px-6 border-b">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">MVP Builder AI</span>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/dashboard/billing')}>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}