import { NextRequest, NextResponse } from 'next/server'
import { generateWireframe } from '@/lib/figma'

export async function POST(request: NextRequest) {
  try {
    const { blueprint, projectName } = await request.json()

    if (!blueprint || !projectName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const wireframe = await generateWireframe(blueprint, projectName)

    return NextResponse.json({ wireframe })
  } catch (error) {
    console.error('Error generating wireframe:', error)
    
    return NextResponse.json(
      { error: 'Failed to generate wireframe' },
      { status: 500 }
    )
  }
}