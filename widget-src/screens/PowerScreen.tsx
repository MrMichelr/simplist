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

/** Power Mode: edit the whole list as plain text. The card is outlined in accent. */
export function PowerScreen({ theme, powerDraft, actions }: WidgetState) {
  return (
    <Surface theme={theme} accented>
      <Header theme={theme} title={Strings.title} trailing={<PowerTag theme={theme} />} />
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
          fontFamily={Type.code.fontFamily}
          fontSize={Type.code.fontSize}
          fontWeight={Type.code.fontWeight}
          lineHeight={Type.code.lineHeight}
          letterSpacing={Type.code.letterSpacing}
          fill={theme.text.primary}
          placeholderProps={{ fill: theme.text.tertiary, opacity: 1 }}
          inputFrameProps={{
            fill: theme.surface.secondary,
            stroke: theme.border.default,
            cornerRadius: Radius.s,
            padding: Space[400],
            // minHeight, not height: a fixed height on an Input frame is not
            // honoured once the text wraps past it, and the field would then
            // clip rather than grow.
            minHeight: 375,
          }}
          onTextEditEnd={(event) => actions.setPowerDraft(event.characters)}
        />
        <AutoLayout
          name="Actions"
          width="fill-parent"
          spacing={Space[200]}
          horizontalAlignItems="end"
          verticalAlignItems="center"
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

/** Label then bolt, on an accent fill — 8/4 padding, 8px radius. */
function PowerTag({ theme }: { theme: Theme }) {
  return (
    <AutoLayout
      name="Power tag"
      spacing={10}
      padding={{ vertical: Space[100], horizontal: Space[200] }}
      cornerRadius={Radius.s}
      fill={theme.accent.base}
      verticalAlignItems="center"
      horizontalAlignItems="center"
    >
      <Label style={Type.codeSmall} fill={theme.text.onAccent}>
        {Strings.power.tag}
      </Label>
      <Icon name="bolt" size={IconSize.s} fill={theme.text.onAccent} />
    </AutoLayout>
  );
}
