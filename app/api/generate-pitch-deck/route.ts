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

    // Simulate pitch deck generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock pitch deck slides
    const pitchDeck = [
      {
        title: 'Problem Statement',
        content: `• Current market challenges in ${blueprint.marketAnalysis?.targetAudience || 'target market'}\n• Existing solutions are inadequate\n• Opportunity for innovation\n• Market demand validation`,
        notes: 'Start with a compelling problem that resonates with your audience'
      },
      {
        title: 'Solution',
        content: `• ${projectName} addresses these challenges\n• Unique value proposition\n• Key differentiators\n• Technology advantages`,
        notes: 'Clearly articulate how your solution solves the problem'
      },
      {
        title: 'Market Opportunity',
        content: `• ${blueprint.marketAnalysis?.marketSize || 'Large market size'}\n• Growing market trends\n• Target customer segments\n• Revenue potential`,
        notes: 'Show the size and growth potential of your market'
      },
      {
        title: 'Product Features',
        content: blueprint.features?.map((f: any) => `• ${f.name}: ${f.description}`).join('\n') || '• Core features overview',
        notes: 'Highlight your most important features and benefits'
      },
      {
        title: 'Competition Analysis',
        content: blueprint.competitors?.map((c: any) => `• ${c.name}: ${c.weaknesses?.[0] || 'Market gap'}`).join('\n') || '• Competitive landscape overview',
        notes: 'Show how you differentiate from existing solutions'
      },
      {
        title: 'Business Model',
        content: '• Revenue streams\n• Pricing strategy\n• Customer acquisition\n• Scalability plan',
        notes: 'Explain how you will make money and scale'
      },
      {
        title: 'Go-to-Market Strategy',
        content: '• Launch strategy\n• Marketing channels\n• Partnership opportunities\n• Customer acquisition plan',
        notes: 'Detail your plan to reach customers and grow'
      },
      {
        title: 'Financial Projections',
        content: '• 3-year revenue forecast\n• Key metrics and KPIs\n• Funding requirements\n• Break-even analysis',
        notes: 'Present realistic financial projections and metrics'
      },
      {
        title: 'Team & Roadmap',
        content: '• Founding team expertise\n• Key hires planned\n• Product roadmap\n• Milestone timeline',
        notes: 'Show you have the right team and clear execution plan'
      },
      {
        title: 'Ask & Next Steps',
        content: '• Funding amount requested\n• Use of funds\n• Expected outcomes\n• Timeline to next milestone',
        notes: 'Clear ask and what you will achieve with investment'
      }
    ]

    return NextResponse.json({ pitchDeck })
  } catch (error) {
    console.error('Error generating pitch deck:', error)
    return NextResponse.json(
      { error: 'Failed to generate pitch deck' },
      { status: 500 }
    )
  }
}