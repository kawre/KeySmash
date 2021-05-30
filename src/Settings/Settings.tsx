import React from "react";
import styled from "styled-components";
import ThemeIndex from "./Theme/ThemeIndex";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Settings: React.FC<Props> = () => {
  return (
    <Wrapper>
      <ThemeIndex />
    </Wrapper>
  );
};

export default Settings;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 950px;
  height: 100%;
  margin: auto;
  margin-top: 82px;
  padding-top: 100px;
`;
