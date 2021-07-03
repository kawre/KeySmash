import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";
import {
  Theme,
  ThemesQuery,
  useChangeThemeMutation,
  useRandomQuoteQuery,
  useThemesQuery,
} from "../generated/graphql";

interface Context {
  addQuote: (quote: string) => any;
  changeTheme: (variables: { name: string }) => Promise<any>;
  quote: string;
  themes: ThemesQuery["themes"] | undefined;
  theme: Omit<Theme, "__typename">;
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

  // append a quote to the data base
  const addQuote = (quote: string) => {
    const ref = firestore
      .collection("game-data")
      .doc("typing-game")
      .collection("quotes");

    return ref.add({
      quote: quote,
    });
  };

  // themes
  const [{ data }] = useThemesQuery();

  // random quote
  const [{ data: quoteData }] = useRandomQuoteQuery();

  // change theme
  const [, changeTheme] = useChangeThemeMutation();

  const value = {
    changeTheme,
    addQuote,
    themes: data?.themes,
    quote: quoteData?.randomQuote.quote!,
    theme,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
