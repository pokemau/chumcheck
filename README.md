# ChumCheck

A startup assessment and readiness platform that helps evaluate and track startup progress through assessment tools, AI-powered insights, and detailed reporting.

## Overview

ChumCheck is system designed to assess startup readiness, manage qualification processes, and provide AI-driven recommendations. The platform supports multiple assessment types, progress tracking, roadblock management, and detailed analytics for startup evaluation.

## Tech Stack

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with MikroORM
- **Authentication**: JWT with Passport (Local & JWT strategies)
- **AI Integration**: Google Gemini API
- **File Storage**: AWS S3 (DigitalOcean Spaces)
- **File Processing**: PDF parsing, Multer for uploads

### Frontend
- **Framework**: SvelteKit 2 (Svelte 5)
- **Language**: TypeScript
- **Styling**: TailwindCSS with tailwindcss-animate
- **UI Components**: bits-ui, svelte-radix, lucide-svelte

### Development Tools
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Node Version**: 20.x

## Key Features

### Core Functionality
- **Startup Assessment**: Multi-type assessment system with customizable fields
- **Readiness Level Evaluation**: Track and evaluate startup readiness across multiple criteria
- **AI-Powered Insights**: Gemini AI integration for intelligent recommendations
- **Qualification Management**: Track startup qualification status (PENDING, QUALIFIED, DISQUALIFIED, WAITLISTED)
- **Progress Tracking**: Monitor startup progress through various stages
- **Roadblock Management**: Identify and track obstacles faced by startups
- **Initiative Tracking**: Manage startup initiatives and action items

### Assessment Types
- RNA (Readiness Network Assessment)
- RNS evaluations
- URAT (Unified Readiness Assessment Tool)
- Calculator-based assessments
- Custom assessment types

### Admin Features
- User management dashboard
- Startup creation and editing
- Assessment type configuration
- Activity logging and monitoring
- Capsule proposal management

### User Features
- Secure authentication (JWT-based)
- File upload and document management
- Interactive chat history
- Real-time progress visualization
- Detailed reporting and analytics

## Getting Started

### Prerequisites
- Node.js 20.x
- pnpm 10.7.1+
- PostgreSQL database
- DigitalOcean Spaces (or AWS S3 compatible storage)
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chumcheck
```

2. Install backend dependencies:
```bash
cd backend
pnpm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
pnpm install
```


#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```env
JWT_SECRET=your_jwt_secret_key
PUBLIC_API_URL=http://localhost:3000
```

### Database Setup

1. Create PostgreSQL database:
```bash
createdb chumcheck
```

2. Run migrations:
```bash
cd backend
pnpm dev  # This will auto-run migrations
```

Alternatively, use the provided scripts:
```bash
# Reset database (Unix)
./scripts/reset_db.sh

# Reset database (Windows)
./scripts/reset_db.ps1
```

### Development

#### Backend
```bash
cd backend
pnpm dev          # Start dev server with hot reload
pnpm build        # Build for production
pnpm lint         # Lint code
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test:cov     # Run tests with coverage
```

#### Frontend
```bash
cd frontend
pnpm dev          # Start dev server (with --host flag)
pnpm build        # Build for production
pnpm start        # Preview production build
pnpm format       # Format code with Prettier
pnpm lint         # Lint and format check
pnpm check        # Type check
```

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [SvelteKit Documentation](https://kit.svelte.dev)
- [MikroORM Documentation](https://mikro-orm.io)
- [TailwindCSS Documentation](https://tailwindcss.com)
