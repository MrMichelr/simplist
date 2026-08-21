const { widget } = figma;
const { AutoLayout } = widget;

import { IconSize, Radius, Theme } from "../theme";
import { Icon } from "./Icon";

export type CheckboxVariant = "open" | "done" | "editable";

type Props = {
  theme: Theme;
  variant: CheckboxVariant;
  onClick: (event: WidgetClickEvent) => void | Promise<unknown>;
};

/**
 * The 24px box at the head of a task row.
 *
 * Hover fills the box and never moves the border — the design keeps each
 * variant's border colour constant across states, so the checkbox does not
 * appear to change meaning as the pointer passes over it.
 *
 * `editable` is the Edit screen's affordance: the same footprint holding a
 * pencil, so rows do not shift when the screen changes.
 */
export function Checkbox({ theme, variant, onClick }: Props) {
  const style = {
    open: {
      fill: undefined as string | undefined,
      stroke: theme.accent.base,
      glyph: null,
      hoverFill: theme.accent.tint,
    },
    done: {
      fill: undefined as string | undefined,
      stroke: theme.border.disabled,
      glyph: { name: "checkmark" as const, fill: theme.text.disabled },
      hoverFill: theme.surface.hover,
    },
    editable: {
      fill: theme.surface.secondary,
      stroke: theme.border.default,
      glyph: { name: "pencil" as const, fill: theme.text.disabled },
      hoverFill: theme.surface.secondaryHover,
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
      hoverStyle={{ fill: style.hoverFill }}
      onClick={onClick}
    >
      {style.glyph && (
        <Icon name={style.glyph.name} size={IconSize.s} fill={style.glyph.fill} />
      )}
    </AutoLayout>
  );
}
