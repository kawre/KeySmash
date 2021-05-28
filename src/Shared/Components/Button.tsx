import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import { colors } from "../Global/Colors";
import Loader from "react-loader-spinner";
// Types -------------------------------------------------------------------------

interface Props {
  size?: number;
  padding?: number;
  margin?: string;
  disabled?: boolean;
  type: "logout" | "icon" | "login" | "signup" | "submit" | "test";
  reversed?: boolean;
  onClickCapture?: any;
  tabIndex?: number;
}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({
  onClickCapture,
  reversed,
  disabled,
  type,
  tabIndex,
  children,
}) => {
  const { logOut } = useAuth();

  if (type === "test")
    return (
      <Test tabIndex={tabIndex} onClickCapture={onClickCapture}>
        {children}
      </Test>
    );

  if (type === "icon") {
    return <IconButton>{children}</IconButton>;
  }

  if (type === "login") {
    return (
      <Link to="/login">
        <AccoutButton className={reversed ? "reversed" : ""}>
          Log In
        </AccoutButton>
      </Link>
    );
  }

  if (type === "signup") {
    return (
      <Link to="/register">
        <AccoutButton className={reversed ? "reversed" : ""}>
          Sign Up
        </AccoutButton>
      </Link>
    );
  }

  if (type === "logout") {
    return (
      <AccoutButton className={reversed ? "reversed" : ""} onClick={logOut}>
        Sign Out
      </AccoutButton>
    );
  }

  if (type === "submit") {
    return (
      <SubmitButton disabled={disabled}>
        {disabled ? (
          <Loader type="ThreeDots" color={colors.background} height={8} />
        ) : (
          children
        )}
      </SubmitButton>
    );
  }

  return null;
};

export default Button;

// Styled ------------------------------------------------------------------------

const IconButton = styled.div`
  display: flex;
  transition: 250ms;
  color: ${colors.sub};
  cursor: pointer;
  padding: 8px;

  &:hover {
    color: ${colors.text};
  }

  svg {
    width: 20px;
  }
`;

const AccoutButton = styled.button`
  height: 35px;
  padding: 0 20px;
  background: transparent;
  border-radius: 4px;
  color: ${colors.sub};

  &:hover {
    color: ${colors.main};
  }
  &:active {
    background: ${colors.sub};
  }

  &.reversed {
    background: ${colors.main};
    color: ${colors.background};

    &:hover {
      color: ${colors.main};
      background: ${colors.background};
    }

    &:active {
      background: ${colors.sub};
    }
  }
`;

const SubmitButton = styled.button`
  padding: 10px 0;
  width: 100%;
  background: #0000001a;
  color: ${colors.text};
  border-radius: 4px;
  text-align: center;

  &:hover {
    background: ${colors.main};
    color: ${colors.background};
  }
`;

const Test = styled.button`
  display: flex;
  padding: 16px 32px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: 250ms ease;

  &:hover,
  &:focus {
    color: ${colors.main};
    svg {
      color: ${colors.main};
    }
  }

  &:active,
  &:focus {
    background: ${colors.sub};
  }

  svg {
    transition: 250ms ease;
    height: 20px;
    width: 20px;
    color: ${colors.sub};
  }
`;
