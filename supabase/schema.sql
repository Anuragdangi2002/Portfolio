-- Comprehensive SQL Schema for Kai Rhodes Cinematic CMS Platform
-- Single script initializing all tables, relationships, indexes, storage buckets and Row Level Security policies.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES (Authenticated Users Details)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin' NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PORTFOLIO SETTINGS SINGLETON
CREATE TABLE IF NOT EXISTS portfolio_settings (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  biography TEXT NOT NULL,
  years_experience INTEGER DEFAULT 12,
  availability TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  working_hours TEXT,
  calendly_link TEXT,
  maps_link TEXT,
  resume_url TEXT,
  profile_image_url TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '[]'::jsonb,
  theme JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROJECTS (CMS projects)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  cover_url TEXT,
  video_url TEXT,
  vimeo_url TEXT,
  youtube_url TEXT,
  client TEXT,
  year TEXT,
  duration TEXT,
  description TEXT,
  challenge TEXT,
  process TEXT,
  results TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  software_used TEXT[] DEFAULT '{}',
  project_tags TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PROJECT GALLERY (Cascading image gallery mapping)
CREATE TABLE IF NOT EXISTS project_gallery (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. REELS
CREATE TABLE IF NOT EXISTS reels (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  category TEXT DEFAULT 'reels',
  views_count TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SERVICES
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  tags TEXT[] DEFAULT '{}',
  visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  review TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  client_photo_url TEXT,
  visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. CLIENTS
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. AWARDS
CREATE TABLE IF NOT EXISTS awards (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  title TEXT NOT NULL,
  subtitle TEXT,
  year TEXT,
  category TEXT DEFAULT 'award',
  badge_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. MESSAGES (Inbox submits)
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. TELEMETRY ANALYTICS
CREATE TABLE IF NOT EXISTS analytics (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  event_type TEXT NOT NULL,
  target TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_project_id ON project_gallery(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);

-- 14. ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- 15. RLS POLICIES (Public read, authenticated write)
CREATE POLICY "Profiles self read" ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public Read Settings" ON portfolio_settings FOR SELECT USING (true);
CREATE POLICY "Admin All Settings" ON portfolio_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (status = 'published' AND archived = false);
CREATE POLICY "Admin All Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Gallery" ON project_gallery FOR SELECT USING (true);
CREATE POLICY "Admin All Gallery" ON project_gallery FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Reels" ON reels FOR SELECT USING (true);
CREATE POLICY "Admin All Reels" ON reels FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Admin All Services" ON services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Admin All Testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Clients" ON clients FOR SELECT USING (true);
CREATE POLICY "Admin All Clients" ON clients FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Awards" ON awards FOR SELECT USING (true);
CREATE POLICY "Admin All Awards" ON awards FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Insert Messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Messages" ON messages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Insert Analytics" ON analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Analytics" ON analytics FOR ALL USING (auth.role() = 'authenticated');

-- 16. BUCKET STORAGE PROMPT DIRECTIVES
-- Instruct developers to create buckets manually or run policy queries:
-- Buckets: 'videos', 'reels', 'thumbnails', 'gallery', 'images', 'logos', 'resume', 'documents'
-- Storage public read policy: bucket_id = 'videos' -> true
-- Storage authenticated write policy: auth.role() = 'authenticated' -> true
