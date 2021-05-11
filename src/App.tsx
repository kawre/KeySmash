import React from "react";
import KeySmashGame from "./components/KeySmash/KeySmashGame";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <KeySmashGame />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
