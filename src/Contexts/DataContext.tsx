import React, { createContext, useContext, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { firestore } from "../firebase";
import { useAuth } from "./AuthContext";

type Theme = {
  name: string;
  background: string;
  main: string;
  caret: string;
  sub: string;
  text: string;
  error: string;
  errorExtra: string;
};

type Colors = {
  name?: string;
  background?: string;
  main?: string;
  caret?: string;
  sub?: string;
  text?: string;
  error?: string;
  errorExtra?: string;
};

type ColorsNonNull = {
  background: string;
  main: string;
  caret: string;
  sub: string;
  text: string;
  error: string;
  errorExtra: string;
};

interface Context {
  sendFinalResults: (
    game: "key-smash" | "typing-game",
    id: string,
    score: number,
    time: number
  ) => any;
  addQuote: (quote: string) => any;
  addTheme: (color: Theme) => Promise<any>;
  changeTheme: (theme: string) => Promise<void>;
  quote: string;
  themes: Colors[];
  theme: ColorsNonNull;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const { user, userData } = useAuth();
  const [quote, setQuote] = useState<Context["quote"]>("");
  const [themes, setThemes] = useState<Context["themes"]>([]);
  const [theme, setTheme] = useState<Context["theme"]>({
    background: "#323437",
    main: "#e2b714",
    caret: "#e2b714",
    sub: "#646669",
    text: "#d1d0c5",
    error: "#ca4754",
    errorExtra: "#7e2a33",
  });

  // send final results
  const sendFinalResults = (
    game: "key-smash" | "typing-game",
    id: string,
    score: number,
    time: number
  ) => {
    const ref = firestore
      .collection("game-data")
      .doc(game)
      .collection("results")
      .doc(id);

    return ref.set({
      id: id,
      time: time,
      score: score,
      finalScore: score / time,
    });
  };

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

  // get random quotes
  const getRandomQuote = () => {
    const ref = firestore
      .collection("game-data")
      .doc("typing-game")
      .collection("quotes");

    return ref.get().then((quotes) => {
      const randomQuote: any =
        quotes.docs[Math.floor(Math.random() * quotes.docs.length)].data();

      return randomQuote;
    });
  };

  // get themes
  const getThemes = async () => {
    const ref = await firestore.collection("themes").get();

    return ref.docs.map((theme) => theme.data());
  };

  // add theme
  const addTheme = (color: Theme) => {
    const ref = firestore.collection("themes").doc(color.name);

    return ref.set({
      name: color.name,
      background: color.background,
      main: color.main,
      caret: color.caret,
      sub: color.sub,
      text: color.text,
      error: color.error,
      errorExtra: color.errorExtra,
    });
  };

  // curret theme
  const currentTheme = async () => {
    if (!userData) return;
    const res = await firestore.collection("themes").doc(userData.theme).get();
    const theme = res.data()!;

    setTheme({
      background: theme.background,
      main: theme.main,
      caret: theme.caret,
      sub: theme.sub,
      text: theme.text,
      error: theme.error,
      errorExtra: theme.errorExtra,
    });
    localStorage.setItem("theme", JSON.stringify(theme));
  };

  useEffect(() => {
    currentTheme();
    const theme = JSON.parse(localStorage.getItem("theme")!);
    console.log(theme.background);
    // console.log(theme);
  }, [userData?.theme]);

  // change theme
  const changeTheme = (theme: string) => {
    const ref = firestore.collection("users").doc(user?.uid);

    return ref.update({
      theme: theme,
    });
  };

  useEffect(() => {
    const dataHandler = async () => {
      try {
        const quoteRes = await getRandomQuote();
        const themesRes = await getThemes();
        setQuote(quoteRes.quote);
        setThemes(themesRes);
      } catch {
        console.log("error");
      }
    };
    dataHandler();
  }, []);

  const value = {
    sendFinalResults,
    changeTheme,
    getThemes,
    addQuote,
    addTheme,
    themes,
    theme,
    quote,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
