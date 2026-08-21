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
 * The hover border lives on `inputFrameProps`, not on a wrapper: hover applies
 * to whichever node is actually under the pointer, and the Input sits on top of
 * anything wrapping it, so a wrapper's hoverStyle would never fire over the
 * text area itself.
 *
 * The design's Focus state is not reachable. `onTextEditEnd` is the only event
 * the Input exposes — nothing fires when editing begins — so the widget cannot
 * know the field is focused.
 *
 * The draft lives in the caller's synced state, not here. Synced-state keys are
 * global to the widget, so a key declared inside a reusable input would be
 * shared by every instance of it — the collision that made v3's
 * DefaultTextField and OnlyTextField silently overwrite each other.
 */
export function TaskInput({ theme, value, placeholder, onSubmit, disabled }: Props) {
  const frame = {
    fill: theme.surface.secondary,
    stroke: theme.border.default,
    cornerRadius: Radius.s,
    padding: { vertical: Space[400], horizontal: Space[600] },
    height: 56,
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
          onTextEditEnd={(event) => onSubmit(event.characters)}
        />
      )}
      <IconButton
        theme={theme}
        name="plus"
        size="l"
        variant="primary"
        disabled={disabled}
        onClick={() => onSubmit(value)}
      />
    </AutoLayout>
  );
}
