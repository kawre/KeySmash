import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";

export type ContextProps = {
  currentUser: {
    username?: string;
    uid?: string;
  };
  getLayout: (layout: string) => Promise<object | undefined>;
};

const AuthContext = createContext<ContextProps>(undefined!);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getLayout = async (layout: string) => {
    const layoutRef = firestore.collection("layouts").doc(layout);

    return await layoutRef.get().then((rows) => {
      const data: object | undefined = rows.data();
      return data;
    });
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     setLoading(true);

  //     try {
  //       console.log(user);
  //     } catch {
  //       console.log("error");
  //     }

  //     setLoading(true);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
    getLayout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && children}
    </AuthContext.Provider>
  );
};
