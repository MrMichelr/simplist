/** All user-facing copy. Single place to review wording or add a translation. */
export const Strings = {
  title: "Todo",

  empty: {
    title: "Nothing left. What a victory.",
    body: "Type something above to add your first task.",
  },

  input: {
    placeholder: "Add a new task",
    error: "Enter some text to add a task.",
  },

  menu: {
    edit: "Edit",
    hideDone: "Hide completed",
    showDone: "Show completed",
    info: "About",
    settings: "Settings",
    clear: "Clear all",
  },

  settings: {
    title: "Settings",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    accent: "Accent colour",
    accentPlaceholder: "Enter a hex colour",
    accentInvalid: "Not a valid hex colour.",
  },

  power: {
    title: "Power Mode",
    placeholder: "[ ] A task\n[x] A completed task",
    save: "Save",
    cancel: "Cancel",
  },

  propertyMenu: {
    power: "Power Mode",
    expand: "Expand",
    collapse: "Collapse",
  },

  done: "Done",
} as const;
