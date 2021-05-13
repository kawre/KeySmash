import React, { useState } from "react";
import styled from "styled-components";
// import { v4 as uuidv4 } from "uuid";
import { colors } from "../../Global";
import { GiArrowCursor } from "react-icons/gi";
import QwertyKeyboard from "../Keyboards/qwerty";
// Types -------------------------------------------------------------------------

// interface Props {
//   rows: DataType["rows"];
// }

// Component ---------------------------------------------------------------------
const KeySmashGame = () => {
  const [focus, setFocus] = useState<boolean>(true);

  const pressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
  };

  return (
    <Wrapper>
      {!focus && (
        <FocusAlert>
          <GiArrowCursor />
          Click or press any key to focus
        </FocusAlert>
      )}
      <RowsWrapper className={focus ? "" : "focus-alert"}>
        <InputHandler
          autoFocus
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 350);
          }}
          onKeyPress={pressHandler}
        />
        <QwertyKeyboard />
      </RowsWrapper>
    </Wrapper>
  );
};

export default KeySmashGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowsWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin: auto;
  position: relative;

  &.focus-alert {
    transition: 200ms ease;
    opacity: 0.5;
    filter: blur(4px);
  }
`;

const InputHandler = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: default;
  color: transparent;
  opacity: 0;

  &:focus,
  &:active {
    border: none;
    outline: none;
  }
`;

const FocusAlert = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  color: ${colors.text};
  pointer-events: none;
  text-shadow: 0 0 16px black;
  font-size: 20px;
  font-weight: 500;

  svg {
    margin-right: 5px;
  }
`;
