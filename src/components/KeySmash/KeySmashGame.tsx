import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
// import { v4 as uuidv4 } from "uuid";
import { colors } from "../../Global";
import { GiArrowCursor } from "react-icons/gi";
import QwertyKeyboard from "../Keyboards/qwerty";
import { keys as keysArray } from "../../LocalData/keys";

// Types -------------------------------------------------------------------------

// interface Props {
//   rows: DataType["rows"];
// }

// Component ---------------------------------------------------------------------
const KeySmashGame = () => {
  const [focus, setFocus] = useState<boolean>(true);
  const [alert] = useState<string>("Press any key to start");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [keys, setKeys] = useState<string[]>(keysArray);
  const [score, setScore] = useState<number>(0);
  const [randomKey, setRandomKey] = useState(() => {
    return keys[Math.floor(Math.random() * keys.length)];
  });

  const pressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsPlaying(true);
    const key = valueHandler(e.key);
    const keyIndex = getIndex(key);
    const randomKeyIndex = getIndex(randomKey);

    if (key === randomKey) {
      keys.splice(keyIndex, 1);
      setScore(score + 1);
      document
        .querySelector(`#${key}`)
        ?.classList.add("keycap-pressed-successfully");
    } else {
      keys.splice(randomKeyIndex, 1);
      document
        .querySelector(`#${randomKey}`)
        ?.classList.add("keycap-pressed-unsuccessfully");
    }

    setRandomKey(() => {
      return keys[Math.floor(Math.random() * keys.length)];
    });
  };

  const getIndex = (key: string) => {
    return keys.indexOf(key);
  };

  // useEffect(() => {}, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, timer]);

  const valueHandler = (value: string) => {
    if (value === "=") return "equal";
    if (value === "`") return "tilda";
    if (value === "-") return "minus";
    if (value === "[") return "open-bracket";
    if (value === "]") return "close-bracket";
    if (value === "\\") return "backslash";
    if (value === ";") return "semicolon";
    if (value === "'") return "quote";
    if (value === ",") return "comma";
    if (value === ".") return "dot";
    if (value === "/") return "slash";
    if (value === "1") return "key-1";
    if (value === "2") return "key-2";
    if (value === "3") return "key-3";
    if (value === "4") return "key-4";
    if (value === "5") return "key-5";
    if (value === "6") return "key-6";
    if (value === "7") return "key-7";
    if (value === "8") return "key-8";
    if (value === "9") return "key-9";
    if (value === "0") return "key-0";
    return value;
  };

  return (
    <Wrapper>
      {!focus && (
        <FocusAlert>
          <GiArrowCursor />
          Click or press any key to focus
        </FocusAlert>
      )}
      <KeyToPress>{randomKey}</KeyToPress>
      <RowsWrapper className={focus ? "" : "focus-alert"}>
        <AbovePanel>
          {isPlaying ? (
            <>
              <p>
                time: <b>{timer}</b>
              </p>
              <span>|</span>
              <p>
                score: <b>{score}/47</b>
              </p>
            </>
          ) : (
            alert
          )}
        </AbovePanel>
        <InputHandler
          autoFocus
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 350);
          }}
          onKeyPress={pressHandler}
        />
        <QwertyKeyboard />
      </RowsWrapper>
    </Wrapper>
  );
};

export default KeySmashGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RowsWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin: auto;
  position: relative;

  &.focus-alert {
    transition: 200ms ease;
    opacity: 0.5;
    filter: blur(4px);
  }
`;

const InputHandler = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  cursor: default;
  color: transparent;
  opacity: 0;

  &:focus,
  &:active {
    border: none;
    outline: none;
  }
`;

const FocusAlert = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  color: ${colors.text};
  pointer-events: none;
  text-shadow: 0 0 16px black;
  font-size: 20px;
  font-weight: 500;

  svg {
    margin-right: 5px;
  }
`;

const KeyToPress = styled.div`
  font-size: 80px;
  position: absolute;
  background: ${colors.primary}80;
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  border-radius: 10%;
  color: ${colors.text};
  pointer-events: none;
`;

const AbovePanel = styled.div`
  color: ${colors.text}80;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 15px;
  display: flex;

  p {
    font-weight: 400;

    b {
      font-weight: 500;
      color: ${colors.secondary}80;
    }
  }

  span {
    margin: 0 20px;
    color: ${colors.secondary};
  }
`;
