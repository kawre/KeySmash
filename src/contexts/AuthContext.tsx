import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";

interface Value {}

const AuthContext = createContext<Value>(undefined!);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const ref = firestore.collection("users");

  const signup = (email: string, password: string) => {
    const createUser = auth.createUserWithEmailAndPassword(email, password);

    return createUser
      .then((cred) => {
        const id = cred?.user?.uid;
        console.log(id);
        // ref.doc(id).set({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = {
    signup,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {loading && children}
      </AuthContext.Provider>
    </>
  );
};
