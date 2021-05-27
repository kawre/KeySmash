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
    timer,
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
    if (timer === 0) return;
    const diff = characters - errors;
    const minute = timer / 60;

    setAcc(Math.floor((diff / characters) * 100));
    setCPM(Math.floor(diff / minute));
    setWPM(Math.floor(diff / minute / 5));
    setRaw(characters / minute / 5);
  }, [timer]);

  return (
    <Wrapper>
      {isPlaying && (
        <>
          <Timer>{timer}</Timer>
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
