import React, { useEffect } from "react";
import styled from "styled-components";
import { useTypingData } from "../Contexts/TypingGameContext";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {
  characters: number;
  errors: number;
}

// Component ---------------------------------------------------------------------
const TypingStats: React.FC<Props> = ({ errors, characters }) => {
  const {
    isPlaying,
    time,
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
    setRaw(characters / minute / 5);
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

  color: ${colors.sub};
  font-size: 24px;

  div {
    margin-right: 20px;
  }
`;

const Timer = styled.div``;

const WPM = styled.div``;
