import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "../generated/graphql";
import { defaultTheme } from "../Shared/utils/theme";

interface Context {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Context["theme"]>(
    JSON.parse(localStorage.getItem("theme") as string)
  );

  useEffect(() => {
    if (!theme) return setTheme(defaultTheme);
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
