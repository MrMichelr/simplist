const { widget } = figma;
const { AutoLayout } = widget;

import { Elevation, Radius, Space, Theme } from "../theme";

type Props = {
  theme: Theme;
  name: string;
  width?: number;
  padding?: WidgetJSX.Padding;
  spacing?: number;
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
      padding={padding ?? Space[200]}
      spacing={spacing ?? Space[100]}
      cornerRadius={Radius.m}
      fill={theme.surface.base}
      stroke={theme.border.default}
      effect={Elevation}
    >
      {children}
    </AutoLayout>
  );
}
