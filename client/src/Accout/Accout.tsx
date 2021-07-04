import React from "react";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import { useData } from "../Contexts/DataContext";
import Layout from "../Shared/Components/Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Account: React.FC<Props> = () => {
  const { user } = useAuth();
  const { theme } = useData();

  console.log(user);
  if (user === undefined)
    return (
      <Layout center>
        <Loader type="ThreeDots" color={theme.main} height={12} />
      </Layout>
    );
  else if (user === null) return <Redirect to="/" />;

  const { stats } = user;

  const number = (n: number) => {
    const number = n.toString();
    console.log(number.length);
    if (number.length > 4) return number.slice(0, 4);
    return number;
  };

  console.log(number(54.23));

  return (
    <Layout>
      <Wrapper>
        <StatsHeader>
          <div>
            <Text>tests completed</Text>
            <BigText>{number(stats.testsCompleted)}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{number(stats.averageWpm)}</BigText>
          </div>
          <div>
            <Text>time playing</Text>
            <BigText>{stats.timePlayed}</BigText>
          </div>
        </StatsHeader>
        <OtherStats>
          <div>
            <Text>highest wpm</Text>
            <BigText>{number(stats.highestWpm)}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{number(stats.averageWpm)}</BigText>
          </div>
          <div>
            <Text>
              average wpm
              <br />
              (last 10 tests)
            </Text>
            <BigText>{number(stats.last10AverageWpm)}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{number(stats.averageWpm)}</BigText>
          </div>
          <div>
            <Text>time playing</Text>
            <BigText>{stats.timePlayed}</BigText>
          </div>
        </OtherStats>
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
  padding-right: 150px;
  padding-bottom: 300px;
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
