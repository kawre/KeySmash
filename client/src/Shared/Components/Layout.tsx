import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  center?: any;
}

// Component ---------------------------------------------------------------------
const Layout: React.FC<Props> = ({ children, center }) => {
  if (center) return <Center>{children}</Center>;
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  max-width: 950px;
  min-height: 100vh;
  margin: auto;
  padding-top: 114px;
`;

const Center = styled(Wrapper)`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
