import React, { useState } from "react";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { colors } from "../Shared/Global/Colors";
import Loader from "react-loader-spinner";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AddQuote: React.FC<Props> = () => {
  const { addQuote } = useData();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addQuote(input);
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
          {loading ? (
            <Loader type="ThreeDots" color={colors.body} height={5} />
          ) : (
            "Submit"
          )}
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
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  max-height: 400px;
  background: ${colors.background}80;
  border-radius: 4px;
  font-size: 18px;
  color: ${colors.text};
  padding: 15px;
  outline: none;
  border: 2px solid transparent;
  resize: vertical;
  transition: border 150ms;

  &:hover {
    border: 2px solid ${colors.background};
  }

  &:focus {
    border: 2px solid ${colors.secondary}80;
  }
`;

const Button = styled.button`
  height: 35px;
  border-radius: 4px;
  width: 100%;
  background: ${colors.secondary};
`;
