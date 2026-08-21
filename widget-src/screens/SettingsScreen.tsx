const { widget } = figma;
const { AutoLayout, Frame, Rectangle } = widget;

import { Strings } from "../content/strings";
import { Header } from "../components/Header";
import { TextButton } from "../components/Button";
import { Label } from "../components/Text";
import { Separator } from "../components/Separator";
import { Surface } from "../components/Surface";
import {
  accentName,
  buildTheme,
  Radius,
  Scheme,
  Space,
  Theme,
  Type,
} from "../theme";
import { WidgetState } from "../state";

export function SettingsScreen({ theme, scheme, accent, actions }: WidgetState) {
  return (
    <Surface theme={theme}>
      <Header
        theme={theme}
        title={Strings.settings.title}
        trailing={
          <TextButton theme={theme} label={Strings.done} onClick={() => actions.goTo("list")} />
        }
      />
      <AutoLayout
        name="Container"
        direction="vertical"
        width="fill-parent"
        spacing={Space[300]}
      >
        <Row theme={theme} label={Strings.settings.appearance} paddingBottom>
          <AutoLayout name="Options" spacing={Space[200]} verticalAlignItems="center">
            <Choice
              theme={theme}
              scheme="light"
              accent={accent}
              label={Strings.settings.light}
              selected={scheme === "light"}
              onClick={() => actions.setScheme("light")}
            />
            <Choice
              theme={theme}
              scheme="dark"
              accent={accent}
              label={Strings.settings.dark}
              selected={scheme === "dark"}
              onClick={() => actions.setScheme("dark")}
            />
          </AutoLayout>
        </Row>

        <Separator theme={theme} />

        <Row theme={theme} label={Strings.settings.accent}>
          <AutoLayout name="Options" spacing={Space[400]} verticalAlignItems="center">
            <Label
              style={Type.caption}
              fill={theme.text.tertiary}
              horizontalAlignText="right"
            >
              {accentName(accent)}
            </Label>
            <AutoLayout
              name="Swatch"
              width={48}
              height={48}
              cornerRadius={Radius.s}
              fill={theme.accent.base}
              hoverStyle={{ fill: theme.accent.hover }}
              onClick={() => actions.toggleOverlay("accent")}
              tooltip={Strings.settings.accent}
            />
          </AutoLayout>
        </Row>
      </AutoLayout>
    </Surface>
  );
}

/** One settings line: label on the left, controls on the right, 12px vertical padding. */
function Row({
  theme,
  label,
  children,
  paddingBottom,
}: {
  theme: Theme;
  label: string;
  children: FigmaDeclarativeNode;
  paddingBottom?: boolean;
}) {
  return (
    <AutoLayout
      name="Content"
      direction="vertical"
      width="fill-parent"
      padding={{ bottom: paddingBottom ? Space[100] : Space[0] }}
    >
      <AutoLayout
        name="Item"
        width="fill-parent"
        spacing={Space[600]}
        verticalAlignItems="center"
        padding={{ vertical: Space[300], horizontal: Space[0] }}
      >
        <Label style={Type.body} fill={theme.text.primary} width="fill-parent">
          {label}
        </Label>
        {children}
      </AutoLayout>
    </AutoLayout>
  );
}

/** A theme preview with its caption underneath. */
function Choice({
  theme,
  scheme,
  accent,
  label,
  selected,
  onClick,
}: {
  theme: Theme;
  scheme: Scheme;
  accent: string | undefined;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <AutoLayout
      name="Choice"
      direction="vertical"
      width={84}
      spacing={Space[100]}
      horizontalAlignItems="center"
      onClick={onClick}
    >
      <AutoLayout
        name="Theme"
        padding={1}
        cornerRadius={Radius.s - 2}
        stroke={selected ? theme.accent.base : theme.surface.ring}
        strokeWidth={1}
        hoverStyle={{ stroke: theme.accent.base }}
      >
        <ThemePreview theme={buildTheme({ scheme, accent })} />
      </AutoLayout>
      <Label
        style={Type.caption}
        width="fill-parent"
        horizontalAlignText="center"
        fill={selected ? theme.accent.base : theme.text.tertiary}
      >
        {label}
      </Label>
    </AutoLayout>
  );
}

/**
 * An 80x60 miniature of the widget, drawn with absolutely-positioned bars at
 * the exact coordinates from the design. Building it from `buildTheme` keeps
 * the preview honest: it is painted by the same function as the real screen.
 */
function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <Frame
      name="UI"
      width={80}
      height={60}
      cornerRadius={Radius.xs}
      fill={theme.surface.base}
      stroke={theme.border.default}
      overflow="hidden"
    >
      {/* Header: the input bar and the accent add button. */}
      <Rectangle x={6} y={8} width={52} height={12} cornerRadius={2} fill={theme.surface.secondary} />
      <Rectangle x={60} y={8} width={12} height={12} cornerRadius={2} fill={theme.accent.base} />

      {/* An open task, an indented subtask, and a completed one. */}
      <Rectangle x={6} y={24} width={8} height={8} cornerRadius={1} stroke={theme.accent.base} />
      <Rectangle x={18} y={27} width={44} height={2} cornerRadius={3} fill={theme.icon} />

      <Rectangle x={14} y={34} width={8} height={8} cornerRadius={1} stroke={theme.accent.base} />
      <Rectangle x={26} y={37} width={31} height={2} cornerRadius={3} fill={theme.icon} />

      <Rectangle
        x={6}
        y={44}
        width={8}
        height={8}
        cornerRadius={1}
        fill={theme.surface.secondary}
        stroke={theme.border.default}
      />
      <Rectangle x={18} y={47} width={43} height={2} cornerRadius={3} fill={theme.surface.secondary} />
    </Frame>
  );
}
