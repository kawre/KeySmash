import React from "react";
import { useTyping } from "../Contexts/TypingGameContext";
import PostTestStats from "./PostTestResults";
import TypingGame from "./TypingGame";
import TypingStats from "./TypingStats";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingWrapper: React.FC<Props> = ({}) => {
  const { isShowing } = useTyping();

  return (
    <>
      {isShowing && <TypingGame />}
      <PostTestStats />
    </>
  );
};

export default TypingWrapper;
