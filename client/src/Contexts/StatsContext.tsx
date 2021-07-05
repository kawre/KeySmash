import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useSubmitResultMutation } from "../generated/graphql";
import { useAuth } from "./AuthContext";
import { useTyping } from "./TypingGameContext";
// Types -------------------------------------------------------------------------

interface Context {
  wpm: string;
  wps: string;
  cpm: string;
  raw: string;
  acc: string;
  time: number;
  timeps: number;
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
  submitTest: () => void;
  setChars: () => void;
  setErrs: (s?: "missed" | "extra") => void;
  reset: () => void;
}

const StatsContext = createContext<Context>(null!);

export const useStats = () => {
  return useContext(StatsContext);
};

// Component ---------------------------------------------------------------------
const StatsProvider: React.FC = ({ children }) => {
  const {
    disabled,
    setDisabled,
    isPlaying,
    setPlaying,
    setShowing,
    repeatTest,
  } = useTyping();
  const { user } = useAuth();

  const [wpm, setWpm] = useState("0");
  const [wps, setWps] = useState("0");
  const [cpm, setCpm] = useState("0");
  const [raw, setRaw] = useState("0");
  const [acc, setAcc] = useState("0");
  const [time, setTime] = useState(0);
  const [timeps, setTimeps] = useState(0);
  const [results, setResults] = useState(false);
  //
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [extra, setExtra] = useState(0);
  const [missed, setMissed] = useState(0);
  //
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState(0);
  const [characters, setCharacters] = useState(0);
  //
  useEffect(() => {
    setTotal(incorrect + extra + missed);
  }, [incorrect, extra, missed]);

  const [submit] = useSubmitResultMutation();

  const reset = () => {
    setTime(0);
    setTimeps(0);
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
    setWps("0");
    setCpm("0");
    setRaw("0");
    setAcc("0");
    //
    repeatTest();
    setResults(false);
  };

  const setChars = () => {
    setCorrect((i) => i + 1);
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

  const submitTest = async () => {
    setDisabled(true);
    user &&
      (await submit({
        variables: {
          options: {
            wpm,
            accuracy: acc,
            cpm,
            raw,
            correct,
            incorrect,
            errors,
            time: timeps,
            characters,
            extra,
            missed,
          },
        },
      }));
    setPlaying(false);
    setShowing(false);
    setResults(true);
  };

  useEffect(() => {
    if (time === 0 || disabled) return;

    const diff = correct - total;
    const realDiff = characters - errors;
    const minute = time / 60;

    setAcc(((realDiff / characters) * 100).toFixed(2));
    setCpm((diff / minute).toFixed(2));
    setWpm((realDiff / minute / 5).toFixed(2));
    setRaw((correct / minute / 5).toFixed(2));
    console.log("wpm:", wpm);
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

  useEffect(() => {
    if (time % 1 !== 0) return;
    setTimeps(time);
    setWps(wpm);
  }, [time]);

  useEffect(() => {
    console.log("-------------- wps:", wps);
  }, [wps]);

  const value = {
    wpm,
    wps,
    cpm,
    raw,
    acc,
    time,
    timeps,
    results,
    correct,
    incorrect,
    errors,
    characters,
    missed,
    extra,
    setCorrect,
    setIncorrect,
    submitTest,
    setMissed,
    setExtra,
    setChars,
    setErrs,
    reset,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

export default StatsProvider;
