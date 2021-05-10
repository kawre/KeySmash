import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const KeyCapButton: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Key>{children}</Key>
    </Wrapper>
  );
};

export default KeyCapButton;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button`
  width: 60px;
  height: 60px;
  background: #ffffff1a;
  border: 2px solid #ffffff33;
  border-radius: 8px;
  outline: none;
  margin: 0 5px;
`;

const Key = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
