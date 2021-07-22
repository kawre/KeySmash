import { gql } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../Contexts/AuthContext";
import { useData } from "../../Contexts/DataContext";
import {
  Theme,
  useChangeThemeMutation,
  useThemesQuery,
} from "../../generated/graphql";
import SettingsTitle from "../SettingsTitle";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const ThemeSwitcher: React.FC<Props> = () => {
  const { setTheme, theme } = useData();
  const { user } = useAuth();
  const { data } = useThemesQuery();
  const [changeTheme] = useChangeThemeMutation();

  return (
    <Wrapper>
      <SettingsTitle type="small">theme</SettingsTitle>
      <Themes>
        {data?.themes.map(({ __typename, ...t }) => {
          const { name, background, main } = t;

          let active = false;
          if (theme.name === name) active = true;

          return (
            <ThemeCont
              key={name}
              style={{ background: background, color: main }}
              onClick={() => {
                if (user) {
                  changeTheme({
                    variables: { name },
                    update: (cache, { data }) => {
                      setTheme(data?.changeTheme as Theme);

                      cache.writeFragment({
                        id: `User:${user.id}`,
                        fragment: gql`
                          fragment _ on User {
                            theme
                          }
                        `,
                        data: { theme: name },
                      });
                    },
                  });
                } else setTheme(t);
              }}
              className={active ? "active" : undefined}
            >
              <Active style={{ background: main }} />
              <p>{name}</p>
            </ThemeCont>
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

const ThemeCont = styled.div`
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
