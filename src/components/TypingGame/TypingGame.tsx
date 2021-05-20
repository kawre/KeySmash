import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useData } from "../../contexts/DataContext";
import { colors } from "../../Global";
import { v4 as uuidv4 } from "uuid";
// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame = () => {
  const { quote } = useData();
  const quoteRef = useRef<HTMLDivElement>(null);
  const [letters] = useState<string[]>(quote.split(" "));
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [keyState, setKeyState] = useState<string>("");
  const [cordinates, setCordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  console.log(input);

  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = keyValidation(e.key);
    if (key === "Escape") return;
    if (key === "Backspace") return setInput(input.slice(0, -1));
    if (key === " ") {
      setCurrentWord(currentWord + 1);
      return setInput("");
    }
    setInput(input + key);
  };

  // Caret cordinates handler
  // useEffect(() => {
  //   const caretHandler = () => {
  //     const cord =
  //       quoteRef.current!.children[currentWord].children[
  //         input.length
  //       ].getBoundingClientRect();

  //     setCordinates({ x: cord.x, y: cord.y });
  //   };
  //   caretHandler();

  //   window.addEventListener("resize", caretHandler);
  //   return () => {
  //     window.removeEventListener("resize", caretHandler);
  //   };
  // }, [input]);

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
        undefined,
      ].includes(key)
    ) {
      return "";
    }
    return key;
  };

  return (
    <Wrapper>
      <TypingWrapper>
        <TypeInput
          tabIndex={0}
          autoFocus
          autoComplete="off"
          onKeyDown={changeHandler}
        />
        <Caret style={{ left: cordinates.x, top: cordinates.y }} />
        <Quote ref={quoteRef}>
          {letters.map((word, index) => {
            let state;
            if (index === currentWord) state = "active";

            return (
              <Word key={word + index} className={state}>
                {word.split("").map((letter, letterIdx) => {
                  let state;

                  if (index < currentWord) state = "correct";

                  if (index === currentWord) {
                    if (letterIdx < input.length) {
                      let state =
                        letter === input[letterIdx] ? "correct" : "incorrect";
                    }
                  }

                  return (
                    <Letter key={letter + letterIdx} className={state}>
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

const Letter = styled.span`
  color: ${colors.text}80;

  &.correct {
    color: ${colors.text} !important;
  }

  &.incorrect {
    color: ${colors.fail};
  }
`;

const Word = styled.div`
  display: inline-block;
  margin: 4px;
`;

const Caret = styled.div`
  width: 2.5px;
  top: 0;
  left: 0;
  height: 26px;
  background: ${colors.primary};
  position: fixed;
  transition: 150ms ease;
`;
