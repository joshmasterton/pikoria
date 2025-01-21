export type UserType = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string;
};

export type AuthSliceType = {
  user: UserType | undefined;
  loading: boolean;
  error: string | undefined;
};
