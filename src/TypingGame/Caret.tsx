import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTypingData } from "../Contexts/TypingGameContext";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {
  letter: Element | undefined;
  minusLetter: Element | undefined;
  input: string;
  current: number;
}

// Component ---------------------------------------------------------------------
const Caret: React.FC<Props> = ({ letter, input, minusLetter, current }) => {
  const { isPlaying, words, focus } = useTypingData();
  const caretRef = useRef<HTMLDivElement>(null);
  const [caretFlash, setCaretFlash] = useState<boolean>(true);
  const [caretSize, setCaretSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  // caret position
  useEffect(() => {
    if (input.length < words[current].length) caretCurrentLetter();
    else caretOverflow();
  }, [letter, minusLetter]);

  const caretCurrentLetter = () => {
    if (!letter) return;
    const rect = letter.getBoundingClientRect();
    caretAnimation(rect.left, rect.top);
  };

  const caretOverflow = () => {
    if (!minusLetter) return;
    const rect = minusLetter.getBoundingClientRect();
    caretAnimation(rect.right, rect.top);
  };

  // on load caret position
  useEffect(() => {
    if (!letter || caretSize.height !== 0 || caretSize.width !== 0) return;
    const rect = letter.getBoundingClientRect();
    setCaretSize({ width: rect.width / 5, height: rect.height });
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

  const caretFlashClass = caretFlash && "caret-flash-animation";
  const caretHidden = !focus && "hidden";

  return (
    <Wrapper
      style={{ height: caretSize.height, width: caretSize.width }}
      className={`${caretFlashClass} ${caretHidden}`}
      ref={caretRef}
    />
  );
};

export default Caret;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: fixed;
  background: ${colors.caret};
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
      transform: scaleY(1);
      opacity: 1;
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
