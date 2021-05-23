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
        <Logo>soon...</Logo>
      </Link>
      <Menu>
        {user ? (
          <>
            <Button type="logout" />
          </>
        ) : (
          <>
            <Button reversed={true} type="login" />
            <Button type="signup" />
          </>
        )}
      </Menu>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 1000px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);

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
  display: grid;
  column-gap: 15px;
  grid-auto-flow: column;
`;
