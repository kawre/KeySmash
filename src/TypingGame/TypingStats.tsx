import React from "react";
import styled from "styled-components";
import { colors } from "../Shared/Global/Colors";
import LiveWPM from "./LiveWPM";
import Timer from "./Timer";
// Types -------------------------------------------------------------------------

interface Props {
  isPlaying: boolean;
}

// Component ---------------------------------------------------------------------
const TypingStats: React.FC<Props> = ({ isPlaying }) => {
  return (
    <Wrapper>
      {isPlaying && (
        <>
          <Timer isPlaying={isPlaying} />
          <LiveWPM />
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

  color: ${colors.background};
  font-size: 24px;
`;
