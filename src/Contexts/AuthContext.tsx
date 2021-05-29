import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { auth, firestore } from "../firebase";
import { UserDataTypes } from "../Shared/Types/AuthTypes";

interface Context {
  signUp: (email: string, password: string, username: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  user: firebase.default.User | null;
  userData: UserDataTypes | null;
}

const AuthContext = createContext<Context>(undefined!);

// use auth
export function useAuth() {
  return useContext(AuthContext);
}

// Component
export const AuthProvider: React.FC = ({ children }) => {
  // States
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Context["user"]>(null);
  const [userData, setUserData] = useState<Context["userData"]>(null);

  // reference
  const ref = firestore.collection("users");

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
        });
      })
      .then(() => {
        window.location.reload();
      });
  };

  // log in
  const logIn = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
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
  const getUserData = (user: Context["user"]) => {
    return ref
      .doc(user?.uid)
      .get()
      .then((res) => {
        const data = res.data()!;

        return setUserData({
          layout: data.layout,
          username: data.username,
          id: data.id,
          email: data.email,
          theme: data.theme,
        });
      });
  };
  useEffect(() => {
    if (!userData) return;
  }, [userData]);

  // get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return setLoading(false);

      try {
        setUser(user);
        await getUserData(user);
      } catch {
        console.log("something went wrong");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // global values
  const value = {
    userData,
    signUp,
    logOut,
    logIn,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
