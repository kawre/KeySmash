import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";
import PostTestStats from "../TypingGame/PostTestResults";
import TypingGame from "../TypingGame/TypingGame";
// Types -------------------------------------------------------------------------

interface Context {
  setShowing: React.Dispatch<React.SetStateAction<boolean>>;
  isShowing: boolean;
  words: string[];
  getRandomQuote: () => Promise<void>;
  wpm: number;
  setWPM: React.Dispatch<React.SetStateAction<number>>;
  cpm: number;
  setCPM: React.Dispatch<React.SetStateAction<number>>;
  raw: number;
  setRaw: React.Dispatch<React.SetStateAction<number>>;
  acc: number;
  setAcc: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  results: boolean;
  setResults: React.Dispatch<React.SetStateAction<boolean>>;
  characters: number;
  setCharacters: React.Dispatch<React.SetStateAction<number>>;
  errors: number;
  setErrors: React.Dispatch<React.SetStateAction<number>>;
  repeatTest: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TypingContext = createContext<Context>(undefined!);

export function useTypingData() {
  return useContext(TypingContext);
}

// Component ---------------------------------------------------------------------
const TypingGameContext: React.FC = ({ children }) => {
  const [isPlaying, setPlaying] = useState<Context["isPlaying"]>(false);
  const [isShowing, setShowing] = useState<Context["isShowing"]>(false);
  const [words, setWords] = useState<Context["words"]>([""]);
  const [wpm, setWPM] = useState<Context["wpm"]>(0);
  const [cpm, setCPM] = useState<Context["cpm"]>(0);
  const [raw, setRaw] = useState<Context["raw"]>(0);
  const [acc, setAcc] = useState<Context["acc"]>(0);
  const [time, setTime] = useState<Context["time"]>(0);
  const [results, setResults] = useState<Context["results"]>(false);
  const [characters, setCharacters] = useState<Context["characters"]>(0);
  const [errors, setErrors] = useState<Context["errors"]>(0);

  const getRandomQuote = () => {
    const ref = firestore
      .collection("game-data")
      .doc("typing-game")
      .collection("quotes");

    return ref.get().then((quotes) => {
      const randomQuote =
        quotes.docs[Math.floor(Math.random() * quotes.docs.length)].data();

      setWords(randomQuote.quote.split(" "));
    });
  };

  const repeatTest = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    getRandomQuote();
    setShowing(false);
    setTimeout(() => setShowing(true), 250);
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

  // timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setTime(time + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, time]);

  const value = {
    getRandomQuote,
    setShowing,
    isShowing,
    words,
    wpm,
    setWPM,
    cpm,
    setCPM,
    raw,
    setRaw,
    acc,
    setAcc,
    time,
    setTime,
    isPlaying,
    setPlaying,
    results,
    setResults,
    characters,
    setCharacters,
    errors,
    setErrors,
    repeatTest,
  };

  return (
    <TypingContext.Provider value={value}>
      {isShowing && <TypingGame />}
      <PostTestStats />
    </TypingContext.Provider>
  );
};

export default TypingGameContext;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
