const { widget } = figma;
const { AutoLayout, Input } = widget;

import { Strings } from "../content/strings";
import { Popover } from "../components/Popover";
import { AccentPresets, isHex, Radius, Space, Theme, Type } from "../theme";
import { WidgetState } from "../state";

const PRESETS = Object.values(AccentPresets);

export function AccentOverlay({ theme, accent, actions }: WidgetState) {
  return (
    <Popover
      theme={theme}
      name="Accent"
      x={{ type: "right", offset: -258 }}
      y={0}
      padding={Space[300]}
      spacing={Space[200]}
    >
      <AutoLayout
        name="Swatches"
        width="fill-parent"
        spacing={Space[100]}
        wrap
      >
        {PRESETS.map((preset) => (
          <Swatch
            key={preset}
            theme={theme}
            color={preset}
            selected={theme.accent.base === preset || accent === preset}
            onClick={() => actions.setAccent(preset)}
          />
        ))}
      </AutoLayout>

      <Input
        name="Hex"
        value={accent ?? ""}
        placeholder={Strings.settings.accentPlaceholder}
        width="fill-parent"
        inputBehavior="truncate"
        fontFamily={Type.mono}
        fontSize={Type.body.fontSize}
        fill={theme.text.primary}
        placeholderProps={{ fill: theme.text.tertiary, opacity: 1 }}
        inputFrameProps={{
          fill: theme.surface.secondary,
          stroke: theme.border.default,
          cornerRadius: Radius.s,
          padding: { vertical: Space[300], horizontal: Space[400] },
        }}
        // Only a well-formed colour is accepted; anything else leaves the
        // current accent untouched rather than painting the widget black.
        onTextEditEnd={(event) => {
          const value = event.characters.trim();
          if (isHex(value)) actions.setAccent(value);
        }}
      />
    </Popover>
  );
}

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
      name="Swatch"
      width={48}
      height={48}
      cornerRadius={Radius.s}
      fill={color}
      stroke={selected ? theme.text.primary : theme.border.default}
      strokeWidth={selected ? 2 : 1}
      hoverStyle={{ stroke: theme.text.primary }}
      onClick={onClick}
      tooltip={color}
    />
  );
}
