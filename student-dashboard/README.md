# 🎓 LearnFlow — Student Dashboard

> A modern, full-stack student learning dashboard built with **Next.js 16**, **React 19**, **TypeScript**, and **Supabase** — featuring real-time course tracking, gamified XP, activity heatmaps, and a sleek dark UI.

<br />

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 📊 **Stats Overview** | Live cards showing courses in progress, average progress %, study streak, and total XP |
| 📚 **Course Tracker** | Visual progress bars for each enrolled course with colour-coded icons |
| 🔥 **Activity Heatmap** | GitHub-style contribution grid showing 4 months of daily study activity |
| ✅ **Task Manager** | Interactive checklist with urgency tags — mark tasks done with a single click |
| 🏆 **Leaderboard** | Weekly XP rankings with gold/silver/bronze medals |
| 🎯 **Progress Ring** | Animated SVG circular progress for overall course completion |
| 🔔 **Notifications** | Bell icon with unread badge in the top bar |
| 🌙 **Dark Mode UI** | Premium glassmorphism design with gradient accents throughout |

<br />

## 🖥️ Tech Stack

```
Frontend    Next.js 16 (App Router) · React 19 · TypeScript 5
Styling     Tailwind CSS v3 · Vanilla CSS custom properties
Backend     Supabase (PostgreSQL) · @supabase/ssr (Server Components)
Bundler     Webpack (Turbopack disabled for win32/ia32 compatibility)
```

<br />

## 📁 Project Structure

```
student-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Sidebar.tsx          # Collapsible nav with avatar footer
│   │   │   ├── CourseList.tsx       # Course rows with progress bars & icons
│   │   │   ├── ActivityHeatmap.tsx  # 48-cell deterministic heatmap grid
│   │   │   └── TaskList.tsx         # Interactive to-do list with tags
│   │   ├── globals.css              # Design system — tokens, animations, layout
│   │   ├── layout.tsx               # Root layout + SEO metadata
│   │   ├── page.tsx                 # Main dashboard (Server Component)
│   │   └── favicon.ico
│   ├── lib/
│   │   └── supabase/
│   │       ├── server.ts            # SSR-safe Supabase client (cookie-based)
│   │       └── client.ts            # Browser-side Supabase client
│   └── types/
│       └── index.ts                 # Shared TypeScript interfaces
├── supabase/
│   └── schema.sql                   # DB schema + RLS policies + seed data
├── public/                          # Static SVG assets
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind theme config
├── package.json
└── tsconfig.json
```

<br />

## 🚀 Getting Started

### 1 — Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18 or later**
- `npm` (comes with Node.js)
- A free [Supabase](https://supabase.com) account *(optional — the app works with fallback data without it)*

---

### 2 — Clone the Repository

```bash
git clone https://github.com/kumar-ankit369/Front-end-Dashboard.git
cd Front-end-Dashboard/student-dashboard
```

---

### 3 — Install Dependencies

```bash
npm install
```

---

### 4 — Configure Environment Variables *(optional)*

The dashboard runs perfectly fine with **built-in fallback data** if you skip this step. To connect a real Supabase database:

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`:
   ```bash
   copy .env.local.example .env.local
   ```
3. Fill in your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Run the database schema in the **Supabase SQL Editor** (see below)

---

### 5 — Run the Development Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

> ⚠️ **Windows (32-bit) Note:** This project uses `next dev --webpack` instead of Turbopack, since Turbopack doesn't support `win32/ia32`. This is already configured in `package.json` — no extra steps needed.

<br />

## 🗄️ Database Setup (Supabase)

If you want live data from Supabase instead of the static fallback, run the following SQL in your **Supabase Dashboard → SQL Editor**:

```sql
-- Create the courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  progress    INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  icon_name   TEXT NOT NULL DEFAULT 'BookOpen',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (prototype — no auth required)
CREATE POLICY "Allow public read" ON public.courses
  FOR SELECT USING (true);

-- Seed with sample data
INSERT INTO public.courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',    75, 'Atom'),
  ('System Design Fundamentals', 42, 'Server'),
  ('TypeScript Deep Dive',       91, 'Code2'),
  ('Database Architecture',      28, 'Database');
```

The app will automatically fetch and display this data on page load.

<br />

## 🧩 Component Breakdown

### `Sidebar.tsx`
The left-hand navigation panel. Built as a **client component** to handle active-state toggling without full page reloads.

- Navigation items: Dashboard, My Courses, Explore, Assignments, Schedule, Analytics
- Bottom section: Settings, Help & Support
- Footer: User avatar with name and role
- Active item highlighted with a purple gradient pill

---

### `CourseList.tsx`
Renders each course as a card row with:
- A **colour-coded icon** (Atom → purple, Server → blue, Code2 → green, Database → amber)
- A **progress bar** styled to match the icon colour
- A percentage label on the right
- Accessible `role="progressbar"` with `aria-valuenow`

---

### `ActivityHeatmap.tsx`
A **48-cell grid** (representing ~4 months of daily study) using a deterministic pseudo-random seeding function — so the grid always looks natural but never changes on re-render. Intensity levels go from `l1` (light) to `l4` (darkest purple).

---

### `TaskList.tsx`
An interactive client-side task manager. Each task has:
- A **toggle checkbox** to mark as complete (with strikethrough animation)
- A **due date** label
- A colour-coded urgency tag: `Urgent` (red), `Soon` (amber), `New` (blue), `Done` (grey)

---

### `page.tsx` (Main Dashboard — Server Component)
The root page. Fetches courses from Supabase on the server, then passes them as props to client components. Falls back to 4 hardcoded courses if Supabase isn't configured.

Sections rendered:
1. **Welcome Banner** — personalised greeting, quick stats, CTA buttons
2. **Stats Cards** — 4 animated cards (courses, avg progress, streak, XP)
3. **Two-column grid**
   - Left: Course List + Activity Heatmap
   - Right: Circular Progress Ring + Task List + Leaderboard

<br />

## 🎨 Design System

All visual tokens are defined as **CSS custom properties** in `globals.css`:

```css
--bg-base        /* Main dark background      */
--bg-raised      /* Card surfaces             */
--bg-overlay     /* Subtle overlays           */
--purple         /* Primary accent (#6c63ff)  */
--green          /* Success accent (#22c55e)  */
--amber          /* Warning accent (#f59e0b)  */
--text-primary   /* Bright white text         */
--text-secondary /* Muted grey text           */
```

Animations used throughout:
- **`fade-up`** — cards slide in from below on load (staggered with `fade-up-1` through `fade-up-5`)
- **`stroke-dashoffset` transition** — circular SVG ring animates on mount
- **Hover lift** — stat cards and nav items scale up subtly on hover

<br />

## 📐 TypeScript Interfaces

Defined in `src/types/index.ts`:

```typescript
interface Course {
  id: string;
  title: string;
  progress: number;      // 0–100
  icon_name: string;     // 'Atom' | 'Server' | 'Code2' | 'Database' | 'BookOpen'
  created_at: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

interface ActivityDay {
  date: string;
  count: number;
}
```

<br />

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `localhost:3000` (webpack mode) |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the codebase |

<br />

## 🔒 Security Notes

- **Row Level Security (RLS)** is enabled on the `courses` table in Supabase
- The current RLS policy allows **public read** — suitable for a prototype; tighten this before production by adding auth checks
- Environment variables are never committed — the repo includes `.env.local.example` as a template only

<br />

## 🗺️ Roadmap

- [ ] Authentication via Supabase Auth (login/signup pages)
- [ ] Dynamic routing for individual course pages (`/courses/[id]`)
- [ ] Persistent task storage in Supabase
- [ ] Real activity heatmap data from a `study_sessions` table
- [ ] Dark/light theme toggle
- [ ] Mobile-responsive collapsible sidebar

<br />

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a Pull Request
```

<br />

## 👨‍💻 Author

**Ankli** — [@kumar-ankit369](https://github.com/kumar-ankit369)

<br />

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using Next.js · React · TypeScript · Supabase</p>
