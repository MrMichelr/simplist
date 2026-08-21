const { widget } = figma;
const { AutoLayout, Input } = widget;

import { Radius, Space, Theme, Type } from "../theme";
import { IconButton } from "./Button";

type Props = {
  theme: Theme;
  value: string;
  placeholder: string;
  /** Called with the field's text, from both the button and losing focus. */
  onSubmit: (value: string) => void;
  disabled?: boolean;
};

/**
 * `Main Action`: the text field plus the accent add button, 4px apart.
 *
 * The draft lives in the caller's synced state, not here. Synced-state keys are
 * global to the widget, so a key declared inside a reusable input would be
 * shared by every instance of it — the collision that made v3's
 * DefaultTextField and OnlyTextField silently overwrite each other.
 *
 * Clicking the button first blurs the field, so `onTextEditEnd` fires and
 * submits; the click then submits an already-empty value, which is discarded.
 */
export function TaskInput({ theme, value, placeholder, onSubmit, disabled }: Props) {
  return (
    <AutoLayout name="Main Action" width="fill-parent" spacing={Space[100]}>
      <AutoLayout
        name="Input"
        width="fill-parent"
        height={56}
        verticalAlignItems="center"
        fill={theme.surface.secondary}
        stroke={theme.border.default}
        cornerRadius={Radius.s}
        padding={{ vertical: Space[400], horizontal: Space[600] }}
        hoverStyle={disabled ? undefined : { stroke: theme.border.strong }}
      >
        {!disabled && (
          <Input
            name="Input"
            value={value}
            placeholder={placeholder}
            width="fill-parent"
            inputBehavior="wrap"
            fontFamily={Type.body.fontFamily}
            fontSize={Type.body.fontSize}
            fontWeight={Type.body.fontWeight}
            lineHeight={Type.body.lineHeight}
            letterSpacing={Type.body.letterSpacing}
            fill={theme.text.primary}
            placeholderProps={{ fill: theme.text.tertiary, opacity: 1 }}
            onTextEditEnd={(event) => onSubmit(event.characters)}
          />
        )}
      </AutoLayout>
      <IconButton
        theme={theme}
        name="plus"
        size="l"
        variant="primary"
        tooltip="Add task"
        disabled={disabled}
        onClick={() => onSubmit(value)}
      />
    </AutoLayout>
  );
}
