import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../Global";
// Types -------------------------------------------------------------------------

interface Props {
  type: 1 | 1.25 | 1.5 | 1.75 | 2 | 2.25 | 2.75 | 6.25;
  value?: string;
}

// Component ---------------------------------------------------------------------
const Keycap: React.FC<Props> = ({ type, value }) => {
  const [keyType] = useState(() => {
    if (type === 1) return "key-1";
    if (type === 1.25) return "key-1_25";
    if (type === 1.5) return "key-1_5";
    if (type === 1.75) return "key-1_75";
    if (type === 2) return "key-2";
    if (type === 2.25) return "key-2_25";
    if (type === 2.75) return "key-2_75";
    if (type === 6.25) return "key-space";
  });
  const [keyId] = useState(() => {
    if (value === "=") return "equal";
    if (value === "`") return "tilda";
    if (value === "-") return "minus";
    if (value === "[") return "open-bracket";
    if (value === "]") return "close-bracket";
    if (value === "\\") return "backslash";
    if (value === ";") return "semicolon";
    if (value === "'") return "quote";
    if (value === ",") return "comma";
    if (value === ".") return "dot";
    if (value === "/") return "slash";
    if (value === "1") return "key-1";
    if (value === "2") return "key-2";
    if (value === "3") return "key-3";
    if (value === "4") return "key-4";
    if (value === "5") return "key-5";
    if (value === "6") return "key-6";
    if (value === "7") return "key-7";
    if (value === "8") return "key-8";
    if (value === "9") return "key-9";
    if (value === "0") return "key-0";
    return value?.toLocaleLowerCase();
  });

  return (
    <Wrapper id={keyId} className={keyType}>
      {value}
    </Wrapper>
  );
};

export default Keycap;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
  /* border: 1px solid ${colors.border}; */
  background-color: ${colors.secondary};
  margin: 0 2.5px;
  border-radius: 6px;
  color: ${colors.body};
  font-size: 18px;
  font-weight: 500;
  height: 50px;
  padding: 4px 0 0 8px;

  &.key-1 {
    width: 50px;
    flex-shrink: 0;
  }

  &.key-1_5 {
    width: 100%;
  }

  &.key-1_75 {
    width: 100px;
    flex-shrink: 0;
  }

  &.key-2 {
    width: 100%;
  }

  &.key-2_25 {
    width: 100%;
  }

  &.key-2_75 {
    width: 130px;
    flex-shrink: 0;
  }

  &.key-6_25 {
    width: 300px;
  }

  &.keycap-pressed-successfully {
    opacity: 0.5;
  }

  &.keycap-pressed-unsuccessfully {
    background-color: ${colors.fail};
  }
`;
