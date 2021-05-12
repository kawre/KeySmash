import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { colors } from "../Global";
import Button from "./Button";
// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
const Header = () => {
  const { userData, logOut } = useAuth();
  console.log(userData);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Link to="/">
          <Logo>KeySmash</Logo>
        </Link>
        <AccoutAccessibility>
          {userData ? (
            <>
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
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: ${colors.primary};
  letter-spacing: 4px;
  font-size: 26px;
`;

const AccoutAccessibility = styled.div`
  display: flex;

  button {
    margin-left: 15px;
  }
`;
