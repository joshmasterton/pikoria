import { User } from "firebase/auth";

export type AuthContextType = {
  user: User | undefined;
  loading: boolean;
  loadingUpdatedUser: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signinWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};
