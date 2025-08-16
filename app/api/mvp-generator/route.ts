import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { mvpConfig } = await request.json()

    if (!mvpConfig || !mvpConfig.name) {
      return NextResponse.json(
        { error: 'Missing MVP configuration' },
        { status: 400 }
      )
    }

    // Simulate code generation delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    const projectName = mvpConfig.name
    const features = mvpConfig.features || []
    const techStack = mvpConfig.techStack || 'react'
    const database = mvpConfig.database || 'supabase'

    // Generate comprehensive code structure
    const generatedCode = {
      components: [
        {
          name: 'App.jsx',
          content: generateAppComponent(projectName, techStack, features)
        },
        {
          name: 'components/Header.jsx',
          content: generateHeaderComponent(projectName)
        },
        {
          name: 'components/Dashboard.jsx',
          content: generateDashboardComponent(features)
        },
        {
          name: 'pages/Home.jsx',
          content: generateHomeComponent(projectName, mvpConfig.description)
        },
        {
          name: 'hooks/useAuth.js',
          content: generateAuthHook(database)
        },
        {
          name: 'lib/database.js',
          content: generateDatabaseConfig(database)
        }
      ],
      database: {
        schema: generateDatabaseSchema(features, database),
        config: generateDatabaseConfigFile(database)
      },
      deployment: {
        vercel: generateVercelConfig(projectName),
        dockerfile: generateDockerfile(),
        packageJson: generatePackageJson(projectName, techStack, database)
      },
      styles: {
        'globals.css': generateGlobalStyles(),
        'components.css': generateComponentStyles()
      }
    }

    return NextResponse.json({ generatedCode })
  } catch (error) {
    console.error('Error generating MVP code:', error)
    return NextResponse.json(
      { error: 'Failed to generate MVP code' },
      { status: 500 }
    )
  }
}

function generateAppComponent(projectName: string, techStack: string, features: string[]) {
  if (techStack === 'react') {
    return `import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Dashboard from './components/Dashboard'
import { AuthProvider } from './hooks/useAuth'
import './styles/globals.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              ${features.map(feature => 
                `<Route path="/${feature.toLowerCase().replace(/\s+/g, '-')}" element={<${feature.replace(/\s+/g, '')}Page />} />`
              ).join('\n              ')}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App`
  }
  
  return `// ${techStack} implementation for ${projectName}`
}

function generateHeaderComponent(projectName: string) {
  return `import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            ${projectName}
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header`
}

function generateDashboardComponent(features: string[]) {
  return `import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user data
    const fetchData = async () => {
      try {
        // Add your data fetching logic here
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
        <p className="text-gray-600">You need to be signed in to access the dashboard.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user.user_metadata?.full_name || user.email}!
        </h1>
        <p className="text-gray-600">Here's your dashboard overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${features.map(feature => `
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">${feature}</h3>
          <p className="text-gray-600 mb-4">Manage your ${feature.toLowerCase()} here.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            View ${feature}
          </button>
        </div>`).join('')}
      </div>
    </div>
  )
}

export default Dashboard`
}

function generateHomeComponent(projectName: string, description: string) {
  return `import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Home() {
  const { user } = useAuth()

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Welcome to ${projectName}
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        ${description || 'Transform your ideas into reality with our powerful platform.'}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {user ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Home`
}

function generateAuthHook(database: string) {
  return `import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize auth state
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      // Add your auth check logic here based on ${database}
      setLoading(false)
    } catch (error) {
      console.error('Auth check error:', error)
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      // Add sign in logic for ${database}
      return { success: true }
    } catch (error) {
      return { error: error.message }
    }
  }

  const signUp = async (email, password, userData) => {
    try {
      // Add sign up logic for ${database}
      return { success: true }
    } catch (error) {
      return { error: error.message }
    }
  }

  const signOut = async () => {
    try {
      // Add sign out logic for ${database}
      setUser(null)
      return { success: true }
    } catch (error) {
      return { error: error.message }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`
}

function generateDatabaseConfig(database: string) {
  switch (database) {
    case 'supabase':
      return `import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export const db = {
  // User operations
  async getUser(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Add more database operations as needed
}`

    case 'firebase':
      return `import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)`

    default:
      return `// Database configuration for ${database}
export const db = {
  // Add your database operations here
}`
  }
}

function generateDatabaseSchema(features: string[], database: string) {
  const tables = features.map(feature => {
    const tableName = feature.toLowerCase().replace(/\s+/g, '_')
    return `-- ${feature} table
CREATE TABLE ${tableName} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`
  }).join('\n\n')

  return `-- ${database} Database Schema
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

${tables}

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
${features.map(feature => {
  const tableName = feature.toLowerCase().replace(/\s+/g, '_')
  return `CREATE INDEX idx_${tableName}_user_id ON ${tableName}(user_id);`
}).join('\n')}`
}

function generateDatabaseConfigFile(database: string) {
  return `// Database configuration
export const dbConfig = {
  type: '${database}',
  url: process.env.DATABASE_URL,
  apiKey: process.env.DATABASE_API_KEY,
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  }
}`
}

function generateVercelConfig(projectName: string) {
  return `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, '-')}",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_SUPABASE_URL": "@supabase-url",
    "REACT_APP_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}`
}

function generateDockerfile() {
  return `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]`
}

function generatePackageJson(projectName: string, techStack: string, database: string) {
  const dependencies = {
    react: {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.8.0"
    },
    vue: {
      "vue": "^3.3.0",
      "vue-router": "^4.2.0"
    },
    svelte: {
      "svelte": "^4.0.0",
      "@sveltejs/kit": "^1.20.0"
    }
  }

  const dbDependencies = {
    supabase: '"@supabase/supabase-js": "^2.38.0"',
    firebase: '"firebase": "^10.7.0"',
    mongodb: '"mongodb": "^6.3.0"'
  }

  return `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "vite preview --port 3000"
  },
  "dependencies": {
    ${Object.entries(dependencies[techStack as keyof typeof dependencies] || dependencies.react)
      .map(([key, value]) => `"${key}": "${value}"`)
      .join(',\n    ')},
    ${dbDependencies[database as keyof typeof dbDependencies] || dbDependencies.supabase},
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}`
}

function generateGlobalStyles() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
  
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
  }
  
  .card {
    @apply bg-white p-6 rounded-lg shadow-sm border;
  }
}`
}

function generateComponentStyles() {
  return `.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.feature-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`
}