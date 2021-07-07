import moment from "moment";
import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { useData } from "../Contexts/DataContext";
import { useTestHistoryQuery } from "../generated/graphql";
import Button from "../Shared/Components/Button";
import Layout from "../Shared/Components/Layout";
import ResultTable from "../TypingGame/ResultTable";
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
    <ResultTable data={history} title="test history" fetchMore={fetchMore} />
  );
};

export default History;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
