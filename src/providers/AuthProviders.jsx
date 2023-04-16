import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  //   ! observe auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current user", currentUser);
      setUser(currentUser);
      setLoader(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loader,
    createUser,
    singInUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
