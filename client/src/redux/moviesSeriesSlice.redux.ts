import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  MoviesSeriesForm,
  MoviesSeriesRecommendationsTypeAll,
  MoviesSeriesType,
  MoviesSeriesTypeAll,
} from "../types/moviesSeries.type";
import axios, { AxiosError } from "axios";
import { API_URL } from "../config/api.config";
import { auth } from "../config/firebase.config";

const initialState: {
  favouritesPage: number;
  recommendationsPage: number;
  error: string | undefined;
  loadingLike: boolean;
  loadingMovieSeries: boolean;
  loadingFavourites: boolean;
  loadingMoviesSeriesRecommendations: boolean;
  moviesSeriesRecommendations: MoviesSeriesRecommendationsTypeAll | undefined;
  movieSeries: MoviesSeriesType | undefined;
  favouriteMoviesSeries: MoviesSeriesTypeAll | undefined;
  moviesSeriesForm: MoviesSeriesForm | undefined;
} = {
  favouritesPage: 0,
  recommendationsPage: 1,
  error: undefined,
  loadingLike: false,
  loadingMovieSeries: false,
  loadingFavourites: false,
  loadingMoviesSeriesRecommendations: false,
  moviesSeriesRecommendations: undefined,
  movieSeries: undefined,
  favouriteMoviesSeries: undefined,
  moviesSeriesForm: undefined,
};

// Get movie_series recommendation from TMDB
export const getMoviesSeriesRecommendation = createAsyncThunk<
  MoviesSeriesRecommendationsTypeAll | undefined,
  MoviesSeriesForm & { page: number }
>("movies-series/recommend", async (formData, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken();

    const response = await axios.post(
      `${API_URL}/movies-series/recommend`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data as MoviesSeriesRecommendationsTypeAll;
  } catch (error) {
    if (error instanceof AxiosError) {
      rejectWithValue(error.response?.data);
    } else {
      rejectWithValue("Error getting movies/series recommendation");
    }
  }
});

// Like a movie_series
export const likeMovieSeries = createAsyncThunk<
  MoviesSeriesType | undefined,
  { id: number; content: "movie" | "series" }
>("movies-series/like", async ({ id, content }, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken();

    const response = await axios.post(
      `${API_URL}/movies-series/like`,
      { id, content },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data as MoviesSeriesType | undefined;
  } catch (error) {
    if (error instanceof AxiosError) {
      rejectWithValue(error.response?.data);
    } else {
      rejectWithValue("Error liking/disliking movies/series");
    }
  }
});

// Get favourite movies_series
export const getFavouriteMoviesSeries = createAsyncThunk<
  MoviesSeriesTypeAll | undefined,
  { page: number }
>("/movies-series/favourites", async ({ page }, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken(true);

    const response = await axios.get(
      `${API_URL}/movies-series/favouriteMoviesSeries?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data as MoviesSeriesTypeAll | undefined;
  } catch (error) {
    if (error instanceof AxiosError) {
      rejectWithValue(error.response?.data);
    } else {
      rejectWithValue("Error getting favourite movies/series");
    }
  }
});

// Get movie_series
export const getMovieSeries = createAsyncThunk<
  MoviesSeriesType | undefined,
  { id: number; content: "movie" | "series" }
>(
  "/movie-series/id/get?content",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      const idToken = await user?.getIdToken();

      const response = await axios.get(
        `${API_URL}/movies-series/${id}/get?content=${content}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return response.data as MoviesSeriesType | undefined;
    } catch (error) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.response?.data);
      } else {
        rejectWithValue("Error getting favourite movies/series");
      }
    }
  }
);

const moviesSeriesSlice = createSlice({
  name: "moviesSeries",
  initialState,
  reducers: {
    setFavouritesPage: (state, action) => {
      state.favouritesPage = action.payload;
    },
    setRecommendationsPage: (state, action) => {
      state.recommendationsPage = action.payload;
    },
    clearMoviesSeriesRecommendations: (state) => {
      state.moviesSeriesRecommendations = undefined;
      state.moviesSeriesForm = undefined;
    },
    clearMovieSeries: (state) => {
      state.movieSeries = undefined;
    },
    clearFavourites: (state) => {
      state.favouriteMoviesSeries = undefined;
    },
    setFormData: (state, action) => {
      state.moviesSeriesForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesSeriesRecommendation.pending, (state) => {
        state.loadingMoviesSeriesRecommendations = true;
      })
      .addCase(getMoviesSeriesRecommendation.fulfilled, (state, action) => {
        state.loadingMoviesSeriesRecommendations = false;
        state.moviesSeriesRecommendations = action.payload;
      })
      .addCase(getMoviesSeriesRecommendation.rejected, (state, action) => {
        state.loadingMoviesSeriesRecommendations = false;
        state.error = action.payload as string;
      })
      .addCase(likeMovieSeries.pending, (state) => {
        state.loadingLike = true;
      })
      .addCase(likeMovieSeries.fulfilled, (state, action) => {
        state.loadingLike = false;

        const likedMovieSeries = action.payload;

        if (!likedMovieSeries) {
          return;
        }

        if (state.movieSeries) {
          state.movieSeries = likedMovieSeries;
        }

        if (state.favouriteMoviesSeries?.results) {
          state.favouriteMoviesSeries.results =
            state.favouriteMoviesSeries.results.map((movieSeries) => {
              return movieSeries.id === likedMovieSeries.id
                ? { ...movieSeries, liked: likedMovieSeries.liked }
                : movieSeries;
            });
        }

        if (state.moviesSeriesRecommendations?.results) {
          state.moviesSeriesRecommendations.results =
            state.moviesSeriesRecommendations.results.map((movieSeries) => {
              return movieSeries.id === likedMovieSeries.id
                ? { ...movieSeries, liked: likedMovieSeries.liked }
                : movieSeries;
            });
        }
      })
      .addCase(likeMovieSeries.rejected, (state, action) => {
        state.loadingLike = false;
        state.error = action.payload as string;
      })
      .addCase(getFavouriteMoviesSeries.pending, (state) => {
        state.loadingFavourites = true;
      })
      .addCase(getFavouriteMoviesSeries.fulfilled, (state, action) => {
        state.loadingFavourites = false;
        state.favouriteMoviesSeries = action.payload;
      })
      .addCase(getFavouriteMoviesSeries.rejected, (state, action) => {
        state.loadingFavourites = false;
        state.error = action.payload as string;
      })
      .addCase(getMovieSeries.pending, (state) => {
        state.loadingMovieSeries = true;
      })
      .addCase(getMovieSeries.fulfilled, (state, action) => {
        state.loadingMovieSeries = false;
        state.movieSeries = action.payload;
      })
      .addCase(getMovieSeries.rejected, (state, action) => {
        state.loadingMovieSeries = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFavouritesPage,
  setRecommendationsPage,
  setFormData,
  clearMovieSeries,
  clearMoviesSeriesRecommendations,
  clearFavourites,
} = moviesSeriesSlice.actions;
export default moviesSeriesSlice.reducer;
