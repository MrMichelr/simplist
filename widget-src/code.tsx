/* SimpList — a simple to-do list for Figma and FigJam. © Michel Rodriguez */

const { widget } = figma;
const { AutoLayout, Text, usePropertyMenu } = widget;

import { iconLibrary } from "./assets/icons";
import { Strings } from "./content/strings";
import { useWidgetState } from "./state";
import { Type } from "./theme";

function SimpList() {
  // --- Hooks -------------------------------------------------------------
  // Every hook runs here, unconditionally, before any branching below.
  const { theme, screen, actions } = useWidgetState();

  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "power",
        tooltip: Strings.propertyMenu.power,
        icon: iconLibrary("bolt", "#FFF"),
      },
      {
        itemType: "action",
        propertyName: "compact",
        tooltip:
          screen === "compact"
            ? Strings.propertyMenu.expand
            : Strings.propertyMenu.collapse,
        icon: iconLibrary(
          screen === "compact" ? "chevron.down" : "chevron.up",
          "#FFF"
        ),
      },
    ],
    ({ propertyName }) => {
      if (propertyName === "power") actions.openPowerMode();
      if (propertyName === "compact") actions.toggleCompact();
    }
  );

  // --- Render ------------------------------------------------------------
  // TODO(v4): replace this scaffold with the real screens once the V4 mockups
  // are wired up. The routing shape is final; only the leaves change.
  return (
    <AutoLayout
      name="SimpList"
      direction="vertical"
      fill={theme.surface.base}
      stroke={theme.neutral.lowest}
      cornerRadius={12}
      padding={24}
      spacing={8}
      width={393}
    >
      <Text fontFamily={Type.family} {...Type.headingStrong} fill={theme.content.primary}>
        {Strings.title}
      </Text>
      <Text fontFamily={Type.family} {...Type.footnote} fill={theme.content.secondary}>
        {`screen: ${screen}`}
      </Text>
    </AutoLayout>
  );
}

widget.register(SimpList);
