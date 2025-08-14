# MVP Builder AI

Transform your startup ideas into reality with AI-powered tools and insights.

## Features

- **AI Blueprint Generation**: Create comprehensive business blueprints with AI analysis
- **Smart Wireframes**: Generate professional wireframes automatically
- **Pitch Deck Creation**: Build investor-ready pitch decks with AI assistance
- **Launch Checklist**: Get personalized roadmaps to take your MVP from concept to market
- **MVP Code Generator**: Generate boilerplate code for your MVP
- **AI Tools Suite**: Access powerful AI-driven analysis tools

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/mvp-builder-ai.git
cd mvp-builder-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up the database:
   - Create a new Supabase project
   - Run the migration file in `supabase/migrations/`
   - Enable Row Level Security (RLS)

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── supabase/            # Database migrations
└── public/              # Static assets
```

## Key Features

### AI Blueprint Generation
- Analyzes your startup idea
- Provides market analysis and competitor research
- Prioritizes features based on impact and effort
- Generates comprehensive business blueprints

### MVP Builder
- Step-by-step MVP development guide
- Code generation for multiple tech stacks
- Database schema generation
- Deployment configuration

### AI Tools Suite
- Idea Validator
- Market Analyzer
- Feature Prioritizer
- Competitor Research
- User Persona Generator
- Pitch Optimizer

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Optional |
| `STRIPE_SECRET_KEY` | Stripe secret key | Optional |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Optional |
| `NEXT_PUBLIC_APP_URL` | Application base URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email hello@mvpbuilderai.com or join our Discord community.

## Roadmap

- [ ] Mobile app
- [ ] Advanced AI models
- [ ] Team collaboration features
- [ ] White-label solutions
- [ ] API access
- [ ] Integrations with popular tools

---

Built with ❤️ by the MVP Builder AI team