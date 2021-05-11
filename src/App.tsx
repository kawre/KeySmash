import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <h1>siema</h1>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
