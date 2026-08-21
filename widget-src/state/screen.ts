/**
 * The widget shows exactly one screen at a time.
 *
 * v3 tracked this with five independent booleans, which allowed impossible
 * combinations (Edit and Settings open at once). A single tagged value makes
 * those states unrepresentable.
 */
export type Screen = "list" | "compact" | "edit" | "settings" | "power";

/** Overlays float above the current screen; `null` means none is open. */
export type Overlay = "menu" | "info" | "accent" | null;

/** Screens that render the task list rather than a form. */
export const showsList = (screen: Screen): boolean =>
  screen === "list" || screen === "edit";
