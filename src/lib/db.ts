import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Types definition matching the collections
export interface PortfolioSettings {
  name: string;
  headline: string;
  subtitle: string;
  biography: string;
  years_experience: number;
  availability: string;
  email: string;
  phone: string;
  address: string;
  working_hours: string;
  calendly_link: string;
  maps_link: string;
  resume_url: string;
  profile_image_url: string;
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
    behance: string;
    dribbble: string;
    x: string;
    facebook: string;
    whatsapp: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string;
  };
  stats: Array<{ label: string; value: number }>;
  theme: {
    accent_color: string;
    secondary_color: string;
    enable_grain: boolean;
    enable_cursor: boolean;
  };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  featured: boolean;
  thumbnail_url: string;
  cover_url: string;
  video_url: string;
  vimeo_url?: string;
  youtube_url?: string;
  client: string;
  year: string;
  duration: string;
  description: string;
  challenge: string;
  process: string;
  results: string;
  before_image_url?: string;
  after_image_url?: string;
  gallery_images: string[];
  software_used: string[];
  project_tags: string[];
  sort_order: number;
  archived: boolean;
}

export interface Reel {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  description: string;
  category: string;
  views_count: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  visible: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  review: string;
  rating: number;
  client_photo_url: string;
  visible: boolean;
  sort_order: number;
}

export interface ClientLogo {
  id: string;
  name: string;
  visible: boolean;
  sort_order: number;
}

export interface Award {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string; // 'award' | 'certification' | 'recognition'
  badge_text: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  project_type: string;
  message: string;
  read: boolean;
  replied: boolean;
  created_at: string;
}

// Database schema container
export interface DbSchema {
  settings: PortfolioSettings;
  projects: Project[];
  reels: Reel[];
  services: Service[];
  testimonials: Testimonial[];
  clients: ClientLogo[];
  awards: Award[];
  messages: ContactMessage[];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Supabase client instance (if configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// JSON File fallback helper path
const getJsonDbPath = () => path.join(process.cwd(), 'src', 'data', 'db.json');

// Read JSON DB file safely
function readJsonDb(): DbSchema {
  try {
    const filePath = getJsonDbPath();
    if (!fs.existsSync(filePath)) {
      throw new Error(`JSON DB file does not exist at path: ${filePath}`);
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as DbSchema;
  } catch (error) {
    console.error('Error reading JSON DB, using default schema structure', error);
    return {
      settings: {} as PortfolioSettings,
      projects: [],
      reels: [],
      services: [],
      testimonials: [],
      clients: [],
      awards: [],
      messages: []
    };
  }
}

// Write JSON DB file safely
function writeJsonDb(data: DbSchema) {
  try {
    const filePath = getJsonDbPath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to JSON DB file', error);
  }
}

// Data Access Layer
export const db = {
  // Settings operations
  async getSettings(): Promise<PortfolioSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('portfolio_settings')
        .select('*')
        .single();
      if (!error && data) return data as PortfolioSettings;
    }
    return readJsonDb().settings;
  },

  async updateSettings(settings: PortfolioSettings): Promise<PortfolioSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('portfolio_settings')
        .upsert({ id: 'singleton', ...settings })
        .select()
        .single();
      if (!error && data) return data as PortfolioSettings;
    }
    const store = readJsonDb();
    store.settings = settings;
    writeJsonDb(store);
    return settings;
  },

  // Projects operations
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) return data as Project[];
    }
    return readJsonDb().projects.filter(p => !p.archived);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as Project;
    }
    const projects = readJsonDb().projects;
    return projects.find(p => p.slug === slug && !p.archived) || null;
  },

  async saveProject(project: Project): Promise<Project> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .upsert(project)
        .select()
        .single();
      if (!error && data) return data as Project;
    }
    const store = readJsonDb();
    const idx = store.projects.findIndex(p => p.id === project.id);
    if (idx !== -1) {
      store.projects[idx] = project;
    } else {
      store.projects.push(project);
    }
    writeJsonDb(store);
    return project;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      return !error;
    }
    const store = readJsonDb();
    const filtered = store.projects.filter(p => p.id !== id);
    if (filtered.length !== store.projects.length) {
      store.projects = filtered;
      writeJsonDb(store);
      return true;
    }
    return false;
  },

  // Reels operations
  async getReels(): Promise<Reel[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('reels').select('*');
      if (!error && data) return data as Reel[];
    }
    return readJsonDb().reels;
  },

  async saveReel(reel: Reel): Promise<Reel> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('reels')
        .upsert(reel)
        .select()
        .single();
      if (!error && data) return data as Reel;
    }
    const store = readJsonDb();
    const idx = store.reels.findIndex(r => r.id === reel.id);
    if (idx !== -1) {
      store.reels[idx] = reel;
    } else {
      store.reels.push(reel);
    }
    writeJsonDb(store);
    return reel;
  },

  async deleteReel(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('reels').delete().eq('id', id);
      return !error;
    }
    const store = readJsonDb();
    const filtered = store.reels.filter(r => r.id !== id);
    if (filtered.length !== store.reels.length) {
      store.reels = filtered;
      writeJsonDb(store);
      return true;
    }
    return false;
  },

  // Services operations
  async getServices(): Promise<Service[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) return data as Service[];
    }
    return readJsonDb().services.filter(s => s.visible);
  },

  async getAllServices(): Promise<Service[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) return data as Service[];
    }
    return readJsonDb().services;
  },

  async saveService(service: Service): Promise<Service> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('services')
        .upsert(service)
        .select()
        .single();
      if (!error && data) return data as Service;
    }
    const store = readJsonDb();
    const idx = store.services.findIndex(s => s.id === service.id);
    if (idx !== -1) {
      store.services[idx] = service;
    } else {
      store.services.push(service);
    }
    writeJsonDb(store);
    return service;
  },

  async deleteService(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      return !error;
    }
    const store = readJsonDb();
    const filtered = store.services.filter(s => s.id !== id);
    if (filtered.length !== store.services.length) {
      store.services = filtered;
      writeJsonDb(store);
      return true;
    }
    return false;
  },

  // Testimonials operations
  async getTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) return data as Testimonial[];
    }
    return readJsonDb().testimonials.filter(t => t.visible);
  },

  async getAllTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) return data as Testimonial[];
    }
    return readJsonDb().testimonials;
  },

  async saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('testimonials')
        .upsert(testimonial)
        .select()
        .single();
      if (!error && data) return data as Testimonial;
    }
    const store = readJsonDb();
    const idx = store.testimonials.findIndex(t => t.id === testimonial.id);
    if (idx !== -1) {
      store.testimonials[idx] = testimonial;
    } else {
      store.testimonials.push(testimonial);
    }
    writeJsonDb(store);
    return testimonial;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      return !error;
    }
    const store = readJsonDb();
    const filtered = store.testimonials.filter(t => t.id !== id);
    if (filtered.length !== store.testimonials.length) {
      store.testimonials = filtered;
      writeJsonDb(store);
      return true;
    }
    return false;
  },

  // Clients operations
  async getClients(): Promise<ClientLogo[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data) return data as ClientLogo[];
    }
    return readJsonDb().clients;
  },

  async saveClient(client: ClientLogo): Promise<ClientLogo> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('clients')
        .upsert(client)
        .select()
        .single();
      if (!error && data) return data as ClientLogo;
    }
    const store = readJsonDb();
    const idx = store.clients.findIndex(c => c.id === client.id);
    if (idx !== -1) {
      store.clients[idx] = client;
    } else {
      store.clients.push(client);
    }
    writeJsonDb(store);
    return client;
  },

  async deleteClient(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      return !error;
    }
    const store = readJsonDb();
    const filtered = store.clients.filter(c => c.id !== id);
    if (filtered.length !== store.clients.length) {
      store.clients = filtered;
      writeJsonDb(store);
      return true;
    }
    return false;
  },

  // Awards operations
  async getAwards(): Promise<Award[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('awards').select('*');
      if (!error && data) return data as Award[];
    }
    return readJsonDb().awards;
  },

  async saveAward(award: Award): Promise<Award> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('awards')
        .upsert(award)
        .select()
        .single();
      if (!error && data) return data as Award;
    }
    const store = readJsonDb();
    const idx = store.awards.findIndex(a => a.id === award.id);
    if (idx !== -1) {
      store.awards[idx] = award;
    } else {
      store.awards.push(award);
    }
    writeJsonDb(store);
    return award;
  },

  async deleteAward(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('awards').delete().eq('id', id);
      return !error;
    }
    const store = readJsonDb();
    const filtered = store.awards.filter(a => a.id !== id);
    if (filtered.length !== store.awards.length) {
      store.awards = filtered;
      writeJsonDb(store);
      return true;
    }
    return false;
  },

  // Contact Messages operations
  async getMessages(): Promise<ContactMessage[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as ContactMessage[];
    }
    return readJsonDb().messages.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async saveMessage(message: ContactMessage): Promise<ContactMessage> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .upsert(message)
        .select()
        .single();
      if (!error && data) return data as ContactMessage;
    }
    const store = readJsonDb();
    const idx = store.messages.findIndex(m => m.id === message.id);
    if (idx !== -1) {
      store.messages[idx] = message;
    } else {
      store.messages.push(message);
    }
    writeJsonDb(store);
    return message;
  },

  async deleteMessage(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      return !error;
    }
    const store = readJsonDb();
    const filtered = store.messages.filter(m => m.id !== id);
    if (filtered.length !== store.messages.length) {
      store.messages = filtered;
      writeJsonDb(store);
      return true;
    }
    return false;
  }
};
