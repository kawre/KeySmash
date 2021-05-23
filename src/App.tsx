import React from "react";
import styled from "styled-components";
import Header from "./Shared/Components/Header";
import { colors } from "./Shared/Global/Colors";
import TypingGame from "./TypingGame/TypingGame";

const App = () => {
  return (
    <Wrapper>
      <Header />
      <TypingGame />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: ${colors.body};
  color: ${colors.text};
`;
