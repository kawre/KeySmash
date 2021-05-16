import React, { createContext, useContext } from "react";
import { firestore } from "../firebase";

interface Context {
  sendFinalResults: (
    game: "key-smash",
    id: string,
    score: number,
    time: number
  ) => Promise<void>;
  addQuote: (quote: string) => any;
  getRandomQuote: () => Promise<object>;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const sendFinalResults = (
    game: "key-smash",
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
      quote: quote.split(""),
    });
  };

  const getRandomQuote = () => {
    const ref = firestore
      .collection("game-data")
      .doc("typing-game")
      .collection("quotes");

    return ref.get().then((quotes) => {
      const randomQuote =
        quotes.docs[Math.floor(Math.random() * quotes.docs.length)].data();

      console.log(randomQuote);
      return randomQuote;
    });
  };

  const value = {
    sendFinalResults,
    addQuote,
    getRandomQuote,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
