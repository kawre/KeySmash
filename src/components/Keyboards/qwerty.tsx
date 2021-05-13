import React from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import Keycap from "./Keycap";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const QwertyKeyboard = () => {
  const { userData } = useAuth();

  return (
    <Rows>
      <NumbersRow>
        <Keycap type={1} value="`" />
        <Keycap type={1} value="1" />
        <Keycap type={1} value="2" />
        <Keycap type={1} value="3" />
        <Keycap type={1} value="4" />
        <Keycap type={1} value="5" />
        <Keycap type={1} value="6" />
        <Keycap type={1} value="7" />
        <Keycap type={1} value="8" />
        <Keycap type={1} value="9" />
        <Keycap type={1} value="0" />
        <Keycap type={1} value="-" />
        <Keycap type={1} value="=" />
        <Keycap type={2} />
      </NumbersRow>
      <TopRow>
        <Keycap type={1.5} />
        <Keycap type={1} value="Q" />
        <Keycap type={1} value="W" />
        <Keycap type={1} value="E" />
        <Keycap type={1} value="R" />
        <Keycap type={1} value="T" />
        <Keycap type={1} value="Y" />
        <Keycap type={1} value="U" />
        <Keycap type={1} value="I" />
        <Keycap type={1} value="O" />
        <Keycap type={1} value="P" />
        <Keycap type={1} value="[" />
        <Keycap type={1} value="]" />
        <Keycap type={1} value="\" />
      </TopRow>
      <MiddleRow>
        <Keycap type={1.75} />
        <Keycap type={1} value="A" />
        <Keycap type={1} value="S" />
        <Keycap type={1} value="D" />
        <Keycap type={1} value="F" />
        <Keycap type={1} value="G" />
        <Keycap type={1} value="H" />
        <Keycap type={1} value="J" />
        <Keycap type={1} value="K" />
        <Keycap type={1} value="L" />
        <Keycap type={1} value=";" />
        <Keycap type={1} value="'" />
        <Keycap type={2.25} />
      </MiddleRow>
      <BottomRow>
        <Keycap type={2.25} />
        <Keycap type={1} value="Z" />
        <Keycap type={1} value="X" />
        <Keycap type={1} value="C" />
        <Keycap type={1} value="V" />
        <Keycap type={1} value="B" />
        <Keycap type={1} value="N" />
        <Keycap type={1} value="M" />
        <Keycap type={1} value="," />
        <Keycap type={1} value="." />
        <Keycap type={1} value="/" />
        <Keycap type={2.75} />
      </BottomRow>
    </Rows>
  );
};

export default QwertyKeyboard;

// Styled ------------------------------------------------------------------------

const Rows = styled.div`
  width: 805px;
  height: fit-content;
  pointer-events: none;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const NumbersRow = Row;

const TopRow = Row;

const MiddleRow = Row;

const BottomRow = Row;
