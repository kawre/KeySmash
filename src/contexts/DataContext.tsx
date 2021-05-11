import React, { createContext, useState, useContext, useEffect } from "react";
import { firestore } from "../firebase";

interface DataType {
  rows: {
    numbersRow: [];
    topRow: [];
    middleRow: [];
    bottomRow: [];
  };
}

interface Context {
  getLayout: () => void;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const [currentLayout, setCurrentLayout] = useState<string>("qwerty");
  const [layoutRows, setLayoutRows] = useState<DataType["rows"]>();

  const getLayout = () => {
    const ref = firestore.collection("layouts").doc("qwerty");

    ref.get().then((cred) => {
      const data = cred.data();
      setLayoutRows({
        numbersRow: data?.numbersRow,
        topRow: data?.topRow,
        middleRow: data?.middleRow,
        bottomRow: data?.bottomRow,
      });
    });
  };

  getLayout();

  const value = {
    getLayout,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
