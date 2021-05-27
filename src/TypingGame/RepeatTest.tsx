import React, { useEffect } from "react";
import styled from "styled-components";
import { FaRedoAlt } from "react-icons/fa";
import { colors } from "../Shared/Global/Colors";
import { useTypingData } from "../Contexts/TypingGameContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RepeatTest: React.FC<Props> = () => {
  const { getRandomQuote, isShowing, setShowing } = useTypingData();
  const repeatHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    getRandomQuote();
    setShowing(false);
    setTimeout(() => setShowing(true), 250);
  };

  return (
    <Wrapper>
      <Icon onClickCapture={repeatHandler} tabIndex={2}>
        <FaRedoAlt />
      </Icon>
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
