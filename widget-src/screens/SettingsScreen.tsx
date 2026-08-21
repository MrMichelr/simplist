const { widget } = figma;
const { AutoLayout, Line } = widget;

import { Strings } from "../content/strings";
import { Header } from "../components/Header";
import { TextButton } from "../components/Button";
import { Icon } from "../components/Icon";
import { Label } from "../components/Text";
import { Surface } from "../components/Surface";
import { buildTheme, IconSize, Radius, Scheme, Space, Theme, Type } from "../theme";
import { WidgetState } from "../state";

export function SettingsScreen({ theme, accent, actions }: WidgetState) {
  return (
    <Surface theme={theme}>
      <Header
        theme={theme}
        title={Strings.settings.title}
        trailing={
          <TextButton
            theme={theme}
            label={Strings.done}
            onClick={() => actions.goTo("list")}
          />
        }
      />
      <AutoLayout
        name="Container"
        direction="vertical"
        width="fill-parent"
        spacing={Space[300]}
      >
        <Row theme={theme} label={Strings.settings.appearance}>
          <AutoLayout name="Options" spacing={Space[200]}>
            <SchemePreview
              theme={theme}
              scheme="light"
              accent={accent}
              label={Strings.settings.light}
              onClick={() => actions.setScheme("light")}
            />
            <SchemePreview
              theme={theme}
              scheme="dark"
              accent={accent}
              label={Strings.settings.dark}
              onClick={() => actions.setScheme("dark")}
            />
          </AutoLayout>
        </Row>

        <Line name="Separator" stroke={theme.border.default} length="fill-parent" />

        <Row theme={theme} label={Strings.settings.accent}>
          <AutoLayout name="Options" spacing={Space[300]} verticalAlignItems="center">
            <AutoLayout
              name="Swatch"
              width={48}
              height={48}
              cornerRadius={Radius.xs}
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

function Row({
  theme,
  label,
  children,
}: {
  theme: Theme;
  label: string;
  children: FigmaDeclarativeNode;
}) {
  return (
    <AutoLayout
      name="Item"
      width="fill-parent"
      spacing="auto"
      verticalAlignItems="center"
      padding={{ vertical: Space[200] }}
    >
      <Label style={Type.body} fill={theme.text.primary}>
        {label}
      </Label>
      {children}
    </AutoLayout>
  );
}

/**
 * A miniature of the widget in the given scheme, so the choice is shown rather
 * than described. Building a throwaway theme keeps the preview honest — it uses
 * the same function that paints the real screen.
 */
function SchemePreview({
  theme,
  scheme,
  accent,
  label,
  onClick,
}: {
  theme: Theme;
  scheme: Scheme;
  accent: string | undefined;
  label: string;
  onClick: () => void;
}) {
  const preview = buildTheme({ scheme, accent });
  const selected = theme.scheme === scheme;

  return (
    <AutoLayout
      name="Choice"
      direction="vertical"
      spacing={Space[100]}
      horizontalAlignItems="center"
      onClick={onClick}
    >
      <AutoLayout
        name="Preview"
        width={84}
        height={64}
        cornerRadius={Radius.s}
        padding={Space[200]}
        spacing={Space[100]}
        direction="vertical"
        fill={preview.surface.base}
        stroke={selected ? theme.accent.base : preview.border.default}
        strokeWidth={selected ? 2 : 1}
        hoverStyle={{ stroke: theme.accent.base }}
      >
        <AutoLayout spacing={Space[50]} verticalAlignItems="center">
          <Icon name="logo" size={IconSize.s} fill={preview.accent.base} />
          <AutoLayout width={28} height={6} cornerRadius={2} fill={preview.text.primary} />
        </AutoLayout>
        <AutoLayout
          width="fill-parent"
          height={10}
          cornerRadius={2}
          fill={preview.surface.secondary}
        />
        <AutoLayout spacing={Space[50]} verticalAlignItems="center">
          <AutoLayout
            width={8}
            height={8}
            cornerRadius={2}
            stroke={preview.accent.base}
            strokeWidth={1.5}
          />
          <AutoLayout width={36} height={5} cornerRadius={2} fill={preview.text.tertiary} />
        </AutoLayout>
      </AutoLayout>
      <Label
        style={Type.caption}
        fill={selected ? theme.accent.base : theme.text.tertiary}
      >
        {label}
      </Label>
    </AutoLayout>
  );
}
