const { widget } = figma;
const { AutoLayout, Input } = widget;

import { IconSize, Radius, Space, Theme, Type } from "../theme";
import { IconButton } from "./Button";
import { Checkbox, CheckboxVariant } from "./Checkbox";
import { Icon } from "./Icon";
import { Label } from "./Text";

/**
 * Width of the reorder column: a 12px glyph in a 2px-padded xs icon button.
 * Set explicitly because an AutoLayout with no children falls back to Figma's
 * 100x100 default frame — which is what made this column 100px wide when a row
 * had nothing to render there.
 */
const REORDER_COLUMN = IconSize.xs + Space[50] * 2;

export type TaskRowProps = {
  theme: Theme;
  content: string;
  done: boolean;
  /** Subtasks are indented and carry the elbow connector. */
  isSubtask?: boolean;
  /** Edit mode swaps the checkbox for a pencil and the action for a delete. */
  editable?: boolean;
  /** Renders the content as a text field instead of a label. */
  editing?: boolean;

  onToggle: () => void;
  onStartEditing: () => void;
  onRename: (content: string) => void;
  /** Add a subtask. Omitted on subtask rows — nesting is one level deep. */
  onAddSubtask?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
};

/**
 * One row of the list. Every variant — task or subtask, open or done, editing
 * or not — is this component; the design models them as one component with
 * three booleans, and so does this.
 *
 * Hover feedback is limited by the API. `hoverStyle` applies only to the node
 * actually under the pointer — it does not cascade — so the design's intent of
 * revealing the reorder arrows when the ROW is hovered cannot be expressed.
 * Each arrow reveals on its own hover instead, and keeps its slot in the layout
 * so the row does not jump. This is the closest the widget API allows.
 */
export function TaskRow(props: TaskRowProps) {
  const { theme, done, isSubtask, editable, editing } = props;
  const checkbox: CheckboxVariant = editable ? "editable" : done ? "done" : "open";

  return (
    <AutoLayout
      name={isSubtask ? "Subtask" : "Task"}
      width="fill-parent"
      spacing={Space[100]}
      verticalAlignItems="start"
      padding={{ vertical: Space[200], horizontal: Space[0] }}
    >
      {/* Reorder column. Subtasks reorder within their group, exactly as
          top-level tasks do — the design gives every variant these controls. */}
      <AutoLayout
        name="Left Actions"
        direction="vertical"
        width={REORDER_COLUMN}
        padding={{ top: Space[50] }}
      >
        <IconButton
          theme={theme}
          name="chevron.up"
          size="xs"
          tooltip="Move up"
          revealOnHover
          disabled={!props.onMoveUp}
          onClick={props.onMoveUp}
        />
        <IconButton
          theme={theme}
          name="chevron.down"
          size="xs"
          tooltip="Move down"
          revealOnHover
          disabled={!props.onMoveDown}
          onClick={props.onMoveDown}
        />
      </AutoLayout>

      <AutoLayout
        name="Content"
        width="fill-parent"
        minHeight={28}
        spacing={Space[200]}
        verticalAlignItems="start"
        padding={{ vertical: Space[50] }}
      >
        <AutoLayout
          name="Check"
          spacing={isSubtask ? Space[100] : Space[50]}
          minHeight={IconSize.m}
          verticalAlignItems="center"
        >
          {isSubtask && (
            <Icon name="subtask" size={IconSize.m} fill={theme.border.default} />
          )}
          <Checkbox
            theme={theme}
            variant={checkbox}
            tooltip={editable ? "Rename" : done ? "Mark as open" : "Mark as done"}
            onClick={editable ? props.onStartEditing : props.onToggle}
          />
        </AutoLayout>

        {/* `TaskContent`: a 24px-tall centred box, so a one-line task sits on
            the checkbox's centreline instead of its top edge. */}
        <AutoLayout
          name="TaskContent"
          width="fill-parent"
          minHeight={IconSize.m}
          verticalAlignItems="center"
        >
          {editing ? (
            <Input
              name="Title"
              value={props.content}
              placeholder="Task"
              width="fill-parent"
              inputBehavior="wrap"
              fontFamily={Type.body.fontFamily}
              fontSize={Type.body.fontSize}
              fontWeight={Type.body.fontWeight}
              lineHeight={Type.body.lineHeight}
              letterSpacing={Type.body.letterSpacing}
              fill={theme.text.primary}
              inputFrameProps={{
                fill: theme.surface.base,
                stroke: theme.accent.base,
                cornerRadius: Radius.xs,
                padding: { vertical: Space[50], horizontal: Space[100] },
              }}
              onTextEditEnd={(event) => props.onRename(event.characters)}
            />
          ) : (
            <Label
              name="Title"
              width="fill-parent"
              style={Type.body}
              strikethrough={done}
              fill={done ? theme.text.disabled : theme.text.primary}
              onClick={editable ? props.onStartEditing : props.onToggle}
            >
              {props.content}
            </Label>
          )}
        </AutoLayout>
      </AutoLayout>

      <RowAction {...props} />
    </AutoLayout>
  );
}

/**
 * The trailing affordance: delete in Edit mode, add-subtask otherwise.
 * A completed task offers neither and the slot collapses, as in the design.
 */
function RowAction({ theme, editable, done, isSubtask, onDelete, onAddSubtask }: TaskRowProps) {
  if (editable && onDelete) {
    return (
      <IconButton
        theme={theme}
        name="trash"
        size="s"
        tooltip="Delete"
        fill={theme.danger.base}
        hoverFill={theme.danger.tint}
        onClick={onDelete}
      />
    );
  }

  if (!editable && !done && !isSubtask && onAddSubtask) {
    return (
      <IconButton
        theme={theme}
        name="plus"
        size="s"
        tooltip="Add subtask"
        fill={theme.text.disabled}
        onClick={onAddSubtask}
      />
    );
  }

  return null;
}
