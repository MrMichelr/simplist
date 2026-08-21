const { widget } = figma;
const { AutoLayout, SVG } = widget;

import { dinoChill } from "../assets/illustrations";
import { Strings } from "../content/strings";
import { Tasks } from "../core";
import { Header } from "../components/Header";
import { IconButton } from "../components/Button";
import { Label } from "../components/Text";
import { Surface } from "../components/Surface";
import { TaskInput } from "../components/TaskInput";
import { TaskList } from "../components/TaskList";
import { Space, Theme, Type } from "../theme";
import { WidgetState } from "../state";

/** The default screen: add a task, then work through the list. */
export function ListScreen({ theme, tasks, hideDone, draft, editingId, draftParentId, actions }: WidgetState) {
  const shown = Tasks.visible(tasks, hideDone);

  return (
    <Surface theme={theme}>
      <Header
        theme={theme}
        title={Strings.title}
        trailing={
          <IconButton
            theme={theme}
            name="ellipsis"
            tooltip="Menu"
            onClick={() => actions.toggleOverlay("menu")}
          />
        }
      />
      <AutoLayout
        name="Container"
        direction="vertical"
        width="fill-parent"
        spacing={Space[600]}
      >
        <TaskInput
          theme={theme}
          value={draft}
          placeholder={Strings.input.placeholder}
          onSubmit={actions.addTask}
        />
        {shown.length === 0 ? (
          <EmptyState theme={theme} filtered={tasks.length > 0} />
        ) : (
          <AutoLayout
            name="Content"
            direction="vertical"
            width="fill-parent"
            spacing={Space[200]}
          >
            <TaskList
              theme={theme}
              tasks={shown}
              editable={false}
              editingId={editingId}
              draftParentId={draftParentId}
              actions={actions}
            />
          </AutoLayout>
        )}
      </AutoLayout>
    </Surface>
  );
}

/**
 * Shown when there is nothing to work through — either the list is genuinely
 * empty, or "hide completed" has filtered everything away.
 */
function EmptyState({ theme, filtered }: { theme: Theme; filtered: boolean }) {
  const copy = filtered ? Strings.empty.allDone : Strings.empty.nothing;

  return (
    <AutoLayout
      name="Empty"
      width="fill-parent"
      spacing={Space[200]}
      verticalAlignItems="center"
    >
      <SVG
        name="Illustration"
        width={150}
        height={150}
        src={dinoChill({
          ink: theme.icon,
          mid: theme.surface.tertiary,
          pale: theme.surface.secondary,
        })}
      />
      <AutoLayout
        name="Text"
        direction="vertical"
        width="fill-parent"
        spacing={Space[100]}
      >
        <Label style={Type.headline} fill={theme.text.primary} width="fill-parent">
          {copy.title}
        </Label>
        <Label style={Type.subheadline} fill={theme.text.secondary} width="fill-parent">
          {copy.body}
        </Label>
      </AutoLayout>
    </AutoLayout>
  );
}
