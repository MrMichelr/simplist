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
  content/        User-facing strings and app metadata.
  assets/         Icons and illustrations.
```

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

[state]: https://developers.figma.com/docs/widgets/widget-state/
