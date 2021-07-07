import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Account from "./Accout/Accout";
import AddQuote from "./AddQuote/AddQuote";
import AddTheme from "./AddQuote/AddTheme";
import Settings from "./Settings/Settings";
import Header from "./Shared/Components/Header";
import LoginForm from "./Shared/Forms/LoginForm";
import RegisterForm from "./Shared/Forms/RegisterForm";
import TypingWrapper from "./TypingGame/TypingWrapper";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/add-quote" component={AddQuote} />
      <Route exact path="/" component={TypingWrapper} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/add-theme" component={AddTheme} />
      <Route exact path="/account" component={Account} />
    </Switch>
  </Router>
);
export default App;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
  transition: background 250ms ease;
`;
