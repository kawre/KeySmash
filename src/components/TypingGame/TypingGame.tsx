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
  const [words] = useState<string[]>(quote.split(" "));
  const [input, setInput] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [wordLength, setWordLength] = useState<number>(0);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Wrapper>
      <TypingWrapper>
        <TypeInput autoFocus value={input} onChange={changeHandler} />
        <Quote>
          {words.map((word, wordIdx) => {
            let active;

            if (wordIdx === currentWord) active = "active";
            return (
              <Word key={uuidv4()} className={active}>
                {word.split("").map((letter, letterIdx) => {
                  let color;

                  if (wordIdx === currentWord) {
                    if (letterIdx < input.length) {
                      color =
                        letter === input[letterIdx]
                          ? colors.secondary
                          : colors.fail;
                    }
                    if (
                      words[wordIdx].split("").length < input.length &&
                      input.endsWith(" ")
                    ) {
                      setCurrentWord(currentWord + 1);
                      setInput("");
                    }
                  }

                  return (
                    <Letter key={uuidv4()} style={{ color: color }}>
                      {letter}
                    </Letter>
                  );
                })}
              </Word>
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

const Word = styled.div`
  display: inline-block;
  margin: 4px;
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
