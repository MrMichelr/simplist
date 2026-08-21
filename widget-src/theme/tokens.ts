/** Design tokens. Pure data — no Figma API, no state. */

export const Spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 28,
  xxl: 32,
} as const;

export const Radius = {
  s: 4,
  m: 8,
  l: 12,
} as const;

export const Palette = {
  neutral: {
    0: "#FFFFFF",
    50: "#FBFCFC",
    100: "#F0F2F3",
    200: "#DFE3E5",
    300: "#C9CFD2",
    400: "#B0B6BC",
    500: "#959CA3",
    600: "#7B8289",
    700: "#62696E",
    800: "#494F53",
    900: "#303538",
    950: "#181B1C",
    1000: "#000000",
  },
  red: {
    50: "#FFEEEE",
    100: "#FFBFC6",
    200: "#FF7F96",
    300: "#FD406B",
    400: "#EB114E",
    500: "#E30044",
    600: "#CD002E",
    700: "#AA001B",
    800: "#80000C",
    900: "#550002",
    950: "#2A0000",
  },
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
  white: "#FFFFFF",
} as const;

export const DEFAULT_ACCENT = AccentPresets.blue;

const Size = { 100: 11, 200: 13, 300: 17, 400: 24 } as const;
const Leading = { tight: "120%", normal: "140%" } as const;
const Weight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const satisfies Record<string, WidgetJSX.FontWeight>;

export type TextStyle = {
  fontSize: number;
  fontWeight: WidgetJSX.FontWeight;
  lineHeight: string;
};

/**
 * Typography scale. Each entry spreads straight onto a <Text>:
 *   <Text {...Type.body} />
 */
export const Type = {
  family: "Inter",
  mono: "IBM Plex Mono",

  heading: { fontSize: Size[400], fontWeight: Weight.medium, lineHeight: Leading.tight },
  headingStrong: { fontSize: Size[400], fontWeight: Weight.semibold, lineHeight: Leading.tight },

  body: { fontSize: Size[300], fontWeight: Weight.medium, lineHeight: Leading.normal },
  bodyStrong: { fontSize: Size[300], fontWeight: Weight.semibold, lineHeight: Leading.normal },

  footnote: { fontSize: Size[200], fontWeight: Weight.medium, lineHeight: Leading.tight },
  footnoteStrong: { fontSize: Size[200], fontWeight: Weight.semibold, lineHeight: Leading.tight },

  caption: { fontSize: Size[100], fontWeight: Weight.medium, lineHeight: Leading.tight },
  captionStrong: { fontSize: Size[100], fontWeight: Weight.semibold, lineHeight: Leading.tight },
} satisfies { family: string; mono: string } & Record<string, TextStyle | string>;
