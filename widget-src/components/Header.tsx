const { widget } = figma;
const { AutoLayout, Line } = widget;

import { IconSize, Space, Theme, Type } from "../theme";
import { Icon } from "./Icon";
import { Label } from "./Text";

type Props = {
  theme: Theme;
  title: string;
  /** Trailing control — the menu button, a "Done" button, or the Power tag. */
  trailing?: FigmaDeclarativeNode;
  /** Collapsed mode drops the rule under the header. */
  divider?: boolean;
};

export function Header({ theme, title, trailing, divider = true }: Props) {
  return (
    <AutoLayout
      name="Header"
      direction="vertical"
      width="fill-parent"
      spacing={Space[300]}
    >
      <AutoLayout
        name="Bar"
        width="fill-parent"
        spacing={Space[600]}
        verticalAlignItems="center"
      >
        <AutoLayout
          name="Heading"
          width="fill-parent"
          spacing={Space[200]}
          verticalAlignItems="center"
        >
          <Icon name="logo" size={IconSize.l} fill={theme.accent.base} />
          <Label style={Type.title} fill={theme.text.primary}>
            {title}
          </Label>
        </AutoLayout>
        {trailing}
      </AutoLayout>
      {divider && (
        <Line name="Separator" stroke={theme.border.default} length="fill-parent" />
      )}
    </AutoLayout>
  );
}
