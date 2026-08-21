const { widget } = figma;
const { AutoLayout } = widget;

import { IconSize, Radius, Theme } from "../theme";
import { Icon } from "./Icon";

export type CheckboxVariant = "open" | "done" | "editable";

type Props = {
  theme: Theme;
  variant: CheckboxVariant;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
  tooltip?: string;
};

/**
 * The 24px box at the head of a task row.
 *
 * `editable` is the Edit screen's affordance: the same footprint, holding a
 * pencil instead of a checkmark, so rows do not shift when the screen changes.
 */
export function Checkbox({ theme, variant, onClick, tooltip }: Props) {
  const style = {
    open: {
      fill: undefined as string | undefined,
      stroke: theme.accent.base,
      glyph: null,
      hover: { fill: theme.accent.tint, stroke: theme.accent.hover },
    },
    done: {
      fill: undefined as string | undefined,
      stroke: theme.border.disabled,
      glyph: { name: "checkmark" as const, fill: theme.text.disabled },
      hover: { stroke: theme.accent.base },
    },
    editable: {
      fill: theme.surface.secondary,
      stroke: theme.border.default,
      glyph: { name: "pencil" as const, fill: theme.text.disabled },
      hover: { fill: theme.accent.tint, stroke: theme.accent.base },
    },
  }[variant];

  return (
    <AutoLayout
      name="Checkbox"
      width={IconSize.m}
      height={IconSize.m}
      cornerRadius={Radius.xs}
      strokeWidth={2}
      fill={style.fill}
      stroke={style.stroke}
      horizontalAlignItems="center"
      verticalAlignItems="center"
      hoverStyle={style.hover}
      onClick={onClick}
      tooltip={tooltip}
    >
      {style.glyph && (
        <Icon name={style.glyph.name} size={IconSize.s} fill={style.glyph.fill} />
      )}
    </AutoLayout>
  );
}
