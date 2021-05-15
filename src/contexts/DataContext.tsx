import React, { createContext, useContext } from "react";
import { firestore } from "../firebase";

interface Context {
  sendFinalResults: (
    game: "key-smash",
    id: string,
    score: number,
    time: number
  ) => Promise<void>;
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
      .collection("game-results")
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

  const value = {
    sendFinalResults,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
