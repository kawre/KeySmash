import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { ThemeProvider } from "styled-components";
import { firestore } from "../firebase";
import { useAuth } from "./AuthContext";

interface Theme {
  theme: string;
  background: string;
  main: string;
  caret: string;
  sub: string;
  text: string;
  error: string;
  errorExtra: string;
}

interface Context {
  sendFinalResults: (
    game: "key-smash" | "typing-game",
    id: string,
    score: number,
    time: number
  ) => any;
  addQuote: (quote: string) => any;
  quote: string;
  addTheme: (color: Theme) => Promise<any>;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const { user, userData } = useAuth();
  const [quote, setQuote] = useState<string>("");

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

  const addQuote = (quote: string) => {
    const ref = firestore
      .collection("game-data")
      .doc("typing-game")
      .collection("quotes");

    return ref.add({
      quote: quote,
    });
  };

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

  const getThemes = () => {
    const ref = firestore.collection("themes");

    ref.get().then((themes) => {
      themes.docs.forEach((theme) => {
        console.log(theme.data());
      });
    });
  };

  const addTheme = (color: Theme) => {
    const ref = firestore.collection("themes").doc(color.theme);

    return ref.set({
      background: color.background,
      main: color.main,
      caret: color.caret,
      sub: color.sub,
      text: color.text,
      error: color.error,
      errorExtra: color.errorExtra,
    });
  };

  const setTheme = (theme: string) => {
    const ref = firestore.collection("users").doc(user?.uid);

    return ref.update({
      theme: theme,
    });
  };

  useEffect(() => {
    if (!userData) return;
    getThemes();
    // setTheme("superuser");
  }, [userData]);

  useEffect(() => {
    const quoteHandler = async () => {
      try {
        const res = await getRandomQuote();
        setQuote(res.quote);
      } catch {
        console.log("error");
      }
    };
    quoteHandler();
  }, []);

  const value = {
    sendFinalResults,
    addQuote,
    quote,
    addTheme,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
