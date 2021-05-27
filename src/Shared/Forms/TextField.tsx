import React from "react";
import styled from "styled-components";
import { colors } from "../Global/Colors";
// Types -------------------------------------------------------------------------

interface Props {
  value: string;
  onChange: any;
  name: string;
  placeholder: string;
  type: string;
}

// Component ---------------------------------------------------------------------
const TextField: React.FC<Props> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <Wrapper
      placeholder={placeholder}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default TextField;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.input`
  background: transparent;
  color: ${colors.text};
  outline: none;
  border-radius: 6px;
  height: 50px;
  padding: 0 25px;
  margin-bottom: 15px;
  border: 2px solid ${colors.sub};
  transition: 150ms ease;
  font-size: 16px;

  &:hover {
    background-color: ${colors.background};
  }

  &::placeholder {
    font-weight: 500;
  }

  &:focus {
    background-color: ${colors.background};
    border-color: ${colors.main};
  }
`;
