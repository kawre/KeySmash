import React, { createContext, useState, useContext } from "react";
import { firestore } from "../firebase";

export interface DataType {
  rows: {
    numbersRow: [];
    topRow: [];
    middleRow: [];
    bottomRow: [];
  };
}

interface Context {
  getLayout: () => Promise<DataType["rows"] | undefined>;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  // const [currentLayout, setCurrentLayout] = useState<string>("qwerty");
  // const [layoutRows, setLayoutRows] = useState<DataType["rows"]>();
  // const [loading, setLoading] = useState<boolean>(true);

  const getLayout = () => {
    const ref = firestore.collection("layouts").doc("qwerty");

    let rows;
    return ref.get().then((cred) => {
      const data = cred.data();

      rows = {
        numbersRow: data?.numbersRow,
        topRow: data?.topRow,
        middleRow: data?.middleRow,
        bottomRow: data?.bottomRow,
      };

      return rows!;
    });
  };

  const value = {
    getLayout,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
