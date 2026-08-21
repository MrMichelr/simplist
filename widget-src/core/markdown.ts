import { createTask, Task, TaskList } from "./task";

/**
 * Plain-text serialisation used by Power Mode.
 *
 *   [ ] Buy milk
 *   [x] Ship the widget
 */

const LINE = /^\[( |x|X)?\]\s*(.*)$/;

export function format(tasks: TaskList): string {
  return tasks.map((task) => `[${task.done ? "x" : " "}] ${task.content}`).join("\n");
}

/**
 * Parses Power Mode text back into tasks.
 *
 * Blank lines are dropped. A line without a `[ ]` prefix is still accepted and
 * treated as an unchecked task, so pasting a raw list just works.
 *
 * `nextId` supplies ids for the parsed tasks; existing ids are not preserved
 * because the text format does not carry them.
 */
export function parse(text: string, nextId: () => string): TaskList {
  const tasks: Task[] = [];

  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;

    const match = LINE.exec(trimmed);
    const content = match ? match[2].trim() : trimmed;
    if (content.length === 0) continue;

    const task = createTask(nextId(), content);
    task.done = match ? match[1]?.toLowerCase() === "x" : false;
    tasks.push(task);
  }

  return tasks;
}
