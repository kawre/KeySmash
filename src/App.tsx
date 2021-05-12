import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KeySmashGame from "./components/KeySmash/KeySmashGame";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <KeySmashGame />
          <RegisterForm />
          <Switch>
            <Route path="/login" />
            <Route path="/register" />
          </Switch>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
