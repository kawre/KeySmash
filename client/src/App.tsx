import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddQuote from "./AddQuote/AddQuote";
import TypingGameContext from "./Contexts/TypingGameContext";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Shared/Components/Header";
import LoginForm from "./Shared/Forms/LoginForm";
import RegisterForm from "./Shared/Forms/RegisterForm";
import { useEffect, useState } from "react";
import Settings from "./Settings/Settings";
import AddTheme from "./AddQuote/AddTheme";
import { useData } from "./Contexts/DataContext";
import { useAuth } from "./Contexts/AuthContext";

const App = () => {
  const { theme } = useData();
  const { user } = useAuth();
  console.log(user);

  const [localTheme, setLocalTheme] = useState(
    JSON.parse(localStorage.getItem("theme")!)
  );

  useEffect(() => {
    setLocalTheme(JSON.parse(localStorage.getItem("theme")!));
  }, [theme]);

  return (
    <ThemeProvider theme={localTheme}>
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
  transition: 250ms ease;
`;
