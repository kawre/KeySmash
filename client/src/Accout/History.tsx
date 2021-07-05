import moment from "moment";
import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { TestHistoryQuery, useTestHistoryQuery } from "../generated/graphql";
import Button from "../Shared/Components/Button";
import Layout from "../Shared/Components/Layout";
import { date } from "../Shared/utils/date";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const History: React.FC<Props> = () => {
  const { theme } = useData();
  const { data, loading, error, fetchMore } = useTestHistoryQuery();
  const history = data?.testHistory;

  if (loading)
    return (
      <Layout center>
        <Loader type="ThreeDots" color={theme.main} height={12} />
      </Layout>
    );
  else if (!history || error) throw new Error(error?.message);

  return (
    <Wrapper>
      <Text style={{ width: "auto" }}>test history</Text>
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
      {history.map((h, i) => {
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
      {history.length % 10 === 0 && (
        <div style={{ marginTop: "10px" }}>
          <Button
            type="submit"
            onClick={() => {
              fetchMore({
                variables: { cursor: history[history.length - 1].createdAt },
              });
            }}
          >
            Load More
          </Button>
        </div>
      )}
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

  &:nth-child(odd) {
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
