import { Strings } from "../content/strings";
import { Tasks } from "../core";
import { Header } from "../components/Header";
import { IconButton } from "../components/Button";
import { Surface } from "../components/Surface";
import { WidgetState } from "../state";

/** The collapsed widget: just the title, the open count, and the menu. */
export function CompactScreen({ theme, tasks, actions }: WidgetState) {
  const remaining = Tasks.countRemaining(tasks);

  return (
    <Surface theme={theme}>
      <Header
        theme={theme}
        title={`${Strings.title} (${remaining})`}
        divider={false}
        trailing={
          <IconButton
            theme={theme}
            name="ellipsis"
            onClick={() => actions.toggleOverlay("menu")}
          />
        }
      />
    </Surface>
  );
}
