# SimpList

A simple to-do list widget for Figma and FigJam.

## Getting started

```bash
npm install
npm run dev     # rebuild on save, with sourcemaps
npm run build   # minified production bundle
npm run check   # typecheck + lint
```

Then in Figma: **Plugins → Development → Import plugin from manifest…** and pick
`manifest.json`.

## Architecture

```
widget-src/
  code.tsx        Entry point. Calls every hook, then routes to a screen.
  state/          All synced state and the actions that mutate it.
  core/           Task model and pure list operations. No Figma API.
  theme/          Design tokens and the theme builder. Pure functions.
  components/     Design-system pieces shared across screens.
  screens/        One file per screen; each takes the whole WidgetState.
  overlays/       Floating panels: menu, about, accent picker.
  content/        User-facing strings and app metadata.
  assets/         Icons and illustrations, as colour-swappable SVG strings.
```

## Design source

The UI comes from the [SimpList v4 Figma file][figma]. Tokens in `theme/tokens.ts`
mirror the Figma variables by name (`size-space-300` -> `Space[300]`), so a value
can be traced back to the design file.

Icons and illustrations are exported vectors, inlined as template strings with a
colour placeholder. They cannot be loaded from a URL: the manifest declares no
network access, and inlining is what lets a single glyph follow the theme.

[figma]: https://www.figma.com/design/cyNWRwGlsQCmnbQ9KxNi2s/Simplist

Three rules keep this codebase out of trouble:

1. **Hooks are called unconditionally**, all inside `useWidgetState`, before any
   branching. A hook placed after an early return silently stops running —
   which is how the property menu disappeared in v3.
2. **Synced state holds plain JSON only.** No class instances: they lose their
   prototype when the widget reloads. Behaviour lives in pure functions in
   `core/` and `theme/` instead.
3. **Derived values are computed, never stored.** The theme is rebuilt from
   `scheme` + `accent` on every render, so it cannot drift out of sync.

State must also never be updated while rendering — only from event handlers or
`useEffect`. See [Figma's widget state docs][state].

Hover feedback is limited by the API: `hoverStyle` accepts `fill`, `stroke` and
`opacity` and nothing else. Controls that appear on hover — the reorder arrows —
therefore sit in the layout permanently at `opacity: 0`, which is also what keeps
rows from shifting as the pointer moves.

[state]: https://developers.figma.com/docs/widgets/widget-state/
