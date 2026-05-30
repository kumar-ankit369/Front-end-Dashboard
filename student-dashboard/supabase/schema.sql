-- ============================================================
-- Student Dashboard — Supabase Schema (Minimal per brief)
-- Run this entire script in your Supabase SQL Editor
-- ============================================================

-- ─── Courses Table ─────────────────────────────────────────
create table if not exists public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress between 0 and 100),
  icon_name   text not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

-- ─── Enable Row Level Security ─────────────────────────────
alter table public.courses enable row level security;

-- Allow public read (for prototype — no auth required to view courses)
create policy "Allow public read" on public.courses
  for select using (true);

-- ─── Seed Data ─────────────────────────────────────────────
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Atom'),
  ('System Design Fundamentals', 42, 'Server'),
  ('TypeScript Deep Dive', 91, 'Code2'),
  ('Database Architecture', 28, 'Database');
