const { widget } = figma;
const { useSyncedState } = widget;

import { Markdown, Subtask, Task, TaskList, Tasks } from "../core";
import { buildTheme, Scheme, Theme } from "../theme";
import { Overlay, Screen } from "./screen";

/**
 * The single source of truth for the widget.
 *
 * Every hook lives here and is called unconditionally, before any branching in
 * `code.tsx`. That is the rule v3 broke: `usePropertyMenu` sat after three
 * early returns, so the property menu silently vanished in Edit, Settings and
 * Power Mode. Centralising the hooks makes that class of bug impossible.
 */
export type WidgetState = {
  theme: Theme;
  tasks: TaskList;
  screen: Screen;
  overlay: Overlay;
  hideDone: boolean;
  /** Id of the task or subtask currently being renamed, if any. */
  editingId: string | null;
  /** Parent whose new subtask is being typed, if any. */
  draftParentId: string | null;
  powerDraft: string;
  /** Text sitting in the new-task field. */
  draft: string;
  accent: string | undefined;
  actions: Actions;
};

export type Actions = {
  // Navigation
  goTo: (screen: Screen) => void;
  toggleOverlay: (overlay: NonNullable<Overlay>) => void;
  closeOverlay: () => void;
  toggleCompact: () => void;

  // Tasks
  setDraft: (value: string) => void;
  addTask: (content: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  moveTask: (index: number, direction: "up" | "down") => void;
  renameTask: (id: string, content: string) => void;
  clearTasks: () => void;
  setHideDone: (hide: boolean) => void;

  // Subtasks
  startSubtask: (parentId: string) => void;
  commitSubtask: (parentId: string, content: string) => void;
  cancelSubtask: () => void;
  toggleSubtask: (parentId: string, id: string) => void;
  removeSubtask: (parentId: string, id: string) => void;
  renameSubtask: (parentId: string, id: string, content: string) => void;

  // Inline editing
  startEditing: (id: string) => void;
  stopEditing: () => void;

  // Power Mode
  openPowerMode: () => void;
  setPowerDraft: (text: string) => void;
  commitPowerMode: () => void;
  cancelPowerMode: () => void;

  // Appearance
  setScheme: (scheme: Scheme) => void;
  setAccent: (hex: string | undefined) => void;
};

export function useWidgetState(): WidgetState {
  // --- Persisted state -----------------------------------------------------
  // Separate keys rather than one object: Figma applies each key independently,
  // so concurrent edits to different keys merge instead of clobbering.
  const [tasks, setTasks] = useSyncedState<TaskList>("tasks", []);
  const [nextId, setNextId] = useSyncedState("nextId", 1);
  const [screen, setScreen] = useSyncedState<Screen>("screen", "list");
  const [overlay, setOverlay] = useSyncedState<Overlay>("overlay", null);
  const [hideDone, setHideDone] = useSyncedState("hideDone", false);
  const [editingId, setEditingId] = useSyncedState<string | null>("editingId", null);
  const [draftParentId, setDraftParentId] = useSyncedState<string | null>("draftParentId", null);
  const [scheme, setScheme] = useSyncedState<Scheme>("scheme", "light");
  const [accent, setAccent] = useSyncedState<string | undefined>("accent", undefined);
  const [powerDraft, setPowerDraft] = useSyncedState("powerDraft", "");
  const [draft, setDraft] = useSyncedState("draft", "");

  // --- Derived state -------------------------------------------------------
  // Recomputed every render, never stored. In v3 the palette was a class
  // instance held in synced state and had to be re-synced by hand wherever the
  // scheme changed — which only SettingsPage actually did.
  const theme = buildTheme({ scheme, accent });

  /**
   * Hands out monotonic ids, bumping the persisted counter once per batch.
   * A Power Mode save that creates 40 tasks costs one state write, not 40.
   */
  const idFactory = () => {
    let drawn = 0;
    return {
      next: () => `t${nextId + drawn++}`,
      commit: () => {
        if (drawn > 0) setNextId(nextId + drawn);
      },
    };
  };

  /** Draws exactly one id and commits it. */
  const takeId = () => {
    setNextId(nextId + 1);
    return `t${nextId}`;
  };

  const actions: Actions = {
    goTo: (next) => {
      setScreen(next);
      setOverlay(null);
      setEditingId(null);
      setDraftParentId(null);
    },
    toggleOverlay: (next) => setOverlay((current) => (current === next ? null : next)),
    closeOverlay: () => setOverlay(null),
    toggleCompact: () => {
      setScreen((current) => (current === "compact" ? "list" : "compact"));
      setOverlay(null);
    },

    setDraft,
    addTask: (content) => {
      if (Tasks.isBlank(content)) {
        setDraft("");
        return;
      }
      const task: Task = Tasks.createTask(takeId(), content);
      setTasks((current) => Tasks.add(current, task));
      setDraft("");
    },
    toggleTask: (id) => setTasks((current) => Tasks.toggle(current, id)),
    removeTask: (id) => {
      setTasks((current) => Tasks.remove(current, id));
      setEditingId((current) => (current === id ? null : current));
    },
    moveTask: (index, direction) =>
      setTasks((current) => Tasks.move(current, index, direction)),
    renameTask: (id, content) => {
      // An empty rename deletes rather than leaving a blank row behind.
      if (Tasks.isBlank(content)) {
        setTasks((current) => Tasks.remove(current, id));
      } else {
        setTasks((current) => Tasks.rename(current, id, content));
      }
      setEditingId(null);
    },
    clearTasks: () => {
      setTasks([]);
      setPowerDraft("");
      setDraft("");
      setOverlay(null);
      setEditingId(null);
      setDraftParentId(null);
    },
    setHideDone,

    startSubtask: setDraftParentId,
    commitSubtask: (parentId, content) => {
      if (!Tasks.isBlank(content)) {
        const sub: Subtask = Tasks.createSubtask(takeId(), content);
        setTasks((current) => Tasks.addSubtask(current, parentId, sub));
      }
      setDraftParentId(null);
    },
    cancelSubtask: () => setDraftParentId(null),
    toggleSubtask: (parentId, id) =>
      setTasks((current) => Tasks.toggleSubtask(current, parentId, id)),
    removeSubtask: (parentId, id) => {
      setTasks((current) => Tasks.removeSubtask(current, parentId, id));
      setEditingId((current) => (current === id ? null : current));
    },
    renameSubtask: (parentId, id, content) => {
      if (Tasks.isBlank(content)) {
        setTasks((current) => Tasks.removeSubtask(current, parentId, id));
      } else {
        setTasks((current) => Tasks.renameSubtask(current, parentId, id, content));
      }
      setEditingId(null);
    },

    startEditing: setEditingId,
    stopEditing: () => setEditingId(null),

    // The draft is seeded on an explicit user action rather than in a useEffect
    // guarded by an "initialised" flag as v3 did: useEffect takes no dependency
    // array and may run repeatedly, so seeding there is fragile.
    openPowerMode: () => {
      setPowerDraft(Markdown.format(tasks));
      setScreen("power");
      setOverlay(null);
    },
    setPowerDraft,
    commitPowerMode: () => {
      const ids = idFactory();
      const parsed = Markdown.parse(powerDraft, ids.next);
      ids.commit();
      setTasks(parsed);
      setScreen("list");
    },
    cancelPowerMode: () => {
      setPowerDraft("");
      setScreen("list");
    },

    setScheme,
    setAccent,
  };

  return {
    theme,
    tasks,
    screen,
    overlay,
    hideDone,
    editingId,
    draftParentId,
    powerDraft,
    draft,
    accent,
    actions,
  };
}
