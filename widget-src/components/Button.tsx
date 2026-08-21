const { widget } = figma;
const { AutoLayout } = widget;

import { IconName } from "../assets/icons";
import { IconSize, Radius, Space, Theme, Type } from "../theme";
import { Icon } from "./Icon";
import { Label } from "./Text";

/**
 * Control sizes, from the `Icon Button` component in the design system.
 * Padding and radius follow the size; the glyph does too, except at `l`, where
 * a 24px glyph sits in generous padding.
 */
const ICON_BUTTON_SIZES = {
  xs: { padding: Space[50], radius: Radius.xs, glyph: IconSize.xs },
  s: { padding: Space[150], radius: Radius.xs, glyph: IconSize.s },
  m: { padding: Space[200], radius: Radius.s, glyph: IconSize.m },
  l: { padding: Space[400], radius: Radius.s, glyph: IconSize.m },
} as const;

export type ControlSize = keyof typeof ICON_BUTTON_SIZES;
export type ControlVariant = "tertiary" | "primary";

type IconButtonProps = {
  theme: Theme;
  name: IconName;
  onClick?: (event: WidgetClickEvent) => void | Promise<unknown>;
  tooltip?: string;
  size?: ControlSize;
  variant?: ControlVariant;
  disabled?: boolean;
  /** Overrides the glyph colour on a tertiary button. */
  fill?: string;
  /** Overrides the hover fill on a tertiary button. */
  hoverFill?: string;
  /** Starts hidden and fades in on hover — used by the row reorder arrows. */
  revealOnHover?: boolean;
};

/**
 * An icon target.
 *
 * Hover paints the surface, not the glyph: `hoverStyle` accepts only fill,
 * stroke and opacity, so surface tinting is the feedback the API allows.
 */
export function IconButton({
  theme,
  name,
  onClick,
  tooltip,
  size = "m",
  variant = "tertiary",
  disabled,
  fill,
  hoverFill,
  revealOnHover,
}: IconButtonProps) {
  const spec = ICON_BUTTON_SIZES[size];
  const primary = variant === "primary";

  const background = disabled
    ? theme.surface.tertiary
    : primary
      ? theme.accent.base
      : undefined;

  const glyph = disabled
    ? theme.text.onDisabled
    : primary
      ? theme.text.onAccent
      : (fill ?? theme.icon);

  const hover = disabled
    ? undefined
    : primary
      ? { fill: theme.accent.hover }
      : { fill: hoverFill ?? theme.surface.hover, opacity: 1 };

  return (
    <AutoLayout
      name="Icon Button"
      padding={spec.padding}
      cornerRadius={spec.radius}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      fill={background}
      opacity={revealOnHover ? 0 : 1}
      hoverStyle={hover}
      onClick={disabled ? undefined : onClick}
      tooltip={tooltip}
    >
      <Icon name={name} size={spec.glyph} fill={glyph} />
    </AutoLayout>
  );
}

type TextButtonProps = {
  theme: Theme;
  label: string;
  onClick?: (event: WidgetClickEvent) => void | Promise<unknown>;
  variant?: ControlVariant;
  size?: "s" | "m";
  width?: WidgetJSX.AutolayoutSize;
  disabled?: boolean;
};

/** A text button. `m` is 40px tall with 16/8 padding; `s` is 28px with 8/2. */
export function TextButton({
  theme,
  label,
  onClick,
  variant = "tertiary",
  size = "m",
  width,
  disabled,
}: TextButtonProps) {
  const primary = variant === "primary";
  const large = size === "m";

  return (
    <AutoLayout
      name="Button"
      width={width}
      minHeight={large ? 40 : 28}
      padding={
        large
          ? { vertical: Space[200], horizontal: Space[400] }
          : { vertical: Space[50], horizontal: Space[200] }
      }
      cornerRadius={Radius.xs}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      fill={disabled ? theme.surface.tertiary : primary ? theme.accent.base : undefined}
      hoverStyle={
        disabled
          ? undefined
          : { fill: primary ? theme.accent.hover : theme.surface.hover }
      }
      onClick={disabled ? undefined : onClick}
    >
      <Label
        style={Type.callout}
        fill={
          disabled
            ? theme.text.onDisabled
            : primary
              ? theme.text.onAccent
              : theme.accent.base
        }
      >
        {label}
      </Label>
    </AutoLayout>
  );
}
