import { createGlobalStyle } from "styled-components";

export const colors = {
  primary: "#ccffbd",
  secondary: "#7eca9c",
  background: "#40394a",
  body: "#1c1427",
  text: "#f8f5f1",
  border: "#efefef40",
};

export const GlobalStyle = createGlobalStyle`
#root {
  width: 100%;
  height: 100%;
}

.none {
  display: none;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira Code', monospace;
}
body {
  background-color: ${colors.body};
  width: 100vw;
  min-height: 100vh;
}

::-webkit-scrollbar {
  display: none;
}
`;
