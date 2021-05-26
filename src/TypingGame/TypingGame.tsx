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

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = ({ setShow }) => {
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
  const [timer, setTimer] = useState<number>(0);

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
      if (!minusWord) return;
      let newCurrent = current - 1;

      minusWord.classList.remove("error");
      setCurrent(newCurrent);
      setInput(inputHistory[newCurrent]);
      setInputHistory(inputHistory.slice(0, -1));
      return;
    }

    setInput(input.slice(0, -1));

    if (!minusLetter) return;
    minusLetter.classList.remove("incorrect", "correct");
  };

  const spaceHandler = () => {
    if (input === "") return;
    setInputHistory([...inputHistory, input]);
    setCurrent(current + 1);
    setInput("");
  };

  const createLetter = (key: string) => {
    if (!word) return;
    const letter = document.createElement("span");
    letter.textContent = key;
    letter.classList.add("extra");
    word.appendChild(letter);
  };

  const letterValidation = (key: string, eventKey: string) => {
    if (eventKey === " " || eventKey === "Backspace" || !letter) return;

    if (letter.innerHTML === key) letter.classList.add("correct");
    else letter.classList.add("incorrect");
  };

  // overflow removal handler
  useEffect(() => {
    if (
      words[current].length > input.length ||
      currentKey !== "Backspace" ||
      !wordsRef.current
    )
      return;

    const currentWord = wordsRef.current.children[current];

    if (currentWord.childElementCount === input.length + 1) {
      if (!currentWord.lastElementChild) return;
      currentWord.lastElementChild.remove();
    }
  }, [input]);

  // current word / letter
  useEffect(() => {
    if (!wordsRef.current) return;
    setLetter(wordsRef.current.children[current].children[input.length]);
    setMinusLetter(
      wordsRef.current.children[current].children[input.length - 1]
    );
    setWord(wordsRef.current.children[current]);
    setMinusWord(wordsRef.current.children[current - 1]);
  }, [input, word]);

  // set error word
  useEffect(() => {
    if (!minusWord) return;
    const wordChildren = minusWord.childNodes;

    wordChildren.forEach((child, index) => {
      const childClass = minusWord.children[index].classList;
      if (!childClass.contains("correct")) {
        setCanGoBack(true);
        minusWord.classList.add("error");
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
    if (!word) return;
    word.classList.add("active");
    return () => word.classList.remove("active");
  }, [word]);

  // timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setTimer(timer + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  return (
    <Wrapper>
      <Game>
        <TypingStats current={current} timer={timer} isPlaying={isPlaying} />
        <GameContainer>
          <Caret
            words={words}
            input={input}
            letter={letter}
            minusLetter={minusLetter}
            word={word}
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
            tabIndex={1}
            autoFocus
            autoComplete="off"
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 1000)}
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
        <RepeatTest setShow={setShow} />
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
  opacity: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  color: transparent;
  background: none;
  border: none;
  outline: none;
  cursor: default;
  z-index: 99;
`;

const Words = styled.div`
  &.blur {
    filter: blur(8px);
    transition: 300ms;
    opacity: 0.25;
  }
`;

const Word = styled.div`
  display: inline-block;
  border-bottom: 2px solid transparent;
  color: ${colors.text}80;
  margin: 6px;
  user-select: none;
  line-height: 24px;
  font-size: 24px;
  transition: 50ms;

  &.error {
    border-bottom: 2px solid ${colors.fail};
  }

  span {
    &.extra {
      transition: 1000ms;
      color: ${colors.text}40 !important;
    }
  }
`;

const Letter = styled.span`
  transition: 50ms;

  &.correct {
    color: ${colors.secondary};
  }
  &.incorrect {
    color: ${colors.fail};
  }
`;

const FocusAlert = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  user-select: none;
  font-size: 16px;
  pointer-events: none;
  z-index: 98;

  svg {
    margin-right: 5px;
    margin-bottom: 2.5px;
    width: 30px;
    height: 30px;
  }
`;
