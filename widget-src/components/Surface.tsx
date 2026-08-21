const { widget } = figma;
const { AutoLayout } = widget;

import { Elevation500, Radius, Space, Theme, WIDGET_WIDTH } from "../theme";

type Props = {
  theme: Theme;
  /** Power Mode outlines the card in the accent colour instead of the border. */
  accented?: boolean;
  children?: FigmaDeclarativeNode;
};

/** The widget card: 24px padding, 12px gap, 16px radius, one elevation. */
export function Surface({ theme, accented, children }: Props) {
  return (
    <AutoLayout
      name="Surface"
      direction="vertical"
      width={WIDGET_WIDTH}
      padding={Space[600]}
      spacing={Space[300]}
      cornerRadius={Radius.m}
      fill={theme.surface.base}
      stroke={accented ? theme.accent.base : theme.border.default}
      effect={Elevation500}
      overflow="visible"
    >
      {children}
    </AutoLayout>
  );
}
