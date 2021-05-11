import React, { createContext, useState, useContext, useEffect } from "react";
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
  getLayout: () => Promise<object | undefined>;
}

const DataContext = createContext<Context>(undefined!);

export function useData() {
  return useContext(DataContext);
}

export const DataProvider: React.FC = ({ children }) => {
  const [currentLayout, setCurrentLayout] = useState<string>("qwerty");
  const [layoutRows, setLayoutRows] = useState<DataType["rows"]>();

  const getLayout = async () => {
    const ref = firestore.collection("layouts").doc("qwerty");

    return await ref.get().then((cred) => {
      const data = cred.data();

      return data;
    });
  };

  const value = {
    getLayout,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
