import React from "react";
import styled from "styled-components";
import { useTypingData } from "../Contexts/TypingGameContext";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const PostTestStats: React.FC<Props> = () => {
  const { results, setResults, wpm, cpm, acc, raw } = useTypingData();
  return (
    <Wrapper className={`${!results && "hidden"}`}>
      <Top>
        <TopLeft>
          <WPM>
            <p>wpm</p>
            {wpm}
          </WPM>
          <Acc>
            <p>acc</p>
            {acc}%
          </Acc>
        </TopLeft>
        <TopRight>
          <Graph>graph</Graph>
        </TopRight>
      </Top>
      <Bottom></Bottom>
    </Wrapper>
  );
};

export default PostTestStats;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 950px;
  font-size: 64px;
  color: ${colors.main};

  p {
    font-size: 32px;
    color: ${colors.sub};
    line-height: 15px;
  }
`;

const Top = styled.div`
  display: flex;
`;

const Bottom = styled.div``;

const TopLeft = styled.div`
  flex-shrink: 0;
`;

const TopRight = styled.div`
  width: 100%;
  height: 100%;
`;

const Graph = styled.div``;

const WPM = styled.div``;

const Acc = styled.div``;
