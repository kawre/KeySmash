import { useState } from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import AddQuote from "./AddQuote/AddQuote";
import { AuthProvider } from "./Contexts/AuthContext";
import { DataProvider } from "./Contexts/DataContext";
import TypingGameContext from "./Contexts/TypingGameContext";
import Header from "./Shared/Components/Header";
import LoginForm from "./Shared/Forms/LoginForm";
import RegisterForm from "./Shared/Forms/RegisterForm";
import { colors } from "./Shared/Global/Colors";
import TypingGame from "./TypingGame/TypingGame";

const App = () => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <AuthProvider>
      <Wrapper>
        <Header />
        <DataProvider>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/add-quote" component={AddQuote} />
            <Route
              exact
              path="/"
              component={() => (
                <TypingGameContext>
                  <TypingGame />
                </TypingGameContext>
              )}
            />
          </Switch>
        </DataProvider>
      </Wrapper>
    </AuthProvider>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  color: ${colors.text};
`;
