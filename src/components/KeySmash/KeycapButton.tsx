import React from "react";
import styled from "styled-components";
import { colors } from "../../Global";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const KeycapButton: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default KeycapButton;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button`
  border: 2px solid ${colors.border};
  border-radius: 8px;
  background-color: ${colors.background};
  outline: none;
  margin: 0 5px;
  height: 60px;
  width: 60px;
  color: ${colors.text};
  font-size: 18px;
  font-weight: 500;
`;
