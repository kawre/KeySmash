import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "../generated/graphql";
import { defaultTheme } from "../Shared/utils/theme";
import { useAuth } from "./AuthContext";

interface Context {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<Context["theme"]>(
    JSON.parse(localStorage.getItem("theme") as string)
  );

  // localStorage.setItem(
  //   "theme",
  //   JSON.stringify({
  //     name: "modern dolch",
  //     background: "#2d2e30",
  //     caret: "#7eddd3",
  //     main: "#7eddd3",
  //     sub: "#54585c",
  //     text: "#e3e6eb",
  //     error: "#d36a7b",
  //     errorExtra: "#994154",
  //   })
  // );

  useEffect(() => {
    // console.log(user);
  }, [user]);

  useEffect(() => {
    if (!theme) return setTheme(defaultTheme);
    localStorage.setItem("theme", JSON.stringify(theme));
    // console.log(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
