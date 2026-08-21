/**
 * Design tokens, mirroring the Figma library for SimpList v4.
 *
 * Names follow the Figma variables so a token can be traced back to the design
 * file: `size-space-300` -> `Space[300]`, `border-radius-s` -> `Radius.s`.
 */

/** `size-space-*`. The scale is sparse on purpose — these are the only steps used. */
export const Space = {
  0: 0,
  50: 2,
  100: 4,
  150: 6,
  200: 8,
  300: 12,
  400: 16,
  600: 24,
} as const;

/** `border-radius-*` */
export const Radius = {
  xs: 4,
  s: 8,
  m: 16,
} as const;

/** `size-icon-*` */
export const IconSize = {
  xs: 12,
  s: 16,
  m: 24,
  l: 32,
} as const;

/** `size-depth-*` */
const Depth = { 100: 4, 200: 8, 400: 16 } as const;

/** The widget's fixed canvas width, from the Figma frames (400 - 2x24 padding). */
export const WIDGET_WIDTH = 400;

/* -------------------------------------------------------------------------- */
/* Colour                                                                     */
/* -------------------------------------------------------------------------- */

/** Raw palette. Prefer the semantic names on `Theme` in application code. */
export const Raw = {
  white: "#FFFFFF",
  slate950: "#0F172B",
  slate700: "#314158",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DC",
  gray400: "#99A1AF",
  gray900: "#111827",
  gray950: "#030712",
  black05: "#0C0C0C0D",
  brand: "#0038FF",
  brandTint: "#EEF6FF",
  danger: "#E30044",
  dangerTint: "#FFEEEE",
} as const;

/** Accent presets offered in the colour picker. */
export const AccentPresets = {
  blue: "#0038FF",
  orange: "#FC4100",
  yellow: "#FFC700",
  green: "#41B06E",
  purple: "#8F00FF",
  red: "#F21363",
  gray: "#6B6B6B",
  black: "#000000",
} as const;

export const DEFAULT_ACCENT = AccentPresets.blue;

/* -------------------------------------------------------------------------- */
/* Typography                                                                 */
/* -------------------------------------------------------------------------- */

export type TextStyle = {
  fontSize: number;
  fontWeight: WidgetJSX.FontWeight;
  lineHeight: string;
  letterSpacing: string;
};

/**
 * Figma stores letter-spacing as a percentage of the font size, and the widget
 * API accepts the same percentage string, so these carry across unchanged.
 */
export const Type = {
  family: "Inter",
  mono: "IBM Plex Mono",

  /** Title 1 / Emphasized — screen headings. */
  title: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: "120%",
    letterSpacing: "-3%",
  },
  /** Body / Normal — task text and most labels. */
  body: {
    fontSize: 17,
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "-2.5%",
  },
  /** Callout / Normal — buttons. */
  callout: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "135%",
    letterSpacing: "-2%",
  },
  /** Footnote — secondary copy. */
  footnote: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "-1%",
  },
  /** Caption — the copyright line. */
  caption: {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: "120%",
    letterSpacing: "0%",
  },
} satisfies { family: string; mono: string } & Record<string, TextStyle | string>;

/* -------------------------------------------------------------------------- */
/* Effects                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * `Drop Shadow/500`. Two stacked shadows, as in the Figma effect style.
 *
 * Figma's widget best practices flag shadows as expensive to render, so this is
 * the only elevation in the system and it is applied once per surface.
 */
export const Elevation: WidgetJSX.Effect[] = [
  {
    type: "drop-shadow",
    color: Raw.black05,
    offset: { x: 0, y: Depth[200] },
    blur: Depth[400],
    spread: 0,
    blendMode: "normal",
    visible: true,
    showShadowBehindNode: false,
  },
  {
    type: "drop-shadow",
    color: Raw.black05,
    offset: { x: 0, y: Depth[100] },
    blur: Depth[100],
    spread: 0,
    blendMode: "normal",
    visible: true,
    showShadowBehindNode: false,
  },
];
