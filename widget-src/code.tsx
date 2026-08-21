/* SimpList — a simple to-do list for Figma and FigJam. © Michel Rodriguez */

const { widget } = figma;
const { AutoLayout, usePropertyMenu } = widget;

import { icon } from "./assets/icons";
import { Strings } from "./content/strings";
import { AccentOverlay } from "./overlays/AccentOverlay";
import { InfoOverlay } from "./overlays/InfoOverlay";
import { MenuOverlay } from "./overlays/MenuOverlay";
import { CompactScreen } from "./screens/CompactScreen";
import { EditScreen } from "./screens/EditScreen";
import { ListScreen } from "./screens/ListScreen";
import { PowerScreen } from "./screens/PowerScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { useWidgetState, WidgetState } from "./state";

function SimpList() {
  // --- Hooks -------------------------------------------------------------
  // Every hook runs here, unconditionally, before any branching. v3 placed
  // usePropertyMenu after three early returns, so the property menu silently
  // vanished in Edit, Settings and Power Mode.
  const state = useWidgetState();
  const { screen, actions } = state;

  const collapsed = screen === "compact";

  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "power",
        tooltip: Strings.propertyMenu.power,
        icon: icon("bolt", "#FFF"),
      },
      {
        itemType: "action",
        propertyName: "compact",
        tooltip: collapsed ? Strings.propertyMenu.expand : Strings.propertyMenu.collapse,
        icon: icon(collapsed ? "chevron.down" : "chevron.up", "#FFF"),
      },
    ],
    ({ propertyName }) => {
      if (propertyName === "power") actions.openPowerMode();
      if (propertyName === "compact") actions.toggleCompact();
    }
  );

  // --- Render ------------------------------------------------------------
  return (
    <AutoLayout name="SimpList" overflow="visible">
      <Screen {...state} />
      <Overlay {...state} />
    </AutoLayout>
  );
}

function Screen(state: WidgetState) {
  switch (state.screen) {
    case "compact":
      return <CompactScreen {...state} />;
    case "edit":
      return <EditScreen {...state} />;
    case "settings":
      return <SettingsScreen {...state} />;
    case "power":
      return <PowerScreen {...state} />;
    case "list":
      return <ListScreen {...state} />;
  }
}

function Overlay(state: WidgetState) {
  switch (state.overlay) {
    case "menu":
      return <MenuOverlay {...state} />;
    case "info":
      return <InfoOverlay {...state} />;
    case "accent":
      return <AccentOverlay {...state} />;
    case null:
      return null;
  }
}

widget.register(SimpList);
