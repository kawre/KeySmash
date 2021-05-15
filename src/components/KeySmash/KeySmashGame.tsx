import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../../Global";
import { GiArrowCursor } from "react-icons/gi";
import QwertyKeyboard from "../Keyboards/qwerty";
import { keys as keysArray } from "../../LocalData/keys";
import { setTimeout } from "timers";
import { useData } from "../../contexts/DataContext";
import { v4 as uuidv4 } from "uuid";
import Loader from "react-loader-spinner";
import Button from "../Button";

// Types -------------------------------------------------------------------------

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

// Component ---------------------------------------------------------------------
const KeySmashGame: React.FC<Props> = ({ show, setShow }) => {
  const [postGame, setPostGame] = useState<boolean>(false);
  const { sendFinalResults } = useData();
  const resultsRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState<boolean>(true);
  const [game, setGame] = useState<boolean>(false);
  const [alert] = useState<string>("Press any key to start");
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [countDown, setCountDown] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [keys] = useState<string[]>(keysArray);
  const [score, setScore] = useState<number>(-1);
  const [randomKey, setRandomKey] = useState<string>("Ready?");
  const [loading, setLoading] = useState<boolean>(false);
  const audio = new Audio("https://media1.vocaroo.com/mp3/1dLVjOVcqDsj");
  audio.volume = 0.33;

  const keyPressHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (score === -1) {
      countDownHandler();
      return;
    }

    validationHandler(e.key);
  };

  const validationHandler = (e: string) => {
    setIsPlaying(true);
    const key = valueHandler(e);
    const keyIndex = getIndex(key);
    const randomKeyIndex = getIndex(randomKey);

    // validation
    if (key === randomKey) {
      audio.play();
      document
        .querySelector(`#${key}`)
        ?.classList.add("keycap-pressed-successfully");
      setScore(score + 1);
      keys.splice(keyIndex, 1);
    } else {
      document
        .querySelector(`#${randomKey}`)
        ?.classList.add("keycap-pressed-unsuccessfully");
      keys.splice(randomKeyIndex, 1);
    }

    if (keys.length === 0) {
      setIsPlaying(false);
      setGame(false);
      return;
    }
    setRandomKey(() => {
      return keys[Math.floor(Math.random() * keys.length)];
    });
  };

  const countDownHandler = async () => {
    setCountDown(true);
    setGame(true);
    await timeout(900);
    setRandomKey("steady?");
    await timeout(600);
    setRandomKey("go!");
    await timeout(300);
    setRandomKey(() => {
      return keys[Math.floor(Math.random() * keys.length)];
    });
    setScore(0);
    setCountDown(false);
    if (inputRef.current) inputRef.current.focus();
  };

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // send the data to the server and showcase the restults
  useEffect(() => {
    if (isPlaying !== false) return;
    const sendData = async () => {
      setLoading(true);
      const id: string = uuidv4();
      const game = "key-smash";

      try {
        await sendFinalResults(game, id, score, timer);
        setPostGame(true);
      } catch {
        console.log("error");
      }
      setLoading(false);
    };
    sendData();
  }, [isPlaying]);

  // animation on key to press change
  useEffect(() => {
    if (pRef.current !== null) {
      pRef.current.classList.add(`animation`);
      setTimeout(() => {
        if (pRef.current !== null) pRef.current.classList.remove(`animation`);
      }, 100);
    }
  }, [randomKey]);

  // get index of key
  const getIndex = (key: string) => {
    return keys.indexOf(key);
  };

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

  const randomKeyFilter = (value: string) => {
    if (value === "equal") return "=";
    if (value === "tilda") return "`";
    if (value === "minus") return "-";
    if (value === "open-bracket") return "[";
    if (value === "close-bracket") return "]";
    if (value === "backslash") return "\\";
    if (value === "semicolon") return ";";
    if (value === "quote") return "'";
    if (value === "comma") return ",";
    if (value === "dot") return ".";
    if (value === "slash") return "/";
    if (value === "key-1") return "1";
    if (value === "key-2") return "2";
    if (value === "key-3") return "3";
    if (value === "key-4") return "4";
    if (value === "key-5") return "5";
    if (value === "key-6") return "6";
    if (value === "key-7") return "7";
    if (value === "key-8") return "8";
    if (value === "key-9") return "9";
    if (value === "key-0") return "0";
    return value.toUpperCase();
  };

  if (loading)
    return (
      <Wrapper>
        <Loader type="ThreeDots" color={colors.secondary} height={75} />
      </Wrapper>
    );

  if (postGame)
    return (
      <Wrapper>
        <Results ref={resultsRef} className={show ? "" : "unmount-animation"}>
          <p>score: {score}</p>
          <p>time: {timer}</p>
          <Button
            onClick={async () => {
              if (resultsRef.current)
                resultsRef.current.classList.add("unmount-animation");
              await timeout(100);
              setShow(false);
              await timeout(100);
              setShow(true);
            }}
          >
            Play Again
          </Button>
        </Results>
      </Wrapper>
    );

  return (
    <Wrapper>
      {!focus && (
        <FocusAlert>
          <GiArrowCursor />
          Click or press any key to focus
        </FocusAlert>
      )}
      <RowsWrapper className={focus ? "" : "focus-alert"}>
        {game && (
          <KeyToPress>
            <p ref={pRef}>{randomKeyFilter(randomKey)}</p>
          </KeyToPress>
        )}
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
          ref={inputRef}
          disabled={countDown}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 350);
          }}
          onKeyPress={keyPressHandler}
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
  font-size: 30px;
  top: -90px;
  left: 50%;
  height: 75px;
  width: 75px;
  transform: translate(-50%, 0%);
  position: absolute;
  color: ${colors.primary};
  background: ${colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  border-radius: 10%;

  p {
    animation: none;

    &.animation {
      animation: textScale 100ms forwards;
    }
  }
`;

const AbovePanel = styled.div`
  color: ${colors.background};
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 15px;
  display: flex;

  p {
    font-weight: 400;

    b {
      font-weight: 500;
      /* color: ${colors.secondary}80; */
    }
  }

  span {
    margin: 0 20px;
    color: ${colors.secondary};
  }
`;

const Results = styled.div`
  background: ${colors.background};
  color: ${colors.secondary};
  border-radius: 6px;
  padding: 20px;

  &.unmount-animation {
    animation: unmount 100ms;
  }

  @keyframes unmount {
    0% {
      transform: translateY(0%);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-50%);
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 15px;
  }
`;
