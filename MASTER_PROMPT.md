# MASTER PROMPT: AI-Powered News Application (my-news-app)

## 🎯 Overview & Vision
You are an expert full-stack developer building **my-news-app**, a modern, real-time, AI-enhanced news aggregator and publication platform. The platform delivers personalized news, AI-generated summaries, multi-category browsing, reader interactive features (bookmarks, comments, reactions), and an editorial dashboard.

---

## 🛠️ Technology Stack & Architecture

### **Frontend**
- **Framework:** Next.js 14+ (App Router) or Vite + React with TypeScript
- **Styling:** Modern Vanilla CSS / Tailwind CSS with CSS Variables for theming (Light/Dark Mode), Glassmorphism, and smooth micro-interactions.
- **Icons:** Lucide React
- **State & Data Fetching:** React Query / TanStack Query or Server Components with Supabase client

### **Backend & Database**
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security, Supabase Auth, Realtime)
- **File Storage:** Supabase Storage (for article banner images & user avatars)
- **AI Integration:** LLM integration for automatic article summarization, topic tagging, and editorial assistance

---

## 📋 Core Features & Scope

1. **Public News Feed & Discovery**
   - Featured / Breaking News Banner & Hero Section
   - Topic Categorization (Technology, Business, Science, Politics, Entertainment, Sports, Health)
   - Article Search & Filtering (by keyword, date, category, tag)
   - Reading Time Estimation & AI Key Takeaways (Bullet points)

2. **Article Detail Page**
   - Full article view with rich typography, table of contents, and estimated read time
   - Related articles & recommended content
   - Interactive engagement: Bookmarks, Like/Clap count, Social Sharing, Comments section

3. **User Accounts & Personalization**
   - Auth via Supabase (Email/Password, OAuth providers)
   - User Profile management (saved bookmarks, reading history, topic preferences)
   - Light / Dark theme toggle

4. **Editorial & Admin Management**
   - Author / Admin role-based access
   - Rich Markdown / WYSIWYG editor for drafting and publishing articles
   - Content moderation & publishing pipeline (Draft -> Review -> Published -> Archived)
   - AI assistant tool inside editor (Generate summary, suggest tags, fix grammar, rewrite header)

---

## 📐 Project Structure Guidelines

```text
my-news-app/
├── .agents/
│   ├── rules/
│   │   └── project_rules.md
│   └── workflows/
│       └── article_workflow.md
├── supabase/
│   └── schema.sql
├── src/ (or app/)
│   ├── components/
│   ├── lib/
│   │   ├── supabase/
│   │   └── ai/
│   ├── types/
│   └── styles/
├── ARCHITECTURE.md
└── MASTER_PROMPT.md
```

---

## ⚡ Execution Instructions for AI Agents
1. Strictly follow all guidelines defined in [project_rules.md](file:///.agents/rules/project_rules.md).
2. Follow database schema constraints specified in [schema.sql](file:///supabase/schema.sql).
3. Align implementation with the overall system design documented in [ARCHITECTURE.md](file:///ARCHITECTURE.md).
4. Adhere to the editorial pipeline described in [article_workflow.md](file:///.agents/workflows/article_workflow.md).
