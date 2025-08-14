'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  FileText, 
  Image, 
  CheckSquare, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Users,
  Loader2
} from 'lucide-react'

export function AIToolsPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [ideaForm, setIdeaForm] = useState({
    idea: '',
    target: '',
    problem: ''
  })

  const tools = [
    {
      id: 'idea-validator',
      title: 'Idea Validator',
      description: 'Get AI-powered validation and feedback on your startup idea',
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'market-analyzer',
      title: 'Market Analyzer',
      description: 'Analyze market size, competition, and opportunities',
      icon: Target,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'feature-prioritizer',
      title: 'Feature Prioritizer',
      description: 'Prioritize features based on impact and effort',
      icon: CheckSquare,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'competitor-research',
      title: 'Competitor Research',
      description: 'Identify and analyze your main competitors',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'persona-generator',
      title: 'User Persona Generator',
      description: 'Create detailed user personas for your target market',
      icon: Users,
      color: 'bg-pink-100 text-pink-600'
    },
    {
      id: 'pitch-optimizer',
      title: 'Pitch Optimizer',
      description: 'Optimize your pitch deck for maximum impact',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ]

  const handleToolRun = async (toolId: string) => {
    setLoading(toolId)
    setError(null)
    setResults(null)

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock results based on tool type
      switch (toolId) {
        case 'idea-validator':
          setResults({
            type: 'validation',
            score: 8.5,
            strengths: [
              'Clear problem identification',
              'Large target market',
              'Scalable solution'
            ],
            weaknesses: [
              'High competition',
              'Technical complexity'
            ],
            recommendations: [
              'Focus on a specific niche first',
              'Build MVP to validate assumptions',
              'Research competitor pricing strategies'
            ]
          })
          break
        case 'market-analyzer':
          setResults({
            type: 'market',
            marketSize: '$2.5B',
            growth: '15% annually',
            segments: [
              { name: 'Small Business', size: '40%', growth: '12%' },
              { name: 'Enterprise', size: '35%', growth: '18%' },
              { name: 'Startups', size: '25%', growth: '20%' }
            ],
            opportunities: [
              'Underserved SMB segment',
              'Growing remote work trend',
              'Increasing automation demand'
            ]
          })
          break
        default:
          setResults({
            type: 'generic',
            message: `${toolId} analysis completed successfully!`,
            insights: [
              'Key insight 1 based on your input',
              'Key insight 2 with actionable recommendations',
              'Key insight 3 for next steps'
            ]
          })
      }
    } catch (error: any) {
      setError(error.message || 'Failed to run analysis')
    } finally {
      setLoading(null)
    }
  }

  const renderResults = () => {
    if (!results) return null

    switch (results.type) {
      case 'validation':
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Idea Validation Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-green-600">{results.score}/10</div>
                <div>
                  <p className="font-medium">Validation Score</p>
                  <p className="text-sm text-gray-600">Based on market potential and feasibility</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {results.strengths.map((strength: string, i: number) => (
                      <li key={i} className="text-sm text-gray-600">• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Areas to Address</h4>
                  <ul className="space-y-1">
                    {results.weaknesses.map((weakness: string, i: number) => (
                      <li key={i} className="text-sm text-gray-600">• {weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {results.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600">• {rec}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )
      
      case 'market':
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Market Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.marketSize}</div>
                  <p className="text-sm text-gray-600">Total Market Size</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{results.growth}</div>
                  <p className="text-sm text-gray-600">Annual Growth Rate</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Market Segments</h4>
                <div className="space-y-2">
                  {results.segments.map((segment: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{segment.name}</span>
                      <div className="flex gap-4 text-sm">
                        <span>Size: {segment.size}</span>
                        <span className="text-green-600">Growth: {segment.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Opportunities</h4>
                <ul className="space-y-1">
                  {results.opportunities.map((opp: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600">• {opp}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{results.message}</p>
              <ul className="space-y-1">
                {results.insights?.map((insight: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600">• {insight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Tools</h1>
        <p className="text-gray-600 mt-2">Powerful AI-driven tools to accelerate your startup journey</p>
      </div>

      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-3`}>
                <tool.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleToolRun(tool.id)}
                disabled={loading === tool.id}
                className="w-full"
              >
                {loading === tool.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Run Analysis'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Quick Idea Analysis
          </CardTitle>
          <CardDescription>
            Get instant feedback on your startup idea
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="idea">Describe your startup idea</Label>
            <Textarea
              id="idea"
              value={ideaForm.idea}
              onChange={(e) => setIdeaForm(prev => ({ ...prev, idea: e.target.value }))}
              placeholder="Describe your startup idea in detail..."
              rows={3}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target">Target Market</Label>
              <Input
                id="target"
                value={ideaForm.target}
                onChange={(e) => setIdeaForm(prev => ({ ...prev, target: e.target.value }))}
                placeholder="Who is your target customer?"
              />
            </div>
            <div>
              <Label htmlFor="problem">Problem Solved</Label>
              <Input
                id="problem"
                value={ideaForm.problem}
                onChange={(e) => setIdeaForm(prev => ({ ...prev, problem: e.target.value }))}
                placeholder="What problem does it solve?"
              />
            </div>
          </div>
          <Button
            onClick={() => handleToolRun('idea-validator')}
            disabled={loading === 'idea-validator' || !ideaForm.idea}
            className="w-full"
          >
            {loading === 'idea-validator' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Idea...
              </>
            ) : (
              'Analyze My Idea'
            )}
          </Button>
        </CardContent>
      </Card>

      {renderResults()}
    </div>
  )
}