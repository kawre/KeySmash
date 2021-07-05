import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useSubmitResultMutation } from "../generated/graphql";
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
  setErrors: React.Dispatch<React.SetStateAction<number>>;
  setExtra: React.Dispatch<React.SetStateAction<number>>;
  setMissed: React.Dispatch<React.SetStateAction<number>>;
  submitTest: () => void;
  setChars: () => void;
  setErrs: (s?: "missed" | "extra") => void;
}

const StatsContext = createContext<Context>(null!);

export const useStats = () => {
  return useContext(StatsContext);
};

// Component ---------------------------------------------------------------------
const StatsProvider: React.FC = ({ children }) => {
  const { disabled, setDisabled, isPlaying, setPlaying, setShowing } =
    useTyping();

  const [wpm, setWpm] = useState("0");
  const [wps, setWps] = useState("0");
  const [cpm, setCpm] = useState("0");
  const [raw, setRaw] = useState("0");
  const [acc, setAcc] = useState("0");
  const [time, setTime] = useState(0);
  const [timeps, setTimeps] = useState(0);
  const [results, setResults] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [errors, setRealErrors] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [incorrect, setErrors] = useState(0);
  const [extra, setExtra] = useState(0);
  const [missed, setMissed] = useState(0);

  const [submit] = useSubmitResultMutation();
  useEffect(() => {
    console.log(extra);
    console.log(missed);
    console.log(incorrect);
  }, [errors]);

  const setChars = () => {
    setCorrect((i) => i + 1);
    setCharacters((i) => i + 1);
  };

  const setErrs = (s?: "missed" | "extra") => {
    if (s === "missed") {
      setMissed((i) => i + 1);
    } else if (s === "extra") {
      setExtra((i) => i + 1);
    } else {
      setErrors((i) => i + 1);
    }
    setRealErrors((i) => i + 1);
  };

  const submitTest = async () => {
    setDisabled(true);
    await submit({
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
        },
      },
    });
    setPlaying(false);
    setShowing(false);
    setResults(true);
  };

  useEffect(() => {
    if (time === 0 || disabled) return;

    const diff = correct - incorrect;
    const realDiff = characters - errors;
    const minute = time / 60;

    setAcc(((realDiff / characters) * 100).toFixed(2));
    setCpm((diff / minute).toFixed(2));
    setWpm((diff / minute / 5).toFixed(2));
    setRaw((correct / minute / 5).toFixed(2));
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
    setErrors,
    submitTest,
    setMissed,
    setExtra,
    setChars,
    setErrs,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

export default StatsProvider;
