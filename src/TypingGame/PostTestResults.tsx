import React from "react";
import styled from "styled-components";
import { useTypingData } from "../Contexts/TypingGameContext";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const PostTestStats: React.FC<Props> = () => {
  const { results, setResults, wpm, cpm, acc, raw, characters, errors, time } =
    useTypingData();
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
          <Graph></Graph>
        </TopRight>
      </Top>
      <Bottom>
        <Raw>
          <p>raw</p>
          {raw}
        </Raw>
        <Characters>
          <p>characters</p>
          <div>
            <span className="correct">{characters}</span>
            <span className="slash">/</span>
            <span className="error">{errors}</span>
          </div>
        </Characters>
        <Time>
          <p>time</p>
          {time}s
        </Time>
      </Bottom>
      <Panel></Panel>
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

// Top
const Top = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

// Top left
const TopLeft = styled.div`
  flex-shrink: 0;
  padding-right: 25px;
`;

const WPM = styled.div``;

const Acc = styled.div``;

// Top right
const TopRight = styled.div`
  width: 100%;
`;

const Graph = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.sub};
`;

// Bottom

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    font-size: 32px;

    p {
      font-size: 16px;
    }
  }
`;

const Characters = styled.div`
  span {
    &.error {
      color: ${colors.error};
    }
    &.correct {
      color: ${colors.main};
    }
    &.slash {
      padding: 0 10px;
      color: ${colors.sub};
    }
  }
`;

const Time = styled.div``;

const Raw = styled.div``;

// Panel
const Panel = styled.div`
  display: flex;
  justify-content: center;
`;
