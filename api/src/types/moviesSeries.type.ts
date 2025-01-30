export type MoviesSeriesForm = {
  genre: number;
  content: string;
  release: number[];
  runtime: number[];
  region: string;
  page: number;
};

export type TMDBMovieSeriesType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_title?: string | undefined;
  original_name?: string | undefined;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string | undefined;
  first_air_date?: string | undefined;
  title?: string | undefined;
  name?: string | undefined;
  video?: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMDBMovieSeriesLikeType = TMDBMovieSeriesType & {
  liked: boolean;
};

export type FavouriteMovieSeriesType = {
  id: number;
  user_id: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  movie_series_id: number;
  origin_country: string[];
  original_language: string;
  original_title?: string | undefined;
  original_name?: string | undefined;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string | undefined;
  first_air_date?: string | undefined;
  title?: string | undefined;
  name?: string | undefined;
  video?: boolean;
  vote_average: number;
  vote_count: number;
};

export type FavouriteMovieSeriesLikedType = {
  id: number;
  user_id: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  movie_series_id: number;
  origin_country: string[];
  original_language: string;
  original_title?: string | undefined;
  original_name?: string | undefined;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string | undefined;
  first_air_date?: string | undefined;
  title?: string | undefined;
  name?: string | undefined;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  liked: boolean;
};

type Creator = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: 1 | 2;
  profile_path: string;
};

type Genre = {
  id: number;
  name: string;
};

type LastEpisode = {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  episode_type: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type TMDBMovieSeriesExtendedType = {
  adult: boolean;
  backdrop_path: string;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisode;
  name: string;
  networks: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type TMDBMovieSeriesExtendedLikedType = TMDBMovieSeriesExtendedType & {
  liked: boolean;
};
