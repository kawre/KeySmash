import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../../contexts/DataContext";
import { colors } from "../../Global";
import { v4 as uuidv4 } from "uuid";
// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame = () => {
  const { quote } = useData();
  const quoteRef = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.currentTarget.value.trim());
  };

  return (
    <Wrapper>
      <TypingWrapper>
        <TypeInput autoFocus value={input} onChange={changeHandler} />
        <Quote ref={quoteRef}>
          {quote.split("").map((letter, index) => {
            return <Letter key={uuidv4()}>{letter}</Letter>;
          })}
        </Quote>
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
  position: relative;
`;

const TypeInput = styled.input`
  position: absolute;
  background: none;
  border: none;
  opacity: 0;
  color: transparent;
  width: 100%;
  height: 100%;
`;

const Quote = styled.div``;

const Letter = styled.span`
  color: ${colors.text};

  &.correct {
    color: ${colors.secondary} !important;
  }

  &.incorrect {
    color: ${colors.fail};
  }
`;
