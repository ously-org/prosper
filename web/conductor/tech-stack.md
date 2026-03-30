# Technology Stack: Prosper

## 1. Core Frameworks & Language
Prosper is built on a modern, high-performance stack for web applications.

- **Language:** TypeScript (~5.9.3) - Ensuring type safety and robust developer experience.
- **Frontend Framework:** React (v19.2.0) - Leveraging the latest React features and concurrent rendering.
- **Build Tool:** Vite (v8.0.0-beta.13) - Providing extremely fast development server and optimized production builds.

## 2. Styling & UI Components
- **Styling:** Tailwind CSS (v4.2.2) - Utilizing the latest CSS-first approach for modern styling and responsiveness.
- **UI Component Library:** Radix UI and shadcn/ui - Providing a foundation of high-quality, accessible, and customizable components.
- **Iconography:** Lucide-React - For a consistent and lightweight icon set.
- **Utilities:** class-variance-authority, clsx, tailwind-merge - For flexible and maintainable CSS class management.

## 3. Routing & State Management
- **Routing:** TanStack React Router (v1.168.8) - Advanced, type-safe routing for complex React applications.
- **Development Tools:** TanStack React Router Devtools - For debugging and analyzing route behavior.

## 4. Backend & Database
- **Core Backend:** Supabase - Providing authentication, database (Postgres), and real-time functionality.
- **Serverless Edge:** Cloudflare Workers and Cloudflare Pages - For fast, globally-distributed API and asset hosting.
- **Data Flow:** Client -> Cloudflare Worker -> Supabase (Core Backend).
- **CLI & Deployment Tool:** Wrangler (v4.78.0) - For managing Cloudflare deployments and local development.
- **Integration Plugin:** `@cloudflare/vite-plugin` - Seamlessly integrating Vite with Cloudflare's edge platform.
