# RecruitMate Project Contribution Guide

This comprehensive guide outlines everything you need to know about contributing to RecruitMate, a powerful recruitment automation platform built with **Nuxt 3** and **Supabase**.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Environment Setup](#environment-setup)
- [Contribution Process](#contribution-process)
- [Code Style Guide](#code-style-guide)
- [Testing Guidelines](#testing-guidelines)
- [Contact & Support](#contact--support)

---

## Tech Stack

### Core Technologies

- **[Nuxt 3](https://nuxt.com/docs)** – Modern Vue 3 framework with SSR capabilities
- **[Supabase](https://supabase.com/docs)** – Open-source Firebase alternative with local development support
- **[Vue 3](https://vuejs.org/)** – Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe JavaScript

### Styling & UI

- **[TailwindCSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Shadcn Vue](https://github.com/shadcn/ui)** – Unstyled UI components
- **[PostCSS](https://postcss.org/)** – CSS transformation tool

### Development Tools

- **[PNPM](https://pnpm.io/)** – Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** – JavaScript linting utility
- **[Supabase CLI](https://supabase.com/docs/reference/cli)** – Local development and database management

### AI Integration

- **[OpenAI API](https://platform.openai.com/docs)** – AI-powered text processing

## Architecture Overview

The application follows a modular, component-based architecture:

### Key Principles

- **Layered Architecture** for clear separation of concerns
- **Composition API** for better TypeScript integration and code reuse
- **State Management** using Pinia for complex state logic
- **API-First Design** with typed endpoints
- **Component-Driven Development** with atomic design principles
- **Local Development** with Supabase self-hosted instance

## Project Structure

```bash
recruitmate/
├─ app/                 # Nuxt application
│  ├─ .env             # Environment variables for app
│  │  ├─ SUPABASE_URL
│  │  ├─ SUPABASE_KEY
│  │  ├─ POSTMARK_SERVER_API_TOKEN
│  │  ├─ POSTMARK_FROM_EMAIL
│  │  ├─ OPENAI_API_KEY
│  │  └─ DISABLE_AUTH
│  ├─ pages/           # Application routes
│  │  ├─ auth/        # Authentication pages
│  │  ├─ dashboard/   # Dashboard views
│  │  └─ templates/   # Email template pages
│  ├─ components/     # Reusable Vue components
│  │  ├─ ui/         # UI components
│  │  ├─ forms/      # Form components
│  │  └─ layout/     # Layout components
│  ├─ server/        # Server-side code
│  │  ├─ api/        # API endpoints
│  │  ├─ middleware/ # Server middleware
│  │  ├─ validations/# ZOD schemas
│  │  └─ types/      # TypeScript definitions
│  ├─ composables/    # Shared composition logic
│  ├─ stores/        # Pinia stores
│  ├─ utils/         # Helper functions
│  └─ assets/        # Static assets
├─ .env                # Root environment variables
│  ├─ SUPABASE_AUTH_GOOGLE_CLIENT_ID
│  └─ SUPABASE_AUTH_GOOGLE_SECRET
├─ supabase/           # Supabase configurations
│  ├─ migrations/      # Database migrations
│  └─ seed/           # Seed data
└─ tests/              # Test files
```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Implement proper error handling
- Write comprehensive documentation
- Use meaningful variable and function names

### Git Workflow

1. Fork the repository
2. Create a feature branch
3. Implement changes
4. Submit a pull request

### Commit Messages

- Use conventional commits format
- Include issue references
- Keep messages clear and concise

## Environment Setup

Use node v18.18 i.e. `nvm use 18.18`

`rm -rf node modules`

`rm pnpm-lock.yaml`

1. Install dependencies (recruitmate-app/app):

```bash
pnpm install
```

2. Copy environment variables into recruitmate-app/app:

```bash
cp .env.example .env
```

3. Configure required services:

- Start local Supabase instance:

```bash
supabase start
```

- OpenAI API keys
- Other third-party integrations

4. Start development server at root level directory:

```bash
pnpm dev
```
