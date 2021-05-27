import React from "react";
import styled from "styled-components";
import { useTypingData } from "../Contexts/TypingGameContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const PostTestStats: React.FC<Props> = () => {
  const { results, setResults } = useTypingData();
  return (
    <Wrapper className={`${!results && "hidden"}`}>
      <h1>stats!</h1>
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
`;
