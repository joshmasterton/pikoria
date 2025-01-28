import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice.redux";
import themeReducer from "./themeSlice.redux";
import moviesSeriesReducer from "./moviesSeriesSlice.redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    moviesSeries: moviesSeriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
