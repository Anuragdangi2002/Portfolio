-- Seed file for Kai Rhodes Cinematic Portfolio
-- Populates default portfolio settings and projects in Supabase database

INSERT INTO portfolio_settings (
  id, name, headline, subtitle, biography, email, phone, address, working_hours, socials, seo, stats, theme
) VALUES (
  'singleton',
  'Kai Rhodes',
  'FRAME BY FRAME, STORY BY DESIGN.',
  'Kai Rhodes — a cinematic video editor crafting films, commercials, and motion for brands who refuse to be forgettable.',
  'Twelve years cutting stories that hold attention hostage — from 30‑second ads to feature documentaries, always chasing the frame that makes people feel something before they know why.\n\nI edit at the intersection of rhythm and restraint: pacing that respects the story, colour that respects the mood, sound design that never announces itself. My process is built in Premiere Pro and DaVinci Resolve, refined in After Effects, and finished with an obsessive attention to the first three seconds.\n\nBased between Los Angeles and remote, working with agencies, filmmakers, and founders who need footage to feel like film.',
  'hello@kairhodes.film',
  '+1 (310) 555-0148',
  'Los Angeles, CA',
  'Mon - Fri, 9:00 AM - 6:00 PM PST',
  '{"linkedin":"https://linkedin.com/in/","instagram":"https://instagram.com/","youtube":"https://youtube.com/","behance":"https://behance.net/","dribbble":"https://dribbble.com/","x":"https://x.com/","facebook":"https://facebook.com/","whatsapp":"https://wa.me/10000000000"}'::jsonb,
  '{"meta_title":"Kai Rhodes — Film & Motion Editor","meta_description":"Kai Rhodes is a cinematic video editor crafting commercials, films, and motion graphics for global brands.","keywords":"video editing, color grading, DaVinci Resolve, Premiere Pro, motion graphics, film editor, commercial editor"}'::jsonb,
  '[{"label":"Projects delivered","value":240},{"label":"Client retention %","value":94},{"label":"Hours of footage cut","value":2400},{"label":"Industry awards","value":14}]'::jsonb,
  '{"accent_color":"#f0c986","secondary_color":"#57c7d4","enable_grain":true,"enable_cursor":true}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Seed Projects
INSERT INTO projects (
  id, title, slug, category, featured, thumbnail_url, cover_url, video_url, client, year, duration, description, challenge, process, results, before_image_url, after_image_url, gallery_images, software_used, project_tags, sort_order
) VALUES 
('1', 'Solace — Launch Film', 'solace-launch-film', 'commercials', true, 
 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400&auto=format&fit=crop',
 'https://cdn.coverr.co/videos/coverr-a-drone-flying-over-a-city-9528/1080p.mp4',
 'Solace Labs', '2025', '01:32',
 'A 90‑second brand film for a sleep-tech startup, cut to build calm through rhythm — long holds, patient sound design, a reveal that lands in silence.',
 'A sleep-tech brand needed a launch film that felt calm rather than "techy" — without leaning on cliché slow-motion product shots.',
 'Structured the edit around breath — literal pacing tied to a resting heart rate, colour desaturated 15%, sound design built from field recordings, not stock.',
 '3.1M organic views in the first month and the brand''s highest-converting landing page asset to date.',
 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1400&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1400&auto=format&fit=crop&sat=-50&con=20',
 ARRAY['https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1400&auto=format&fit=crop'],
 ARRAY['Premiere Pro', 'DaVinci Resolve'],
 ARRAY['Brand Film', 'Sound Design', 'Color Grading'],
 1),
('2', 'Aurora — "Static" Music Video', 'aurora-static-music-video', 'youtube', true,
 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop',
 'https://cdn.coverr.co/videos/coverr-a-concert-with-lights-1614/1080p.mp4',
 'Aurora Records', '2025', '03:04',
 'Beat-synced editing across three timelines and 40+ hours of footage, compressed into a 3‑minute video engineered for repeat viewing.',
 '40+ hours of multi-cam concert and narrative footage needed to cut down to a single 3‑minute story without losing the live energy.',
 'Built a beat-map first, cut picture to the map across three parallel timelines, then merged the strongest performance takes per section.',
 'Premiered on the label''s YouTube channel, entered the platform''s music trending page within 6 hours.',
 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop',
 ARRAY['https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop'],
 ARRAY['Premiere Pro', 'After Effects'],
 ARRAY['Music Video', 'Multi-cam', 'Visual Effects'],
 2),
('3', 'Maren & Cole — Wedding Film', 'maren-cole-wedding-film', 'weddings', true,
 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1400&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1400&auto=format&fit=crop',
 'https://cdn.coverr.co/videos/coverr-a-bride-and-groom-at-their-wedding-2318/1080p.mp4',
 'Private', '2024', '08:12',
 'A documentary-style cut built from twelve hours of coverage, structured around vows and unscripted moments rather than a shot list.',
 'Capturing the emotional essence of a wedding without falling back on stock transition formulas and standard cinematic templates.',
 'Built the entire cut around dialogue tracks rather than background music, creating an intimate soundstage, combined with warm natural grading.',
 'Delivered a lifelong heirloom with highly emotional client reception and 3 referral bookings.',
 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1400&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1400&auto=format&fit=crop',
 ARRAY['https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1400&auto=format&fit=crop'],
 ARRAY['DaVinci Resolve', 'Premiere Pro'],
 ARRAY['Wedding Film', 'Documentary Style', 'Grading'],
 3)
ON CONFLICT (id) DO NOTHING;

-- Seed Reels
INSERT INTO reels (id, title, video_url, thumbnail_url, description, category, views_count, tags) VALUES
('1', 'Studio Sessions', 'https://cdn.coverr.co/videos/coverr-editing-a-video-on-a-computer-9665/1080p.mp4', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=700&auto=format&fit=crop', 'Vertical reel still — studio session', 'reels', '1.2M views', ARRAY['Studio', 'Process']),
('2', 'Behind the Lens', 'https://cdn.coverr.co/videos/coverr-editing-a-video-on-a-computer-9665/1080p.mp4', 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=700&auto=format&fit=crop', 'Vertical reel still — behind the lens', 'reels', '860K views', ARRAY['BTS', 'Equipment']),
('3', 'City Nights', 'https://cdn.coverr.co/videos/coverr-editing-a-video-on-a-computer-9665/1080p.mp4', 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=700&auto=format&fit=crop', 'Vertical reel still — city nights', 'reels', '2.4M views', ARRAY['Gritty', 'Night']),
('4', 'Live Set Cuts', 'https://cdn.coverr.co/videos/coverr-editing-a-video-on-a-computer-9665/1080p.mp4', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=700&auto=format&fit=crop', 'Vertical reel still — live set', 'reels', '640K views', ARRAY['Concert', 'BeatSync'])
ON CONFLICT (id) DO NOTHING;

-- Seed Services
INSERT INTO services (id, title, description, icon, tags, visible, sort_order) VALUES
('1', 'Narrative Editing', 'Shaping raw footage into a story with structure, tension, and payoff — for docs, brand films, and shorts.', 'Video', ARRAY['Story', 'Pacing', 'Sound'], true, 1),
('2', 'Commercial & Ad Cuts', 'Fast, punchy edits engineered for retention on paid media — 6s, 15s, 30s, and everything in between.', 'Monitor', ARRAY['Performance', 'Hook design'], true, 2),
('3', 'Motion Graphics', 'Kinetic type, logo animation, and UI motion built in After Effects to give brands a signature move.', 'Layers', ARRAY['AE', '2D/3D'], true, 3),
('4', 'Colour Grading', 'Cinematic grades tailored to camera, lens, and story tone — from natural to stylised, node-based in Resolve.', 'Sparkles', ARRAY['DaVinci', 'LUTs'], true, 4),
('5', 'Sound Design & Mix', 'Layered ambience, foley, and score placement that gives every cut a body you can feel, not just see.', 'Music', ARRAY['Mixing', 'Foley'], true, 5),
('6', 'Full Post Production', 'End-to-end delivery from ingest to final master — offline, online, grade, mix, and export, managed for you.', 'Film', ARRAY['Pipeline', 'Delivery'], true, 6)
ON CONFLICT (id) DO NOTHING;

-- Seed Testimonials
INSERT INTO testimonials (id, name, company, role, review, rating, client_photo_url, visible, sort_order) VALUES
('1', 'Priya Anand', 'Solace Labs', 'Founder', 'Kai turned forty hours of chaotic footage into the single best asset our brand has ever had. The pacing alone converted better than our media spend.', 5, 'https://i.pravatar.cc/150?u=PriyaAnand', true, 1),
('2', 'Marco Villanueva', 'Aurora Records', 'Director', 'Every cut felt intentional. He understood the emotional beat of the story before I could even explain it out loud.', 5, 'https://i.pravatar.cc/150?u=MarcoVillanueva', true, 2),
('3', 'Elle Forsythe', 'Nomad', 'Creative Director', 'We''ve worked with a dozen editors. Nobody else treats sound design with this level of care.', 5, 'https://i.pravatar.cc/150?u=ElleForsythe', true, 3),
('4', 'Maren Cole', 'Private Client', 'Client', 'Our wedding film still makes guests cry two years later. That''s the whole review.', 5, 'https://i.pravatar.cc/150?u=MarenCole', true, 4),
('5', 'Devon Cho', 'Halo Skincare', 'Producer', 'Fast, precise, and never precious about cutting his own darlings if the story needed it.', 5, 'https://i.pravatar.cc/150?u=DevonCho', true, 5),
('6', 'Sasha Reyes', 'Terra Coffee Co.', 'DP', 'The best colour grade our raw footage has ever received. It looked like a different camera.', 5, 'https://i.pravatar.cc/150?u=SashaReyes', true, 6)
ON CONFLICT (id) DO NOTHING;

-- Seed Clients
INSERT INTO clients (id, name, visible, sort_order) VALUES
('1', 'NOMAD', true, 1),
('2', 'AURORA', true, 2),
('3', 'SOLACE', true, 3),
('4', 'HALO', true, 4),
('5', 'TERRA', true, 5),
('6', 'WREN & CO', true, 6),
('7', 'FINTRA', true, 7),
('8', 'VERVE', true, 8),
('9', 'ILFORD', true, 9)
ON CONFLICT (id) DO NOTHING;

-- Seed Awards
INSERT INTO awards (id, title, subtitle, year, category, badge_text) VALUES
('1', 'Vimeo Staff Pick', '"Static"', '2025', 'award', 'Editing'),
('2', 'Webby Award, Honoree', 'Solace Launch Film', '2025', 'award', 'Branded Content'),
('3', 'Cannes Lions, Shortlist', 'Nomad Ad Campaign', '2024', 'award', 'Craft — Editing'),
('4', 'American Cutting Edge', 'Finalist', '2023', 'award', 'Editor of the Year'),
('5', 'Featured', 'Motionographer', '2023', 'award', 'Motion Design')
ON CONFLICT (id) DO NOTHING;
