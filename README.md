# Kai Rhodes Cinematic CMS Portfolio Platform

An enterprise-grade, highly interactive portfolio and digital asset manager (DAM) built for cinematic editors, directors, and motion graphic designers. Powered by **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Supabase (Auth, Storage, and PostgreSQL)**.

---

## 🚀 Key Features

- **Root Route Portfolio (`/`)**: A high-fidelity public website displaying a cinematic hero trailer, interactive before/after grading slider, vertical reels mockup container, masonry catalog, and contact submissions.
- **Repository Pattern Abstraction**: Completely decoupled database interface isolating UI elements from raw SQL/Supabase clients.
- **Middleware Protected Dashboard (`/admin`)**: Router checks session state using server-side cookies, redirecting non-authenticated agents to `/admin/login`.
- **Integrated Storage Buckets**: Upload, replace, delete, and copy public URLs using the Media Library dashboard.
- **Dynamic SEO Sitemap & Robots.txt**: XML sitemaps generate URLs based on active portfolio projects in real time.
- **JSON-LD Schema Integration**: Person and CreativeWork microdata injected into header markup automatically.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS, Radix UI.
- **State & Queries**: Zustand, TanStack Query, React Hook Form, Zod.
- **Storage & Database**: Supabase PostgreSQL, Supabase Storage, Supabase Auth.
- **Animation Sync**: GSAP, ScrollTrigger, Lenis smooth scrolling.

---

## 📦 Setting Up Environment Variables

Create a `.env.local` or configure target variables inside your hosting provider:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key

# Public Site Domain (For Dynamic XML Sitemap generation)
NEXT_PUBLIC_SITE_URL=https://kairhodes.film
```

---

## 💾 Database & Storage Bucket Setup

### 1. Execute SQL Migrations
Import the schema script defined inside `supabase/schema.sql` into the Supabase SQL Editor:
- Creates all tables (`portfolio_settings`, `projects`, `reels`, `messages`, `analytics`, etc.).
- Sets up database indexes.
- Configures Row Level Security (RLS) on all tables allowing public reads and restricted writes.

### 2. Create Storage Buckets
Create the following buckets inside your Supabase Storage dashboard:
- `images` (Public)
- `videos` (Public)
- `reels` (Public)
- `logos` (Public)
- `resume` (Public)

Add a standard public access policy to allow reading public links, and write access restricted to authenticated users.

### 3. Create Admin Account
1. Open your Supabase project's **Authentication** tab.
2. Add a new user under **Users** -> **Add User** (Email & Password).
3. Insert a mapping row inside the `profiles` table to assign them access:
   ```sql
   INSERT INTO profiles (id, role) VALUES ('user-uuid-from-auth-tab', 'admin');
   ```

---

## 💻 Local Installation

1. Install all dependencies:
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the homepage. Open `/admin` to log in to the CMS dashboard.

---

## ☁️ Deployment on Vercel

1. Push the code repository to GitHub/GitLab.
2. Link your repository inside the Vercel Dashboard.
3. Configure the environment variables in the project settings.
4. Click **Deploy**. Vercel will automatically build the optimized serverless routes!
