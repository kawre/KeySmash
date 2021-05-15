import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import KeySmashGame from "./components/KeySmash/KeySmashGame";
import LoginForm from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

const App = () => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <AuthProvider>
      <DataProvider>
        <Wrapper>
          <Header />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            {show && (
              <Route
                path="/"
                component={() => <KeySmashGame show={show} setShow={setShow} />}
              />
            )}
          </Switch>
        </Wrapper>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
  height: 100%;
`;
