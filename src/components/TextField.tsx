import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  value: string;
  onChange: any;
  name: string;
}

// Component ---------------------------------------------------------------------
const TextField: React.FC<Props> = ({ name, value, onChange }) => {
  return <Wrapper name={name} value={value} onChange={onChange} />;
};

export default TextField;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.input`
  background: black;
  color: white;
`;
