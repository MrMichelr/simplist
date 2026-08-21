/** Colour maths. Pure functions, no dependencies. */

const clamp255 = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

export type RGB = { r: number; g: number; b: number };

/** Parses `#RGB` or `#RRGGBB`. Returns null when the input is not a hex colour. */
export function parseHex(hex: string): RGB | null {
  const raw = hex.trim().replace(/^#/, "");
  const full =
    raw.length === 3 ? raw[0] + raw[0] + raw[1] + raw[1] + raw[2] + raw[2] : raw;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

export function isHex(value: string): boolean {
  return parseHex(value) !== null;
}

export function toHex({ r, g, b }: RGB): string {
  const part = (n: number) => clamp255(n).toString(16).padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`;
}

/** Lightens (`percent > 0`) or darkens (`percent < 0`) a colour. */
export function shade(hex: string, percent: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  const factor = (100 + percent) / 100;
  return toHex({ r: rgb.r * factor, g: rgb.g * factor, b: rgb.b * factor });
}

/**
 * Perceived brightness on a 0-255 scale, using the ITU-R BT.601 weights.
 * Used to pick readable foreground text over an arbitrary accent colour.
 */
export function brightness(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) return 0;
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

/** Returns whichever of `light` / `dark` reads better on top of `background`. */
export function readableOn(background: string, light: string, dark: string): string {
  return brightness(background) > 128 ? dark : light;
}
