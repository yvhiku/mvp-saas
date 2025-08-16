import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { blueprint, projectName } = await request.json()

    if (!blueprint || !projectName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate wireframe generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Return mock wireframe data
    const wireframe = {
      url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
      name: `${projectName} Wireframe`
    }

    return NextResponse.json({ wireframe })
  } catch (error) {
    console.error('Error generating wireframe:', error)
    return NextResponse.json(
      { error: 'Failed to generate wireframe' },
      { status: 500 }
    )
  }
}