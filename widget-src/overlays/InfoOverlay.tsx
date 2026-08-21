const { widget } = figma;
const { AutoLayout, waitForTask } = widget;

import { App } from "../content/app";
import { Strings } from "../content/strings";
import { IconButton, TextButton } from "../components/Button";
import { Icon } from "../components/Icon";
import { Label } from "../components/Text";
import { Popover } from "../components/Popover";
import { IconSize, Radius, Space, Type } from "../theme";
import { WidgetState } from "../state";

export function InfoOverlay({ theme, actions }: WidgetState) {
  return (
    <Popover
      theme={theme}
      name="Info"
      x={{ type: "left", offset: -274 }}
      y={0}
      padding={Space[400]}
      spacing={Space[600]}
    >
      <AutoLayout
        name="Links"
        width="fill-parent"
        spacing={Space[100]}
        horizontalAlignItems="end"
      >
        <IconButton
          theme={theme}
          name="globe"
          size={IconSize.s}
          tooltip={App.url.website}
          onClick={() => waitForTask(openUrl(App.url.website))}
        />
        <IconButton
          theme={theme}
          name="logo.github"
          size={IconSize.s}
          tooltip={App.url.github}
          onClick={() => waitForTask(openUrl(App.url.github))}
        />
      </AutoLayout>

      <AutoLayout
        name="Identity"
        direction="vertical"
        width="fill-parent"
        spacing={Space[200]}
        horizontalAlignItems="center"
      >
        <AutoLayout
          name="Logo"
          width={64}
          height={64}
          cornerRadius={Radius.m}
          fill={theme.accent.base}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <Icon name="logo" size={48} fill={theme.text.onAccent} />
        </AutoLayout>
        <Label style={Type.body} fill={theme.text.primary}>
          {App.name}
        </Label>
        <Label style={Type.footnote} fill={theme.text.tertiary}>
          {`Version ${App.version}`}
        </Label>
      </AutoLayout>

      <AutoLayout
        name="Footer"
        direction="vertical"
        width="fill-parent"
        spacing={Space[200]}
        horizontalAlignItems="center"
      >
        <Label style={Type.caption} fill={theme.text.tertiary}>
          {`Copyright © ${App.copyrightYear} ${App.author}`}
        </Label>
        <TextButton
          theme={theme}
          variant="primary"
          width="fill-parent"
          label={Strings.done}
          onClick={actions.closeOverlay}
        />
      </AutoLayout>
    </Popover>
  );
}

/**
 * Opens a link in the browser.
 *
 * A widget cannot navigate on its own, so this hands the URL to a hidden
 * iframe. `closePlugin` tears that iframe down again — the widget itself stays
 * on the canvas.
 */
function openUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    figma.showUI(__html__, { visible: false });
    figma.ui.postMessage({ type: "open-url", url });
    figma.ui.onmessage = () => {
      figma.closePlugin();
      resolve();
    };
  });
}
