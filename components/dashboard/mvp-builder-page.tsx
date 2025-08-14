'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Rocket, 
  Database,
  Palette, 
  Globe, 
  Settings,
  Download,
  Play,
  CheckCircle,
  Loader2,
  FileText,
  Layers,
  Zap
} from 'lucide-react'

interface MVPStep {
  id: string
  title: string
  description: string
  completed: boolean
  icon: any
  estimatedTime: string
}

export function MVPBuilderPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [mvpConfig, setMvpConfig] = useState({
    name: '',
    description: '',
    techStack: 'react',
    database: 'supabase',
    styling: 'tailwind',
    features: [] as string[],
    deployment: 'vercel'
  })
  const [generatedCode, setGeneratedCode] = useState<any>(null)
  const [currentFeature, setCurrentFeature] = useState('')

  const mvpSteps: MVPStep[] = [
    {
      id: 'planning',
      title: 'Project Planning',
      description: 'Define your MVP scope and technical requirements',
      completed: false,
      icon: FileText,
      estimatedTime: '30 min'
    },
    {
      id: 'architecture',
      title: 'System Architecture',
      description: 'Design your application structure and data flow',
      completed: false,
      icon: Layers,
      estimatedTime: '45 min'
    },
    {
      id: 'database',
      title: 'Database Design',
      description: 'Create your database schema and relationships',
      completed: false,
      icon: Database,
      estimatedTime: '60 min'
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Build your user interface and components',
      completed: false,
      icon: Palette,
      estimatedTime: '4-8 hours'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Implement APIs and business logic',
      completed: false,
      icon: Code,
      estimatedTime: '3-6 hours'
    },
    {
      id: 'deployment',
      title: 'Deployment',
      description: 'Deploy your MVP to production',
      completed: false,
      icon: Rocket,
      estimatedTime: '1 hour'
    }
  ]

  const techStacks = [
    { id: 'react', name: 'React + Next.js', description: 'Modern React framework with SSR' },
    { id: 'vue', name: 'Vue + Nuxt', description: 'Progressive Vue.js framework' },
    { id: 'svelte', name: 'SvelteKit', description: 'Lightweight and fast framework' },
    { id: 'vanilla', name: 'Vanilla JS', description: 'Pure JavaScript with Vite' }
  ]

  const databases = [
    { id: 'supabase', name: 'Supabase', description: 'PostgreSQL with real-time features' },
    { id: 'firebase', name: 'Firebase', description: 'NoSQL database with real-time sync' },
    { id: 'mongodb', name: 'MongoDB', description: 'Flexible document database' },
    { id: 'sqlite', name: 'SQLite', description: 'Lightweight local database' }
  ]

  const deploymentOptions = [
    { id: 'vercel', name: 'Vercel', description: 'Optimized for Next.js and React' },
    { id: 'netlify', name: 'Netlify', description: 'Great for static sites and JAMstack' },
    { id: 'railway', name: 'Railway', description: 'Full-stack deployment platform' },
    { id: 'render', name: 'Render', description: 'Simple cloud platform' }
  ]

  const addFeature = () => {
    if (currentFeature.trim() && !mvpConfig.features.includes(currentFeature.trim())) {
      setMvpConfig(prev => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()]
      }))
      setCurrentFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setMvpConfig(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }))
  }

  const generateMVPCode = async () => {
    setLoading('generating')
    
    try {
      // Simulate code generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockCode = {
        components: [
          {
            name: 'App.jsx',
            content: `import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App`
          },
          {
            name: 'components/Header.jsx',
            content: `import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            ${mvpConfig.name}
          </Link>
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header`
          }
        ],
        database: {
          schema: `-- ${mvpConfig.name} Database Schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add tables for your features
${mvpConfig.features.map(feature => 
  `CREATE TABLE ${feature.toLowerCase().replace(/\s+/g, '_')} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`
).join('\n\n')}`,
          config: `// Database configuration
export const dbConfig = {
  url: process.env.DATABASE_URL,
  apiKey: process.env.DATABASE_API_KEY
}`
        },
        deployment: {
          vercel: `{
  "name": "${mvpConfig.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url",
    "DATABASE_API_KEY": "@database-api-key"
  }
}`,
          dockerfile: `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]`
        }
      }
      
      setGeneratedCode(mockCode)
    } catch (error) {
      console.error('Error generating code:', error)
    } finally {
      setLoading(null)
    }
  }

  const downloadCode = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStepProgress = () => {
    const completedSteps = mvpSteps.filter(step => step.completed).length
    return (completedSteps / mvpSteps.length) * 100
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">MVP Builder</h1>
          <p className="text-gray-600 mt-2">Build your minimum viable product step by step</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{Math.round(getStepProgress())}%</div>
          <p className="text-sm text-gray-600">Complete</p>
        </div>
      </div>

      <div className="mb-6">
        <Progress value={getStepProgress()} className="h-3" />
      </div>

      <Tabs defaultValue="configure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="steps">Build Steps</TabsTrigger>
          <TabsTrigger value="generate">Generate Code</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="configure">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                MVP Configuration
              </CardTitle>
              <CardDescription>
                Configure your MVP settings and technology stack
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="mvp-name">Project Name</Label>
                  <Input
                    id="mvp-name"
                    value={mvpConfig.name}
                    onChange={(e) => setMvpConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Awesome MVP"
                  />
                </div>
                <div>
                  <Label htmlFor="mvp-description">Description</Label>
                  <Textarea
                    id="mvp-description"
                    value={mvpConfig.description}
                    onChange={(e) => setMvpConfig(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your MVP"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <Label>Technology Stack</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {techStacks.map((stack) => (
                    <div
                      key={stack.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        mvpConfig.techStack === stack.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMvpConfig(prev => ({ ...prev, techStack: stack.id }))}
                    >
                      <h4 className="font-medium">{stack.name}</h4>
                      <p className="text-sm text-gray-600">{stack.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Database</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {databases.map((db) => (
                    <div
                      key={db.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        mvpConfig.database === db.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMvpConfig(prev => ({ ...prev, database: db.id }))}
                    >
                      <h4 className="font-medium">{db.name}</h4>
                      <p className="text-sm text-gray-600">{db.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Core Features</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    placeholder="Add a core feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} variant="secondary">
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {mvpConfig.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <button
                        onClick={() => removeFeature(feature)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps">
          <div className="space-y-4">
            {mvpSteps.map((step, index) => (
              <Card key={step.id} className={`${activeStep === index ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.completed ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{step.estimatedTime}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button
                      variant={activeStep === index ? "default" : "outline"}
                      onClick={() => setActiveStep(index)}
                    >
                      {activeStep === index ? 'Current Step' : 'Start Step'}
                    </Button>
                    {step.completed && (
                      <Button variant="ghost" className="text-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Code Generation
              </CardTitle>
              <CardDescription>
                Generate boilerplate code for your MVP based on your configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!generatedCode ? (
                <div className="text-center py-8">
                  <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Your MVP Code</h3>
                  <p className="text-gray-600 mb-6">
                    Create boilerplate code based on your configuration
                  </p>
                  <Button
                    onClick={generateMVPCode}
                    disabled={loading === 'generating' || !mvpConfig.name}
                    className="min-w-[150px]"
                  >
                    {loading === 'generating' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Generate Code
                      </>
                    )}
                  </Button>
                  {!mvpConfig.name && (
                    <p className="text-sm text-gray-500 mt-3">
                      Please configure your project first
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Generated Code Files</h3>
                    <Button onClick={generateMVPCode} variant="outline">
                      Regenerate
                    </Button>
                  </div>

                  <Tabs defaultValue="components" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="components">Components</TabsTrigger>
                      <TabsTrigger value="database">Database</TabsTrigger>
                      <TabsTrigger value="deployment">Deployment</TabsTrigger>
                    </TabsList>

                    <TabsContent value="components">
                      <div className="space-y-4">
                        {generatedCode.components.map((file: any, index: number) => (
                          <Card key={index}>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">{file.name}</CardTitle>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => downloadCode(file.name, file.content)}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{file.content}</code>
                              </pre>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="database">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">schema.sql</CardTitle>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadCode('schema.sql', generatedCode.database.schema)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{generatedCode.database.schema}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="deployment">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">vercel.json</CardTitle>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadCode('vercel.json', generatedCode.deployment.vercel)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{generatedCode.deployment.vercel}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Deployment Guide
              </CardTitle>
              <CardDescription>
                Deploy your MVP to production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Deployment Platform</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {deploymentOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        mvpConfig.deployment === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMvpConfig(prev => ({ ...prev, deployment: option.id }))}
                    >
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <Globe className="h-4 w-4" />
                <AlertDescription>
                  <strong>Deployment Steps for {deploymentOptions.find(o => o.id === mvpConfig.deployment)?.name}:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Push your code to GitHub repository</li>
                    <li>Connect your repository to {deploymentOptions.find(o => o.id === mvpConfig.deployment)?.name}</li>
                    <li>Configure environment variables</li>
                    <li>Deploy and test your MVP</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Start Deployment
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}