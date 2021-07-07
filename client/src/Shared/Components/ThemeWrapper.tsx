import React from "react";
import { ThemeProvider } from "styled-components";
import { useData } from "../../Contexts/DataContext";
import GlobalStyle from "../Global/GlobalStyle";
import { defaultTheme } from "../utils/theme";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const ThemeWrapper: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={useData().theme || defaultTheme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default ThemeWrapper;
