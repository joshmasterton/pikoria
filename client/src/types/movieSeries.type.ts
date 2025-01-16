export type TMDBMovieSeries = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string | undefined;
  original_name: string | undefined;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string | undefined;
  first_air_date: string | undefined;
  title: string | undefined;
  name: string | undefined;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieSeriesType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  movie_series_id: number;
  original_language: string;
  original_title: string | undefined;
  original_name: string | undefined;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string | undefined;
  first_air_date: string | undefined;
  title: string | undefined;
  name: string | undefined;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MoviesSeriesState = {
  moviesSeries: MoviesSeriesWithCount | undefined;
  loading: boolean;
  error: string | undefined;
};

export type MoviesSeriesWithCount = {
  currentPage: number;
  data: MovieSeriesType[];
  total: number;
  totalPages: number;
};