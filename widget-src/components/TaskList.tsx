const { widget } = figma;
const { AutoLayout, Input, Line } = widget;

import { Task } from "../core";
import { Radius, Space, Theme, Type } from "../theme";
import { Actions } from "../state";
import { TaskRow } from "./TaskRow";

type Props = {
  theme: Theme;
  tasks: Task[];
  editable: boolean;
  editingId: string | null;
  draftParentId: string | null;
  actions: Actions;
};

/**
 * The task list.
 *
 * Each top-level task and its subtasks form one `Sublist`, matching the design:
 * the rule sits under the group, not under every row.
 */
export function TaskList({
  theme,
  tasks,
  editable,
  editingId,
  draftParentId,
  actions,
}: Props) {
  return (
    <AutoLayout
      name="List"
      direction="vertical"
      width="fill-parent"
      spacing={Space[100]}
    >
      {tasks.map((task, index) => (
        <AutoLayout
          key={task.id}
          name="Sublist"
          direction="vertical"
          width="fill-parent"
          padding={{ bottom: Space[100] }}
        >
          <TaskRow
            theme={theme}
            content={task.content}
            done={task.done}
            editable={editable}
            editing={editingId === task.id}
            onToggle={() => actions.toggleTask(task.id)}
            onStartEditing={() => actions.startEditing(task.id)}
            onRename={(content) => actions.renameTask(task.id, content)}
            onAddSubtask={() => actions.startSubtask(task.id)}
            onDelete={() => actions.removeTask(task.id)}
            onMoveUp={index > 0 ? () => actions.moveTask(index, "up") : undefined}
            onMoveDown={
              index < tasks.length - 1 ? () => actions.moveTask(index, "down") : undefined
            }
          />

          {task.subtasks.map((sub) => (
            <TaskRow
              key={sub.id}
              theme={theme}
              content={sub.content}
              done={sub.done}
              isSubtask
              editable={editable}
              editing={editingId === sub.id}
              onToggle={() => actions.toggleSubtask(task.id, sub.id)}
              onStartEditing={() => actions.startEditing(sub.id)}
              onRename={(content) => actions.renameSubtask(task.id, sub.id, content)}
              onDelete={() => actions.removeSubtask(task.id, sub.id)}
            />
          ))}

          {draftParentId === task.id && (
            <SubtaskDraft
              theme={theme}
              onCommit={(content) => actions.commitSubtask(task.id, content)}
            />
          )}

          {/* The design rules off each group, not each row. AutoLayout strokes
              all four sides, so the divider is drawn as its own line. */}
          <Line name="Divider" stroke={theme.border.default} length="fill-parent" />
        </AutoLayout>
      ))}
    </AutoLayout>
  );
}

/**
 * An empty subtask row, shown while one is being typed.
 *
 * Nothing is written to the task list until the text is committed, so cancelling
 * never leaves a blank subtask behind.
 */
function SubtaskDraft({
  theme,
  onCommit,
}: {
  theme: Theme;
  onCommit: (content: string) => void;
}) {
  return (
    <AutoLayout
      name="Subtask Draft"
      width="fill-parent"
      spacing={Space[200]}
      padding={{ vertical: Space[200], left: 40, right: Space[0] }}
      verticalAlignItems="center"
    >
      <Input
        name="Input"
        value=""
        placeholder="New subtask"
        width="fill-parent"
        inputBehavior="wrap"
        fontFamily={Type.family}
        fontSize={Type.body.fontSize}
        fontWeight={Type.body.fontWeight}
        lineHeight={Type.body.lineHeight}
        letterSpacing={Type.body.letterSpacing}
        fill={theme.text.primary}
        placeholderProps={{ fill: theme.text.tertiary, opacity: 1 }}
        inputFrameProps={{
          fill: theme.surface.secondary,
          stroke: theme.accent.base,
          cornerRadius: Radius.xs,
          padding: { vertical: Space[100], horizontal: Space[200] },
        }}
        onTextEditEnd={(event) => onCommit(event.characters)}
      />
    </AutoLayout>
  );
}
