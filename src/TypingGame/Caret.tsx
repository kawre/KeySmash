/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../Shared/Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {
  letter: Element;
  focus: boolean;
  input: string;
  word: Element;
  words: string[];
  currentKey: string;
  isPlaying: boolean;
  current: number;
}

// Component ---------------------------------------------------------------------
const Caret: React.FC<Props> = ({
  focus,
  letter,
  currentKey,
  input,
  word,
  words,
  isPlaying,
  current,
}) => {
  const caretRef = useRef<HTMLDivElement>(null);
  const [caret, setCaret] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  // on load caret position
  useEffect(() => {
    if (!caretRef || !letter) return;

    const position = letter?.getBoundingClientRect();

    setCaret({ ...caret, top: position.top });

    if (caretRef.current?.classList.contains("onload-hidden"))
      caretRef.current?.classList.remove("onload-hidden");
  }, [caretRef.current]);

  // smooth caret animation
  const caretAnimation = (x: number): void => {
    caretRef.current?.animate(
      { left: `${x}px` },
      { duration: 100, fill: "forwards" }
    );
  };

  // caret position
  useEffect(() => {
    let position: DOMRect;

    if (currentKey === "Backspace") {
      if (!letter) return;

      console.log("siema");
      position = letter?.getBoundingClientRect();
      caretAnimation(position.left);
      setCaret({ ...caret, top: position?.top });
      return;
    }

    if (currentKey === " ") {
      if (!word) return;
      position = word?.getBoundingClientRect();
      caretAnimation(position.left);
      setCaret({ ...caret, top: position?.top });
      return;
    }

    if (words[current].length <= input.length) {
      if (!word) return;
      position = word?.getBoundingClientRect();
      setCaret({ ...caret, top: position.top });
      caretAnimation(position.right);
      return;
    }

    if (!letter) return;
    position = letter?.getBoundingClientRect();

    setCaret({ ...caret, top: position?.top });

    // if (input.length === 0) return caretAnimation(position.left);
    caretAnimation(position.left);
  }, [letter]);

  // caret flash animation on stop
  useEffect(() => {
    if (!isPlaying) return;
    caretRef.current?.classList.remove("caret-flash-animation");
    const timeout = setTimeout(
      () => caretRef.current?.classList.add("caret-flash-animation"),
      1500
    );

    return () => clearTimeout(timeout);
  }, [letter]);

  return (
    <Wrapper
      className={`caret-flash-animation onload-hidden ${focus ? "" : "hidden"}`}
      ref={caretRef}
      style={{ top: caret.top }}
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
  border-radius: 999px;

  &.caret-flash-animation {
    animation: caretFlash 1000ms infinite;
  }

  &.onload-hidden {
    display: none !important;
  }

  &.hidden {
    display: none !important;
  }

  @keyframes caretFlash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
