import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../../contexts/DataContext";
import { colors } from "../../Global";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame = () => {
  const { getRandomQuote, addQuote } = useData();
  //   useEffect(() => {
  //     const getQuote = async () => {
  //       try {
  //         const res = await getRandomQuote();
  //         console.log(res);
  //       } catch {}
  //     };

  //     getQuote();
  //   }, []);

  const [text, setText] = useState<string>("siema co tam kekw");
  var split = text.replace(/ /g, "-").split("");
  return (
    <Wrapper>
      <TypingWrapper>
        <Word>
          <span>B</span>
          <span>o</span>
          <span>o</span>
          <span>k</span>
          <span>s</span>
        </Word>
        <Word>are</Word>
        <Word>the</Word>
        <Word>quietest</Word>
        <Word>and</Word>
        <Word>most</Word>
        <Word>constant</Word>
        <Word>of</Word>
        <Word>friends</Word>
        <Word>they</Word>
        <Word>are</Word>
        <Word>gay</Word>
        <Word>kekw</Word>
        <Word>siema</Word>
      </TypingWrapper>
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
