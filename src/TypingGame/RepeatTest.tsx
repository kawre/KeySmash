import React from "react";
import styled from "styled-components";
import { FaRedoAlt } from "react-icons/fa";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component ---------------------------------------------------------------------
const RepeatTest: React.FC<Props> = ({ setShow }) => {
  const repeatHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShow(false);
    setTimeout(() => setShow(true), 500);
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
  padding: 10px;
  width: 40px;
  transition: 150ms ease;
  border-radius: 4px;
  outline: none;

  &:hover,
  &:focus {
    background: ${colors.background};

    svg {
      color: ${colors.secondary};
    }
  }

  svg {
    transition: 150ms ease;
    width: 100%;
    height: 100%;
    color: ${colors.text}80;
  }
`;
