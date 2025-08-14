import { NextRequest, NextResponse } from 'next/server'
import { generateBlueprint } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: 'Failed to generate blueprint' },
      { status: 500 }
    )
  }
}