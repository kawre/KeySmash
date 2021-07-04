import React, { useRef } from "react";
import styled from "styled-components";
import { useTypingData } from "../Contexts/TypingGameContext";
import Button from "../Shared/Components/Button";
import { FaChevronRight } from "react-icons/fa";
import TypingChart from "./TypingChart";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const PostTestStats: React.FC<Props> = () => {
  const {
    results,
    setResults,
    wpm,
    cpm,
    acc,
    raw,
    characters,
    errors,
    time,
    repeatTest,
  } = useTypingData();

  const resultsRef = useRef<HTMLDivElement>(null);

  const repeatHandler = () => {
    if (!resultsRef.current) return;
    const ref = resultsRef.current.classList;
    ref.add("fade-out");
    setTimeout(() => {
      ref.remove("fade-out");
      repeatTest();
    }, 150);
  };

  return (
    <Wrapper ref={resultsRef} className={`${!results && "hidden"}`}>
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
        <TypingChart />
      </Top>
      <Bottom>
        <Raw>
          <p>raw</p>
          {raw}
        </Raw>
        <Cpm>
          <p>cpm</p>
          {cpm}
        </Cpm>
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
      <Panel>
        <Button type="test" tabIndex={0} onClick={repeatHandler}>
          <FaChevronRight />
        </Button>
      </Panel>
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
  color: ${(props) => props.theme.main};
  animation: fadeIn 300ms forwards;

  p {
    font-size: 32px;
    color: ${(props) => props.theme.sub};
    line-height: 15px;
  }

  &.fade-out {
    animation: fadeOut 150ms forwards;
  }

  @keyframes fadeOut {
    0% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -45%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// Top
const Top = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

// Top left
const TopLeft = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
`;

const WPM = styled.div``;

const Acc = styled.div``;

// Top right
const TopRight = styled.div`
  width: 100%;
  height: 200px;
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
      color: ${(props) => props.theme.error};
    }
    &.correct {
      color: ${(props) => props.theme.main};
    }
    &.slash {
      padding: 0 6px;
      color: ${(props) => props.theme.sub};
    }
  }
`;

const Time = styled.div``;

const Raw = styled.div``;

const Cpm = styled.div``;

// Panel
const Panel = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
