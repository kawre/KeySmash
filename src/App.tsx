import styled from "styled-components";
import KeySmashGame from "./components/KeySmash/KeySmashGame";
import { AuthProvider } from "./contexts/AuthContext";

const Wrapper = styled.div`
  background: black;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AuthProvider>
      <Wrapper>
        <KeySmashGame />
      </Wrapper>
    </AuthProvider>
  );
}

export default App;
