import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";

interface Value {
  signup: (email: string, password: string) => Promise<void>;
  user: object | null;
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
  const [user, setUser] = useState<object | null>(null);

  // reference
  const ref = firestore.collection("users");

  // register user
  const signup = (email: string, password: string) => {
    const createUser = auth.createUserWithEmailAndPassword(email, password);

    return createUser
      .then((cred) => {
        const id = cred?.user?.uid;

        console.log("siema", id);

        // ref.doc(id).set({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(true);

      try {
        setUser(user!);
      } catch {}
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // global values
  const value = {
    signup,
    user,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
};
