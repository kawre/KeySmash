import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
// Types -------------------------------------------------------------------------

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const GameContainer = styled.div`
  width: 700px;
  height: 500px;
`;

// Component ---------------------------------------------------------------------
const KeySmashGame = () => {
  const { getLayout } = useAuth();
  const [currentLayout, setCurrentLayout] = useState<string>("qwerty");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLayout = async () => {
      setLoading(true);

      try {
        const siema = await getLayout(currentLayout);
        console.log(siema);
      } catch {
        console.log("error");
      }

      setLoading(false);
    };

    fetchLayout();
  }, []);

  return (
    <Wrapper>
      <GameContainer></GameContainer>
    </Wrapper>
  );
};

export default KeySmashGame;
