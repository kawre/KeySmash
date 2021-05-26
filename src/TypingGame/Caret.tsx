/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {
  letter: Element;
  minusLetter: Element;
  focus: boolean;
  input: string;
  word: Element;
  words: string[];
  isPlaying: boolean;
  current: number;
}

// Component ---------------------------------------------------------------------
const Caret: React.FC<Props> = ({
  focus,
  letter,
  input,
  minusLetter,
  word,
  words,
  isPlaying,
  current,
}) => {
  const caretRef = useRef<HTMLDivElement>(null);
  const [showCaret, setShowCaret] = useState<boolean>(false);
  const [caretFlash, setCaretFlash] = useState<boolean>(true);
  const [caret, setCaret] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const caretPositionHandler = () => {
    if (input.length >= words[current].length) return caretOverflow();
    if (input.length === 0) return caretFirstLetter();
    caretCurrentLetter();
  };

  // caret position
  useEffect(() => {
    caretPositionHandler();
  }, [letter, minusLetter]);

  const caretOverflow = () => {
    if (!word.lastElementChild) return;
    const position = word.lastElementChild.getBoundingClientRect();
    caretAnimation(position.right);
    setCaret({ ...caret, top: position.top });
  };

  const caretFirstLetter = () => {
    if (!word) return;
    const position = word.getBoundingClientRect();
    caretAnimation(position.left);
    setCaret({ ...caret, top: position.top });
  };

  const caretCurrentLetter = () => {
    if (!letter) return;
    const position = letter.getBoundingClientRect();
    caretAnimation(position.left);
    setCaret({ ...caret, top: position.top });
  };

  // on load caret position
  useEffect(() => {
    if (!caretRef) return;
    caretFirstLetter();
    setShowCaret(true);
  }, [caretRef]);

  // smooth caret animation
  const caretAnimation = (x: number) => {
    // caretRef.current?.style.top =
    caretRef.current?.animate(
      { left: `${x}px` },
      { duration: 100, fill: "forwards" }
    );
  };

  // caret flash animation on stop
  useEffect(() => {
    if (!isPlaying) return;
    setCaretFlash(false);
    const timeout = setTimeout(() => setCaretFlash(true), 1500);

    return () => clearTimeout(timeout);
  }, [letter, minusLetter]);

  const caretFlashClass = caretFlash ? "caret-flash-animation" : "";
  const showCaretClass = showCaret ? "" : "hidden";
  const caretHidden = focus ? "" : "hidden";

  return (
    <Wrapper
      className={`${caretFlashClass} ${showCaretClass} ${caretHidden}`}
      style={{ top: caret.top }}
      ref={caretRef}
    />
  );
};

export default Caret;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: fixed;
  width: 3px;
  background: ${colors.secondary};
  height: 32px;
  border-radius: 99px;

  &.caret-flash-animation {
    animation: caretFlash 1000ms infinite;
  }

  &.hidden {
    display: none !important;
  }

  @keyframes caretFlash {
    0%,
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
    80%,
    20% {
      transform: scaleY(1);
      opacity: 1;
    }
    50% {
      transform: scaleY(0.4);
      opacity: 0;
    }
  }
`;
