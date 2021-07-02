import { OperationContext } from "@urql/core";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { auth, firestore } from "../firebase";
import {
  Exact,
  LoginInput,
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
  MutationLoginArgs,
  RegisterMutationVariables,
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { UserDataTypes } from "../Shared/Types/AuthTypes";

interface Context {
  logOut: () => Promise<void>;
  userData: UserDataTypes | null;
  //
  user: MeQuery["me"] | undefined;
  logIn: (variables: LoginMutationVariables) => Promise<any>;
  register: (variables: RegisterMutationVariables) => Promise<any>;
}

const AuthContext = createContext<Context>(undefined!);

// use auth
export function useAuth() {
  return useContext(AuthContext);
}

// Component
export const AuthProvider: React.FC = ({ children }) => {
  // States
  const loadingRef = useRef<HTMLDivElement>(null);
  // const [user, setUser] = useState<Context["user"]>(null);
  const [userData, setUserData] = useState<Context["userData"]>(null);

  // reference
  const ref = firestore.collection("users");

  // me
  const [{ data }] = useMeQuery();
  const user = data?.me;

  // login
  const [, logIn] = useLoginMutation();

  // signup
  const [, register] = useRegisterMutation();

  // register user
  const signUp = (email: string, password: string, username: string) => {
    const createUser = auth.createUserWithEmailAndPassword(email, password);

    return createUser
      .then((cred: any) => {
        const id = cred?.user?.uid;

        ref.doc(id).set({
          layout: "qwerty",
          username: username,
          id: id,
          email: email,
          theme: "serika dark",
        });
      })
      .then(() => {
        window.location.reload();
      });
  };

  // log Out
  const logOut = () => {
    return auth.signOut().then(() => {
      window.location.reload();
    });
  };

  // get current user DATA
  const getUserData = (user: firebase.default.User) => {
    const ref = firestore.collection("users").doc(user?.uid);

    return ref.onSnapshot((res) => {
      const user = res.data()!;
      setUserData({
        layout: user.layout,
        username: user.username,
        id: user.id,
        email: user.email,
        theme: user.theme,
      });
    });
  };

  // get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return loadingRef.current?.classList.add("hidden");

      try {
        // setUser(user);
        getUserData(user);
      } catch {
        console.log("something went wrong");
      }
      loadingRef.current?.classList.add("fadeOut");
    });

    return unsubscribe;
  }, []);

  // global values
  const value = {
    userData,
    logOut,
    //
    user,
    logIn,
    register,
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
