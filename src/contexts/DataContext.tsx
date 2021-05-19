import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";

interface Props {
  quote: string;
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
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [quote, setQuote] = useState<Props["quote"]>("");

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

  useEffect(() => {
    const quoteHandler = async () => {
      try {
        const res = await getRandomQuote();
        setQuote(res.quote);
      } catch {
        console.log("error");
      }
      setLoading(false);
    };
    quoteHandler();
  }, []);

  const value = {
    sendFinalResults,
    addQuote,
    quote,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
