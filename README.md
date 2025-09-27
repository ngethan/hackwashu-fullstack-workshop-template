# HackWashu Template - T3 Stack with Better Auth

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` and migrated to use [Better Auth](https://www.better-auth.com/) for authentication.

## Features

- **Better Auth** for modern authentication with email/password
- **Todo Management** - Full CRUD operations for todos
- **Next.js 15** App Router
- **tRPC** for type-safe API routes
- **Drizzle ORM** with PostgreSQL
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database

### Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure:

   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   - Generate a secret: `openssl rand -base64 32`
   - Set `BETTER_AUTH_SECRET` to the generated value
   - Configure your database URL in `DATABASE_URL`

4. Install dependencies:

   ```bash
   pnpm install
   ```

5. Setup the database:

   ```bash
   pnpm db:push
   # or run migrations:
   pnpm db:migrate
   ```

6. Start the development server:

   ```bash
   pnpm dev
   ```

7. Visit <http://localhost:3000>

## Authentication

This template uses Better Auth with the following features:

- **Email/Password Authentication**: Users can sign up and log in with email and password
- **Session Management**: Secure session handling with database storage
- **Protected Routes**: Easy to protect pages and API routes

### How to Use the App

1. Visit `/auth` to access the login/signup page
2. Create an account with email and password
3. Once logged in, you'll be redirected to the home page
4. Click "Go to Todos" to access your todo list
5. Create, complete, and delete todos as needed

### Adding Authentication to Your Components

#### Client Components

```typescript
import { useSession } from "~/lib/auth-client";

export function MyComponent() {
  const { data: session } = useSession();

  if (session) {
    return <div>Welcome {session.user?.email}!</div>;
  }

  return <div>Not logged in</div>;
}
```

#### Server Components

```typescript
import { getSession } from "~/server/auth";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  return <div>Protected content</div>;
}
```

## Tech Stack

- [Next.js](https://nextjs.org)
- [Better Auth](https://www.better-auth.com)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
