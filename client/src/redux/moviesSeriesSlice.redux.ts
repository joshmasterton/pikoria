import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  MoviesSeriesForm,
  TMDBMovieSeriesType,
} from "../types/moviesSeries.type";
import axios, { AxiosError } from "axios";
import { API_URL } from "../config/api.config";

const initialState: {
  error: string | undefined;
  loading: boolean;
  page: number;
  TMDBmoviesSeries: TMDBMovieSeriesType[] | undefined;
  moviesSeriesForm: MoviesSeriesForm | undefined;
} = {
  error: undefined,
  loading: false,
  page: 1,
  TMDBmoviesSeries: undefined,
  moviesSeriesForm: undefined,
};

// Get movie/series recommendation from TMDB
export const getMoviesSeriesRecommendation = createAsyncThunk<
  TMDBMovieSeriesType[] | undefined,
  MoviesSeriesForm & { page: number }
>(
  "movies-series/recommend",
  async (
    { genre, content, release, runtime, region, page },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/movies-series/recommend`, {
        genre,
        content,
        release,
        runtime,
        region,
        page,
      });

      return response.data as TMDBMovieSeriesType[];
    } catch (error) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.response?.data);
      } else {
        rejectWithValue("Error getting movies/series recommendation");
      }
    }
  }
);

const moviesSeriesSlice = createSlice({
  name: "moviesSeries",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    clearMoviesSeries: (state) => {
      state.TMDBmoviesSeries = undefined;
      state.moviesSeriesForm = undefined;
      state.page = 1;
    },
    setFormData: (state, action) => {
      state.moviesSeriesForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesSeriesRecommendation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoviesSeriesRecommendation.fulfilled, (state, action) => {
        state.loading = false;
        state.TMDBmoviesSeries = action.payload;
      })
      .addCase(getMoviesSeriesRecommendation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFormData, clearMoviesSeries, incrementPage, decrementPage } =
  moviesSeriesSlice.actions;
export default moviesSeriesSlice.reducer;
