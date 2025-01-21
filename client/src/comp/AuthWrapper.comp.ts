import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { auth } from "../config/firebase.config";
import { useAppDispatch } from "../redux/store.redux";
import { clearUser, setUser } from "../redux/authSlice.redux";
import { UserType } from "../types/auth.type";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const serializedUser: UserType = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        dispatch(setUser(serializedUser));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
};
