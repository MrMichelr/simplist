import { createSubtask, createTask, Task, TaskList } from "./task";

/**
 * Plain-text serialisation used by Power Mode.
 *
 *   [ ] Ship the widget
 *     [x] Write the docs
 *     [ ] Record a demo
 *   [x] Buy milk
 *
 * Indentation marks a subtask. Nesting is one level deep, matching the model,
 * so any indented line attaches to the nearest preceding top-level task.
 */

const LINE = /^(\s*)\[( |x|X)?\]\s*(.*)$/;
const INDENT = /^(\s*)(.*)$/;
const SUBTASK_INDENT = "  ";

export function format(tasks: TaskList): string {
  const lines: string[] = [];
  for (const task of tasks) {
    lines.push(`[${task.done ? "x" : " "}] ${task.content}`);
    for (const sub of task.subtasks) {
      lines.push(`${SUBTASK_INDENT}[${sub.done ? "x" : " "}] ${sub.content}`);
    }
  }
  return lines.join("\n");
}

/**
 * Parses Power Mode text back into tasks.
 *
 * Blank lines are dropped. A line without a `[ ]` prefix is still accepted and
 * treated as unchecked, so pasting a raw list just works. An indented line that
 * has no parent yet is promoted to top level rather than discarded.
 *
 * `nextId` supplies ids, because the text format does not carry them.
 */
export function parse(text: string, nextId: () => string): TaskList {
  const tasks: Task[] = [];

  for (const raw of text.split("\n")) {
    if (raw.trim().length === 0) continue;

    const match = LINE.exec(raw);
    const [, indent, mark, body] = match ?? [];
    const content = (match ? body : INDENT.exec(raw)![2]).trim();
    if (content.length === 0) continue;

    const done = mark?.toLowerCase() === "x";
    const indented = (match ? indent : INDENT.exec(raw)![1]).length > 0;
    const parent = tasks[tasks.length - 1];

    if (indented && parent) {
      const sub = createSubtask(nextId(), content);
      sub.done = done;
      parent.subtasks.push(sub);
    } else {
      const task = createTask(nextId(), content);
      task.done = done;
      tasks.push(task);
    }
  }

  // Reconcile parents whose children all came back checked.
  for (const task of tasks) {
    if (task.subtasks.length > 0) {
      task.done = task.subtasks.every((s) => s.done);
    }
  }

  return tasks;
}
