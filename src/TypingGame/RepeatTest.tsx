import React from "react";
import styled from "styled-components";
import { FaRedoAlt } from "react-icons/fa";
import { colors } from "../Shared/Global/Colors";
import { useTypingData } from "../Contexts/TypingGameContext";
import Button from "../Shared/Components/Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RepeatTest: React.FC<Props> = () => {
  const { repeatTest } = useTypingData();

  return (
    <Wrapper>
      {/* <Icon onClickCapture={repeatTest} tabIndex={2}></Icon> */}
      <Button tabIndex={2} type="test" onClickCapture={repeatTest}>
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
    background: ${colors.sub};

    svg {
      color: ${colors.main};
    }
  }

  svg {
    transition: 150ms ease;
    width: 100%;
    height: 100%;
    color: ${colors.sub};
  }
`;
