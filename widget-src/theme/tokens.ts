/**
 * Design tokens, mirroring the Figma library for SimpList v4.
 *
 * Names follow the Figma variables so a token can be traced back to the design
 * file: `size-space-300` -> `Space[300]`, `border-radius-s` -> `Radius.s`.
 */

/** `size-space-*`. Sparse on purpose — these are the only steps the design uses. */
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
  xl: 48,
} as const;

/** `size-icon-*` */
export const IconSize = {
  xs: 12,
  s: 16,
  m: 24,
  l: 32,
  xl: 48,
} as const;

/** `size-depth-*` */
const Depth = { 100: 4, 200: 8, 400: 16, 800: 32 } as const;

/** Widget frame width, from the Figma screens. */
export const WIDGET_WIDTH = 400;

/* -------------------------------------------------------------------------- */
/* Colour                                                                     */
/* -------------------------------------------------------------------------- */

/** Raw palette. Prefer the semantic names on `Theme` in application code. */
export const Raw = {
  white: "#FFFFFF",
  /** `color-text-surface` */
  slate950: "#0F172B",
  /** `color-background-neutral` — icon tint and the slate accent swatch. */
  slate700: "#314158",
  /** `color-text-surface-secondary` */
  gray500: "#6A7282",
  /** `color-gray-50` — the unselected swatch ring. */
  gray50: "#F9FAFB",
  /** `color-background-surface-secondary` */
  gray100: "#F3F4F6",
  /** `color-border-defaut` */
  gray200: "#E5E7EB",
  /** `color-background-surface-tertiary`, `color-text-disabled` */
  gray300: "#D1D5DC",
  /**
   * `color-text-surface-tertiary`, `color-border-disabled`,
   * `color-border-defaut-secondary`, `color-text-disabled-on`.
   */
  gray400: "#99A1AF",
  gray900: "#111827",
  gray950: "#030712",
  /** `color-black-100` / `color-black-200` — shadow tints. */
  black100: "#0C0C0C0D",
  black200: "#0C0C0C1A",
  /** `color-background-brand` */
  brand: "#0038FF",
  /** `color-background-brand-hover` — hand-picked, not a computed shade. */
  brandHover: "#002DD5",
  /** `color-text-brand-on` — foreground on a brand fill. */
  brandOn: "#EEF6FF",
  /** `color-background-brand-tertiary` — a faint accent wash. */
  brandTint: "#EEF6FF",
  /** `color-background-negative` */
  negative: "#E30044",
  negativeTint: "#FFEEEE",
} as const;

/**
 * The eight swatches in the colour picker, in the order the design lays them
 * out. Values come straight from the `color-*-500` variables.
 */
export const AccentPresets = [
  { name: "Blue", value: "#0038FF" },
  { name: "Tangerine", value: "#FE4F18" },
  { name: "Amber", value: "#FFAA00" },
  { name: "Green", value: "#1DC84D" },
  { name: "Purple", value: "#7F06F7" },
  { name: "Pink", value: "#F4469C" },
  { name: "Red", value: "#E30044" },
  { name: "Slate", value: "#314158" },
] as const;

export const DEFAULT_ACCENT = AccentPresets[0].value;

/** Looks up a preset's display name, for the Settings row. */
export function accentName(hex: string | undefined): string {
  const match = AccentPresets.filter(
    (preset) => preset.value.toLowerCase() === (hex ?? DEFAULT_ACCENT).toLowerCase()
  )[0];
  return match ? match.name : "Custom";
}

/* -------------------------------------------------------------------------- */
/* Typography                                                                 */
/* -------------------------------------------------------------------------- */

export type TextStyle = {
  fontFamily: string;
  fontSize: number;
  fontWeight: WidgetJSX.FontWeight;
  lineHeight: string;
  letterSpacing: string;
};

const SANS = "Inter";
const MONO = "JetBrains Mono";

/**
 * The Figma text styles, one entry each. Figma stores letter-spacing as a
 * percentage of the font size and the widget API takes the same percentage
 * string, so these carry across unchanged.
 */
export const Type = {
  sans: SANS,
  mono: MONO,

  /** Title 1/Emphasized — screen headings. */
  title: {
    fontFamily: SANS,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: "120%",
    letterSpacing: "-3%",
  },
  /** Headline/Normal — emphasised body, e.g. the empty-state title. */
  headline: {
    fontFamily: SANS,
    fontSize: 17,
    fontWeight: 600,
    lineHeight: "130%",
    letterSpacing: "-2.5%",
  },
  /** Body/Normal — task text, menu items, settings labels. */
  body: {
    fontFamily: SANS,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "-2.5%",
  },
  /** Callout/Normal — button labels. */
  callout: {
    fontFamily: SANS,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "135%",
    letterSpacing: "-2%",
  },
  /** Subheadline/Normal — secondary copy. */
  subheadline: {
    fontFamily: SANS,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "135%",
    letterSpacing: "-1.5%",
  },
  /** Caption 2/Normal — swatch labels and the copyright line. */
  caption: {
    fontFamily: SANS,
    fontSize: 11,
    fontWeight: 400,
    lineHeight: "120%",
    letterSpacing: "0.5%",
  },
  /** Power Mode's textarea. */
  code: {
    fontFamily: MONO,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "-2.5%",
  },
  /** The Power tag. */
  codeSmall: {
    fontFamily: MONO,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "140%",
    letterSpacing: "-1%",
  },
} satisfies { sans: string; mono: string } & Record<string, TextStyle | string>;

/* -------------------------------------------------------------------------- */
/* Effects                                                                    */
/* -------------------------------------------------------------------------- */

const shadow = (y: number, blur: number, color: string): WidgetJSX.Effect => ({
  type: "drop-shadow",
  color,
  offset: { x: 0, y },
  blur,
  spread: 0,
  blendMode: "normal",
  visible: true,
  showShadowBehindNode: false,
});

/**
 * `Drop Shadow/500` — the widget card and the info/accent panels.
 *
 * Figma's widget best practices flag shadows as expensive, so the system has
 * exactly two elevations and each surface applies one.
 */
export const Elevation500: WidgetJSX.Effect[] = [
  shadow(Depth[200], Depth[400], Raw.black100),
  shadow(Depth[100], Depth[100], Raw.black100),
];

/** `Drop Shadow/600` — the dropdown menu, which sits above the card. */
export const Elevation600: WidgetJSX.Effect[] = [
  shadow(Depth[200], Depth[800], Raw.black100),
  shadow(Depth[200], Depth[200], Raw.black100),
  shadow(Depth[100], Depth[100], Raw.black200),
];
