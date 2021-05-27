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
  type: "logout" | "icon" | "login" | "signup" | "submit";
  reversed?: boolean;
}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({ reversed, disabled, type, children }) => {
  const { logOut } = useAuth();

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
  cursor: pointer;
  height: 33px;
  width: 36px;
  padding: 8px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const AccoutButton = styled.button`
  height: 35px;
  padding: 0 20px;
  background: transparent;
  border-radius: 4px;
  color: ${colors.sub};

  &:hover {
    background: ${colors.sub};
    color: ${colors.main};
  }

  &.reversed {
    background: ${colors.main};
    color: ${colors.background};
    border: 2px solid transparent;

    &:hover {
      background: transparent;
      color: ${colors.main};
      border: 2px solid ${colors.main};
    }
  }
`;

const SubmitButton = styled.button`
  height: 35px;
  width: 100%;
  background: ${colors.sub};
  color: ${colors.background};
  border-radius: 4px;
  display: grid;
  place-items: center;
`;
