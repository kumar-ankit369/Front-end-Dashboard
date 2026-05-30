import type { Course } from "@/types";

// ── Icon helpers ──────────────────────────────────────────────────────────────

interface IconProps { size?: number; className?: string; }

export function AtomIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
    </svg>
  );
}

export function ServerIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

export function Code2Icon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function DatabaseIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

export function BookOpenIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function getIcon(iconName: string, size = 18) {
  switch (iconName) {
    case "Atom":     return <AtomIcon size={size} />;
    case "Server":   return <ServerIcon size={size} />;
    case "Code2":    return <Code2Icon size={size} />;
    case "Database": return <DatabaseIcon size={size} />;
    default:         return <BookOpenIcon size={size} />;
  }
}

// ── Course icon color palettes ────────────────────────────────────────────────

const COURSE_PALETTES: Record<string, { bg: string; color: string; barClass: string }> = {
  Atom:     { bg: "rgba(108,99,255,0.15)", color: "#6c63ff", barClass: "" },
  Server:   { bg: "rgba(59,130,246,0.15)", color: "#3b82f6", barClass: "blue" },
  Code2:    { bg: "rgba(34,197,94,0.15)",  color: "#22c55e", barClass: "green" },
  Database: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b", barClass: "amber" },
  BookOpen: { bg: "rgba(168,85,247,0.15)", color: "#a855f7", barClass: "" },
};

export function getPalette(iconName: string) {
  return COURSE_PALETTES[iconName] ?? COURSE_PALETTES.BookOpen;
}

// ── CourseList component ──────────────────────────────────────────────────────

interface CourseListProps { courses: Course[]; }

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="course-list">
      {courses.map((course) => {
        const palette = getPalette(course.icon_name);
        return (
          <div
            key={course.id}
            className="course-item"
            role="button"
            tabIndex={0}
            id={`course-${course.id}`}
            aria-label={`${course.title} — ${course.progress}% complete`}
          >
            <div
              className="course-icon"
              style={{ background: palette.bg, color: palette.color }}
              aria-hidden="true"
            >
              {getIcon(course.icon_name)}
            </div>
            <div className="course-info">
              <div className="course-title">{course.title}</div>
              <div className="progress-bar-wrap" role="progressbar" aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className={`progress-bar-fill ${palette.barClass}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
            <div className="course-pct">{course.progress}%</div>
          </div>
        );
      })}
    </div>
  );
}
