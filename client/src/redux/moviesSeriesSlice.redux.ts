import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FavouriteMovieSeriesType,
  MoviesSeriesForm,
  TMDBMovieSeriesExtendedLikedType,
  TMDBMovieSeriesType,
} from "../types/moviesSeries.type";
import axios, { AxiosError } from "axios";
import { API_URL } from "../config/api.config";
import { auth } from "../config/firebase.config";

const initialState: {
  error: string | undefined;
  loadingMoviesSeries: boolean;
  loadingLike: boolean;
  loadingMovieSeries: boolean;
  loadingFavourites: boolean;
  page: number;
  TMDBmoviesSeries: TMDBMovieSeriesType[] | undefined;
  movieSeries: TMDBMovieSeriesExtendedLikedType | undefined;
  favouriteMoviesSeries: FavouriteMovieSeriesType[] | undefined;
  moviesSeriesForm: MoviesSeriesForm | undefined;
} = {
  error: undefined,
  loadingMoviesSeries: false,
  loadingLike: false,
  loadingMovieSeries: false,
  loadingFavourites: false,
  page: 1,
  TMDBmoviesSeries: undefined,
  movieSeries: undefined,
  favouriteMoviesSeries: undefined,
  moviesSeriesForm: undefined,
};

// Get movie_series recommendation from TMDB
export const getMoviesSeriesRecommendation = createAsyncThunk<
  TMDBMovieSeriesType[] | undefined,
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

    return response.data as TMDBMovieSeriesType[];
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
  FavouriteMovieSeriesType | undefined,
  TMDBMovieSeriesExtendedLikedType
>("movies-series/like", async (movieSeries, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken();

    const response = await axios.post(
      `${API_URL}/movies-series/like`,
      movieSeries,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data as FavouriteMovieSeriesType | undefined;
  } catch (error) {
    if (error instanceof AxiosError) {
      rejectWithValue(error.response?.data);
    } else {
      rejectWithValue("Error liking/disliking movies/series");
    }
  }
});

// Get favourite movies_series
export const getFavouriteMoviesSeries = createAsyncThunk(
  "/movies-series/favourites",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      const idToken = await user?.getIdToken();

      const response = await axios.get(`${API_URL}/movies-series/favourites`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      return response.data as FavouriteMovieSeriesType[] | undefined;
    } catch (error) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.response?.data);
      } else {
        rejectWithValue("Error getting favourite movies/series");
      }
    }
  }
);

// Get favourite movie_series
export const getMovieSeries = createAsyncThunk<
  TMDBMovieSeriesExtendedLikedType | undefined,
  { id: number; content: "movie" | "series" }
>(
  "/movie-series/id/get?content",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      const idToken = await user?.getIdToken();

      console.log(content);

      const response = await axios.get(
        `${API_URL}/movies-series/${id}/get?content=${content}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return response.data as TMDBMovieSeriesExtendedLikedType | undefined;
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
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    setLoadingMovieSeries: (state) => {
      state.loadingMovieSeries = true;
    },
    clearLoadingMovieSeries: (state) => {
      state.loadingMovieSeries = false;
    },
    clearMoviesSeries: (state) => {
      state.TMDBmoviesSeries = undefined;
      state.moviesSeriesForm = undefined;
      state.page = 1;
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
        state.loadingMoviesSeries = true;
      })
      .addCase(getMoviesSeriesRecommendation.fulfilled, (state, action) => {
        state.loadingMoviesSeries = false;
        state.TMDBmoviesSeries = action.payload;
      })
      .addCase(getMoviesSeriesRecommendation.rejected, (state, action) => {
        state.loadingMoviesSeries = false;
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
        state.loadingLike = true;
      })
      .addCase(getMovieSeries.fulfilled, (state, action) => {
        state.loadingLike = false;
        state.movieSeries = action.payload;
      })
      .addCase(getMovieSeries.rejected, (state, action) => {
        state.loadingLike = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFormData,
  clearMovieSeries,
  clearMoviesSeries,
  setLoadingMovieSeries,
  clearLoadingMovieSeries,
  incrementPage,
  decrementPage,
} = moviesSeriesSlice.actions;
export default moviesSeriesSlice.reducer;
