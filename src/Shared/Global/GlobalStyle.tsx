import { createGlobalStyle } from "styled-components";
import { colors } from "./Colors";

export const GlobalStyle = createGlobalStyle`
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: 'Fira Code', monospace;
   font-variant-ligatures: none;
}

body {
   background-color: ${colors.body};
}

a {
   text-decoration: none;
}

button {
   outline: none;
   border: none;
   background: none;
   font-size: 14px;
   font-weight: 600;
   cursor: pointer;
   transition: .25s;
}

.hidden {
   display: none !important;
}
`;
