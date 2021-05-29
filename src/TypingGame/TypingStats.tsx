import React, { useEffect } from "react";
import styled from "styled-components";
import { useTypingData } from "../Contexts/TypingGameContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingStats: React.FC<Props> = () => {
  const {
    isPlaying,
    time,
    characters,
    errors,
    wpm,
    setWPM,
    cpm,
    setCPM,
    raw,
    setRaw,
    acc,
    setAcc,
  } = useTypingData();

  useEffect(() => {
    if (time === 0) return;
    const diff = characters - errors;
    const minute = time / 60;

    setAcc(Math.floor((diff / characters) * 100));
    setCPM(Math.floor(diff / minute));
    setWPM(Math.floor(diff / minute / 5));
    setRaw(Math.floor(characters / minute / 5));
  }, [time]);

  return (
    <Wrapper>
      {isPlaying && (
        <>
          <Timer>{time}</Timer>
          <WPM>{wpm}</WPM>
        </>
      )}
    </Wrapper>
  );
};

export default TypingStats;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  margin: 0 4px;
  margin-bottom: 10px;
  height: 32px;
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.sub};
  font-size: 24px;

  div {
    margin-right: 20px;
  }
`;

const Timer = styled.div``;

const WPM = styled.div``;
