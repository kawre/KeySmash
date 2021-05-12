import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KeySmashGame from "./components/KeySmash/KeySmashGame";
import LoginForm from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          {/* <KeySmashGame /> */}
          {/* <RegisterForm /> */}
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </Switch>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
