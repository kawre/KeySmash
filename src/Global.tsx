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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira Code', monospace;
}
`;
