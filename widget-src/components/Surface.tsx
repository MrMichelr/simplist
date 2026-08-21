const { widget } = figma;
const { AutoLayout } = widget;

import { Elevation, Radius, Space, Theme, WIDGET_WIDTH } from "../theme";

type Props = {
  theme: Theme;
  width?: WidgetJSX.AutolayoutSize;
  padding?: WidgetJSX.Padding;
  spacing?: number;
  children?: FigmaDeclarativeNode;
};

/**
 * The widget card. One elevation for the whole system — Figma flags shadows as
 * expensive, so nothing else in the tree casts one.
 */
export function Surface({ theme, width, padding, spacing, children }: Props) {
  return (
    <AutoLayout
      name="Surface"
      direction="vertical"
      width={width ?? WIDGET_WIDTH}
      padding={padding ?? Space[600]}
      spacing={spacing ?? Space[300]}
      cornerRadius={Radius.m}
      fill={theme.surface.base}
      stroke={theme.border.default}
      effect={Elevation}
      overflow="visible"
    >
      {children}
    </AutoLayout>
  );
}
