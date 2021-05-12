import { createGlobalStyle } from "styled-components";

export const colors = {
  primary: "black",
  body: "#1f1f1f",
};

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;
