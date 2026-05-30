import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";
import Sidebar from "./components/Sidebar";
import CourseList from "./components/CourseList";
import ActivityHeatmap from "./components/ActivityHeatmap";
import TaskList from "./components/TaskList";

// ── Data fetching ─────────────────────────────────────────────────────────────

async function getCourses(): Promise<Course[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return (data ?? []) as Course[];
  } catch {
    // Return fallback data when Supabase isn't configured yet
    return [
      { id: "1", title: "Advanced React Patterns", progress: 75, icon_name: "Atom",     created_at: "" },
      { id: "2", title: "System Design Fundamentals", progress: 42, icon_name: "Server", created_at: "" },
      { id: "3", title: "TypeScript Deep Dive",  progress: 91, icon_name: "Code2",    created_at: "" },
      { id: "4", title: "Database Architecture", progress: 28, icon_name: "Database", created_at: "" },
    ];
  }
}

// ── Icon SVGs (server-safe inline) ───────────────────────────────────────────

function TrendUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// ── Leaderboard data ──────────────────────────────────────────────────────────

const LEADERBOARD = [
  { rank: 1, initials: "SL", name: "Sarah L.",   pts: "4,820", color: "#6c63ff" },
  { rank: 2, initials: "MK", name: "Min-jun K.", pts: "4,615", color: "#3b82f6" },
  { rank: 3, initials: "AK", name: "Ankli",      pts: "4,210", color: "#ec4899" },
  { rank: 4, initials: "RP", name: "Riya P.",    pts: "3,990", color: "#22c55e" },
  { rank: 5, initials: "TN", name: "Tariq N.",   pts: "3,740", color: "#f59e0b" },
];

// ── Average progress helper ───────────────────────────────────────────────────

function avgProgress(courses: Course[]): number {
  if (!courses.length) return 0;
  return Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length);
}

// ── SVG Circular progress ─────────────────────────────────────────────────────

function CircularProgress({ value }: { value: number }) {
  const r = 56;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);

  return (
    <div className="circular-progress-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`Overall progress: ${value}%`}>
        {/* Track */}
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--bg-overlay)" strokeWidth="10" />
        {/* Fill */}
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="url(#grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6c63ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {/* Center text */}
        <text x="70" y="66" textAnchor="middle" fill="var(--text-primary)" fontSize="24" fontWeight="800" fontFamily="Inter, sans-serif">{value}%</text>
        <text x="70" y="84" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="Inter, sans-serif">Avg. Progress</text>
      </svg>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const courses = await getCourses();
  const avg = avgProgress(courses);

  return (
    <div className="shell">
      <Sidebar />

      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <h1 className="topbar-title">Dashboard</h1>

          <label className="topbar-search" htmlFor="search-input">
            <SearchIcon />
            <input
              id="search-input"
              type="search"
              placeholder="Search courses, tasks…"
              aria-label="Search courses and tasks"
            />
          </label>

          <div className="topbar-actions">
            <button className="icon-btn" id="btn-notifications" aria-label="Notifications (1 unread)">
              <BellIcon />
              <div className="notif-badge" aria-hidden="true" />
            </button>
            <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }} aria-label="User avatar">AK</div>
          </div>
        </header>

        {/* Main scroll area */}
        <main className="page-content">

          {/* ── Welcome Banner ── */}
          <section className="welcome-banner fade-up" aria-label="Welcome section">
            <div>
              <div className="welcome-greeting">Good evening 👋</div>
              <div className="welcome-name">Welcome back, Ankli!</div>
              <div className="welcome-sub">You have 2 tasks due today. Keep up the momentum!</div>
              <div className="welcome-cta">
                <button id="btn-continue-learning" className="btn-primary">
                  <PlayIcon />
                  Continue Learning
                </button>
                <button id="btn-view-schedule" className="btn-ghost">
                  View Schedule
                </button>
              </div>
            </div>
            <div className="welcome-stats" aria-label="Quick stats">
              <div className="welcome-stat">
                <div className="welcome-stat-value">4</div>
                <div className="welcome-stat-label">Active Courses</div>
              </div>
              <div className="welcome-stat">
                <div className="welcome-stat-value">12</div>
                <div className="welcome-stat-label">Day Streak 🔥</div>
              </div>
              <div className="welcome-stat">
                <div className="welcome-stat-value">3rd</div>
                <div className="welcome-stat-label">Leaderboard</div>
              </div>
            </div>
          </section>

          {/* ── Stats Cards ── */}
          <section className="stats-grid" aria-label="Statistics overview">
            {/* Card 1 */}
            <article
              className="stat-card fade-up fade-up-1"
              style={{ "--card-accent": "#6c63ff", "--icon-bg": "rgba(108,99,255,0.15)", "--icon-color": "#6c63ff" } as React.CSSProperties}
              aria-label="Courses in progress"
            >
              <div className="stat-card-top">
                <div className="stat-card-icon"><ZapIcon /></div>
                <div className="stat-badge up"><TrendUpIcon /> +2</div>
              </div>
              <div>
                <div className="stat-value">{courses.length}</div>
                <div className="stat-label">Courses in Progress</div>
              </div>
            </article>

            {/* Card 2 */}
            <article
              className="stat-card fade-up fade-up-2"
              style={{ "--card-accent": "#22c55e", "--icon-bg": "rgba(34,197,94,0.15)", "--icon-color": "#22c55e" } as React.CSSProperties}
              aria-label="Average progress"
            >
              <div className="stat-card-top">
                <div className="stat-card-icon"><StarIcon /></div>
                <div className="stat-badge up"><TrendUpIcon /> +8%</div>
              </div>
              <div>
                <div className="stat-value">{avg}%</div>
                <div className="stat-label">Average Progress</div>
              </div>
            </article>

            {/* Card 3 */}
            <article
              className="stat-card fade-up fade-up-3"
              style={{ "--card-accent": "#f59e0b", "--icon-bg": "rgba(245,158,11,0.15)", "--icon-color": "#f59e0b" } as React.CSSProperties}
              aria-label="Study streak"
            >
              <div className="stat-card-top">
                <div className="stat-card-icon"><ClockIcon /></div>
                <div className="stat-badge flat">🔥 Active</div>
              </div>
              <div>
                <div className="stat-value">12</div>
                <div className="stat-label">Day Study Streak</div>
              </div>
            </article>

            {/* Card 4 */}
            <article
              className="stat-card fade-up fade-up-4"
              style={{ "--card-accent": "#a855f7", "--icon-bg": "rgba(168,85,247,0.15)", "--icon-color": "#a855f7" } as React.CSSProperties}
              aria-label="XP points"
            >
              <div className="stat-card-top">
                <div className="stat-card-icon"><AwardIcon /></div>
                <div className="stat-badge up"><TrendUpIcon /> +340</div>
              </div>
              <div>
                <div className="stat-value">4,210</div>
                <div className="stat-label">Total XP Points</div>
              </div>
            </article>
          </section>

          {/* ── Two-column: Courses + Right panel ── */}
          <div className="two-col fade-up fade-up-5">

            {/* Left: Courses + Activity */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Course Progress */}
              <section className="card" aria-labelledby="courses-heading">
                <div className="section-header">
                  <div>
                    <h2 className="section-title" id="courses-heading">My Courses</h2>
                    <div className="section-sub">Track your active learning paths</div>
                  </div>
                  <button className="see-all" id="btn-see-all-courses" aria-label="See all courses">See all →</button>
                </div>
                <CourseList courses={courses} />
              </section>

              {/* Activity Heatmap */}
              <section className="card" aria-labelledby="activity-heading">
                <div className="section-header">
                  <div>
                    <h2 className="section-title" id="activity-heading">Study Activity</h2>
                    <div className="section-sub">Past 4 months</div>
                  </div>
                </div>
                <ActivityHeatmap />
              </section>

            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Overall progress ring */}
              <section className="card" aria-labelledby="progress-heading">
                <div className="section-header">
                  <h2 className="section-title" id="progress-heading">Overall Progress</h2>
                </div>
                <CircularProgress value={avg} />
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: 4 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{courses.length}</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Enrolled</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--green)" }}>
                      {courses.filter((c) => c.progress >= 90).length}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Near Done</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--amber)" }}>
                      {courses.filter((c) => c.progress < 50).length}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>In Progress</div>
                  </div>
                </div>
              </section>

              {/* Tasks */}
              <section className="card" aria-labelledby="tasks-heading">
                <div className="section-header">
                  <div>
                    <h2 className="section-title" id="tasks-heading">Upcoming Tasks</h2>
                    <div className="section-sub">Due soon</div>
                  </div>
                  <button className="see-all" id="btn-see-all-tasks" aria-label="See all tasks">See all →</button>
                </div>
                <TaskList />
              </section>

              {/* Leaderboard */}
              <section className="card" aria-labelledby="lb-heading">
                <div className="section-header">
                  <div>
                    <h2 className="section-title" id="lb-heading">Leaderboard</h2>
                    <div className="section-sub">Top learners this week</div>
                  </div>
                </div>
                <div className="leaderboard-list">
                  {LEADERBOARD.map((entry) => (
                    <div key={entry.rank} className="lb-item" id={`lb-rank-${entry.rank}`}>
                      <div className={`lb-rank${entry.rank === 1 ? " gold" : entry.rank === 2 ? " silver" : entry.rank === 3 ? " bronze" : ""}`}>
                        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
                      </div>
                      <div className="lb-avatar" style={{ background: entry.color }} aria-hidden="true">{entry.initials}</div>
                      <div className="lb-name">{entry.name}</div>
                      <div className="lb-pts">{entry.pts} XP</div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
