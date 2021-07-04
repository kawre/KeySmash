import moment from "moment";
import React from "react";
import styled from "styled-components";
import { useTestHistoryQuery } from "../generated/graphql";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const History: React.FC<Props> = () => {
  const { data } = useTestHistoryQuery();
  const history = data?.testHistory;

  const date = (s: string) => moment(parseInt(s)).format("DD MMM YYYY[\n]H:mm");

  return (
    <Wrapper>
      <Heading>
        <Stats>
          <Text>wpm</Text>
          <Text>raw</Text>
          <Text>cpm</Text>
          <Text>accuracy</Text>
        </Stats>
        <Text>time</Text>
        <Text>date</Text>
      </Heading>
      {history?.map((h, i) => {
        return (
          <Result key={h.createdAt + i}>
            <Stats>
              <Text>{h.wpm}</Text>
              <Text>{h.raw}</Text>
              <Text>{h.cpm}</Text>
              <Text>{h.accuracy}%</Text>
            </Stats>
            <Text>{h.time}s</Text>
            <Text style={{ whiteSpace: "pre", lineHeight: "22px" }}>
              {date(h.createdAt)}
            </Text>
          </Result>
        );
      })}
    </Wrapper>
  );
};

export default History;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 50px 0;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 50px;

  p {
    font-size: 14px;
    opacity: 0.8;
    color: ${({ theme }) => theme.sub};
  }
`;

const Result = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 50px;
  border-radius: 2px;

  &:nth-child(even) {
    background: #0000001a;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  width: 106px;
`;
