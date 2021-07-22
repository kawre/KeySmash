import React, { createContext, useContext, useEffect, useRef } from "react";
import { useState } from "react";
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
  const [display, setDisplay] = useState(true);

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (loading || !loadingRef.current || !display) return;
    loadingRef.current.classList.add("fadeOut");

    setTimeout(() => {
      loadingRef?.current?.classList.add("hidden");
      setDisplay(false);
    }, 100);
  }, [loading]);

  // useEffect(() => {}, [loading]);

  // loading handler
  // useEffect(() => {
  //   if (loading || !loadingRef.current) return;
  //   loadingRef.current.classList.add("hidden");
  // }, [loading, loadingRef]);

  // global values
  const value = {
    user: data?.me,
  };

  return (
    <AuthContext.Provider value={value}>
      {display && <Loading ref={loadingRef} />}
      {!loading && children}
    </AuthContext.Provider>
  );
};

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #323437;
  z-index: 100;
  opacity: 1;
  transition: opacity 100ms ease-in;
  pointer-events: none;

  &.fadeOut {
    opacity: 0;
  }

  &.hidden {
    display: none;
  }
`;
