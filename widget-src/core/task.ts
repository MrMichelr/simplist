/**
 * A task, as stored in synced state.
 *
 * This is a plain object on purpose: synced state must be JSON-serialisable,
 * so a class instance would lose its prototype on reload. Behaviour lives in
 * the pure functions below instead.
 */
export type Task = {
  id: string;
  content: string;
  done: boolean;
};

export type TaskList = Task[];

/**
 * Creates a task with a caller-supplied id.
 *
 * The id is passed in rather than generated here so it can come from a counter
 * held in synced state — `Date.now()` would be non-deterministic and can
 * collide when two clients add a task in the same millisecond.
 */
export function createTask(id: string, content: string): Task {
  return { id, content: content.trim(), done: false };
}

export const isBlank = (content: string): boolean => content.trim().length === 0;

/* -------------------------------------------------------------------------- */
/* Pure list operations — each returns a new array                            */
/* -------------------------------------------------------------------------- */

export function add(tasks: TaskList, task: Task): TaskList {
  return [...tasks, task];
}

export function remove(tasks: TaskList, id: string): TaskList {
  return tasks.filter((task) => task.id !== id);
}

export function toggle(tasks: TaskList, id: string): TaskList {
  return tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  );
}

export function rename(tasks: TaskList, id: string, content: string): TaskList {
  return tasks.map((task) =>
    task.id === id ? { ...task, content: content.trim() } : task
  );
}

/** Moves the task at `index` one slot up or down. A no-op at either end. */
export function move(tasks: TaskList, index: number, direction: "up" | "down"): TaskList {
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || index >= tasks.length) return tasks;
  if (target < 0 || target >= tasks.length) return tasks;

  const next = [...tasks];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function clearDone(tasks: TaskList): TaskList {
  return tasks.filter((task) => !task.done);
}

/* -------------------------------------------------------------------------- */
/* Derived values                                                             */
/* -------------------------------------------------------------------------- */

export function visible(tasks: TaskList, hideDone: boolean): TaskList {
  return hideDone ? tasks.filter((task) => !task.done) : tasks;
}

export function countRemaining(tasks: TaskList): number {
  return tasks.reduce((total, task) => (task.done ? total : total + 1), 0);
}
