import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const { quote } = useData();
  const [words, setWords] = useState<string[]>(quote.split(" "));
  const [focus, setFocus] = useState<boolean>(true);
  const wordsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);

  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === " ") setCurrent(current + 1);
  };

  const ref = wordsRef.current;

  return (
    <Wrapper>
      <Input
        autoFocus
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={inputHandler}
      />
      <Words ref={wordsRef}>
        {words.map((word, index) => {
          return (
            <Word key={word + index}>
              {word.split("").map((letter, letterIdx) => {
                if (index === current) {
                  ref?.children[index].classList.add("active");
                  ref?.children[index].children[letterIdx].classList.add(
                    "correct"
                  );
                } else {
                  ref?.children[index].classList.remove("active");
                }

                return <Letter key={letter + letterIdx}>{letter}</Letter>;
              })}{" "}
            </Word>
          );
        })}
      </Words>
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  /* height: 500px; */
`;

const Input = styled.input`
  opacity: 0;
  color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
`;

const Words = styled.div``;

const Word = styled.div`
  margin: 4px;
  display: inline-block;
`;

const Letter = styled.span`
  &.correct {
    color: green;
  }
  &.incorrect {
    color: red;
  }
`;
