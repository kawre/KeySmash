import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../Global";
// Types -------------------------------------------------------------------------

interface Props {
  bg?: false;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({ onClick, bg, children }) => {
  const [background, setBackground] = useState<boolean>();

  useEffect(() => {
    if (bg !== undefined) return setBackground(false);
    return setBackground(true);
  }, [bg]);

  return (
    <Wrapper className={background ? "" : "btn-transparent"} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default Button;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.button`
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  height: 37px;
  padding: 0 20px;
  border-radius: 6px;
  background-color: ${colors.secondary};
  color: ${colors.body};
  cursor: pointer;
  transition: 150ms ease;

  &:hover {
    /* color: ${colors.text}; */
    background-color: ${colors.primary};
  }

  &.btn-transparent {
    color: ${colors.text};
    background-color: transparent;

    &:hover {
      background-color: ${colors.primary};
      color: ${colors.body};
    }
  }
`;
