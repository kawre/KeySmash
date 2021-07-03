import React, { createContext, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { MeQuery, useMeQuery } from "../generated/graphql";

interface Context {
  user: MeQuery["me"] | undefined;
}

const AuthContext = createContext<Context>(undefined!);

// use auth
export function useAuth() {
  return useContext(AuthContext);
}

// Component
export const AuthProvider: React.FC = ({ children }) => {
  const loadingRef = useRef<HTMLDivElement>(null);

  // me
  const { data, loading } = useMeQuery();
  console.log(data?.me);

  // loading handler
  useEffect(() => {
    if (loading || !loadingRef.current) return;
    loadingRef.current.classList.add("hidden");
  }, [loading, loadingRef]);

  // global values
  const value = {
    user: data?.me,
  };

  return (
    <AuthContext.Provider value={value}>
      <Loading ref={loadingRef} />
      {children}
    </AuthContext.Provider>
  );
};

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #323437;
  z-index: 100;
  opacity: 1;
  transition: 100ms ease;
  pointer-events: none;

  &.fadeOut {
    opacity: 0;
  }

  &.hidden {
    display: none;
  }
`;
