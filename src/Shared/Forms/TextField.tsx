import React from "react";
import styled from "styled-components";
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
  background-color: #0000001a;
  border: none;
  outline: none;
  border-radius: 6px;
  height: 50px;
  padding: 0 25px;
  margin-bottom: 15px;
  transition: 150ms ease;
  font-size: 16px;
  color: ${(props) => props.theme.text};

  &::placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.sub};
  }
`;
