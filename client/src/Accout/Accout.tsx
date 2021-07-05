import React from "react";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import { useData } from "../Contexts/DataContext";
import { useStatsQuery } from "../generated/graphql";
import Layout from "../Shared/Components/Layout";
import { date } from "../Shared/utils/date";
import { f, r } from "../Shared/utils/number";
import History from "./History";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Account: React.FC<Props> = () => {
  const { user } = useAuth();
  const { data, loading, error } = useStatsQuery();
  const { theme } = useData();

  if (user === null) return <Redirect to="/" />;

  if (loading)
    return (
      <Layout center>
        <Loader type="ThreeDots" color={theme.main} height={12} />
      </Layout>
    );
  else if (!data) throw new Error(error?.message);
  const { stats } = data;

  return (
    <Layout>
      <Wrapper>
        <StatsHeader>
          <div>
            <Text>tests completed</Text>
            <BigText>{stats.testsCompleted}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{r(stats.averageWpm)}</BigText>
          </div>
          <div>
            <Text>time playing</Text>
            <BigText>{stats.timePlayed}</BigText>
          </div>
        </StatsHeader>
        <Bests>
          <Text style={{ width: "auto" }}>personal bests</Text>
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
          {stats.personalBests.map((h, i) => {
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
        </Bests>
        <OtherStats>
          {/* wpm */}
          <div>
            <Text>highest wpm</Text>
            <BigText>{f(stats.highestWpm)}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{r(stats.averageWpm)}</BigText>
          </div>
          <div>
            <Text>
              average wpm
              <br />
              (last 10 tests)
            </Text>
            <BigText>{r(stats.last10AverageWpm)}</BigText>
          </div>
          {/* raw */}
          <div>
            <Text>highest raw wpm</Text>
            <BigText>{f(stats.highestRaw)}</BigText>
          </div>
          <div>
            <Text>average raw wpm</Text>
            <BigText>{r(stats.averageRaw)}</BigText>
          </div>
          <div>
            <Text>
              average raw wpm
              <br />
              (last 10 tests)
            </Text>
            <BigText>{r(stats.last10AverageRaw)}</BigText>
          </div>
          {/* accuracy */}
          <div>
            <Text>time playing</Text>
            <BigText>{stats.timePlayed}</BigText>
          </div>
          <div>
            <Text>average accuracy</Text>
            <BigText>{r(stats.averageAcc)}%</BigText>
          </div>
          <div>
            <Text>
              average accuracy
              <br />
              (last 10 tests)
            </Text>
            <BigText>{r(stats.last10AverageAcc)}%</BigText>
          </div>
        </OtherStats>
        <History />
      </Wrapper>
    </Layout>
  );
};

export default Account;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  color: ${(props) => props.theme.text};
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 75px;
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

const Bests = styled.div`
  padding: 75px 0;

  p {
    color: ${({ theme }) => theme.text};
    width: 106px;
  }
`;

const OtherStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  row-gap: 15px;
  padding-right: 150px;
`;

const Text = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.sub};
`;

const BigText = styled.p`
  line-height: 50px;
  font-size: 48px;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
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
