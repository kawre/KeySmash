import React, { useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import Loader from "react-loader-spinner";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AddQuote: React.FC<Props> = () => {
  // const { addQuote, theme } = useData();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await addQuote(input);
      setInput("");
    } catch {
      console.log("Failed to append a quote");
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Headline>Append a quote to the data base</Headline>
      <form onSubmit={submitHandler}>
        <Textarea
          placeholder="Your quote"
          onChange={inputHandler}
          value={input}
          minLength={80}
          maxLength={160}
          required
        />
        <Button disabled={loading} type="submit">
          {/* {loading ? (
            <Loader type="ThreeDots" color={theme.text} height={5} />
          ) : (
            "Submit"
          )} */}
        </Button>
      </form>
    </Wrapper>
  );
};

export default AddQuote;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
`;

const Headline = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  max-height: 400px;
  background: #0000001a;
  border-radius: 4px;
  font-size: 18px;
  color: ${(props) => props.theme.text};
  padding: 15px;
  outline: none;
  border: 2px solid transparent;
  resize: vertical;
  transition: border 150ms;

  &:hover,
  &:focus {
    border: 2px solid ${(props) => props.theme.sub};
  }
`;

const Button = styled.button`
  height: 35px;
  border-radius: 4px;
  width: 100%;
  background: ${(props) => props.theme.main};
`;
