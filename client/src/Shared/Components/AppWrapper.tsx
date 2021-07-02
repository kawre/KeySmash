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
    <Provider value={client}>
      <AuthProvider>
        <DataProvider>
          <GlobalStyle />
          {children}
        </DataProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

export default AppWrapper;
