import React from "react";
import styled from "styled-components";
import { colors } from "../Shared/Global/Colors";
import LiveWPM from "./LiveWPM";
// Types -------------------------------------------------------------------------

interface Props {
  timer: number;
  isPlaying: boolean;
  current: number;
}

// Component ---------------------------------------------------------------------
const TypingStats: React.FC<Props> = ({ isPlaying, timer, current }) => {
  return (
    <Wrapper>
      {isPlaying && (
        <>
          <Timer>{timer}</Timer>
          <LiveWPM current={current} timer={timer} />
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

  color: ${colors.background};
  font-size: 24px;

  div {
    margin-right: 20px;
  }
`;

const Timer = styled.div``;
