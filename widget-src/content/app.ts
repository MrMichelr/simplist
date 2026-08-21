/** Static widget metadata. Keep `version` in step with package.json. */
export const App = {
  name: "SimpList",
  version: "4.0.0",
  author: "Michel Rodriguez",
  /**
   * Fixed rather than derived from `new Date()`: a widget must render the same
   * output for the same state, and the year is not part of the state.
   */
  copyrightYear: 2026,
  url: {
    github: "https://github.com/MrMichelr/",
    website: "https://www.mr-michel.com",
  },
} as const;
