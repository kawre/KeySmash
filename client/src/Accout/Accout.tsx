import React from "react";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import Layout from "../Shared/Components/Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Account: React.FC<Props> = () => {
  const { user } = useAuth();
  const stats = user?.stats;

  return (
    <Layout>
      <Wrapper>
        <StatsHeader>
          <div>
            <Text>tests completed</Text>
            <BigText>{stats?.testsCompleted}</BigText>
          </div>
          <div>
            <Text>average wpm</Text>
            <BigText>{stats?.averageWpm}</BigText>
          </div>
          <div>
            <Text>time playing</Text>
            <BigText>{stats?.timePlayed}</BigText>
          </div>
        </StatsHeader>
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
`;

const Text = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.sub};
`;

const BigText = styled.p`
  line-height: 50px;
  font-size: 48px;
`;
