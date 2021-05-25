/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { colors } from "../Shared/Global/Colors";
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
  const caretRef = useRef<HTMLDivElement>(null);
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
  const [caret, setCaret] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = keyValidation(e.key);
    setIsPlaying(true);
    setCurrentKey(e.key);

    if (key === "Backspace") return backspaceHandler();
    if (key === " ") return spaceHandler();

    setInput(input + key);
  };

  const spaceHandler = (): void => {
    setInputHistory([...inputHistory, input]);
    setCurrent(current + 1);
    setInput("");
  };

  const backspaceHandler = (): void => {
    if (canGoBack && input.length === 0) return jumpToPrevWord();
    setInput(input.slice(0, -1));
  };

  // letter validation
  useEffect(() => {
    if (currentKey === " ") return;
    if (currentKey === "Backspace")
      return minusLetter?.classList.remove("incorrect", "correct");

    const key = input.slice(-1);

    if (letter?.innerHTML === key) letter?.classList.add("correct");
    else letter?.classList.add("incorrect");
  }, [input, current]);

  // Current word / letter
  useEffect(() => {
    if (!wordsRef) return;

    setLetter(wordsRef.current?.children[current].children[input.length]);
    setMinusLetter(
      wordsRef.current?.children[current].children[input.length - 1]
    );
    setPlusWord(wordsRef.current?.children[current + 1]);
    setWord(wordsRef.current?.children[current]);
    setMinusWord(wordsRef.current?.children[current - 1]);
    console.log(current, input.length);
    console.log(wordsRef.current?.children[current].children[input.length - 1]);
    console.log(input.split(""));
  }, [input]);

  // Active word
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

    word?.classList.add("active");
    return () => {
      word?.classList.remove("active");
      setCanGoBack(false);
    };
  }, [word]);

  // smooth caret animation
  const caretAnimation = (x: number): void => {
    caretRef.current?.animate(
      { left: `${x}px` },
      { duration: 100, fill: "forwards" }
    );
  };

  // on load caret position
  useEffect(() => {
    if (!caretRef || !letter) return;

    const position = letter?.getBoundingClientRect();

    setCaret({ ...caret, top: position.top });

    if (caretRef.current?.classList.contains("onload-hidden"))
      caretRef.current?.classList.remove("onload-hidden");
  }, [caretRef.current]);

  // useEffect(() => {

  //   return () =>
  // }, [minusWord]);

  // useEffect(() => {}, [letter]);

  const jumpToPrevWord = () => {
    let newCurrent = current - 1;

    minusWord?.classList.remove("error");
    setCurrent(newCurrent);
    setInput(inputHistory[newCurrent]);
    setInputHistory(inputHistory.slice(0, -1));
  };

  // caret position
  useEffect(() => {
    let position: DOMRect;

    if (currentKey === "Backspace") {
      if (!letter) return;

      position = letter?.getBoundingClientRect();
      caretAnimation(position.left);
      setCaret({ ...caret, top: position?.top });
      return;
    }

    if (currentKey === " ") {
      if (!word) return;
      position = word?.getBoundingClientRect();
      caretAnimation(position.left);
      setCaret({ ...caret, top: position?.top });
      return;
    }

    if (!letter) return;
    position = letter?.getBoundingClientRect();

    setCaret({ ...caret, top: position?.top });

    // if (input.length === 0) return caretAnimation(position.left);
    caretAnimation(position.left);
  }, [letter]);

  // caret flash animation on stop
  useEffect(() => {
    if (!isPlaying) return;
    caretRef.current?.classList.remove("caret-flash-animation");
    const timeout = setTimeout(
      () => caretRef.current?.classList.add("caret-flash-animation"),
      1500
    );

    return () => clearTimeout(timeout);
  }, [letter]);

  // append new letters on text overflow
  useEffect(() => {
    if (words[current].length >= input.length) return;
    // console.log(letter);
    // if (currentKey === "Backspace") return letter?.remove();
    const newLetter = document.createElement("span");
    newLetter.classList.add("extra");
    newLetter.innerText = input.slice(-1);

    word?.appendChild(newLetter);
  }, [input]);

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
          className={`caret-flash-animation onload-hidden ${
            focus ? "" : "hidden"
          }`}
          ref={caretRef}
          style={{ top: caret.top }}
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

const Caret = styled.div`
  position: fixed;
  width: 3px;
  background: ${colors.secondary};
  height: 32px;
  border-radius: 999px;

  &.caret-flash-animation {
    animation: caretFlash 1000ms infinite;
  }

  &.onload-hidden {
    display: none !important;
  }

  &.hidden {
    display: none !important;
  }

  @keyframes caretFlash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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
    /* opacity: 0.5; */
    font-size: 24px;
    transition: 40ms;

    &.extra {
      /* opacity: 1; */
      color: ${colors.fail};
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
