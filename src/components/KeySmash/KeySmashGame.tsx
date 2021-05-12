import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataType, useData } from "../../contexts/DataContext";
// Types -------------------------------------------------------------------------

interface Props {
  rows: DataType["rows"];
}

// Component ---------------------------------------------------------------------
const KeySmashGame = () => {
  const [rows, setRows] = useState<Props["rows"]>();
  const { getLayout } = useData();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLayout();
        setRows({
          numbersRow: response?.numbersRow!,
          topRow: response?.topRow!,
          middleRow: response?.middleRow!,
          bottomRow: response?.bottomRow!,
        });
      } catch {
        console.log("error");
      }
    };

    fetchData();
  }, [getLayout]);

  return (
    <Wrapper>
      <RowsWrapper>
        <NumbersRow>
          {rows?.numbersRow.map((letter) => {
            return null;
            // return console.log(letter);
          })}
        </NumbersRow>
        <TopRow>
          {rows?.topRow.map((letter) => {
            return null;
            // return console.log(letter);
          })}
        </TopRow>
        <MiddleRow>
          {rows?.middleRow.map((letter) => {
            return null;
            // return console.log(letter);
          })}
        </MiddleRow>
        <BottomRow>
          {rows?.bottomRow.map((letter) => {
            return null;
            // return console.log(letter);
          })}
        </BottomRow>
      </RowsWrapper>
    </Wrapper>
  );
};

export default KeySmashGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

const RowsWrapper = styled.div``;

const Row = styled.div``;

const NumbersRow = Row;

const TopRow = Row;

const MiddleRow = Row;

const BottomRow = Row;
