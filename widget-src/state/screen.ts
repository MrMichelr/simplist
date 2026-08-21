/**
 * The widget shows exactly one screen at a time.
 *
 * V3 tracked this with five independent booleans, which allowed impossible
 * combinations (Edit and Settings both open). A single tagged value makes
 * those states unrepresentable.
 */
export type Screen = "list" | "compact" | "edit" | "settings" | "power";

/**
 * Overlays float above the current screen. Only one can be open at a time,
 * and `null` means none.
 */
export type Overlay = "menu" | "info" | "accent" | null;

/** Screens that are entered from the property menu rather than the overlay menu. */
export const isFullScreen = (screen: Screen): boolean =>
  screen === "edit" || screen === "settings" || screen === "power";
