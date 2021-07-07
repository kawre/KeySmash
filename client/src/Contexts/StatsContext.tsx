import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useSubmitResultMutation } from "../generated/graphql";
import { useAuth } from "./AuthContext";
import { useTyping } from "./TypingGameContext";
// Types -------------------------------------------------------------------------

interface Context {
  wpm: string;
  cpm: string;
  raw: string;
  acc: string;
  time: number;
  results: boolean;
  correct: number;
  incorrect: number;
  missed: number;
  extra: number;
  errors: number;
  characters: number;
  setCorrect: React.Dispatch<React.SetStateAction<number>>;
  setIncorrect: React.Dispatch<React.SetStateAction<number>>;
  setExtra: React.Dispatch<React.SetStateAction<number>>;
  setMissed: React.Dispatch<React.SetStateAction<number>>;
  setChars: (t?: "only") => void;
  setErrs: (s?: "missed" | "extra") => void;
  reset: () => void;
}

const StatsContext = createContext<Context>(null!);

export const useStats = () => {
  return useContext(StatsContext);
};

// Component ---------------------------------------------------------------------
const StatsProvider: React.FC = ({ children }) => {
  const { disabled, isPlaying, setPlaying, setShowing, repeatTest } =
    useTyping();
  const { user } = useAuth();

  const [wpm, setWpm] = useState("0");
  const [cpm, setCpm] = useState("0");
  const [raw, setRaw] = useState("0");
  const [acc, setAcc] = useState("0");
  const [time, setTime] = useState(0);
  const [results, setResults] = useState(false);
  //
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [extra, setExtra] = useState(0);
  const [missed, setMissed] = useState(0);
  //
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState(0);
  // const [chars, setChar] = useState(0);
  const [characters, setCharacters] = useState(0);
  //
  useEffect(() => {
    setTotal(incorrect + extra + missed);
  }, [incorrect, extra, missed]);

  // useEffect(() => {
  //   console.log("total:", correct + total);
  // }, [total, chars]);

  // useEffect(() => console.log("chars:", chars), [chars]);

  const [submit] = useSubmitResultMutation();

  const reset = () => {
    setTime(0);
    //
    setCorrect(0);
    setIncorrect(0);
    setExtra(0);
    setMissed(0);
    //
    setErrors(0);
    setCharacters(0);
    //
    setWpm("0");
    setCpm("0");
    setRaw("0");
    setAcc("0");
    //
    repeatTest();
    setResults(false);
  };

  const setChars = (t?: "only") => {
    !t && setCorrect((i) => i + 1);
    setCharacters((i) => i + 1);
  };

  const setErrs = (s?: "missed" | "extra") => {
    setErrors((i) => i + 1);

    if (s === "missed") {
      setMissed((i) => i + 1);
    } else if (s === "extra") {
      setExtra((i) => i + 1);
    } else {
      setIncorrect((i) => i + 1);
    }
  };

  useEffect(() => {
    if (time === 0 || disabled) return;

    const diff = characters - errors;
    const minute = 60 / time;

    setAcc(((diff / characters) * 100).toFixed(2));
    setCpm((correct * minute).toFixed(2));
    setWpm((correct * (minute / 5)).toFixed(2));
    setRaw(((correct + total) * (minute / 5)).toFixed(2));
  }, [time, disabled]);

  useEffect(() => {
    if (disabled || !isPlaying) return;
    const x = setInterval(
      () => setTime(parseFloat((time + 0.1).toFixed(1))),
      100
    );

    if (disabled) return clearInterval(x);
    return () => clearInterval(x);
  }, [isPlaying, time, disabled]);

  const submitTest = async () => {
    user &&
      submit({
        variables: {
          options: {
            quote: "",
            wpm,
            accuracy: acc,
            cpm,
            raw,
            correct,
            incorrect,
            errors,
            time: Math.round(time),
            characters,
            extra,
            missed,
          },
        },
      });
    setTimeout(() => {
      setPlaying(false);
      setShowing(false);
      setResults(true);
    }, 50);
  };

  // submitTest
  useEffect(() => {
    if (disabled) submitTest();
  }, [disabled]);

  const value = {
    wpm,
    cpm,
    raw,
    acc,
    time,
    results,
    correct,
    incorrect,
    errors,
    characters,
    missed,
    extra,
    setCorrect,
    setIncorrect,
    setMissed,
    setExtra,
    setChars,
    setErrs,
    // setChar,
    reset,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

export default StatsProvider;
