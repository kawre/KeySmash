import { useState } from "react";
import { Route, Switch } from "react-router";
import { AuthProvider } from "./Contexts/AuthContext";
import { colors } from "./Shared/Global/Colors";
import { DataProvider } from "./Contexts/DataContext";
import AddQuote from "./AddQuote/AddQuote";
import TypingGameContext from "./Contexts/TypingGameContext";
import styled from "styled-components";
import Header from "./Shared/Components/Header";
import LoginForm from "./Shared/Forms/LoginForm";
import RegisterForm from "./Shared/Forms/RegisterForm";
import TypingChart from "./TypingGame/TypingChart";

const App = () => (
  <AuthProvider>
    <Wrapper>
      <Header />
      <DataProvider>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/add-quote" component={AddQuote} />
          <Route exact path="/" component={TypingGameContext} />
          {/* <Route exact path="/chart" component={TypingChart} /> */}
        </Switch>
      </DataProvider>
    </Wrapper>
  </AuthProvider>
);
export default App;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  color: ${colors.text};
`;
