import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../../contexts/DataContext";
import { colors } from "../../Global";
import Button from "../Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame = () => {
  const { quote } = useData();

  console.log(quote);

  return (
    <Wrapper>
      <Button
      // onClick={() =>
      //   addQuote(
      //     `When I have a little money, I buy books; and if I have any left, I buy food and clothes.`
      //   )
      // }
      ></Button>
      <TypingWrapper></TypingWrapper>
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const TypingWrapper = styled.div`
  width: 800px;
  font-size: 20px;
`;

const Word = styled.div`
  display: inline-block;
  margin: 4px;
  color: ${colors.text};
`;
