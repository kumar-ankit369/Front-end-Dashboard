"use client";

import { useState } from "react";

const TASKS = [
  { id: "t1", title: "Complete React Patterns — Module 4", due: "Today, 11:59 PM", tag: "urgent", done: false },
  { id: "t2", title: "System Design quiz submission", due: "Tomorrow, 8:00 AM", tag: "soon", done: false },
  { id: "t3", title: "TypeScript Generics exercises", due: "Yesterday", tag: "done", done: true },
  { id: "t4", title: "Read: CAP Theorem article", due: "Jun 2", tag: "new", done: false },
  { id: "t5", title: "Peer review: Database schema", due: "Jun 3", tag: "new", done: false },
];

const TAG_LABELS: Record<string, string> = {
  urgent: "Urgent",
  soon: "Soon",
  done: "Done",
  new: "New",
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2 6 5 9 10 3" />
    </svg>
  );
}

export default function TaskList() {
  const [tasks, setTasks] = useState(TASKS);

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item" id={`task-${task.id}`}>
          <button
            className={`task-check${task.done ? " done" : ""}`}
            onClick={() => toggle(task.id)}
            aria-label={task.done ? `Mark "${task.title}" as incomplete` : `Mark "${task.title}" as complete`}
            aria-pressed={task.done}
          >
            <CheckIcon />
          </button>
          <div className="task-info">
            <div className={`task-title${task.done ? " done" : ""}`}>{task.title}</div>
            <div className="task-meta">{task.due}</div>
          </div>
          {!task.done && (
            <div className={`task-tag tag-${task.tag}`}>
              {TAG_LABELS[task.tag]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
