import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../config/firebase.config";
import { AuthContextType } from "../types/auth.type";
import { useDialogContext } from "./Dialog.context";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [loadingUpdatedUser, setLoadingUpdatedUser] = useState(false);
  const { setOpen, setMessage, setTitle } = useDialogContext();

  const signup = async (email: string, password: string) => {
    try {
      setLoadingUpdatedUser(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        setUser(response.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setOpen(true);
        setTitle("Signup");
        if (error.message.includes("email-already-in-use")) {
          setMessage("Email is already in use, please try again.");
        } else {
          setMessage("Signup error has occured, please try again.");
        }
        throw error;
      }
    } finally {
      setLoadingUpdatedUser(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoadingUpdatedUser(true);
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response) {
        setUser(response.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setOpen(true);
        setTitle("Login");
        if (error.message.includes("invalid-credential")) {
          setMessage("Invalid credentails provided, please try again.");
        } else {
          setMessage("Login error has occured, please try again.");
        }
        throw error;
      }
    } finally {
      setLoadingUpdatedUser(false);
    }
  };

  const logout = async () => {
    try {
      setLoadingUpdatedUser(true);
      await signOut(auth);
      setUser(undefined);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
    } finally {
      setLoadingUpdatedUser(false);
    }
  };

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoadingUpdatedUser(true);
      const response = await signInWithPopup(auth, provider);

      if (response) {
        setUser(response.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
    } finally {
      setLoadingUpdatedUser(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadingUpdatedUser,
        signup,
        login,
        signinWithGoogle,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
