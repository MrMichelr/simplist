const { widget } = figma;
const { AutoLayout } = widget;

import { Elevation500, Elevation600, Radius, Space, Theme } from "../theme";

type Props = {
  theme: Theme;
  name: string;
  width?: number;
  padding?: WidgetJSX.Padding;
  spacing?: number;
  cornerRadius?: number;
  /** The menu sits above the card and carries the heavier Drop Shadow/600. */
  raised?: boolean;
  x: WidgetJSX.HorizontalConstraint | number;
  y: WidgetJSX.VerticalConstraint | number;
  children?: FigmaDeclarativeNode;
};

/** A floating panel anchored beside the widget. */
export function Popover({
  theme,
  name,
  width = 250,
  padding,
  spacing,
  cornerRadius,
  raised,
  x,
  y,
  children,
}: Props) {
  return (
    <AutoLayout
      name={name}
      direction="vertical"
      positioning="absolute"
      x={x}
      y={y}
      width={width}
      padding={padding ?? Space[400]}
      spacing={spacing ?? Space[600]}
      cornerRadius={cornerRadius ?? Radius.m}
      fill={theme.surface.base}
      stroke={theme.border.default}
      effect={raised ? Elevation600 : Elevation500}
    >
      {children}
    </AutoLayout>
  );
}
