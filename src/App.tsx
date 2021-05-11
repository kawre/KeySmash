import React from "react";
import KeySmashGame from "./components/KeySmash/KeySmashGame";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <KeySmashGame />
        <RegisterForm />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
