const { widget } = figma;
const { Text } = widget;

import { TextStyle } from "../theme";

type Props = {
  style: TextStyle;
  fill: string;
  children: string;
  name?: string;
  width?: WidgetJSX.AutolayoutSize;
  strikethrough?: boolean;
  horizontalAlignText?: "left" | "center" | "right";
  onClick?: (event: WidgetClickEvent) => void | Promise<unknown>;
};

/**
 * Text with a Figma text style applied. Wrapping `Text` keeps the five style
 * fields from being repeated at every call site — and keeps them in one place
 * if the library changes.
 */
export function Label({
  style,
  fill,
  children,
  name,
  width,
  strikethrough,
  horizontalAlignText,
  onClick,
}: Props) {
  return (
    <Text
      name={name}
      fill={fill}
      width={width}
      fontFamily={style.fontFamily}
      fontSize={style.fontSize}
      fontWeight={style.fontWeight}
      lineHeight={style.lineHeight}
      letterSpacing={style.letterSpacing}
      horizontalAlignText={horizontalAlignText}
      textDecoration={strikethrough ? "strikethrough" : "none"}
      onClick={onClick}
    >
      {children}
    </Text>
  );
}
