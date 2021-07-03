import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "../generated/graphql";

interface Context {
  theme: Theme;
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
    setTheme(JSON.parse(localStorage.getItem("theme") as string));
  }, [localStorage.getItem("theme")]);

  // change theme

  const value = {
    theme,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
