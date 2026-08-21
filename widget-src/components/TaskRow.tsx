const { widget } = figma;
const { AutoLayout, Input } = widget;

import { IconSize, Radius, Space, Theme, Type } from "../theme";
import { Checkbox, CheckboxVariant } from "./Checkbox";
import { Icon } from "./Icon";
import { Label } from "./Text";

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
 * One row of the list.
 *
 * Hover feedback is limited to what the widget API exposes: `hoverStyle`
 * accepts fill, stroke and opacity only. The reorder arrows therefore sit in
 * the layout at all times with `opacity: 0` and fade in — they cannot be
 * mounted on hover, and reserving their space is what stops the row from
 * jumping.
 */
export function TaskRow(props: TaskRowProps) {
  const { theme, done, isSubtask, editable, editing } = props;

  const checkbox: CheckboxVariant = editable ? "editable" : done ? "done" : "open";
  const canReorder = !isSubtask && (props.onMoveUp || props.onMoveDown);

  return (
    <AutoLayout
      name={isSubtask ? "Subtask" : "Task"}
      width="fill-parent"
      spacing={Space[100]}
      verticalAlignItems="start"
      padding={{ vertical: Space[200], horizontal: Space[0] }}
    >
      <AutoLayout
        name="Left Actions"
        direction="vertical"
        padding={{ top: Space[50] }}
        height="fill-parent"
      >
        {canReorder && (
          <>
            <Icon
              name="chevron.up"
              size={IconSize.xs}
              fill={theme.icon}
              opacity={0}
              hoverStyle={{ opacity: 1 }}
              onClick={props.onMoveUp}
              tooltip="Move up"
            />
            <Icon
              name="chevron.down"
              size={IconSize.xs}
              fill={theme.icon}
              opacity={0}
              hoverStyle={{ opacity: 1 }}
              onClick={props.onMoveDown}
              tooltip="Move down"
            />
          </>
        )}
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
                fill: theme.surface.secondary,
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
  const action = editable
    ? { name: "trash" as const, fill: theme.danger.base, hover: theme.danger.tint, onClick: onDelete, tooltip: "Delete" }
    : !done && !isSubtask
      ? { name: "plus" as const, fill: theme.text.disabled, hover: theme.surface.secondary, onClick: onAddSubtask, tooltip: "Add subtask" }
      : null;

  if (!action || !action.onClick) return null;

  return (
    <AutoLayout
      name="Action"
      padding={Space[150]}
      cornerRadius={Radius.xs}
      horizontalAlignItems="center"
      verticalAlignItems="center"
      hoverStyle={{ fill: action.hover }}
      onClick={action.onClick}
      tooltip={action.tooltip}
    >
      <Icon name={action.name} size={IconSize.s} fill={action.fill} />
    </AutoLayout>
  );
}
