type Colors = {
  background: string;
  main: string;
  caret: string;
  sub: string;
  text: string;
  error: string;
  errorExtra: string;
};

export const themes = {
  superuser: {
    background: "#262a33",
    main: "#43ffaf",
    caret: "#43ffaf",
    sub: "#526777",
    text: "#e5f7ef",
    error: "#ff5f5f",
    errorExtra: "#d22a2a",
  },
  mashu: {
    background: "#2b2b2c",
    main: "#76689a",
    caret: "#76689a",
    sub: "#d8a0a6",
    text: "#f1e2e4",
    error: "#d44729",
    errorExtra: "#8f2f19",
  },
  bento: {
    background: "#2d394d",
    main: "#ff7a90",
    caret: "#ff7a90",
    sub: "#4a768d",
    text: "#fffaf8",
    error: "#ee2a3a",
    errorExtra: "#f04040",
  },
};

export let theme: Colors;
