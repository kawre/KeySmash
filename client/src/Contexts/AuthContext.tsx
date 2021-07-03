import React, { createContext, useContext, useRef } from "react";
import styled from "styled-components";
import { auth, firestore } from "../firebase";
import {
  LoginMutationVariables,
  MeQuery,
  RegisterMutationVariables,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegisterMutation,
} from "../generated/graphql";

interface Context {
  user: MeQuery["me"] | undefined;
  logout: () => any;
  login: (variables: LoginMutationVariables) => Promise<any>;
  register: (variables: RegisterMutationVariables) => Promise<any>;
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
  const [{ data }] = useMeQuery();

  // login
  const [, login] = useLoginMutation();

  // signup
  const [, register] = useRegisterMutation();

  // log Out
  const [, logout] = useLogoutMutation();

  // global values
  const value = {
    user: data?.me,
    logout,
    login,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* <Loading ref={loadingRef} /> */}
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
