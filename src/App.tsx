import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddQuote from "./AddQuote/AddQuote";
import TypingGameContext from "./Contexts/TypingGameContext";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Shared/Components/Header";
import LoginForm from "./Shared/Forms/LoginForm";
import RegisterForm from "./Shared/Forms/RegisterForm";
import { useState } from "react";
import { AuthProvider } from "./Contexts/AuthContext";

type Colors = {
  background: string;
  main: string;
  caret: string;
  sub: string;
  text: string;
  error: string;
  errorExtra: string;
};

const App = () => {
  const [theme, setTheme] = useState<Colors>({
    background: "#323437",
    main: "#e2b714",
    caret: "#e2b714",
    sub: "#646669",
    text: "#d1d0c5",
    error: "#ca4754",
    errorExtra: "#7e2a33",
  });

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <AuthProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/add-quote" component={AddQuote} />
              <Route exact path="/" component={TypingGameContext} />
            </Switch>
          </Router>
        </AuthProvider>
      </Wrapper>
    </ThemeProvider>
  );
};
export default App;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  transition: background 250ms ease;
  background: ${(props) => props.theme.background};
`;
