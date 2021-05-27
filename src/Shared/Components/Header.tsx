import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import { colors } from "../Global/Colors";
import Button from "./Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  const { user } = useAuth();
  return (
    <Wrapper>
      <Link to="/">
        <Logo>
          <small>monkey see</small>
          monkeyclone
        </Logo>
      </Link>
      <Menu>
        {user ? (
          <>
            <Button reversed={true} type="logout" />
          </>
        ) : (
          <>
            <Button type="login" />
            <Button reversed={true} type="signup" />
          </>
        )}
      </Menu>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 950px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 99;

  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  position: relative;
  font-size: 36px;
  color: ${colors.main};
  font-weight: 400;
  letter-spacing: -0.5px;
  user-select: none;

  small {
    position: absolute;
    color: ${colors.sub};
    font-size: 11px;
    line-height: 14px;
    font-weight: 500;
  }
`;

const Menu = styled.div`
  display: grid;
  column-gap: 15px;
  grid-auto-flow: column;
`;
