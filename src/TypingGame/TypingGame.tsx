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
  const [wordLength, setWordLength] = useState<number>(0);
  const [focus, setFocus] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>(0);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [letter, setLetter] = useState<Element>();
  const [minusLetter, setMinusLetter] = useState<Element>();
  const [word, setWord] = useState<Element>();
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
    setInput(input.slice(0, -1));
    if (minusLetter?.classList.contains("correct"))
      return minusLetter?.classList.remove("correct");
  };

  console.log(input.length);

  // letter validation
  useEffect(() => {
    const key = input.slice(-1);

    if (letter?.innerHTML === key) return letter?.classList.add("correct");
    letter?.classList.add("incorrect");
  }, [input, current]);

  // Current word / letter
  useEffect(() => {
    setLetter(wordsRef.current?.children[current].children[input.length]);
    setMinusLetter(
      wordsRef.current?.children[current].children[input.length - 1]
    );
    setWord(wordsRef.current?.children[current]);
  }, [input, current]);

  // Active word
  useEffect(() => {
    word?.classList.add("active");
    return () => word?.classList.remove("active");
  }, [word]);

  const caretAnimation = (x: number) => {
    caretRef.current?.animate(
      { left: `${x}px` },
      { duration: 100, fill: "forwards" }
    );
  };

  // caret position
  useEffect(() => {
    if (!letter) return;
    const position = letter?.getBoundingClientRect();

    if (input.length === 0) caretAnimation(position.left);
    else caretAnimation(position.right);

    setCaret({ ...caret, top: position?.top });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, current]);

  return (
    <Wrapper>
      <Game
      // onClick={() => {
      //   if (focus) return;
      //   inputRef.current?.focus();
      // }}
      >
        <Input
          tabIndex={0}
          autoFocus
          autoComplete="off"
          onKeyDown={inputHandler}
          ref={inputRef}
        />
        <Caret
          className={`caret-flash-animation ${focus ? "" : "hidden"}`}
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
