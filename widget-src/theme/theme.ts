import { readableOn, shade } from "./color";
import { DEFAULT_ACCENT, Palette } from "./tokens";

/**
 * The resolved colour set handed to every component.
 *
 * This is DERIVED state: it is recomputed on each render from `ThemeConfig`
 * and is deliberately never stored in synced state, so the theme can never
 * drift out of sync with the settings that produced it.
 */
export type Theme = {
  scheme: "light" | "dark";
  neutral: Ramp;
  danger: Ramp;
  surface: { base: string; raised: string; sunken: string };
  content: { primary: string; secondary: string; onAccent: string };
  accent: { base: string; hover: string };
};

type Ramp = {
  lowest: string;
  lower: string;
  low: string;
  medium: string;
  high: string;
  higher: string;
  highest: string;
};

export type ThemeConfig = {
  scheme: "light" | "dark";
  /** Hex accent colour. Falls back to the default when absent or malformed. */
  accent?: string;
};

const N = Palette.neutral;
const R = Palette.red;

/** Picks `l` in light mode and `d` in dark mode. */
const pick = <T,>(light: boolean, l: T, d: T): T => (light ? l : d);

export function buildTheme(config: ThemeConfig): Theme {
  const light = config.scheme === "light";
  const accent = config.accent ?? DEFAULT_ACCENT;

  const neutral: Ramp = {
    lowest: pick(light, N[100], N[900]),
    lower: pick(light, N[200], N[800]),
    low: pick(light, N[300], N[600]),
    medium: N[500],
    high: pick(light, N[700], N[300]),
    higher: pick(light, N[800], N[200]),
    highest: pick(light, N[900], N[100]),
  };

  const danger: Ramp = {
    lowest: pick(light, R[50], R[950]),
    lower: pick(light, R[200], R[800]),
    low: pick(light, R[300], R[700]),
    medium: pick(light, R[500], R[400]),
    high: pick(light, R[700], R[300]),
    higher: pick(light, R[800], R[200]),
    highest: pick(light, R[900], R[100]),
  };

  const accentBase = pick(light, accent, shade(accent, 30));

  return {
    scheme: config.scheme,
    neutral,
    danger,
    surface: {
      base: pick(light, N[0], N[950]),
      raised: pick(light, N[0], N[900]),
      sunken: neutral.lowest,
    },
    content: {
      primary: pick(light, N[900], N[0]),
      secondary: pick(light, N[500], N[400]),
      onAccent: readableOn(accentBase, N[0], N[900]),
    },
    accent: {
      base: accentBase,
      hover: pick(light, shade(accent, -20), shade(accent, 20)),
    },
  };
}
