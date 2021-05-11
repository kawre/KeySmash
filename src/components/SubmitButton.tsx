import React from "react";
import styled from "styled-components";
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
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`;
