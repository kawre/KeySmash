import React from "react";
import { FaRedoAlt } from "react-icons/fa";
import styled from "styled-components";
import { useStats } from "../Contexts/StatsContext";
import Button from "../Shared/Components/Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RepeatTest: React.FC<Props> = () => {
  const { reset } = useStats();

  return (
    <Wrapper>
      <Button tabIndex={2} type="test" onClick={reset}>
        <FaRedoAlt />
      </Button>
    </Wrapper>
  );
};

export default RepeatTest;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  margin-top: 25px;
  width: 100%;
  display: grid;
  place-items: center;
`;

const Icon = styled.button`
  cursor: pointer;
  height: 40px;
  padding: 12px;
  width: 40px;
  transition: 150ms ease;
  border-radius: 4px;
  outline: none;

  &:hover,
  &:focus {
    background: ${(props) => props.theme.sub};

    svg {
      color: ${(props) => props.theme.main};
    }
  }

  svg {
    transition: 150ms ease;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.sub};
  }
`;
