import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useSubmitResultMutation } from "../generated/graphql";
import { useTyping } from "./TypingGameContext";
// Types -------------------------------------------------------------------------

interface Context {
  wpm: number;
  wps: number;
  cpm: number;
  raw: number;
  acc: number;
  time: number;
  timeps: number;
  results: boolean;
  characters: number;
  setCharacters: React.Dispatch<React.SetStateAction<number>>;
  setErrors: React.Dispatch<React.SetStateAction<number>>;
  errors: number;
  submitTest: () => void;
}

const StatsContext = createContext<Context>(null!);

export const useStats = () => {
  return useContext(StatsContext);
};

// Component ---------------------------------------------------------------------
const StatsProvider: React.FC = ({ children }) => {
  const { disabled, setDisabled, isPlaying, setPlaying, setShowing } =
    useTyping();

  const [wpm, setWpm] = useState<Context["wpm"]>(0);
  const [wps, setWps] = useState<Context["wpm"]>(0);
  const [cpm, setCpm] = useState<Context["cpm"]>(0);
  const [raw, setRaw] = useState<Context["raw"]>(0);
  const [acc, setAcc] = useState<Context["acc"]>(0);
  const [time, setTime] = useState<Context["time"]>(0);
  const [timeps, setTimeps] = useState<Context["time"]>(0);
  const [results, setResults] = useState<Context["results"]>(false);
  const [characters, setCharacters] = useState<Context["characters"]>(0);
  const [errors, setErrors] = useState<Context["errors"]>(0);

  const [submit] = useSubmitResultMutation();
  useEffect(() => console.log(wpm), [disabled]);

  const submitTest = async () => {
    setDisabled(true);
    await submit({
      variables: {
        options: {
          wpm,
          accuracy: acc,
          cpm,
          raw,
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

    const diff = characters - errors;
    const minute = time / 60;

    setAcc(Math.round((diff / characters) * 100));
    setCpm(parseFloat((diff / minute).toFixed(2)));
    setWpm(parseFloat((diff / minute / 5).toFixed(2)));
    setRaw(parseFloat((characters / minute / 5).toFixed(2)));
  }, [time, disabled]);
  // console.log("wpm:", wpm);

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
    characters,
    setCharacters,
    setErrors,
    submitTest,
    errors,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

export default StatsProvider;
