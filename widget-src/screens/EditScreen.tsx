const { widget } = figma;
const { AutoLayout } = widget;

import { Strings } from "../content/strings";
import { Header } from "../components/Header";
import { TextButton } from "../components/Button";
import { Surface } from "../components/Surface";
import { TaskInput } from "../components/TaskInput";
import { TaskList } from "../components/TaskList";
import { Space } from "../theme";
import { WidgetState } from "../state";

/**
 * Edit mode. Rows swap their checkbox for a pencil and their add-subtask
 * button for a delete, so the same list renders both screens.
 *
 * The add-task field is present but inert here, keeping the layout identical
 * to the list screen — the design greys it out rather than removing it.
 */
export function EditScreen({ theme, tasks, editingId, draftParentId, actions }: WidgetState) {
  return (
    <Surface theme={theme}>
      <Header
        theme={theme}
        title={Strings.edit.title}
        trailing={
          <TextButton
            theme={theme}
            label={Strings.done}
            onClick={() => actions.goTo("list")}
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
          value=""
          placeholder=""
          disabled
          onSubmit={() => undefined}
        />
        <AutoLayout
          name="Content"
          direction="vertical"
          width="fill-parent"
          spacing={Space[200]}
        >
          <TaskList
            theme={theme}
            tasks={tasks}
            editable
            editingId={editingId}
            draftParentId={draftParentId}
            actions={actions}
          />
        </AutoLayout>
      </AutoLayout>
    </Surface>
  );
}
