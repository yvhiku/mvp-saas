import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface BlueprintData {
  concept: string
  features: Array<{
    name: string
    priority: 'high' | 'medium' | 'low'
    description: string
  }>
  competitors: Array<{
    name: string
    strengths: string[]
    weaknesses: string[]
  }>
  marketAnalysis: {
    targetAudience: string
    marketSize: string
    challenges: string[]
  }
}

export interface PitchDeckSlide {
  title: string
  content: string
  notes: string
}

export async function generateBlueprint(
  projectName: string,
  description: string,
  targetMarket: string,
  features: string[]
): Promise<BlueprintData> {
  try {
    const prompt = `
    Create a comprehensive startup blueprint for "${projectName}".
    
    Description: ${description}
    Target Market: ${targetMarket}
    Main Features: ${features.join(', ')}
    
    Generate a detailed analysis including:
    1. Product concept refinement
    2. Feature prioritization with high/medium/low priorities
    3. 3 main competitors with strengths/weaknesses
    4. Market analysis with target audience, market size, and challenges
    
    Return as structured JSON with the following format:
    {
      "concept": "refined product concept",
      "features": [{"name": "feature", "priority": "high|medium|low", "description": "desc"}],
      "competitors": [{"name": "competitor", "strengths": ["strength"], "weaknesses": ["weakness"]}],
      "marketAnalysis": {
        "targetAudience": "description",
        "marketSize": "size estimate",
        "challenges": ["challenge1", "challenge2"]
      }
    }
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating blueprint:', error)
    throw new Error('Failed to generate blueprint')
  }
}

export async function generatePitchDeck(blueprint: BlueprintData, projectName: string): Promise<PitchDeckSlide[]> {
  try {
    const prompt = `
    Create a 10-slide pitch deck for "${projectName}" based on this blueprint:
    ${JSON.stringify(blueprint, null, 2)}
    
    Generate slides for:
    1. Problem Statement
    2. Solution
    3. Market Opportunity
    4. Product Features
    5. Competition Analysis
    6. Business Model
    7. Go-to-Market Strategy
    8. Financial Projections
    9. Team & Roadmap
    10. Ask & Next Steps
    
    Return as JSON array with format:
    [{"title": "slide title", "content": "bullet points", "notes": "presenter notes"}]
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating pitch deck:', error)
    throw new Error('Failed to generate pitch deck')
  }
}

export function generateLaunchChecklist(blueprint: BlueprintData): Array<{
  id: string
  task: string
  category: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}> {
  const baseTasks = [
    { task: 'Define core MVP features', category: 'Product', priority: 'high' as const },
    { task: 'Create user personas', category: 'Research', priority: 'high' as const },
    { task: 'Design wireframes', category: 'Design', priority: 'high' as const },
    { task: 'Set up development environment', category: 'Development', priority: 'high' as const },
    { task: 'Build core functionality', category: 'Development', priority: 'high' as const },
    { task: 'User testing with 10 people', category: 'Testing', priority: 'medium' as const },
    { task: 'Set up analytics tracking', category: 'Analytics', priority: 'medium' as const },
    { task: 'Create landing page', category: 'Marketing', priority: 'medium' as const },
    { task: 'Prepare launch strategy', category: 'Marketing', priority: 'medium' as const },
    { task: 'Set up customer support', category: 'Operations', priority: 'low' as const },
  ]

  return baseTasks.map((task, index) => ({
    id: `task-${index}`,
    ...task,
    completed: false,
  }))
}