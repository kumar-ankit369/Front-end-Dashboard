// Activity heatmap — 48 cells representing ~4 months of daily activity
// Purely client-side demo data (no auth required)

const LEVELS = ["", "l1", "l2", "l3", "l4"] as const;

function randomLevel(seed: number): string {
  // Deterministic pseudo-random based on index
  const v = ((seed * 1103515245 + 12345) & 0x7fffffff) % 100;
  if (v < 25) return "";
  if (v < 50) return "l1";
  if (v < 70) return "l2";
  if (v < 87) return "l3";
  return "l4";
}

const CELLS = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  level: randomLevel(i * 7 + 13),
}));

export default function ActivityHeatmap() {
  return (
    <div>
      <div className="heatmap-grid" role="img" aria-label="Activity heatmap for the past 4 months">
        {CELLS.map((cell) => (
          <div
            key={cell.id}
            className={`heatmap-cell ${cell.level}`}
            title={`Day ${cell.id + 1}`}
          />
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="heatmap-legend-cells">
          {(["", "l1", "l2", "l3", "l4"] as const).map((l) => (
            <div
              key={l || "none"}
              className={`heatmap-legend-cell heatmap-cell ${l}`}
              style={!l ? { background: "var(--bg-raised)" } : undefined}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
