import { ApolloProvider } from "@apollo/client";
import React from "react";
import { AuthProvider } from "../../Contexts/AuthContext";
import { DataProvider } from "../../Contexts/DataContext";
import StatsProvider from "../../Contexts/StatsContext";
import TypingContext from "../../Contexts/TypingGameContext";
import GlobalStyle from "../Global/GlobalStyle";
import { client } from "../utils/client";

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
              <GlobalStyle />
              {children}
            </StatsProvider>
          </TypingContext>
        </DataProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

export default AppWrapper;
