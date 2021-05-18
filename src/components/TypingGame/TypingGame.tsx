import { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../../contexts/DataContext";
import { colors } from "../../Global";
import { v4 as uuidv4 } from "uuid";
// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame = () => {
  const { quote } = useData();
  const [letters, setQuote] = useState<string[] | undefined>(quote);
  const [input, setInput] = useState<string>();
  const [length, setLength] = useState<number>(-1);

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setInput(e.key);
    setLength(length + 1);
  };

  console.log(letters);

  return (
    <Wrapper>
      <TypingWrapper>
        <TypeInput onKeyPress={keyPressHandler} />
        {/* {quote?.join(" ")?.map((letter) => {
          return console.log(letter);
        })} */}
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

const Quote = styled.p``;

const TypeInput = styled.input`
  position: absolute;
  background: none;
  border: none;
  opacity: 0;
  color: transparent;
  width: 100%;
  height: 100%;
`;

const Word = styled.div`
  margin: 4px;
  display: inline-block;
`;

const Letter = styled.span`
  color: ${colors.text};

  &.correct {
    color: green;
  }

  &.incorrect {
    color: red;
  }
`;
