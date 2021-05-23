import React from "react";
import styled from "styled-components";
import { colors } from "../Global/Colors";
import Button from "./Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Logo>soon...</Logo>
      <Menu>
        <Button type="icon">siema</Button>
      </Menu>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 1000px;
  margin: auto;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 35px;
  color: ${colors.secondary};
  font-weight: 500;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;
