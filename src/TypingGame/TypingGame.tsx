import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const { quote } = useData();
  const caretRef = useRef<HTMLDivElement>(null);
  const [words] = useState<string[]>(quote.split(" "));
  const [focus, setFocus] = useState<boolean>(true);
  const wordsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);
  // const [key, setKey] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [caret, setCaret] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = keyValidation(e.key);
    if (key === "Backspace") {
      setInput(input.slice(0, -1));
      if (input.length === 0) return;
      wordsRef.current?.children[current].children[
        input.length - 1
      ].classList.remove("correct", "incorrect");
      return;
    }
    if (key === " ") {
      setCurrent(current + 1);
      setInput("");
      return;
    }
    // setKey(key);
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

  useEffect(() => {
    const ref = wordsRef.current;
    // const letterWidth = ref?.offsetWidth;

    const caretHandler = () => {
      if (ref?.children[current].children[input.length] === undefined) {
        return setCaret({
          ...caret,
          left: caret.left + 14,
        });
      }
      const position =
        ref?.children[current].children[input.length].getBoundingClientRect();

      setCaret({ left: position!.left, top: position!.top });
    };

    window.addEventListener("resize", caretHandler);
    caretHandler();
    return () => {
      window.removeEventListener("resize", caretHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, current]);

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
        // "Backspace",
        undefined,
      ].includes(key)
    ) {
      return "";
    }
    return key;
  };

  return (
    <Wrapper>
      <Game>
        <Input
          tabIndex={0}
          autoFocus
          autoComplete="off"
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 300)}
          onKeyDown={inputHandler}
        />
        {focus && (
          <Caret
            className="caret-flash-animation"
            ref={caretRef}
            style={{ top: caret.top }}
          />
        )}
        {!focus && <FocusAlert>Click or press any key to focus</FocusAlert>}
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
  cursor: default;
  opacity: 0;
  color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  z-index: 99;
`;

const Caret = styled.div`
  position: fixed;
  /* transition: 100ms ease-in-out; */
  width: 3px;
  background: ${colors.secondary};
  height: 32px;
  border-radius: 999px;

  &.caret-flash-animation {
    animation: caretFlash 1000ms infinite;
  }

  /* @keyframes smoothCaret {
    0% {
      left: 300px;
    }
    100% {
      left: 400px;
    }
  } */

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
`;

const Letter = styled.span`
  user-select: none;
  color: ${colors.text};
  opacity: 0.5;
  font-size: 24px;
  transition: 40ms;

  &.correct {
    color: ${colors.secondary};
    opacity: 1;
  }
  &.incorrect {
    color: ${colors.fail};
    opacity: 1;
    text-decoration: underline;
  }
`;

const FocusAlert = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  position: absolute;
  font-size: 18px;
  z-index: 98;
`;
