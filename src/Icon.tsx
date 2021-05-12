import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  size: number;
  padding: number;
  cursor?: boolean;
  margin?: string;
}

// Component ---------------------------------------------------------------------
const Icon: React.FC<Props> = ({ size, padding, children, cursor, margin }) => {
  return (
    <Wrapper
      style={{
        height: `${size}px`,
        width: `${size}px`,
        padding: `${padding}px`,
        margin: margin,
        cursor: `${cursor ? "pointer" : ""}`,
      }}
    >
      {children}
    </Wrapper>
  );
};

export default Icon;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  svg {
    width: 100%;
    height: 100%;
  }
`;
