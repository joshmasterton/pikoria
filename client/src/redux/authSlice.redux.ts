import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.config";
import { AuthSliceType, UserType } from "../types/auth.type";
import { FirebaseError } from "firebase/app";

const initialState: AuthSliceType = {
  user: undefined,
  loading: false,
  error: undefined,
};

// Signin
export const signin = createAsyncThunk<
  AuthSliceType["user"],
  { email: string; password: string }
>("/auth/signin", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const { user } = userCredential;

    return {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid,
    } as UserType;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code);
    } else {
      return rejectWithValue("Error signing in");
    }
  }
});

// Signin with google
export const signinWithGoogle = createAsyncThunk<AuthSliceType["user"]>(
  "/auth/signinWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { user } = userCredential;
      return {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      } as UserType;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.code);
      } else {
        return rejectWithValue("Error signing in");
      }
    }
  }
);

// Signup
export const signup = createAsyncThunk<
  AuthSliceType["user"],
  { email: string; password: string }
>("/auth/signup", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    return {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid,
    } as UserType;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code);
    } else {
      return rejectWithValue("Error signing up");
    }
  }
});

// Logout
export const logout = createAsyncThunk<null, void>(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.code);
      } else {
        return rejectWithValue("Error logging out");
      }
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk<
  AuthSliceType["user"],
  { email: string }
>("/auth/resetPassword", async ({ email }, { rejectWithValue }) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code);
    } else {
      return rejectWithValue("Error resetting password");
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      })
      .addCase(signinWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(signinWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.user = undefined;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log(action.payload);
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
