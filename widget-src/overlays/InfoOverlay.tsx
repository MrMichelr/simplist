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

/** 16px padding, 24px between the three blocks. */
export function InfoOverlay({ theme, actions }: WidgetState) {
  return (
    <Popover
      theme={theme}
      name="Infos"
      x={{ type: "left", offset: -274 }}
      y={0}
      padding={Space[400]}
      spacing={Space[600]}
    >
      <AutoLayout
        name="Heading"
        width="fill-parent"
        spacing={Space[100]}
        horizontalAlignItems="end"
        verticalAlignItems="center"
      >
        <IconButton
          theme={theme}
          name="globe"
          size="s"
          onClick={() => waitForTask(openUrl(App.url.website))}
        />
        <IconButton
          theme={theme}
          name="logo.github"
          size="s"
          onClick={() => waitForTask(openUrl(App.url.github))}
        />
      </AutoLayout>

      <AutoLayout
        name="Content"
        direction="vertical"
        width="fill-parent"
        spacing={Space[200]}
        horizontalAlignItems="center"
      >
        <AutoLayout
          name="Logo"
          padding={Space[200]}
          cornerRadius={Radius.m}
          fill={theme.accent.base}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <Icon name="logo" size={IconSize.xl} fill={theme.text.onAccent} />
        </AutoLayout>
        <AutoLayout
          name="Text"
          direction="vertical"
          spacing={Space[0]}
          horizontalAlignItems="center"
        >
          <Label style={Type.headline} fill={theme.text.primary}>
            {App.wordmark}
          </Label>
          <Label style={Type.subheadline} fill={theme.text.tertiary}>
            {`version ${App.version}`}
          </Label>
        </AutoLayout>
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
          label={Strings.close}
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
