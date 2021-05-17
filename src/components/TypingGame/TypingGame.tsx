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
  const [letters] = useState<string[] | undefined>(quote?.join(" ").split(""));
  const [length, setLength] = useState<number>(0);
  const [word, setWord] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") setWord(word + 1);
    setLength(length + 1);
    // console.log(letters?.[length]);
  };

  return (
    <Wrapper>
      <TypingWrapper>
        <TypeInput onKeyPress={keyPressHandler} />
        {quote?.map((word) =>
          word.split("").map((letter) => <span>{letter}</span>)
        )}
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

const Word = styled.div`
  margin: 4px;
  display: inline-block;
`;

const Letter = styled.span`
  color: ${colors.text};

  &.correct {
  }

  &.incorrect {
  }
`;
