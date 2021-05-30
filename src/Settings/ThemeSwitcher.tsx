import React from "react";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import { useData } from "../Contexts/DataContext";
// Types -------------------------------------------------------------------------

// Component ---------------------------------------------------------------------
const ThemeSwitcher: React.FC = () => {
  const { userData } = useAuth();
  const { changeTheme, themes } = useData();

  return (
    <Wrapper>
      {themes.map((theme, index) => {
        const { name, background, main } = theme;

        let active = false;
        if (userData?.theme === name) active = true;

        return (
          <Theme
            key={index}
            style={{ background: background, color: main }}
            onClick={() => {
              if (!userData)
                return localStorage.setItem("theme", JSON.stringify(name));

              changeTheme(name!);
            }}
            className={active ? "active" : ""}
          >
            <Active style={{ background: main }} />
            <p>{name}</p>
          </Theme>
        );
      })}
      <Theme></Theme>
    </Wrapper>
  );
};

export default ThemeSwitcher;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
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
