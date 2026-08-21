/** All user-facing copy. One place to review wording or add a translation. */
export const Strings = {
  title: "Todo",
  done: "Done",

  empty: {
    nothing: {
      title: "Nothing, what a victory!",
      body: "Start by typing something to add a new task.",
    },
    allDone: {
      title: "All caught up.",
      body: "Completed tasks are hidden. Show them again from the menu.",
    },
  },

  input: {
    placeholder: "Add a new task",
    subtask: "New subtask",
  },

  edit: {
    title: "Edit",
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
    accent: "Accent color",
    accentPlaceholder: "#0038FF",
  },

  power: {
    tag: "Power",
    placeholder: "[ ] A task\n  [x] A completed subtask",
    save: "Save",
    cancel: "Cancel",
  },

  propertyMenu: {
    power: "Power Mode",
    expand: "Expand",
    collapse: "Collapse",
  },
} as const;
