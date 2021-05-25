/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { colors } from "../Shared/Global/Colors";
import Caret from "./Caret";
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
  const [plusWord, setPlusWord] = useState<Element>();
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

    setIsPlaying(true);

    if (input.length + 1 > words[current].length) return;

    letterValidation(key, e.key);
    setInput(input + key);
  };

  // TODO: WORKING
  const spaceHandler = (): void => {
    if (input === "") return;
    setInputHistory([...inputHistory, input]);
    setCurrent(current + 1);
    setInput("");
  };

  const backspaceHandler = (): void => {
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

  const letterValidation = (key: string, eventKey: string) => {
    if (eventKey === " " || eventKey === "Backspace" || key === "") return;

    if (letter?.innerHTML === key) letter?.classList.add("correct");
    else letter?.classList.add("incorrect");
  };

  // create letter
  const createLetter = (key: string) => {
    let letter = document.createElement("span");
    letter.textContent = key;
    word?.appendChild(letter);
  };

  // current word / letter
  useEffect(() => {
    if (!wordsRef) return;
    setLetter(wordsRef.current?.children[current].children[input.length]);
    setMinusLetter(
      wordsRef.current?.children[current].children[input.length - 1]
    );
    setPlusWord(wordsRef.current?.children[current + 1]);
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

  // get if can go back
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
        <Input
          tabIndex={0}
          autoFocus
          autoComplete="off"
          onKeyDown={inputHandler}
          ref={inputRef}
        />
        <Caret
          words={words}
          input={input}
          letter={letter!}
          word={word!}
          currentKey={currentKey}
          focus={focus}
          isPlaying={isPlaying}
          current={current}
        />
        {/* {!focus && <FocusAlert>Click or press any key to focus</FocusAlert>} */}
        <TypingStats isPlaying={isPlaying} />
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

const Input = styled.input`
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  display: block;
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

  span {
    user-select: none;
    color: ${colors.text}80;
    /* opacity: 0.5; */
    font-size: 24px;
    transition: 40ms;

    &.extra {
      color: ${colors.background};
      text-decoration: underline;
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
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: grid;
  place-items: center;
  position: absolute;
  font-size: 18px;
  z-index: 98;
`;
