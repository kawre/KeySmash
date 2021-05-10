import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import KeyCapButton from "../KeyCapButton";
// Types -------------------------------------------------------------------------

interface KeySmash {
  rows: {
    numbersRow: [];
    topRow: [];
    middleRow: [];
    bottomRow: [];
  };
}

// Component ---------------------------------------------------------------------
const KeySmashGame = () => {
  const { getLayout } = useAuth();
  const [currentLayout, setCurrentLayout] = useState<string>("qwerty");
  const [rows, setRows] = useState<KeySmash["rows"] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLayout = async () => {
      setLoading(true);

      try {
        const response: any = await getLayout(currentLayout);
        setRows({
          numbersRow: response.numbersRow,
          topRow: response.topRow,
          middleRow: response.middleRow,
          bottomRow: response.bottomRow,
        });
      } catch {
        console.log("error");
      }

      setLoading(false);
    };

    fetchLayout();
  }, []);

  if (loading) return null;
  return (
    <Wrapper>
      <GameContainer>
        <NumbersRow>
          {rows?.numbersRow.map((key: string) => {
            return <KeyCapButton>{key}</KeyCapButton>;
          })}
        </NumbersRow>
        <TopRow>
          {rows?.topRow.map((key: string) => {
            return <KeyCapButton>{key}</KeyCapButton>;
          })}
        </TopRow>
        <MiddleRow>
          {rows?.middleRow.map((key: string) => {
            return <KeyCapButton>{key}</KeyCapButton>;
          })}
        </MiddleRow>
        <BottomRow>
          {rows?.bottomRow.map((key: string) => {
            return <KeyCapButton>{key}</KeyCapButton>;
          })}
        </BottomRow>
      </GameContainer>
    </Wrapper>
  );
};

export default KeySmashGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameContainer = styled.div`
  width: 100%;
  height: 400px;
`;

// Rows

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
`;

const NumbersRow = Row;

const TopRow = Row;

const MiddleRow = Row;

const BottomRow = Row;
