import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";

interface Value {
  signup: (email: string, password: string, username: string) => Promise<void>;
  user: {
    uid: string;
  } | null;
  userData: {
    layout: string;
    username: string;
    id: string;
    email: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<Value>(undefined!);

// use auth
export function useAuth() {
  return useContext(AuthContext);
}

// Component
export const AuthProvider: React.FC = ({ children }) => {
  // States
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Value["user"]>(null);
  const [userData, setUserData] = useState<Value["userData"]>(null);

  // reference
  const ref = firestore.collection("users");

  // register user
  const signup = (email: string, password: string, username: string) => {
    const createUser = auth.createUserWithEmailAndPassword(email, password);

    return createUser
      .then((cred) => {
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
  const login = (email: string, password: string) => {
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
  const getUserData = (user: Value["user"]) => {
    if (user === null) return;

    return ref
      .doc(user.uid)
      .get()
      .then((res) => {
        const data = res.data()!;

        setUserData({
          layout: data.layout,
          username: data.username,
          id: data.id,
          email: data.email,
        });
      });
  };

  // get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: Value["user"]) => {
      setLoading(true);

      try {
        setUser(user!);
        await getUserData(user!);
      } catch {}
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // global values
  const value = {
    signup,
    user,
    login,
    logOut,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
