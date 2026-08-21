import { readableOn, shade } from "./color";
import { DEFAULT_ACCENT, Raw } from "./tokens";

/**
 * The resolved colour set handed to every component.
 *
 * DERIVED state: rebuilt each render from `ThemeConfig`, never stored in synced
 * state, so it cannot drift out of sync with the settings behind it.
 *
 * Names mirror the Figma variables: `color-background-surface` -> `surface.base`,
 * `color-text-surface-secondary` -> `text.secondary`.
 */
export type Theme = {
  scheme: Scheme;
  surface: {
    /** `color-background-surface` — the widget card. */
    base: string;
    /** `color-background-surface-secondary` — inputs, separators, editing boxes. */
    secondary: string;
    /** `color-background-surface-tertiary` / `color-background-disabled`. */
    tertiary: string;
    /** `color-gray-50` — the unselected swatch ring. */
    ring: string;
  };
  border: {
    /** `color-border-defaut` */
    default: string;
    /** `color-border-disabled` */
    disabled: string;
  };
  text: {
    /** `color-text-surface` */
    primary: string;
    /** `color-text-surface-secondary` */
    secondary: string;
    /** `color-text-surface-tertiary` */
    tertiary: string;
    /** `color-text-disabled` — completed task text. */
    disabled: string;
    /** `color-text-brand-on` — foreground on an accent fill. */
    onAccent: string;
  };
  accent: {
    base: string;
    /** Hover fill for accent surfaces. */
    hover: string;
    /** `color-background-brand-tertiary` — a faint accent wash for hovers. */
    tint: string;
  };
  danger: {
    base: string;
    tint: string;
  };
  /** `color-background-neutral` — the neutral icon tint. */
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
  const accentBase = pick(light, accent, shade(accent, 25));

  // The Figma library only defines light mode. Dark inverts the neutral ramp
  // against the same steps, preserving the contrast relationships.
  return {
    scheme: config.scheme,
    surface: {
      base: pick(light, Raw.white, Raw.gray950),
      secondary: pick(light, Raw.gray100, Raw.gray900),
      tertiary: pick(light, Raw.gray300, Raw.slate700),
      ring: pick(light, Raw.gray50, Raw.gray900),
    },
    border: {
      default: pick(light, Raw.gray200, Raw.slate700),
      disabled: pick(light, Raw.gray400, Raw.slate700),
    },
    text: {
      primary: pick(light, Raw.slate950, Raw.white),
      secondary: pick(light, Raw.gray500, Raw.gray400),
      tertiary: Raw.gray400,
      disabled: pick(light, Raw.gray300, Raw.slate700),
      // The library hard-codes #EEF6FF, which only reads on a blue-ish accent.
      // A custom accent picks whichever of the two reads better instead.
      onAccent: readableOn(accentBase, Raw.brandOn, Raw.slate950),
    },
    accent: {
      base: accentBase,
      hover: pick(light, shade(accent, -20), shade(accent, 45)),
      tint: pick(light, Raw.brandTint, Raw.gray900),
    },
    danger: {
      base: Raw.negative,
      tint: pick(light, Raw.negativeTint, "#2A0000"),
    },
    icon: pick(light, Raw.slate700, Raw.gray300),
  };
}
