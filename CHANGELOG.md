# Changelog

## 4.0

A rebuild. The widget was rewritten from scratch against a new design system,
and the whole interface was redrawn.

### Added

- **Subtasks.** Break a task into steps. Checking a task checks its subtasks;
  checking the last subtask completes the task it belongs to. Nesting is one
  level deep, on purpose — a to-do list on a 400px card stops being readable
  past that.
- **Rename a task in place.** Click a task in Edit mode to change its wording.
  Previously the Edit screen could only delete.
- **Reorder subtasks** within their group, the same way tasks reorder.
- **Hover feedback** on every control — checkboxes, buttons, menu items, the
  new-task field.
- **Power Mode understands subtasks.** Indent a line to make it a subtask:

  ```
  [ ] Ship the widget
    [x] Write the docs
    [ ] Record a demo
  ```

### Changed

- Redrawn against the v4 design system: new type scale, spacing, colours,
  icons and elevations.
- New accent palette — blue, tangerine, amber, green, purple, pink, red and
  slate — plus any hex colour you type.
- Adding a task is now two steps: type, then press the **+** button. The text
  stays in the field until you add it, so it survives the widget re-drawing
  and a task no longer appears just because you clicked away from the field.
- The About panel's button reads **Close** rather than Done.

### Fixed

- **The property menu disappeared** in Edit, Settings and Power Mode. Power
  Mode and Compact Mode were unreachable from those screens.
- **Tasks created in the same millisecond could share an id**, so checking one
  could check the other. Ids now come from a counter that persists with the
  widget.
- **The theme could drift out of sync** with the appearance settings, leaving
  parts of the widget in the wrong colours.
- Two screens could open at once — Edit and Settings, for example.
- The reorder column occupied 100px on rows that could not move.

### Known limitations

Two states in the design system cannot be built with the widget API, which
exposes no focus event and does not cascade hover to child nodes:

- The new-task field has no focus state.
- The reorder arrows reveal on their own hover rather than on the row's.

## 3.0

Power Mode, Compact Mode, custom accent colours, task reordering and
hide-completed. See the git history for detail.

## 2.0

Editable tasks, the settings screen and the colour selector.

## 1.0

First release.
