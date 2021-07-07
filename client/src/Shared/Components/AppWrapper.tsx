import { ApolloProvider } from "@apollo/client";
import React from "react";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "../../Contexts/AuthContext";
import { DataProvider, useData } from "../../Contexts/DataContext";
import StatsProvider from "../../Contexts/StatsContext";
import TypingContext from "../../Contexts/TypingGameContext";
import GlobalStyle from "../Global/GlobalStyle";
import { client } from "../utils/client";
import { defaultTheme } from "../utils/theme";
import ThemeWrapper from "./ThemeWrapper";

// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <DataProvider>
          <TypingContext>
            <StatsProvider>
              <ThemeWrapper>{children}</ThemeWrapper>
            </StatsProvider>
          </TypingContext>
        </DataProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

export default AppWrapper;
