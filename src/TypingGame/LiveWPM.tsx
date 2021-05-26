import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  timer: number;
  current: number;
}

// Component ---------------------------------------------------------------------
const LiveWPM: React.FC<Props> = ({ timer, current }) => {
  const [wpm, setWPM] = useState<number>(0);

  useEffect(() => {
    if (timer === 0) return;

    let minutes = timer / 60;
    setWPM(Math.floor(current / minutes));
  }, [timer]);

  return <Wrapper>{wpm}</Wrapper>;
};

export default LiveWPM;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p``;
