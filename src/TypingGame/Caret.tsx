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
  // const [showCaret, setShowCaret] = useState<boolean>(false);
  const [caretFlash, setCaretFlash] = useState<boolean>(true);

  // caret position
  useEffect(() => {
    if (input.length < words[current].length) caretCurrentLetter();
    else caretOverflow();
  }, [letter, minusLetter]);

  const caretOverflow = () => {
    if (!word.lastElementChild) return;
    const position = word.lastElementChild.getBoundingClientRect();
    caretAnimation(position.right, position.top);
  };

  const caretCurrentLetter = () => {
    if (!letter) return;
    const position = letter.getBoundingClientRect();
    caretAnimation(position.left, position.top);
  };

  // on load caret position
  useEffect(() => {
    if (!caretRef.current || !letter) return;
    const height = letter.getBoundingClientRect().height;
    caretRef.current.style.height = `${height}px`;
  }, [caretRef, letter]);

  // smooth caret animation
  const caretAnimation = (left: number, top: number) => {
    if (!caretRef.current) return;
    caretRef.current.animate(
      { left: `${left}px`, top: `${top}px` },
      { duration: 100, fill: "forwards" }
    );
  };

  // caret flash animation on stop
  useEffect(() => {
    if (!isPlaying) return;
    setCaretFlash(false);
    const timeout = setTimeout(() => setCaretFlash(true), 1250);

    return () => clearTimeout(timeout);
  }, [letter, minusLetter]);

  const caretFlashClass = caretFlash ? "caret-flash-animation" : "";
  // const showCaretClass = showCaret ? "" : "hidden";
  const caretHidden = focus ? "" : " hidden";

  return (
    <Wrapper className={`${caretFlashClass}${caretHidden}`} ref={caretRef} />
  );
};

export default Caret;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: fixed;
  width: 3px;
  background: ${colors.secondary};
  /* height: 32px; */
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
    60%,
    40% {
      transform: scaleY(0.4);
      opacity: 0;
    }
  }
`;
