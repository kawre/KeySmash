import { useEffect } from "react";
import styled from "styled-components";
import { useData } from "../../contexts/DataContext";
import { colors } from "../../Global";
import { v4 as uuidv4 } from "uuid";
// Types -------------------------------------------------------------------------

// interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame = () => {
  const { quote } = useData();

  useEffect(() => {
    console.log(quote);
  }, [quote]);

  return (
    <Wrapper>
      <TypingWrapper>
        {quote?.map((word) => {
          return (
            <Word key={uuidv4()}>
              {word.split("").map((letter) => (
                <span key={uuidv4()}>{letter}</span>
              ))}
            </Word>
          );
        })}
      </TypingWrapper>
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const TypingWrapper = styled.div`
  width: 800px;
  font-size: 20px;
`;

const Word = styled.div`
  display: inline-block;
  margin: 4px;
  color: ${colors.text};
`;
