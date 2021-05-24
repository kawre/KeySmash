import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  isPlaying: boolean;
}

// Component ---------------------------------------------------------------------
const Timer: React.FC<Props> = ({ isPlaying }) => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => setTimer(timer + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  return <Wrapper>{timer}</Wrapper>;
};

export default Timer;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p``;
