import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Contexts/AuthContext";
import Layout from "../Shared/Components/Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Account: React.FC<Props> = () => {
  const { user } = useAuth();
  const [timePlayed, setTimePlayed] = useState<number>(0);

  return (
    <Layout>
      <StatsHeader>
        <div>
          <Text>tests completed</Text>
        </div>
        <div>
          <Text>time playing</Text>
          <BigText>{timePlayed}</BigText>
        </div>
      </StatsHeader>
    </Layout>
  );
};

export default Account;

// Styled ------------------------------------------------------------------------

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 16px;
`;

const BigText = styled.p`
  font-size: 22px;
`;
