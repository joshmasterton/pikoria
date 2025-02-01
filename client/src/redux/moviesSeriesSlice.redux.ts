import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  MoviesSeriesForm,
  MoviesSeriesRecommendationsType,
  MoviesSeriesType,
} from "../types/moviesSeries.type";
import axios, { AxiosError } from "axios";
import { API_URL } from "../config/api.config";
import { auth } from "../config/firebase.config";

const initialState: {
  error: string | undefined;
  loadingLike: boolean;
  loadingMovieSeries: boolean;
  loadingFavourites: boolean;
  loadingMoviesSeriesRecommendations: boolean;
  recommendationPage: number;
  favouritesPage: number;
  moviesSeriesRecommendations: MoviesSeriesRecommendationsType[] | undefined;
  movieSeries: MoviesSeriesType | undefined;
  favouriteMoviesSeries: MoviesSeriesType[] | undefined;
  moviesSeriesForm: MoviesSeriesForm | undefined;
} = {
  error: undefined,
  loadingLike: false,
  loadingMovieSeries: false,
  loadingFavourites: false,
  loadingMoviesSeriesRecommendations: false,
  recommendationPage: 1,
  favouritesPage: 0,
  moviesSeriesRecommendations: undefined,
  movieSeries: undefined,
  favouriteMoviesSeries: undefined,
  moviesSeriesForm: undefined,
};

// Get movie_series recommendation from TMDB
export const getMoviesSeriesRecommendation = createAsyncThunk<
  MoviesSeriesRecommendationsType[] | undefined,
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

    return response.data as MoviesSeriesRecommendationsType[];
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
  MoviesSeriesType
>("movies-series/like", async (movieSeries, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken();

    const response = await axios.post(
      `${API_URL}/movies-series/like`,
      { ...movieSeries, media_type: movieSeries.name ? "series" : "movie" },
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
  MoviesSeriesType[] | undefined,
  { page: number }
>("/movies-series/favourites", async ({ page }, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken(true);

    const response = await axios.get(
      `${API_URL}/movies-series/favourites?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data as MoviesSeriesType[] | undefined;
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
    incrementRecommendationPage: (state) => {
      state.recommendationPage += 1;
    },
    decrementRecommendationPage: (state) => {
      if (state.recommendationPage > 1) {
        state.recommendationPage -= 1;
      }
    },
    clearMoviesSeries: (state) => {
      state.moviesSeriesRecommendations = undefined;
      state.moviesSeriesForm = undefined;
      state.recommendationPage = 1;
    },
    clearMovieSeries: (state) => {
      state.movieSeries = undefined;
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
      .addCase(likeMovieSeries.fulfilled, (state) => {
        state.loadingLike = false;
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
        state.loadingLike = true;
      })
      .addCase(getMovieSeries.fulfilled, (state, action) => {
        state.loadingMovieSeries = false;
        state.loadingLike = false;
        state.movieSeries = action.payload;
      })
      .addCase(getMovieSeries.rejected, (state, action) => {
        state.loadingMovieSeries = false;
        state.loadingLike = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFormData,
  clearMovieSeries,
  clearMoviesSeries,
  incrementRecommendationPage,
  decrementRecommendationPage,
} = moviesSeriesSlice.actions;
export default moviesSeriesSlice.reducer;
