import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Wrapper>
          <Header />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </Switch>
        </Wrapper>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`;
