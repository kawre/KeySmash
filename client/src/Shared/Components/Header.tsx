import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import { FaKeyboard } from "react-icons/fa";
import Button from "./Button";
import { RiSettings3Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  const { user } = useAuth();
  return (
    <Wrapper>
      <Left>
        <Link to="/">
          <Logo>
            <small>monkey see</small>
            <p>monkeyclone</p>
          </Logo>
        </Link>
        <Navigation>
          <Link to="/">
            <Button type="icon">
              <FaKeyboard />
            </Button>
          </Link>
          <Link to="/settings">
            <Button type="icon">
              <RiSettings3Fill />
            </Button>
          </Link>
          <Link to="">
            <Button type="icon">
              {user ? (
                <>
                  <FaUser style={{ padding: "1px" }} />
                  <p>{user?.username}</p>
                </>
              ) : (
                <FaRegUser style={{ padding: "1px" }} />
              )}
            </Button>
          </Link>
        </Navigation>
      </Left>
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
  height: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 99;

  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  position: relative;
  color: ${(props) => props.theme.main};
  white-space: nowrap;
  user-select: none;
  transition: 250ms;

  p {
    font-size: 36px;
    line-height: 36px;
  }

  small {
    position: absolute;
    top: -6px;
    color: ${(props) => props.theme.sub};
    font-size: 10.3px;
    font-weight: 500;
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-top: 2px;
  padding-left: 10px;
`;

const Menu = styled.div`
  display: grid;
  column-gap: 15px;
  grid-auto-flow: column;
`;
