const { widget } = figma;
const { AutoLayout, Line } = widget;

import { IconName } from "../assets/icons";
import { Strings } from "../content/strings";
import { Icon } from "../components/Icon";
import { Label } from "../components/Text";
import { Popover } from "../components/Popover";
import { IconSize, Radius, Space, Theme, Type } from "../theme";
import { WidgetState } from "../state";

export function MenuOverlay({ theme, hideDone, actions }: WidgetState) {
  return (
    <Popover theme={theme} name="Menu" x={{ type: "right", offset: -258 }} y={64}>
      <MenuItem
        theme={theme}
        icon="checklist"
        label={Strings.menu.edit}
        onClick={() => actions.goTo("edit")}
      />
      <MenuItem
        theme={theme}
        icon={hideDone ? "eye" : "eye.cross"}
        label={hideDone ? Strings.menu.showDone : Strings.menu.hideDone}
        onClick={() => {
          actions.setHideDone(!hideDone);
          actions.closeOverlay();
        }}
      />
      <Line name="Separator" stroke={theme.border.default} length="fill-parent" />
      <MenuItem
        theme={theme}
        icon="info.circle"
        label={Strings.menu.info}
        onClick={() => actions.toggleOverlay("info")}
      />
      <MenuItem
        theme={theme}
        icon="slider"
        label={Strings.menu.settings}
        onClick={() => actions.goTo("settings")}
      />
      <Line name="Separator" stroke={theme.border.default} length="fill-parent" />
      <MenuItem
        theme={theme}
        icon="trash"
        label={Strings.menu.clear}
        danger
        onClick={actions.clearTasks}
      />
    </Popover>
  );
}

function MenuItem({
  theme,
  icon,
  label,
  onClick,
  danger,
}: {
  theme: Theme;
  icon: IconName;
  label: string;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
  danger?: boolean;
}) {
  const tint = danger ? theme.danger.base : theme.text.primary;

  return (
    <AutoLayout
      name="Menu Item"
      width="fill-parent"
      minHeight={40}
      spacing={Space[200]}
      padding={{ vertical: Space[200], horizontal: Space[300] }}
      cornerRadius={Radius.s}
      verticalAlignItems="center"
      hoverStyle={{ fill: danger ? theme.danger.tint : theme.surface.secondary }}
      onClick={onClick}
    >
      <Icon name={icon} size={IconSize.m} fill={danger ? theme.danger.base : theme.icon} />
      <Label style={Type.body} fill={tint} width="fill-parent">
        {label}
      </Label>
    </AutoLayout>
  );
}
