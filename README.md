# Dapp Trading Assistant

A full-stack crypto dashboard built with **Next.js 16** and **TS**. The app combines Ethereum gas tracking, swap quote simulation, live market intelligence, and user-specific alert/activity management behind authenticated routes.

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [General Project Structure](#general-project-structure)
- [Environment Variables](#environment-variables)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Local Validation Checklist](#local-validation-checklist)
- [Troubleshooting](#troubleshooting)

## Overview

Dapp Trading Assistant is designed as a single place for crypto users to:

- Monitor Ethereum gas prices,
- Simulate token swap output using Uniswap V2-style routing,
- Track market movement with CoinGecko and TradingView data,
- Create personal gas alerts,
- Review account-level activity history.

The application uses **Better Auth** for authentication and MongoDB for persistence.

## Core Features

- 🔄 `Gas Tracker`: live Ethereum gas tiers with threshold-based alerts.
- 💱 `Uniswap Swap Simulator`: token pair quoting via external swap backend.
- 📊 `Market Intelligence`: CoinGecko pricing + TradingView widgets.
- 🔐 `Authentication`: Better Auth with email/password and social providers.
- 🔒 `Environment validation for secure deployment`.
- 🐳 `Docker and docker-compose support` (optional local container workflow).

## Tech Stack

- **Framework**: Next.js 16 (App Router, Route Handlers, Server Actions)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 4, Radix UI, Recharts, Sonner
- **Auth**: Better Auth (`better-auth` + MongoDB adapter)
- **Database**: MongoDB with Mongoose
- **Data sources**: CoinGecko API, Etherscan Gas Oracle API, TradingView embeddable widgets
- **Email**: Resend (verification and reset flows)
- **Tooling**: ESLint, TypeScript

## Architecture

- Route groups: `app/(marketing)` for public pages, `app/(auth)` for authentication, and `app/(root)` for authenticated app pages.
- Access control: session checks in authenticated layouts and redirect logic in `proxy/proxy.ts`.
- Persistence: `Alert` documents for gas alerts and `Activity` documents for event history.
- Integration boundaries: `lib/actions/*.actions.ts` for external services and `app/api/*` for first-party APIs.

## General Project Structure

```txt
dapp-trading/
├── app/                     # Next.js routes and API handlers
├── components/              # Reusable UI and feature components
├── database/                # Mongoose connection and models
├── hooks/                   # Client-side React hooks
├── lib/                     # Server actions, auth, utilities, integrations
├── providers/               # App-level providers (theme, etc.)
├── proxy/                   # Route protection and redirect rules
├── public/                  # Static assets
├── scripts/                 # Helper scripts (e.g., DB checks)
├── types/                   # Shared TypeScript types
├── .env                     # Local environment variables
├── package.json
├── next.config.ts
└── tsconfig.json
```

## Environment Variables

Create a `.env` file in the project root.

```bash
# Database
MONGODB_URI=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth Providers (optional but recommended if social login is enabled)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Market Data
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=

# Gas Data
ETHERSCAN_GAS_TRACKER_URL=https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=
ETHERSCAN_API_KEY=

# Emails
RESEND_API_KEY=
```

Important production notes:

- Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your deployed domain.
- Add your deployed domain to `trustedOrigins` in `lib/better-auth/auth.ts`.
- Ensure your OAuth provider callback URLs exactly match the deployed domain.

## Prerequisites

- Node.js `20+` (LTS recommended)
- npm `10+`
- Docker Desktop / Docker Engine (optional, for containerized workflow)
- Access to an Ethereum RPC provider (Alchemy recommended)

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Populate `.env` using the variables listed above.

### 3. Run development server

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

### 4. Lint code

```bash
npm run lint
```

### 5. Optional DB connectivity check

```bash
npm run test:db
```

### 6. Production build check

```bash
npm run build
npm run start
```

## Troubleshooting

- `MONGODB_URI must be set within .env`
- Missing or invalid MongoDB connection string.

- `Could not get api key` or upstream fetch errors
- Missing CoinGecko/Etherscan keys or blocked outbound network.

- Auth redirects looping
- `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, callback URLs, or `trustedOrigins` are misconfigured.

- No emails received
- Verify `RESEND_API_KEY`, sender domain setup, and provider limits.
