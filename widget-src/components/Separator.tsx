const { widget } = figma;
const { AutoLayout } = widget;

import { Space, Theme } from "../theme";

/**
 * `Menu Separator` — a 2px bar filled with the secondary surface, not a 1px
 * hairline. Used inside the menu and between settings groups.
 */
export function Separator({ theme }: { theme: Theme }) {
  return (
    <AutoLayout
      name="Menu Separator"
      width="fill-parent"
      height={Space[50]}
      fill={theme.surface.secondary}
    />
  );
}
