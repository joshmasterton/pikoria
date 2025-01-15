import { configureStore } from "@reduxjs/toolkit";
import moviesSeriesReducer from "./moviesSeries.slice";

export const store = configureStore({
  reducer: {
    moviesSeries: moviesSeriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
