const { widget } = figma;
const { useSyncedState } = widget;

import { Markdown, Task, TaskList, Tasks } from "../core";
import { buildTheme, Theme } from "../theme";
import { Overlay, Screen } from "./screen";

/**
 * The single source of truth for the widget.
 *
 * Every hook lives here and is called unconditionally, before any branching in
 * `code.tsx`. That is the rule V3 broke: `usePropertyMenu` sat after three early
 * returns, so the property menu silently vanished in Edit, Settings and Power
 * Mode. Centralising the hooks makes that class of bug impossible.
 */
export type WidgetState = {
  theme: Theme;
  tasks: TaskList;
  screen: Screen;
  overlay: Overlay;
  hideDone: boolean;
  powerDraft: string;
  actions: Actions;
};

export type Actions = {
  // Navigation
  goTo: (screen: Screen) => void;
  openOverlay: (overlay: Overlay) => void;
  toggleOverlay: (overlay: NonNullable<Overlay>) => void;
  closeOverlay: () => void;
  toggleCompact: () => void;

  // Tasks
  addTask: (content: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  moveTask: (index: number, direction: "up" | "down") => void;
  clearTasks: () => void;
  setHideDone: (hide: boolean) => void;

  // Power Mode
  openPowerMode: () => void;
  setPowerDraft: (text: string) => void;
  commitPowerMode: () => void;
  cancelPowerMode: () => void;

  // Appearance
  setScheme: (scheme: "light" | "dark") => void;
  setAccent: (hex: string | undefined) => void;
};

export function useWidgetState(): WidgetState {
  // --- Persisted state -----------------------------------------------------
  // Kept as separate keys rather than one object: Figma applies each key
  // independently, so concurrent edits to different keys merge instead of
  // clobbering each other.
  const [tasks, setTasks] = useSyncedState<TaskList>("tasks", []);
  const [nextId, setNextId] = useSyncedState("nextId", 1);
  const [screen, setScreen] = useSyncedState<Screen>("screen", "list");
  const [overlay, setOverlay] = useSyncedState<Overlay>("overlay", null);
  const [hideDone, setHideDone] = useSyncedState("hideDone", false);
  const [scheme, setScheme] = useSyncedState<"light" | "dark">("scheme", "light");
  const [accent, setAccent] = useSyncedState<string | undefined>("accent", undefined);
  const [powerDraft, setPowerDraft] = useSyncedState("powerDraft", "");

  // --- Derived state -------------------------------------------------------
  // Recomputed every render, never stored. In V3 the palette was a class
  // instance held in synced state, which meant it had to be manually
  // re-synced anywhere the scheme changed.
  const theme = buildTheme({ scheme, accent });

  /**
   * Hands out monotonic ids. Bumps the persisted counter by however many ids
   * were drawn, so a single Power Mode save that creates N tasks costs one
   * state write rather than N.
   */
  const idFactory = () => {
    let drawn = 0;
    const next = () => `t${nextId + drawn++}`;
    const commit = () => {
      if (drawn > 0) setNextId(nextId + drawn);
    };
    return { next, commit };
  };

  const actions: Actions = {
    goTo: (next) => {
      setScreen(next);
      setOverlay(null);
    },
    openOverlay: setOverlay,
    toggleOverlay: (next) => setOverlay((current) => (current === next ? null : next)),
    closeOverlay: () => setOverlay(null),
    toggleCompact: () => {
      setScreen((current) => (current === "compact" ? "list" : "compact"));
      setOverlay(null);
    },

    addTask: (content) => {
      if (Tasks.isBlank(content)) return;
      const ids = idFactory();
      const task: Task = Tasks.createTask(ids.next(), content);
      ids.commit();
      setTasks((current) => Tasks.add(current, task));
    },
    toggleTask: (id) => setTasks((current) => Tasks.toggle(current, id)),
    removeTask: (id) => setTasks((current) => Tasks.remove(current, id)),
    moveTask: (index, direction) =>
      setTasks((current) => Tasks.move(current, index, direction)),
    clearTasks: () => {
      setTasks([]);
      setPowerDraft("");
      setOverlay(null);
    },
    setHideDone,

    // The draft is seeded here, on an explicit user action, rather than in a
    // useEffect guarded by an "initialised" flag as V3 did. useEffect has no
    // dependency array and may run repeatedly, so seeding there is fragile.
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

  return { theme, tasks, screen, overlay, hideDone, powerDraft, actions };
}
