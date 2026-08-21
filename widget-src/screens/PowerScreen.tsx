const { widget } = figma;
const { AutoLayout, Input } = widget;

import { Strings } from "../content/strings";
import { Header } from "../components/Header";
import { TextButton } from "../components/Button";
import { Icon } from "../components/Icon";
import { Label } from "../components/Text";
import { Surface } from "../components/Surface";
import { IconSize, Radius, Space, Theme, Type } from "../theme";
import { WidgetState } from "../state";

/** Power Mode: edit the whole list as plain text. */
export function PowerScreen({ theme, powerDraft, actions }: WidgetState) {
  return (
    <Surface theme={theme}>
      <Header
        theme={theme}
        title={Strings.title}
        trailing={<PowerTag theme={theme} />}
      />
      <AutoLayout
        name="Container"
        direction="vertical"
        width="fill-parent"
        spacing={Space[200]}
      >
        <Input
          name="Draft"
          value={powerDraft}
          placeholder={Strings.power.placeholder}
          width="fill-parent"
          inputBehavior="multiline"
          fontFamily={Type.mono}
          fontSize={Type.body.fontSize}
          lineHeight={Type.body.lineHeight}
          fill={theme.text.primary}
          placeholderProps={{ fill: theme.text.tertiary, opacity: 1 }}
          inputFrameProps={{
            fill: theme.surface.secondary,
            stroke: theme.border.default,
            cornerRadius: Radius.s,
            padding: Space[400],
            minHeight: 375,
          }}
          onTextEditEnd={(event) => actions.setPowerDraft(event.characters)}
        />
        <AutoLayout
          name="Actions"
          width="fill-parent"
          spacing={Space[200]}
          horizontalAlignItems="end"
        >
          <TextButton
            theme={theme}
            label={Strings.power.cancel}
            onClick={actions.cancelPowerMode}
          />
          <TextButton
            theme={theme}
            variant="primary"
            label={Strings.power.save}
            onClick={actions.commitPowerMode}
          />
        </AutoLayout>
      </AutoLayout>
    </Surface>
  );
}

function PowerTag({ theme }: { theme: Theme }) {
  return (
    <AutoLayout
      name="Power tag"
      spacing={Space[50]}
      padding={{ vertical: Space[100], horizontal: Space[200] }}
      cornerRadius={Radius.xs}
      fill={theme.accent.tint}
      verticalAlignItems="center"
    >
      <Icon name="bolt" size={IconSize.s} fill={theme.accent.base} />
      <Label style={Type.footnote} fill={theme.accent.base}>
        {Strings.power.tag}
      </Label>
    </AutoLayout>
  );
}
