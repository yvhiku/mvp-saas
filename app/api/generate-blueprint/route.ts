import { NextRequest, NextResponse } from 'next/server'
import { generateBlueprint } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add your OpenAI API key to use AI features.' },
        { status: 400 }
      )
    }

    const { projectName, description, targetMarket, features } = await request.json()

    if (!projectName || !description || !targetMarket || !features) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const blueprint = await generateBlueprint(projectName, description, targetMarket, features)

    return NextResponse.json({ blueprint })
  } catch (error) {
    console.error('Error generating blueprint:', error)
    
    // Return more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured or invalid. Please check your API key.' },
          { status: 400 }
        )
      }
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'OpenAI API quota exceeded. Please check your OpenAI account.' },
          { status: 429 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to generate blueprint' },
      { status: 500 }
    )
  }
}