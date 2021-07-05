import { createGlobalStyle } from "styled-components";
import { font } from "./Font";

const GlobalStyle = createGlobalStyle`
/* font-family: 'Comfortaa', cursive;
font-family: 'Fira Code', monospace;
font-family: 'IBM Plex Sans', sans-serif;
font-family: 'Inconsolata', monospace;
font-family: 'Itim', cursive;
font-family: 'Lexend Deca', sans-serif;
font-family: 'Montserrat', sans-serif;
font-family: 'Nunito', sans-serif;
font-family: 'Oxygen', sans-serif;
font-family: 'Roboto', sans-serif;
font-family: 'Roboto Mono', monospace;
font-family: 'Source Sans Pro', sans-serif;
font-family: 'Titillium Web', sans-serif; */

* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: ${font};
   font-variant-ligatures: none;
}

::-webkit-scrollbar {
   display: none;
}

a {
   text-decoration: none;
}

button {
   outline: none;
   border: none;
   background: none;
   user-select: none;
   font-size: 14px;
   font-weight: 600;
   cursor: pointer;
   transition: .25s;
}

.hidden {
   display: none !important;
   opacity: 0;
}
/* aria */

[aria-label] {
  position: relative;
}

[aria-label]:after {
  content: attr(aria-label);
  position: absolute;
  bottom: 100%;
  left: 50%;
  opacity: 0;
  /* margin-bottom: 10px; */
  transform: translate(-50%, -50%);
  z-index: 5000;
  pointer-events: none;
  padding: 8px 16px;
  white-space: nowrap;
  text-decoration: none;
  text-indent: 0;
  overflow: visible;
  font-size: 16px;
  font-weight: 500;
  color: #e4e4e4;
  background-color: #000000;
  border-radius: 4px;
  transition: all 180ms ease-out 0s;
}

[aria-label]:hover:after, [aria-label]:focus:after {
  opacity: 1;
}
`;

export default GlobalStyle;
