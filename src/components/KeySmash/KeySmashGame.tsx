import React, { useEffect } from "react";
import styled from "styled-components";
import { useData } from "../../contexts/DataContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const KeySmashGame = () => {
  const { getLayout } = useData();

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await getLayout();
        console.log(response);
      } catch {
        console.log("error");
      }
    };

    fetchLayout();
  }, []);
  return <Wrapper></Wrapper>;
};

export default KeySmashGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
