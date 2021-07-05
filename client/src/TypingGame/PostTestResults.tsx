import React, { useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { useStats } from "../Contexts/StatsContext";
import Button from "../Shared/Components/Button";
import { r } from "../Shared/utils/number";
import TypingChart from "./TypingChart";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const PostTestStats: React.FC<Props> = () => {
  const {
    results,
    wpm,
    cpm,
    acc,
    raw,
    correct,
    incorrect,
    time,
    missed,
    extra,
    reset,
  } = useStats();

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => console.log(correct), [correct]);

  const repeatHandler = () => {
    if (!resultsRef.current) return;
    const ref = resultsRef.current.classList;
    ref.add("fade-out");
    setTimeout(() => {
      ref.remove("fade-out");
      reset();
    }, 150);
  };

  return (
    <Wrapper ref={resultsRef} className={`${!results && "hidden"}`}>
      <Top>
        <TopLeft>
          <WPM aria-label={`${wpm} wpm`}>
            <p>wpm</p>
            {r(wpm)}
          </WPM>
          <Acc aria-label={`${acc}%`}>
            <p>acc</p>
            {r(acc)}%
          </Acc>
        </TopLeft>
        <TypingChart />
      </Top>
      <Bottom>
        <Raw aria-label={`${raw} raw`}>
          <p>raw</p>
          {r(raw)}
        </Raw>
        <Cpm aria-label={`${cpm} cpm`}>
          <p>cpm</p>
          {r(cpm)}
        </Cpm>
        <Characters aria-label="corrent, incorrect, extra and missed">
          <p>correct</p>
          <div>
            {correct}/{incorrect}/{extra}/{missed}
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
