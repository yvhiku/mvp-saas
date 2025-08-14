import { NextRequest, NextResponse } from 'next/server'
import { generatePitchDeck } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add your OpenAI API key to use AI features.' },
        { status: 400 }
      )
    }

    const { blueprint, projectName } = await request.json()

    if (!blueprint || !projectName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const pitchDeck = await generatePitchDeck(blueprint, projectName)

    return NextResponse.json({ pitchDeck })
  } catch (error) {
    console.error('Error generating pitch deck:', error)
    
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
      { error: 'Failed to generate pitch deck' },
      { status: 500 }
    )
  }
}