import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  size?: number;
  padding?: number;
  margin?: string;
  disabled?: boolean;
  type: "icon" | "login" | "submit";
}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({
  disabled,
  type,
  size,
  padding,
  children,
  margin,
}) => {
  if (type === "icon") {
    return <IconButton>{children}</IconButton>;
  }
  if (type === "login") {
    return <LoginButton>Log In</LoginButton>;
  }
  if (type === "submit") {
    return <SubmitButton disabled={disabled}>Submit</SubmitButton>;
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

const LoginButton = styled.button``;

const SubmitButton = styled.button``;
