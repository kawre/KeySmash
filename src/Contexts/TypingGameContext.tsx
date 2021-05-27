import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";
// Types -------------------------------------------------------------------------

interface Context {
  setShowing: React.Dispatch<React.SetStateAction<boolean>>;
  isShowing: boolean;
  quote: string[];
  getRandomQuote: () => Promise<void>;
}

const TypingContext = createContext<Context>(undefined!);

export function useTypingData() {
  return useContext(TypingContext);
}

// Component ---------------------------------------------------------------------
const TypingGameContext: React.FC = ({ children }) => {
  const [isShowing, setShowing] = useState<Context["isShowing"]>(false);
  const [quote, setQuote] = useState<Context["quote"]>([""]);

  const getRandomQuote = () => {
    const ref = firestore
      .collection("game-data")
      .doc("typing-game")
      .collection("quotes");

    return ref.get().then((quotes) => {
      const randomQuote =
        quotes.docs[Math.floor(Math.random() * quotes.docs.length)].data();

      setQuote(randomQuote.quote.split(" "));
    });
  };

  useEffect(() => {
    const getQuote = async () => {
      // setShowing(false);
      try {
        await getRandomQuote();
      } catch {
        console.log("get random quote failed");
      }

      setShowing(true);
    };
    getQuote();
  }, []);

  const value = {
    getRandomQuote,
    setShowing,
    isShowing,
    quote,
  };

  return (
    <TypingContext.Provider value={value}>
      {isShowing && children}
    </TypingContext.Provider>
  );
};

export default TypingGameContext;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
