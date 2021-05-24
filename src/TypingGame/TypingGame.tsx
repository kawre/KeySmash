import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { colors } from "../Shared/Global/Colors";
import RepeatTest from "./RepeatTest";
import TypingStats from "./TypingStats";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const { quote } = useData();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const [words] = useState<string[]>(quote.split(" "));
  const [wordLength, setWordLength] = useState<number>(0);
  const [focus, setFocus] = useState<boolean>(true);
  const wordsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);
  const [currentKey, setKey] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [caret, setCaret] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  // key down handler
  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    setKey(e.key);
    setIsPlaying(true);
    const key = keyValidation(e.key);

    if (key === " ") {
      wordsRef.current?.children[current].childNodes.forEach((i, index) => {
        const doesContain =
          wordsRef.current?.children[current].children[
            index
          ].classList.contains("correct");

        if (!doesContain) {
          wordsRef.current?.children[current].classList.add("error");
        }
      });

      setInputHistory([...inputHistory, input]);
      setCurrent(current + 1);
      setInput("");
      return;
    }

    if (key === "Backspace") {
      if (input.length === 0 && canGoBack) {
        wordsRef.current?.children[current - 1].classList.remove("error");
        setCurrent(current - 1);
        setInput(inputHistory[current - 1]);
      }
      if (input.length === 0) return;

      if (wordLength < input.length) {
        wordsRef.current?.children[current].children[input.length - 1].remove();
        setInput(input.slice(0, -1));
        return;
      } else {
        setInput(input.slice(0, -1));
        wordsRef.current?.children[current].children[
          input.length - 1
        ].classList.remove("correct", "incorrect");
        return;
      }
    }

    setInput(input + key);
  };

  const inputValidation = (
    wordIdx: number,
    letterIdx: number,
    letter: string
  ): void => {
    const ref = wordsRef.current;

    if (wordIdx === current) {
      ref?.children[wordIdx].classList.add("active");

      if (letterIdx < input.length) {
        console.log(input);
        console.log("idx:", letterIdx, "length:", input.length);
        if (letter === input[letterIdx]) {
          ref?.children[wordIdx].children[letterIdx].classList.add("correct");
        } else {
          ref?.children[wordIdx].children[letterIdx].classList.add("incorrect");
        }
      }
    } else {
      ref?.children[wordIdx].classList.remove("active");
    }
  };

  // Caret position
  useEffect(() => {
    const ref = wordsRef.current;
    let inputLen = input.length - 1;
    if (inputLen === -1) inputLen = 0;

    // append a letter if needed
    if (wordLength < input.length) {
      if (currentKey !== "Backspace") {
        const letter = document.createElement("span");
        letter.classList.add("extra");
        letter.innerText = input.slice(-1);
        wordsRef.current?.children[current].appendChild(letter);
      }
    }

    const caretHandler = () => {
      const position =
        ref?.children[current].children[inputLen].getBoundingClientRect();

      if (input.length === 0) {
        return setCaret({ left: position!.left, top: position!.top });
      }

      setCaret({ left: position!.right, top: position!.top });
    };
    caretHandler();

    window.addEventListener("resize", caretHandler);
    return () => window.removeEventListener("resize", caretHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, current]);

  // Get word length
  useEffect(() => {
    setWordLength(words[current].length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // set can go back
  useEffect(() => {
    if (current === 0) return;
    const oldWord =
      wordsRef.current?.children[current - 1].classList.contains("error");

    if (oldWord) {
      setCanGoBack(true);
      return;
    }
    setCanGoBack(false);
  }, [current]);

  // Caret flashing animation
  useEffect(() => {
    if (caret.left === 0) return;
    const ref = caretRef.current;
    const timeout = setTimeout(() => {
      ref?.classList.add("caret-flash-animation");
    }, 1500);

    return () => {
      ref?.classList.remove("caret-flash-animation");
      clearTimeout(timeout);
    };
  }, [caret]);

  // Listen for key press to focus
  useEffect(() => {
    const keyHandler = () => {
      inputRef.current?.focus();
    };

    document.addEventListener("keypress", keyHandler);
    return () => document.removeEventListener("keypress", keyHandler);
  }, []);

  // Caret animation
  useEffect(() => {
    const ref = caretRef.current;
    ref?.animate(
      { left: `${caret.left}px` },
      {
        duration: 100,
        fill: "forwards",
      }
    );
  }, [caret]);

  const keyValidation = (key: string) => {
    if (
      [
        "ContextMenu",
        "Shift",
        "Control",
        "Meta",
        "Alt",
        "AltGraph",
        "CapsLock",
        "PageUp",
        "PageDown",
        "Home",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "ArrowDown",
        "OS",
        "Insert",
        "Home",
        "Undefined",
        "Control",
        "Fn",
        "FnLock",
        "Hyper",
        "NumLock",
        "ScrollLock",
        "Symbol",
        "SymbolLock",
        "Super",
        "Unidentified",
        "Process",
        "Delete",
        "KanjiMode",
        "Pause",
        "PrintScreen",
        "Clear",
        "End",
        "Tab",
        undefined,
      ].includes(key)
    ) {
      return "";
    }
    return key;
  };

  return (
    <Wrapper>
      <Game
        onClick={() => {
          if (focus) return;
          inputRef.current?.focus();
        }}
      >
        <Input
          tabIndex={0}
          autoFocus
          autoComplete="off"
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 300)}
          onKeyDown={inputHandler}
          ref={inputRef}
        />
        <Caret
          className={`caret-flash-animation ${focus ? "" : "hidden"}`}
          ref={caretRef}
          style={{ top: caret.top }}
        />

        {!focus && <FocusAlert>Click or press any key to focus</FocusAlert>}
        <TypingStats isPlaying={isPlaying} />

        <Words className={focus ? "" : "blur"} ref={wordsRef}>
          {words.map((word, index) => {
            return (
              <Word key={word + index}>
                {word.split("").map((letter, letterIdx) => {
                  inputValidation(index, letterIdx, letter);

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
  height: 0;
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
