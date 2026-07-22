# Project Rules & Agent Instructions — my-news-app

This file defines code standards, conventions, and guidelines for AI agents working on **my-news-app**.

---

## 🎯 Principles & Standards

### 1. Code Quality & Formatting
- **TypeScript First:** Use strict TypeScript. Avoid `any` types; define explicit interfaces or types in `src/types/`.
- **Component Architecture:** Break down UI into modular, single-responsibility components.
- **Naming Conventions:**
  - Components: `PascalCase.tsx` (e.g., `ArticleCard.tsx`)
  - Utilities/Hooks: `camelCase.ts` (e.g., `useBookmarks.ts`)
  - Database tables/columns: `snake_case` (matching [schema.sql](file:///supabase/schema.sql))

### 2. Styling & UX
- Follow responsive mobile-first UI patterns.
- Ensure proper color contrast, dark/light mode compatibility, and loading skeleton states for async operations.
- Accessible semantic HTML (`<article>`, `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`).

### 3. Database & Supabase Usage
- Always respect Row Level Security (RLS) policies.
- Do not expose administrative keys or sensitive environment variables on client-side code.
- Always handle Supabase errors gracefully with user-friendly toast or alert notifications.

### 4. AI & Summary Guidelines
- AI-generated summaries must be concise (max 3 bullet points or 100 words).
- Generated headlines must be factual, engaging, and free of clickbait exaggeration.
- Log AI requests and model metadata in `ai_generation_logs` table for debugging.

---

## 🚫 Anti-Patterns to Avoid
- ❌ Do not write inline SQL in client components.
- ❌ Do not hardcode secret keys or tokens in code repositories.
- ❌ Do not bypass error handling on network or database queries.
