const { widget } = figma;
const { AutoLayout, Input } = widget;

import { Strings } from "../content/strings";
import { Popover } from "../components/Popover";
import { AccentPresets, isHex, Radius, Space, Theme, Type } from "../theme";
import { WidgetState } from "../state";

/** The colour picker: eight preset swatches over a hex field. */
export function AccentOverlay({ theme, accent, actions }: WidgetState) {
  const current = (accent ?? AccentPresets[0].value).toLowerCase();

  return (
    <Popover
      theme={theme}
      name="Color Palette"
      x={{ type: "right", offset: -258 }}
      y={0}
      padding={{ vertical: Space[400], horizontal: Space[300] }}
      spacing={Space[200]}
    >
      <AutoLayout
        name="List"
        width="fill-parent"
        spacing={Space[100]}
        horizontalAlignItems="center"
        verticalAlignItems="center"
        wrap
      >
        {AccentPresets.map((preset) => (
          <Swatch
            key={preset.value}
            theme={theme}
            color={preset.value}
            selected={preset.value.toLowerCase() === current}
            onClick={() => actions.setAccent(preset.value)}
          />
        ))}
      </AutoLayout>

      <Input
        name="Input"
        value={accent ?? ""}
        placeholder={Strings.settings.accentPlaceholder}
        width="fill-parent"
        inputBehavior="truncate"
        fontFamily={Type.body.fontFamily}
        fontSize={Type.body.fontSize}
        fontWeight={Type.body.fontWeight}
        lineHeight={Type.body.lineHeight}
        letterSpacing={Type.body.letterSpacing}
        fill={theme.text.primary}
        placeholderProps={{ fill: theme.text.tertiary, opacity: 1 }}
        inputFrameProps={{
          fill: theme.surface.secondary,
          stroke: theme.border.default,
          cornerRadius: Radius.s,
          padding: { vertical: Space[400], horizontal: Space[600] },
        }}
        // Only a well-formed colour is accepted; anything else leaves the
        // accent untouched rather than painting the widget black.
        onTextEditEnd={(event) => {
          const value = event.characters.trim();
          if (isHex(value)) actions.setAccent(value);
        }}
      />
    </Popover>
  );
}

/**
 * A 48px colour chip inside a 1px ring. The ring — not the chip — carries the
 * selected state, so the colour itself is never altered by selection.
 */
function Swatch({
  theme,
  color,
  selected,
  onClick,
}: {
  theme: Theme;
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <AutoLayout
      name="Theme"
      padding={1}
      cornerRadius={Radius.s - 2}
      stroke={selected ? theme.accent.base : theme.surface.ring}
      strokeWidth={1}
      hoverStyle={{ stroke: theme.accent.base }}
      onClick={onClick}
    >
      <AutoLayout name="Color" width={48} height={48} cornerRadius={Radius.xs} fill={color} />
    </AutoLayout>
  );
}
