import React from "react";
import styled from "styled-components";
import { colors } from "../Global";
// Types -------------------------------------------------------------------------

interface Props {
  disabled: boolean;
}

// Component ---------------------------------------------------------------------
const SubmitButton: React.FC<Props> = ({ disabled, children }) => {
  return (
    <Wrapper disabled={disabled} type="submit">
      {children}
    </Wrapper>
  );
};

export default SubmitButton;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button`
  height: 40px;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid ${colors.secondary};
  background: none;
  outline: none;
  cursor: pointer;
  color: ${colors.text};
  transition: 150ms ease;
  border-radius: 6px;
  margin-bottom: 20px;

  &:hover {
    background: ${colors.secondary};
    color: ${colors.body};
  }
`;
