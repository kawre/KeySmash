import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TiUser } from "react-icons/ti";
import { RiSettings4Fill } from "react-icons/ri";
import { FaKeyboard } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { colors } from "../Global";
import Button from "./Button";
import Icon from "../Icon";
// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
const Header = () => {
  const { userData, logOut } = useAuth();

  return (
    <Wrapper>
      <HeaderWrapper>
        <Link to="/">
          <Logo>KeySmash</Logo>
        </Link>
        <AccoutAccessibility>
          <GamesNav>
            <Link to="/typing-game">
              <Icon size={32} padding={5} cursor={true}>
                <FaKeyboard color={colors.text} />
              </Icon>
            </Link>
          </GamesNav>
          <span>|</span>
          {userData ? (
            <>
              <Icon size={32} padding={5} margin="0 0 0 5px" cursor={true}>
                <RiSettings4Fill color={colors.text} />
              </Icon>
              <Icon size={36} padding={5} margin="0 0 0 5px" cursor={true}>
                <TiUser color={colors.text} />
              </Icon>
              <Button onClick={logOut}>Log Out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button bg={false}>Log In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </AccoutAccessibility>
      </HeaderWrapper>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.nav`
  position: absolute;
  width: 100%;
  padding-top: 50px;

  a {
    text-decoration: none;
  }
`;

const HeaderWrapper = styled.div`
  width: 800px;
  height: 40px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin: 0 5px 0 10px;
    color: ${colors.secondary};
  }
`;

const Logo = styled.h1`
  color: ${colors.primary};
  letter-spacing: 3px;
  font-weight: 500;
  font-size: 26px;
`;

const AccoutAccessibility = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 15px;
  }
`;

const GamesNav = styled.div``;
