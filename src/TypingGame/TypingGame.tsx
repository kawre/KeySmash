/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { colors } from "../Shared/Global/Colors";
import Caret from "./Caret";
import { FcCursor } from "react-icons/fc";
import { keyValidation } from "./KeyValidation";
import RepeatTest from "./RepeatTest";
import TypingStats from "./TypingStats";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  // context
  const { quote } = useData();
  // ref
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  // state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [words] = useState<string[]>(quote.split(" "));
  const [focus, setFocus] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>(0);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [letter, setLetter] = useState<Element>();
  const [minusLetter, setMinusLetter] = useState<Element>();
  const [word, setWord] = useState<Element>();
  const [minusWord, setMinusWord] = useState<Element>();
  const [input, setInput] = useState<string>("");
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    setCurrentKey(e.key);
    if (e.key === "Backspace") return backspaceHandler();
    if (e.key === " ") return spaceHandler();

    const key = keyValidation(e.key);
    if (key === "") return;

    setIsPlaying(true);
    if (input.length + 1 > words[current].length) createLetter(key);
    else letterValidation(key, e.key);
    setInput(input + key);
  };

  const backspaceHandler = () => {
    if (canGoBack && input.length === 0) {
      let newCurrent = current - 1;

      minusWord?.classList.remove("error");
      setCurrent(newCurrent);
      setInput(inputHistory[newCurrent]);
      setInputHistory(inputHistory.slice(0, -1));
      return;
    }

    setInput(input.slice(0, -1));

    if (!minusLetter) return;
    minusLetter?.classList.remove("incorrect", "correct");
  };

  const spaceHandler = () => {
    if (input === "") return;
    setInputHistory([...inputHistory, input]);
    setCurrent(current + 1);
    setInput("");
  };

  const createLetter = (key: string) => {
    const letter = document.createElement("span");
    letter.textContent = key;
    letter.classList.add("extra");
    word?.appendChild(letter);
  };

  const letterValidation = (key: string, eventKey: string) => {
    if (eventKey === " " || eventKey === "Backspace") return;

    if (letter?.innerHTML === key) letter?.classList.add("correct");
    else letter?.classList.add("incorrect");
  };

  // overflow removal handler
  useEffect(() => {
    if (words[current].length > input.length || currentKey !== "Backspace")
      return;

    const currentWord = wordsRef.current?.children[current];

    if (currentWord?.childElementCount === input.length + 1)
      return currentWord?.lastElementChild?.remove();
  }, [input]);

  // current word / letter
  useEffect(() => {
    if (!wordsRef) return;
    setLetter(wordsRef.current?.children[current].children[input.length]);
    setMinusLetter(
      wordsRef.current?.children[current].children[input.length - 1]
    );
    setWord(wordsRef.current?.children[current]);
    setMinusWord(wordsRef.current?.children[current - 1]);
  }, [input, word]);

  // set error word
  useEffect(() => {
    if (!minusWord) return;
    const wordChildren = minusWord?.childNodes;

    wordChildren.forEach((child, index) => {
      const childClass = minusWord?.children[index].classList;
      if (!childClass.contains("correct")) {
        setCanGoBack(true);
        minusWord?.classList.add("error");
      }
    });
  }, [word]);

  // check if can go back
  useEffect(() => {
    if (!minusWord) return;
    if (!minusWord.classList.contains("error")) setCanGoBack(false);
  }, [minusWord]);

  // set active word
  useEffect(() => {
    word?.classList.add("active");
    return () => word?.classList.remove("active");
  }, [word]);

  return (
    <Wrapper>
      <Game>
        <TypingStats isPlaying={isPlaying} />
        <GameContainer>
          <Caret
            words={words}
            input={input}
            letter={letter!}
            minusLetter={minusLetter!}
            word={word!}
            focus={focus}
            isPlaying={isPlaying}
            current={current}
          />
          {!focus && (
            <FocusAlert>
              <FcCursor />
              Click or press any key to focus
            </FocusAlert>
          )}
          <Input
            tabIndex={0}
            autoFocus
            autoComplete="off"
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 500)}
            onKeyDown={inputHandler}
            ref={inputRef}
          />
          <Words className={focus ? "" : "blur"} ref={wordsRef}>
            {words.map((word, index) => {
              return (
                <Word key={word + index}>
                  {word.split("").map((letter, letterIdx) => {
                    return <Letter key={letter + letterIdx}>{letter}</Letter>;
                  })}
                </Word>
              );
            })}
          </Words>
        </GameContainer>
        <RepeatTest />
      </Game>
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Game = styled.div`
  position: relative;
  width: 1000px;
`;

const GameContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  background: transparent;
  opacity: 0;
  cursor: default;
  color: transparent;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  display: block;
  z-index: 99;
`;

const Words = styled.div`
  &.blur {
    filter: blur(10px);
    transition: 200ms;
  }
`;

const Word = styled.div`
  margin: 4px;
  display: inline-block;

  &.error {
    span {
      text-decoration: underline;
      text-decoration-color: ${colors.fail};
    }
  }

  span {
    user-select: none;
    color: ${colors.text}80;
    font-size: 24px;
    transition: 50ms;

    &.extra {
      background: ${colors.background};
    }
  }
`;

const Letter = styled.span`
  user-select: none;
  color: ${colors.text}80;
  /* opacity: 0.5; */
  font-size: 24px;
  transition: 40ms;

  &.correct {
    color: ${colors.secondary};
  }
  &.incorrect {
    color: ${colors.fail};
    text-decoration: underline;
  }
`;

const FocusAlert = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: grid;
  place-items: center;
  display: flex;
  align-items: center;
  user-select: none;
  font-size: 18px;
  z-index: 98;

  svg {
    margin-right: 5px;
    margin-bottom: 2px;
    width: 30px;
    height: 30px;
  }
`;
