import { readableOn, shade } from "./color";
import { DEFAULT_ACCENT, Raw } from "./tokens";

/**
 * The resolved colour set handed to every component.
 *
 * DERIVED state: rebuilt on each render from `ThemeConfig`, never stored in
 * synced state, so it cannot drift out of sync with the settings behind it.
 *
 * Names mirror the Figma variables (`color-background-surface` ->
 * `surface.base`, `color-text-surface-tertiary` -> `text.tertiary`).
 */
export type Theme = {
  scheme: Scheme;
  surface: {
    /** `color-background-surface` — the widget card. */
    base: string;
    /** `color-background-surface-secondary` — inputs, editing checkboxes. */
    secondary: string;
    /** `color-background-surface-tertiary` — disabled fills. */
    tertiary: string;
  };
  border: {
    /** `color-border-defaut` — separators, input outlines. */
    default: string;
    disabled: string;
  };
  text: {
    /** `color-text-surface` — task text, headings. */
    primary: string;
    /** `color-text-surface-tertiary` — placeholders, secondary copy. */
    tertiary: string;
    /** `color-text-disabled` — completed task text. */
    disabled: string;
    /** Foreground on top of an accent fill. */
    onAccent: string;
  };
  accent: {
    base: string;
    /** Hover fill for accent surfaces. */
    hover: string;
    /** `color-background-brand-tertiary` — the glyph inside the accent button. */
    tint: string;
  };
  danger: {
    base: string;
    tint: string;
  };
  /** Neutral icon colour (`color-background-neutral`). */
  icon: string;
};

export type Scheme = "light" | "dark";

export type ThemeConfig = {
  scheme: Scheme;
  /** Hex accent. Falls back to the default when absent or malformed. */
  accent?: string;
};

/** Picks `l` in light mode and `d` in dark mode. */
const pick = <T>(light: boolean, l: T, d: T): T => (light ? l : d);

export function buildTheme(config: ThemeConfig): Theme {
  const light = config.scheme === "light";
  const accent = config.accent ?? DEFAULT_ACCENT;

  // The Figma library only defines light mode. Dark is derived by inverting the
  // neutral ramp against the same steps, keeping the contrast relationships.
  const accentBase = pick(light, accent, shade(accent, 25));

  return {
    scheme: config.scheme,
    surface: {
      base: pick(light, Raw.white, Raw.gray950),
      secondary: pick(light, Raw.gray100, Raw.gray900),
      tertiary: pick(light, Raw.gray300, Raw.slate700),
    },
    border: {
      default: pick(light, Raw.gray200, Raw.slate700),
      disabled: pick(light, Raw.gray400, Raw.slate700),
    },
    text: {
      primary: pick(light, Raw.slate950, Raw.white),
      tertiary: Raw.gray400,
      disabled: pick(light, Raw.gray300, Raw.slate700),
      onAccent: readableOn(accentBase, Raw.white, Raw.slate950),
    },
    accent: {
      base: accentBase,
      hover: pick(light, shade(accent, -20), shade(accent, 45)),
      tint: pick(light, Raw.brandTint, Raw.white),
    },
    danger: {
      base: Raw.danger,
      tint: pick(light, Raw.dangerTint, "#2A0000"),
    },
    icon: pick(light, Raw.slate700, Raw.gray300),
  };
}
