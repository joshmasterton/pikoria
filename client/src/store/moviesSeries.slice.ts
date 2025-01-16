import axios from "axios";
import {
  MoviesSeriesState,
  MoviesSeriesWithCount,
} from "../types/movieSeries.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesSeriesFormType } from "../types/forms.type";
import { API_URL } from "../../utilities/variables.utilities";

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
    console.log(moviesSeries);

    return moviesSeries;
  }
);

export const submitMoviesSeriesForm = createAsyncThunk(
  "moviesSeries/submitMoviesSeriesForm",
  async (values: MoviesSeriesFormType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/movies-series/recommend`,
        values
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return (
          rejectWithValue(error.response?.data.errors) || "Submission failed"
        );
      }
      return rejectWithValue("An unknown error occured");
    }
  }
);

const moviesSeriesSlice = createSlice({
  name: "moviesSeries",
  initialState: intitialState,
  reducers: {
    reset: (state) => {
      state.moviesSeries = undefined;
    },
  },
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
      })
      .addCase(submitMoviesSeriesForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitMoviesSeriesForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitMoviesSeriesForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = moviesSeriesSlice.actions;

export default moviesSeriesSlice.reducer;
