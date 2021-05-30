import React from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const ThemeSwitcher: React.FC<Props> = () => {
  const {} = useData();
  return (
    <Wrapper>
      <h1>themes</h1>
    </Wrapper>
  );
};

export default ThemeSwitcher;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
