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
  const [letters] = useState<string[] | undefined>(quote?.join("").split(""));
  const [input, setInput] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Wrapper>
      <TypingWrapper>
        <TypeInput autoFocus onChange={changeHandler} />
        <Quote>
          {letters?.map((letter, index) => {
            let color;

            if (index < input.length) {
              color = letter === input[index] ? "correct" : "incorrect";
            }

            return (
              <Letter key={uuidv4()} className={color}>
                {letter}
              </Letter>
            );
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

const Quote = styled.div``;

const TypeInput = styled.input`
  position: absolute;
  background: none;
  border: none;
  opacity: 0;
  color: transparent;
  width: 100%;
  height: 100%;
`;

const Letter = styled.span`
  color: ${colors.text};

  &.correct {
    color: ${colors.secondary};
  }

  &.incorrect {
    color: ${colors.fail};
  }
`;
