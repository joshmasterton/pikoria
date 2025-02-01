export type MoviesSeriesForm = {
  genre: number;
  content: string;
  release: number[];
  runtime: number[];
  region: string;
  page: number;
};

export type MoviesSeriesRecommendationsType = {
  id: number;
  title?: string; // For movies
  name?: string; // For TV series
  original_title?: string; // For movies
  original_name?: string; // For TV series
  original_language: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  release_date?: string; // Only for movies
  first_air_date?: string; // Only for TV series
  origin_country?: string[];
  video?: boolean; // Only for movies
  adult: boolean;
  liked: boolean;
};

export type MoviesSeriesType = {
  adult: boolean;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage?: string;
  id: number;
  movie_series_id: number;
  media_type: "movie" | "series";
  origin_country: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline?: string;
  vote_average: number;
  vote_count: number;
  liked: boolean;

  // Movie-specific properties
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget?: number;
  imdb_id?: string;
  original_title?: string;
  release_date?: string;
  revenue?: number;
  runtime?: number;
  title?: string;
  video?: boolean;

  // Series-specific properties
  created_by?: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender?: number;
    profile_path?: string;
  }[];
  episode_run_time?: number[];
  first_air_date?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type?: string;
    production_code?: string;
    runtime?: number;
    season_number: number;
    show_id: number;
    still_path?: string;
  };
  name?: string;
  next_episode_to_air?: null | object;
  networks?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country?: string;
  }[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  original_name?: string;
  seasons?: {
    air_date?: string;
    episode_count: number;
    id: number;
    name: string;
    overview?: string;
    poster_path?: string;
    season_number: number;
    vote_average?: number;
  }[];
  type?: string;
};
