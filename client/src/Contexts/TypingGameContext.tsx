import React, { createContext, useContext, useEffect, useState } from "react";
import { RandomQuoteQuery, useRandomQuoteQuery } from "../generated/graphql";
import { client } from "../Shared/utils/client";
// Types -------------------------------------------------------------------------

interface Context {
  // states
  setShowing: React.Dispatch<React.SetStateAction<boolean>>;
  isShowing: boolean;
  words: string[];
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  results: boolean;
  setResults: React.Dispatch<React.SetStateAction<boolean>>;
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  // functions
  repeatTest: () => void;
}

const TypingGameContext = createContext<Context>(undefined!);

export function useTyping() {
  return useContext(TypingGameContext);
}

// Component ---------------------------------------------------------------------
const TypingContext: React.FC = ({ children }) => {
  const [isPlaying, setPlaying] = useState<Context["isPlaying"]>(false);
  const [isShowing, setShowing] = useState<Context["isShowing"]>(false);
  const [focus, setFocus] = useState<Context["focus"]>(false);
  const [words, setWords] = useState<Context["words"]>([""]);
  const [results, setResults] = useState<Context["results"]>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const { data, loading, fetchMore } = useRandomQuoteQuery();

  const repeatTest = () => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        client.cache.evict({ id: `Quote:${prev.randomQuote.id}` });

        return {
          __typename: "Query",
          randomQuote: (fetchMoreResult as RandomQuoteQuery).randomQuote,
        };
      },
    });
    // defaultStates();

    setTimeout(() => setShowing(true), 150);
  };

  // const defaultStates = () => {
  //   setPlaying(false);
  //   setShowing(false);
  //   setFocus(true);
  //   setWPM(0);
  //   setCPM(0);
  //   setRaw(0);
  //   setAcc(0);
  //   setTime(0);
  //   setResults(false);
  //   setCorrect(0);
  //   setErrors(0);
  // };

  useEffect(() => {
    if (loading) return;
    setWords(data?.randomQuote.quote.split(" ")!);
    setShowing(true);
  }, [loading, data]);

  const value = {
    setShowing,
    isShowing,
    words,
    isPlaying,
    setPlaying,
    results,
    setResults,
    repeatTest,
    focus,
    setFocus,
    disabled,
    setDisabled,
  };

  return (
    <TypingGameContext.Provider value={value}>
      {/* {isShowing && <TypingGame />}
      <PostTestStats /> */}
      {children}
    </TypingGameContext.Provider>
  );
};

export default TypingContext;
