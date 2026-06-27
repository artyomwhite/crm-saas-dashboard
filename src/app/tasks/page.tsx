"use client";

import { useState, type FormEvent } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useCrm } from "@/context/CrmContext";

export default function TasksPage() {
  const { tasks, addTask, toggleTask, deleteTask, hydrated } = useCrm();
  const [newTask, setNewTask] = useState("");

  const openTasks = tasks.filter((t) => !t.done);
  const doneTasks = tasks.filter((t) => t.done);

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    addTask(title);
    setNewTask("");
  }

  return (
    <AppShell title="Tasks" description="Stay on top of your to-dos">
      <PageHeader
        title="Tasks"
        description={`${openTasks.length} open · ${doneTasks.length} completed`}
      />

      {!hydrated ? (
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading...
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <form onSubmit={handleAdd} className="flex gap-3">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="shrink-0">
                Add
              </Button>
            </form>
          </Card>

          {openTasks.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-500">
                Open ({openTasks.length})
              </h3>
              <ul className="space-y-2">
                {openTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </ul>
            </div>
          )}

          {doneTasks.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-500">
                Completed ({doneTasks.length})
              </h3>
              <ul className="space-y-2">
                {doneTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </ul>
            </div>
          )}

          {tasks.length === 0 && (
            <Card className="py-12 text-center text-slate-400">
              No tasks yet. Add one above to get started.
            </Card>
          )}
        </div>
      )}
    </AppShell>
  );
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: { id: string; title: string; done: boolean };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card hover className="flex items-center gap-3 p-4">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          task.done
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-slate-300 hover:border-indigo-400"
        }`}
        aria-label={task.done ? "Mark incomplete" : "Mark complete"}
      >
        {task.done && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </button>
      <span
        className={`flex-1 text-sm ${
          task.done ? "text-slate-400 line-through" : "text-slate-700"
        }`}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        className="px-2 py-1 text-xs text-slate-400"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </Button>
    </Card>
  );
}
