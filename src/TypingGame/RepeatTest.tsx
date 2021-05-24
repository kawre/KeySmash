import React from "react";
import styled from "styled-components";
import { FaSyncAlt } from "react-icons/fa";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const RepeatTest: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Icon>
        <FaSyncAlt />
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

const Icon = styled.div`
  cursor: pointer;
  height: 40px;
  padding: 10px;
  width: 40px;
  transition: 150ms ease;
  border-radius: 4px;

  &:hover {
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
