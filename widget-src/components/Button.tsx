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
  size?: number;
  /** Icon colour. Defaults to the neutral icon token. */
  fill?: string;
  /** Fill of the button surface on hover. Omit for no hover fill. */
  hoverFill?: string;
};

/**
 * A bare icon target. Hover paints the surface rather than the glyph, which is
 * the only kind of feedback the widget API allows — `hoverStyle` accepts fill,
 * stroke and opacity, and nothing else.
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
  return (
    <AutoLayout
      name="Icon Button"
      padding={Space[200]}
      cornerRadius={Radius.s}
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

type AccentButtonProps = {
  theme: Theme;
  name: IconName;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
  tooltip?: string;
  disabled?: boolean;
};

/** The filled accent square beside the new-task input. */
export function AccentIconButton({
  theme,
  name,
  onClick,
  tooltip,
  disabled,
}: AccentButtonProps) {
  return (
    <AutoLayout
      name="Accent Button"
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
        fill={disabled ? theme.surface.tertiary : theme.accent.tint}
      />
    </AutoLayout>
  );
}

type TextButtonProps = {
  theme: Theme;
  label: string;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
  variant?: "tertiary" | "primary";
  width?: WidgetJSX.AutolayoutSize;
};

/** A text button. `tertiary` is the accent-on-transparent style used for "Done". */
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
      <Label
        style={Type.callout}
        fill={primary ? theme.text.onAccent : theme.accent.base}
      >
        {label}
      </Label>
    </AutoLayout>
  );
}
