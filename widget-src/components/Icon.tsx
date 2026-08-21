const { widget } = figma;
const { SVG } = widget;

import { icon, IconName } from "../assets/icons";
import { IconSize } from "../theme";

type Props = {
  name: IconName;
  fill: string;
  /** Rendered size in px. Glyphs are authored at 24 and scale from there. */
  size?: number;
  opacity?: number;
  hoverStyle?: WidgetJSX.HoverStyle;
  onClick?: (event: WidgetClickEvent) => void | Promise<unknown>;
};

export function Icon({ name, fill, size = IconSize.m, ...rest }: Props) {
  return <SVG name={name} src={icon(name, fill)} width={size} height={size} {...rest} />;
}
