import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddQuote from "./AddQuote/AddQuote";
import TypingGameContext from "./Contexts/TypingGameContext";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Shared/Components/Header";
import LoginForm from "./Shared/Forms/LoginForm";
import RegisterForm from "./Shared/Forms/RegisterForm";
import { useEffect, useState } from "react";
import { useAuth } from "./Contexts/AuthContext";
import Settings from "./Settings/Settings";
import AddTheme from "./AddQuote/AddTheme";

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
  const { userData } = useAuth();
  const [theme, setTheme] = useState<Colors>({
    background: "#323437",
    main: "#e2b714",
    caret: "#e2b714",
    sub: "#646669",
    text: "#d1d0c5",
    error: "#ca4754",
    errorExtra: "#7e2a33",
  });

  useEffect(() => {
    if (!userData) return;

    if (userData.theme === "superuser") {
      setTheme({
        background: "#262a33",
        main: "#43ffaf",
        caret: "#43ffaf",
        sub: "#526777",
        text: "#e5f7ef",
        error: "#ff5f5f",
        errorExtra: "#d22a2a",
      });
    }
  }, [userData]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/add-quote" component={AddQuote} />
            <Route exact path="/" component={TypingGameContext} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/add-theme" component={AddTheme} />
          </Switch>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
};
export default App;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
`;
