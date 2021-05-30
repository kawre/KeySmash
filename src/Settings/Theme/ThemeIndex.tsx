import React, { useState } from "react";
import styled from "styled-components";
import SettingsTitle from "../SettingsTitle";
import ThemeSwitcher from "./ThemeSwitcher";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const ThemeIndex: React.FC<Props> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Wrapper>
      <SettingsTitle
        onClick={() => setCollapsed(!collapsed)}
        collapsed={collapsed}
        type="big"
      >
        theme
      </SettingsTitle>
      <ThemeSwitcher />
    </Wrapper>
  );
};

export default ThemeIndex;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
