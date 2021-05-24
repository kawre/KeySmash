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
  const [wordLength, setWordLength] = useState<number>(0);
  const [focus, setFocus] = useState<boolean>(true);
  const wordsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);
  const [currentKey, setKey] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [oldInput, setOldInput] = useState<string>("");
  const [caret, setCaret] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  // Get word length
  useEffect(() => {
    setWordLength(wordsRef.current!.children[current].childNodes.length);
  }, [current]);

  // key down handler
  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    setKey(e.key);
    const key = keyValidation(e.key);

    if (key === " ") {
      // let wordsLen = current - 1;
      // if (wordsLen === -1) wordsLen = 0;

      wordsRef.current?.children[current].childNodes.forEach((letter) => {
        // console.log(letter.classList.contains("siema"));
      });

      setOldInput(input);
      setCurrent(current + 1);
      setInput("");
      return;
    }

    if (key === "Backspace") {
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
    return () => {
      window.removeEventListener("resize", caretHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

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
        <Caret
          className={focus ? "" : "hidden"}
          ref={caretRef}
          style={{ top: caret.top }}
        />

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

  span {
    user-select: none;
    color: ${colors.text};
    opacity: 0.5;
    font-size: 24px;
    transition: 40ms;

    &.extra {
      /* opacity: 1; */
      background: ${colors.background};
      text-decoration: underline;
    }
  }
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
