import { createGlobalStyle } from "styled-components";
import { colors } from "./Colors";
import onLoadBackground from "../Images/onload-background.jpg";
import { font } from "./Font";

export const GlobalStyle = createGlobalStyle`
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: ${font};
   font-variant-ligatures: none;
}

body {
   transition: background 100ms ease;
   background: ${colors.background};
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
   opacity: 0;
}
`;
