const { widget } = figma;
const { AutoLayout } = widget;

import { IconName } from "../assets/icons";
import { Strings } from "../content/strings";
import { Icon } from "../components/Icon";
import { Label } from "../components/Text";
import { Popover } from "../components/Popover";
import { Separator } from "../components/Separator";
import { IconSize, Radius, Space, Theme, Type, WIDGET_WIDTH } from "../theme";
import { WidgetState } from "../state";

const MENU_WIDTH = 250;

/** The dropdown: 4px padding, 8px radius, and the heavier Drop Shadow/600. */
export function MenuOverlay({ theme, hideDone, actions }: WidgetState) {
  return (
    <Popover
      theme={theme}
      name="Menu"
      raised
      width={MENU_WIDTH}
      cornerRadius={Radius.s}
      padding={Space[100]}
      spacing={Space[100]}
      // Anchored to the header's menu button. The card's 24px padding plus the
      // button's 40px height puts the button's lower edge at 64; the menu opens
      // 4px below that, with its right edge flush to the button's.
      //
      // Positioned from the left with an absolute offset rather than a right
      // constraint: a right constraint resolves against the parent's measured
      // width, and this menu is an absolutely-positioned sibling of the card,
      // so that width is not something to rely on.
      x={WIDGET_WIDTH - Space[600] - MENU_WIDTH}
      y={Space[600] + 40 + Space[100]}
    >
      <MenuItem
        theme={theme}
        icon="edit"
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
      <Separator theme={theme} />
      <MenuItem
        theme={theme}
        icon="info.circle"
        label={Strings.menu.info}
        onClick={() => actions.toggleOverlay("info")}
      />
      <MenuItem
        theme={theme}
        icon="gear"
        label={Strings.menu.settings}
        onClick={() => actions.goTo("settings")}
      />
      <Separator theme={theme} />
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

/** 8px padding all round, 4px radius, 8px between icon and label. */
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
      spacing={Space[200]}
      padding={Space[200]}
      cornerRadius={Radius.xs}
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
