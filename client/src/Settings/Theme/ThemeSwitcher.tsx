import React from "react";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import { useData } from "../../Contexts/DataContext";
import SettingsTitle from "../SettingsTitle";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const ThemeSwitcher: React.FC<Props> = () => {
  const { userData } = useAuth();
  const { changeTheme, themes } = useData();
  const localName = JSON.parse(localStorage.getItem("theme")!).name;

  const themeHandler = (name: string) => {
    if (!userData) return;
    changeTheme(name!);
  };

  return (
    <Wrapper>
      <SettingsTitle type="small">theme</SettingsTitle>
      <Themes>
        {themes.map((theme) => {
          const { name, background, main } = theme;

          let active = false;
          if (localName === name) active = true;

          return (
            <Theme
              key={name}
              style={{ background: background, color: main }}
              onClick={() => themeHandler(name!)}
              className={active ? "active" : ""}
            >
              <Active style={{ background: main }} />
              <p>{name}</p>
            </Theme>
          );
        })}
      </Themes>
    </Wrapper>
  );
};

export default ThemeSwitcher;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding-top: 25px;
  transition: 250ms ease;
`;

const Themes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Theme = styled.div`
  position: relative;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  height: 30px;
  transition: 250ms ease;
  border-radius: 4px;
  user-select: none;

  &.active {
    div {
      opacity: 1;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Active = styled.div`
  position: absolute;
  transition: 250ms ease;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  opacity: 0;
`;
