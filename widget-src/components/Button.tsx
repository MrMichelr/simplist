const { widget } = figma;
const { AutoLayout } = widget;

import { IconName } from "../assets/icons";
import { IconSize, Radius, Space, Theme, Type } from "../theme";
import { Icon } from "./Icon";
import { Label } from "./Text";

type IconButtonProps = {
  theme: Theme;
  name: IconName;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
  tooltip?: string;
  /** Glyph size. The padding follows it: 8px at 24, 6px at 16. */
  size?: 16 | 24;
  fill?: string;
  hoverFill?: string;
};

/**
 * A bare icon target.
 *
 * Hover paints the surface, not the glyph — `hoverStyle` accepts only fill,
 * stroke and opacity, so surface tinting is the feedback available.
 */
export function IconButton({
  theme,
  name,
  onClick,
  tooltip,
  size = IconSize.m,
  fill,
  hoverFill,
}: IconButtonProps) {
  const large = size === IconSize.m;
  return (
    <AutoLayout
      name="Icon Button"
      padding={large ? Space[200] : Space[150]}
      cornerRadius={large ? Radius.s : Radius.xs}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      hoverStyle={{ fill: hoverFill ?? theme.surface.secondary }}
      onClick={onClick}
      tooltip={tooltip}
    >
      <Icon name={name} size={size} fill={fill ?? theme.icon} />
    </AutoLayout>
  );
}

type AccentIconButtonProps = {
  theme: Theme;
  name: IconName;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
  tooltip?: string;
  disabled?: boolean;
};

/** The filled accent square beside the new-task field: 16px padding, 8px radius. */
export function AccentIconButton({
  theme,
  name,
  onClick,
  tooltip,
  disabled,
}: AccentIconButtonProps) {
  return (
    <AutoLayout
      name="Icon Button"
      padding={Space[400]}
      cornerRadius={Radius.s}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      fill={disabled ? theme.surface.tertiary : theme.accent.base}
      hoverStyle={disabled ? undefined : { fill: theme.accent.hover }}
      onClick={disabled ? undefined : onClick}
      tooltip={tooltip}
    >
      <Icon
        name={name}
        size={IconSize.m}
        fill={disabled ? theme.surface.tertiary : theme.text.onAccent}
      />
    </AutoLayout>
  );
}

type TextButtonProps = {
  theme: Theme;
  label: string;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
  /** `tertiary` is accent text on no fill; `primary` is white on accent. */
  variant?: "tertiary" | "primary";
  width?: WidgetJSX.AutolayoutSize;
};

/** A text button: Callout label, 40px min height, 16/8 padding, 4px radius. */
export function TextButton({
  theme,
  label,
  onClick,
  variant = "tertiary",
  width,
}: TextButtonProps) {
  const primary = variant === "primary";
  return (
    <AutoLayout
      name="Button"
      width={width}
      minHeight={40}
      padding={{ vertical: Space[200], horizontal: Space[400] }}
      cornerRadius={Radius.xs}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      fill={primary ? theme.accent.base : undefined}
      hoverStyle={{ fill: primary ? theme.accent.hover : theme.surface.secondary }}
      onClick={onClick}
    >
      <Label style={Type.callout} fill={primary ? theme.text.onAccent : theme.accent.base}>
        {label}
      </Label>
    </AutoLayout>
  );
}
