import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContext";
import { DataProvider } from "./Contexts/DataContext";
import GlobalStyle from "./Shared/Global/GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <GlobalStyle />
        <App />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
