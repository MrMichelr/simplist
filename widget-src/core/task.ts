/**
 * The task model, as stored in synced state.
 *
 * Plain objects on purpose: synced state must be JSON-serialisable, so a class
 * instance would lose its prototype on reload. Behaviour lives in the pure
 * functions below instead.
 *
 * Nesting is exactly one level deep. That mirrors the design — the Figma list
 * is a stack of `Sublist` frames, each holding one task and its subtasks — and
 * makes deeper trees unrepresentable rather than merely discouraged.
 */
export type Subtask = {
  id: string;
  content: string;
  done: boolean;
};

export type Task = Subtask & {
  subtasks: Subtask[];
};

export type TaskList = Task[];

export function createTask(id: string, content: string): Task {
  return { id, content: content.trim(), done: false, subtasks: [] };
}

export function createSubtask(id: string, content: string): Subtask {
  return { id, content: content.trim(), done: false };
}

export const isBlank = (content: string): boolean => content.trim().length === 0;

/* -------------------------------------------------------------------------- */
/* Top-level tasks — every function returns a new list                        */
/* -------------------------------------------------------------------------- */

export function add(tasks: TaskList, task: Task): TaskList {
  return [...tasks, task];
}

export function remove(tasks: TaskList, id: string): TaskList {
  return tasks.filter((task) => task.id !== id);
}

export function rename(tasks: TaskList, id: string, content: string): TaskList {
  return mapTask(tasks, id, (task) => ({ ...task, content: content.trim() }));
}

/**
 * Toggles a task. Checking a parent also checks its subtasks — a parent cannot
 * be complete while its children are not. Unchecking leaves subtasks alone, so
 * a mis-click does not silently discard their state.
 */
export function toggle(tasks: TaskList, id: string): TaskList {
  return mapTask(tasks, id, (task) => {
    const done = !task.done;
    return {
      ...task,
      done,
      subtasks: done ? task.subtasks.map((s) => ({ ...s, done: true })) : task.subtasks,
    };
  });
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

/* -------------------------------------------------------------------------- */
/* Subtasks                                                                   */
/* -------------------------------------------------------------------------- */

export function addSubtask(tasks: TaskList, parentId: string, subtask: Subtask): TaskList {
  return mapTask(tasks, parentId, (task) => ({
    ...task,
    // A parent gains an open child, so it can no longer count as complete.
    done: subtask.done ? task.done : false,
    subtasks: [...task.subtasks, subtask],
  }));
}

export function removeSubtask(tasks: TaskList, parentId: string, id: string): TaskList {
  return mapTask(tasks, parentId, (task) => ({
    ...task,
    subtasks: task.subtasks.filter((s) => s.id !== id),
  }));
}

/** Moves a subtask one slot up or down within its parent. A no-op at either end. */
export function moveSubtask(
  tasks: TaskList,
  parentId: string,
  index: number,
  direction: "up" | "down"
): TaskList {
  return mapTask(tasks, parentId, (task) => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || index >= task.subtasks.length) return task;
    if (target < 0 || target >= task.subtasks.length) return task;

    const subtasks = [...task.subtasks];
    [subtasks[index], subtasks[target]] = [subtasks[target], subtasks[index]];
    return { ...task, subtasks };
  });
}

export function renameSubtask(
  tasks: TaskList,
  parentId: string,
  id: string,
  content: string
): TaskList {
  return mapSubtask(tasks, parentId, id, (s) => ({ ...s, content: content.trim() }));
}

/**
 * Toggles a subtask, then reconciles the parent: a parent is done exactly when
 * it has subtasks and all of them are done.
 */
export function toggleSubtask(tasks: TaskList, parentId: string, id: string): TaskList {
  const updated = mapSubtask(tasks, parentId, id, (s) => ({ ...s, done: !s.done }));
  return mapTask(updated, parentId, (task) => ({
    ...task,
    done: task.subtasks.length > 0 && task.subtasks.every((s) => s.done),
  }));
}

/* -------------------------------------------------------------------------- */
/* Derived values                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Applies the "hide completed" filter. A parent that is still open keeps all of
 * its subtasks visible, so a half-finished group does not appear to shrink.
 */
export function visible(tasks: TaskList, hideDone: boolean): TaskList {
  if (!hideDone) return tasks;
  return tasks
    .filter((task) => !task.done)
    .map((task) => ({ ...task, subtasks: task.subtasks.filter((s) => !s.done) }));
}

/** Counts every open task and subtask — what the collapsed header shows. */
export function countRemaining(tasks: TaskList): number {
  return tasks.reduce((total, task) => {
    const open = task.done ? 0 : 1;
    return total + open + task.subtasks.filter((s) => !s.done).length;
  }, 0);
}

export function isEmpty(tasks: TaskList): boolean {
  return tasks.length === 0;
}

/* -------------------------------------------------------------------------- */
/* Internals                                                                  */
/* -------------------------------------------------------------------------- */

function mapTask(tasks: TaskList, id: string, fn: (task: Task) => Task): TaskList {
  return tasks.map((task) => (task.id === id ? fn(task) : task));
}

function mapSubtask(
  tasks: TaskList,
  parentId: string,
  id: string,
  fn: (subtask: Subtask) => Subtask
): TaskList {
  return mapTask(tasks, parentId, (task) => ({
    ...task,
    subtasks: task.subtasks.map((s) => (s.id === id ? fn(s) : s)),
  }));
}
