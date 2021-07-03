import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Provider } from "urql";
import { AuthProvider } from "../../Contexts/AuthContext";
import { DataProvider } from "../../Contexts/DataContext";
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
          <GlobalStyle />
          {children}
        </DataProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

export default AppWrapper;
