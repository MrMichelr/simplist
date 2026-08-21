const { widget } = figma;
const { AutoLayout, Input } = widget;

import { Radius, Space, Theme, Type } from "../theme";
import { IconButton } from "./Button";

type Props = {
  theme: Theme;
  value: string;
  placeholder: string;
  /** Stores what was typed. Fires when the field loses focus or Enter is hit. */
  onChange: (value: string) => void;
  /** Turns the stored text into a task. */
  onAdd: () => void;
  disabled?: boolean;
};

/**
 * `Main Action`: the text field plus the accent add button, 4px apart.
 *
 * Committing and adding are deliberately separate. `onTextEditEnd` is the only
 * event the Input exposes and it cannot tell "I pressed Enter" from "I clicked
 * away", so adding on that event meant a task appeared whenever focus left the
 * field — and meant the typed text could never outlive a re-render, because it
 * was consumed the moment it arrived. Editing now stores the text; the button
 * turns it into a task.
 *
 * The design's Focus state is unreachable for the same reason: nothing fires
 * when editing begins, so the widget cannot know the field is focused.
 *
 * The draft lives in the caller's synced state, not here. Synced-state keys are
 * global to the widget, so a key declared inside a reusable input would be
 * shared by every instance of it — the collision that made v3's
 * DefaultTextField and OnlyTextField silently overwrite each other.
 */
export function TaskInput({
  theme,
  value,
  placeholder,
  onChange,
  onAdd,
  disabled,
}: Props) {
  const frame = {
    fill: theme.surface.secondary,
    stroke: theme.border.default,
    cornerRadius: Radius.s,
    padding: { vertical: Space[400], horizontal: Space[600] },
    minHeight: 56,
  } as const;

  return (
    <AutoLayout name="Main Action" width="fill-parent" spacing={Space[100]}>
      {disabled ? (
        <AutoLayout name="Input" width="fill-parent" {...frame} />
      ) : (
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
          inputFrameProps={{
            ...frame,
            verticalAlignItems: "center",
            hoverStyle: { stroke: theme.border.strong },
          }}
          onTextEditEnd={(event) => onChange(event.characters)}
        />
      )}
      <IconButton
        theme={theme}
        name="plus"
        size="l"
        variant="primary"
        disabled={disabled}
        onClick={onAdd}
      />
    </AutoLayout>
  );
}
