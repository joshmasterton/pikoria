import axios from "axios";
import {
  MoviesSeriesState,
  MoviesSeriesWithCount,
} from "../types/movieSeries.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:80";

const intitialState: MoviesSeriesState = {
  moviesSeries: undefined,
  loading: false,
  error: undefined,
};

export const fetchMoviesSeries = createAsyncThunk(
  "moviesSeries/fetchMoviesSeries",
  async () => {
    const response = await axios.get(`${API_URL}/movies-series/get`);
    const moviesSeries: MoviesSeriesWithCount = response.data;
    return moviesSeries;
  }
);

const moviesSeriesSlice = createSlice({
  name: "moviesSeries",
  initialState: intitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesSeries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesSeries.fulfilled, (state, action) => {
        state.moviesSeries = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies-series";
      });
  },
});

export default moviesSeriesSlice.reducer;
