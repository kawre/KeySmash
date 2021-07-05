import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStats } from "../Contexts/StatsContext";
import { useTyping } from "../Contexts/TypingGameContext";
import { r } from "../Shared/utils/number";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingStats: React.FC<Props> = () => {
  const { isPlaying } = useTyping();
  const { timeps, wps } = useStats();

  return (
    <Wrapper>
      {isPlaying && (
        <>
          <Timer>{timeps}</Timer>
          <WPM>{r(wps)}</WPM>
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
